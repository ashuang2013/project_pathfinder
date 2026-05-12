import requests
import time
from bs4 import BeautifulSoup
from pymongo import MongoClient

# MongoDB connection
client = MongoClient("mongodb://127.0.0.1:27017")
db = client["pathfinder"]
spells_collection = db["spells"]

def get_zeroth_level_spells():
    """fetch the list of 0-level spells from d20pfsrd"""
    url = "https://www.d20pfsrd.com/magic/spell-lists-and-domains/spell-lists-sorcerer-and-wizard/"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"ERROR fetching spell list: {e}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")

    all_tables = soup.find_all("table")
    level_0_table = all_tables[0]  # first table is always cantrips

    spells = []
    for link in level_0_table.find_all("a", class_="spell"):
        name = link.text.strip()
        href = link["href"]
        spells.append((name, href))
        
    return spells

def get_first_level_spells():
    """fetch the list of 1-level spells from d20pfsrd"""
    url = "https://www.d20pfsrd.com/magic/spell-lists-and-domains/spell-lists-sorcerer-and-wizard/"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"ERROR fetching spell list: {e}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")

    all_tables = soup.find_all("table")
    level_1_table = all_tables[1]  # second table is always 1st level spells

    spells = []
    for link in level_1_table.find_all("a", class_="spell"):
        name = link.text.strip()
        href = link["href"]
        spells.append((name, href))
        
    return spells

# sorcerer/wizard cantrips to scrape (excluding ones already in DB)
CANTRIP_URLS = get_zeroth_level_spells()
FIRST_LEVEL_URLS = get_first_level_spells()

COMPLETE_URLS = [CANTRIP_URLS,
                 FIRST_LEVEL_URLS]

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
    for url_list in COMPLETE_URLS:
        print(f"Starting {level} level seed — {len(url_list)} spells to process...")
        inserted = 0
        skipped = 0
        failed = 0

        for name, url in url_list:
            # skip if already in DB
            if spells_collection.find_one({"name": name}):
                print(f"  SKIP  {name} (already exists)")
                skipped += 1
                continue

            print(f"  FETCH {name} ...")
            spell = parse_spell(name, url)

            if spell:
                spells_collection.insert_one(spell)
                print(f"  OK    {name} inserted")
                inserted += 1
            else:
                print(f"  FAIL  {name} — skipping")
                failed += 1

            time.sleep(0.5)  # delay between requests

        print(f"  -     {inserted} INSERT, {skipped} SKIP, {failed} FAIL\n")
        level += 1
    print("SEEDING COMPLETE")

if __name__ == "__main__":
    seed_spells()
    #  FETCH Bestow Planar Infusion I ...
  #ERROR fetching Bestow Planar Infusion I: 404 Client Error: Not Found for url: https://www.d20pfsrd.com/magic/all-spells/b/bestow-planar-infusion/
    # like flare and Flare
    # some issues with different spells being lowercase all, some issues with cascading spells like alarm and invisible alarm?
    # refactor later, can combine all spells into one function since I can iterate down all the tables
    # first level spells arent actually going into the db