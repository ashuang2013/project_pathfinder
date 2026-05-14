import requests
import time
from bs4 import BeautifulSoup
from pymongo import MongoClient

SORCERER_WIZARD_OVERRIDE_URLS = {
    "Bestow Planar Infusion I": "https://www.d20pfsrd.com/magic/all-spells/b/bestow-planar-infusion-i/",
}

# MongoDB connection
client = MongoClient("mongodb://127.0.0.1:27017")
db = client["pathfinder"]
spells_collection = db["spells"]

def get_sorcerer_wizard_spell_list_soup():
    url = "https://www.d20pfsrd.com/magic/spell-lists-and-domains/spell-lists-sorcerer-and-wizard/"
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")

# sorcerer/wizard spell distribution count by level
# cantrips: 36
# 1st level: 249 or 241
# 2nd level: 342
# 3rd level: 198
# 4th level: 152
# 5th level: 139
# 6th level: 122
# 7th level: 121
# 8th level: 91
# 9th level: 83
# total: 1261
def get_sorcerer_wizard_nth_level_spells(soup, n):
    all_tables = soup.find_all("table")
    level_table = all_tables[n]
    spells = []
    for link in level_table.find_all("a", class_="spell"):
        name = link.text.strip().title()
        href = link["href"]
        spells.append((name, href))
    return spells

soup = get_sorcerer_wizard_spell_list_soup()
# sorcerer/wizard spells to scrape (excluding ones already in DB)
SORCERER_WIZARD_COMPLETE_URLS = [get_sorcerer_wizard_nth_level_spells(soup, n) for n in range(2)]
#SORCERER_WIZARD_COMPLETE_URLS = [get_sorcerer_wizard_nth_level_spells(soup, n) for n in range(10)]

def parse_spell(name, url):
    """fetch and parse a spell page from d20pfsrd"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"  ERROR fetching {name}: {e}")
        return None

    soup = BeautifulSoup(response.text, "html.parser")

    # helper to get text after a bold label
    def get_field(label):
        tag = content.find("b", string=lambda t: t and label.lower() in t.lower()) if content else None
        if not tag:
            return None
        
        # collect text from siblings until next <b> tag
        parts = []
        for sibling in tag.next_siblings:
            if sibling.name == "b":
                break
            if sibling.name == "br":
                break
            if hasattr(sibling, 'get_text'):
                parts.append(sibling.get_text(" ", strip=True))
            else:
                parts.append(str(sibling).strip())
        
        result = " ".join(parts).strip().strip(";").strip()
        return result if result else None
    
    # find the main content area
    content = soup.find("div", {"id": "article-content"}) or soup.find("div", {"class": "article-content"})
    
    # parse name line
    spell = {"name": name}

    # parse level line 
    level_tag = content.find("b", string=lambda t: t and "level" in t.lower()) if content else None
    if level_tag and level_tag.next_sibling:
        spell["level"] = get_field("Level") 

    # parse school line 
    school_tag = content.find("b", string=lambda t: t and "school" in t.lower()) if content else None
    if school_tag and school_tag.next_sibling:
        spell["school"] = get_field("School")

    # parse standard fields
    for field, label in [
        ("casting_time", "Casting Time"),
        ("components",   "Component"),
        ("range",        "Range"),
        ("target",       "Target"),
        ("effect",       "Effect"),
        ("area",         "Area"),
        ("duration",     "Duration"),
        ("saving_throw", "Saving Throw"),
        ("spell_resistance", "Spell Resistance"),
    ]:
        value = get_field(label)
        if value:
            spell[field] = value

    # parse description — grab all <p> tags after the DESCRIPTION header
    description_parts = []
    desc_header = content.find("p", class_="divider", string=lambda t: t and "description" in t.lower()) if content else None
    if desc_header:
        for sibling in desc_header.find_next_siblings():
            if sibling.name == "p" and "divider" in sibling.get("class", []):
                break
            if sibling.name == "p":
                text = sibling.get_text(" ", strip=True)
                if text:
                    description_parts.append(text)

    spell["description"] = " ".join(description_parts) if description_parts else None

    return spell

def seed_spells():
    level = 0
    for url_list in SORCERER_WIZARD_COMPLETE_URLS:
        print(f"Starting level {level} seed — {len(url_list)} spells to process...")
        inserted = 0
        skipped = 0
        failed = 0

        for name, url in url_list:
            name = name.strip().title() # normalize name
            # skip if already in DB
            if spells_collection.find_one({"name": name}):
                print(f"  SKIP  {name} (already exists)")
                skipped += 1
                continue

            print(f"  FETCH {name} ...")
            url = SORCERER_WIZARD_OVERRIDE_URLS.get(name, url) # override URL for known exceptions
            spell = parse_spell(name, url)

            if spell:
                spells_collection.insert_one(spell)
                print(f"  OK    {name} inserted")
                inserted += 1
            else:
                print(f"  FAIL  {name} skipping")
                failed += 1

            time.sleep(0.1) # delay between requests

        print(f"  -     {inserted} INSERTED, {skipped} SKIPPED, {failed} FAILED\n")
        level += 1
    print("SEEDING COMPLETE")

if __name__ == "__main__":
    seed_spells()

    # TODO KNOWN ISSUES:
    # Multiple variants of the same spell (see snowball https://www.d20pfsrd.com/magic/all-spells/s/snowball/)
    # Incorporate hyperlinks within the descriptions(see spells that link to each other https://www.d20pfsrd.com/magic/all-spells/f/form-of-the-dragon-i/)
    # Null descriptions: Penumbra, Scoop, and Jolt (possibly more)
    # Detect Magic, Greater is identified as a cantrip (source data problem, edge case)