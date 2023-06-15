#include <set>
#include <cmath>
#include <string>
#include <vector>
#include <iostream>

//TODO: implement archetypes, multiclassing
//THIS CLASS IS MEANT TO BE INHERITED AND THEN ADDED SPECIFICITY BASED ON CLASS (SHOULD PROBABLY MAKE CLASS ENUM SOMEHOW FINAL IN SUBCLASSES)
enum class SIZE             {NONE, FINE, DIMINUTIVE, TINY, SMALL, MEDIUM, LARGE, HGE, GARGANTUAN, COLOSSAL};                            //https://www.d20pfsrd.com/gamemastering/combat/space-reach-threatened-area-templates/
enum class RACE             {NONE, DWARF, ELF, GNOME, HALF_ELF, HALFLING, HALF_ORC, HUMAN};                                             //currently only supports core races
enum class DEITY            {NONE, ATHEIST, ERASTIL, IOMEDAE, TORAG, SARENRAE, SHELYN, CAYDEN_CAILEAN, DESNA, ABADAR, IRORI, GOZREH, GREEN_FAITH, NETHYS, PHARASMA, CALISTRIA, GORUM, ASMODEUS, ZON_KUTHON, 
                                NORGORBER, URGATHOA, LAMASHTU, ROVAGUG};                                                                //currently only supports core deities                                              
enum class CLASS            {NONE, ALCHEMIST, ANTIPALADIN, ARCANIST, BARBARIAN, UBARBARIAN, BARD, BLOODRAGER, BRAWLER, CAVALIER, CLERIC, DRUID, FIGHTER, GUNSLINGER, HUNTER, INQUISITOR, 
                                INVESTIGATOR, KINETICIST, MAGUS, MEDIUM, MESMERIST, MONK, UMONK, NINJA, OCCULTIST, ORACLE, PALADIN, PSYCHIC, RANGER, ROGUE, UROGUE, SAMURAI, SHAMAN, SHIFTER, 
                                SKALD, SLAYER, SORCERER, SPIRITUALIST, SUMMONER, USUMMONER, SWASHBUCKLER, VIGILANTE, WARPRIEST, WITCH, WIZARD};
enum class LANGUAGE         {NONE, ABOLETH, ABYSSAL, AKLO, AQUAN, AURAN, BOGGARD, CELESTIAL, COMMON, CYCLOPS, DARK_FOLK, DRACONIC, DROW_SIGN_LANGUAGE, DRUIDIC, DWARVEN, DZIRIAK, ELVEN, GIANT, GNOLL, GNOME,
                                GOBLIN, GRIPPLI, HALFLING, IGNAN, INFERNAL, NECRIL, ORC, PROTEAN, ROUGAROU, SPHINX, SYLVAN, TENGU, TERRAN, TREANT, UNDERCOMMON, VEGEPYGMY};                               
enum class ALIGNMENT        {NONE, LAWFUL_GOOD, LAWFUL_NEUTRAL, LAWFUL_EVIL, NEUTRAL_GOOD, NEUTRAL, NEUTRAL_EVIL, CHAOTIC_GOOD, CHAOTIC_NEUTRAL, CHAOTIC_EVIL};
enum class MANEUVERABILITY  {NONE, CLUMSY, POOR, AVERAGE, GOOD, PERFECT};                                                               //https://www.d20pfsrd.com/skills/fly/

class PC {
    public:
        PC() {} //empty constructor
        //PC() {} constructor that will be populated by save

        //platinum (pp), gold (gp), silver (sp), and copper pieces (cp)
        //WILL NOT AUTOMATICALLY CONVERT
        int getPP() { return pp; }
        void setPP(int p) { pp = p; }
        void addPP(int a) { pp += a; }
        void subtractPP(int s) { pp -= s; }

        int getGP() { return gp; }
        void setGP(int p) { gp = p; }
        void addGP(int a) { gp += a; }
        void subtractGP(int s) { gp -= s; }

        int getSP() { return sp; }
        void setSP(int p) { sp = p; }
        void addSP(int a) { sp += a; }
        void subtractSP(int s) { sp -= s; }

        int getCP() { return cp; }
        void setCP(int p) { cp = p; }
        void addCP(int a) { cp += a; }
        void subtractCP(int s) { cp -= s; }

        //base ability score plus modifier calculations
        int getModifier(int score) { 
            if(score <= 0) {
                return -10; //ERROR
            }
            else if(score == 1) {
                return -5;
            }
            else {
                return floor((score - 10) / 2.0);
            }
        }

        int getStrength() { return strength; }
        void setStrength(int s) { strength = s; }
        void addStrength(int a) { strength += a; }
        void subtractStrength(int s) { strength -= s; }

        int getDexterity() { return dexterity; }
        void setDexterity(int s) { dexterity = s; }
        void addDexterity(int a) { dexterity += a; }
        void subtractDexterity(int s) { dexterity -= s; }

        int getConstitution() { return constitution; }
        void setConstitution(int s) { constitution = s; }
        void addConstitution(int a) { constitution += a; }
        void subtractConstitution(int s) { constitution -= s; }

        int getIntelligence() { return intelligence; }
        void setIntelligence(int s) { intelligence = s; }
        void addIntelligence(int a) { intelligence += a; }
        void subtractIntelligence(int s) { intelligence -= s; }

        int getWisdom() { return wisdom; }
        void setWisdom(int s) { wisdom = s; }
        void addWisdom(int a) { wisdom += a; }
        void subtractWisdom(int s) { wisdom -= s; }

        int getCharisma() { return charisma; }
        void setCharisma(int s) { charisma = s; }
        void addCharisma(int a) { charisma += a; }
        void subtractCharisma(int s) { charisma -= s; }

        //speed 
        int getBaseSpeed() { return baseSpeed; }
        void setBaseSpeed(int s) { baseSpeed = s; }
        void addBaseSpeed(int a) { baseSpeed += a; }
        void subtractBaseSpeed(int s) { baseSpeed -= s; }

        int getSwimSpeed() { return swimSpeed; }
        void setSwimSpeed(int s) { swimSpeed = s; }
        void addSwimSpeed(int a) { swimSpeed += a; }
        void subtractSwimSpeed(int s) { swimSpeed -= s; }

        int getClimbSpeed() { return climbSpeed; }
        void setClimbSpeed(int s) { climbSpeed = s; }
        void addClimbSpeed(int a) { climbSpeed += a; }
        void subtractClimbSpeed(int s) { climbSpeed -= s; }

        int getBurrowSpeed() { return burrowSpeed; }
        void setBurrowSpeed(int s) { burrowSpeed = s; }
        void addBurrowSpeed(int a) { burrowSpeed += a; }
        void subtractBurrowSpeed(int s) { burrowSpeed -= s; }

        int getFlySpeed() { return flySpeed; }
        void setFlySpeed(int s) { flySpeed = s; }
        void addFlySpeed(int a) { flySpeed += a; }
        void subtractFlySpeed(int s) { flySpeed -= s; }

        //initiative, BAB, CMB and CMD
        int getInitiative() { return initiative; }
        void setInitiative(int s) { initiative = s; }
        void addInitiative(int a) { initiative += a; }
        void subtractInitiative(int s) { initiative -= s; }

        int getBAB() { return BAB; }
        void setBAB(int s) { BAB = s; }
        void addBAB(int a) { BAB += a; }
        void subtractBAB(int s) { BAB -= s; }

        int getCMB() { return CMB; }
        void setCMB(int s) { CMB = s; }
        void addCMB(int a) { CMB += a; }
        void subtractCMB(int s) { CMB -= s; }

        int getCMD() { return CMD; }
        void setCMD(int s) { CMD = s; }
        void addCMD(int a) { CMD += a; }
        void subtractCMD(int s) { CMD -= s; }

        //hp, level and age
        int getHP() { return hp; }
        void setHP(int s) { level = s; }
        void addHP(int a) { level += a; }
        void subtractHP(int s) { level -= s; }

        int getLevel() { return level; }
        void setLevel(int s) { level = s; }
        void addLevel(int a) { level += a; }
        void subtractLevel(int s) { level -= s; }

        int getAge() { return age; }
        void setAge(int s) { age = s; }
        void addAge(int a) { age += a; }
        void subtractAge(int s) { age -= s; }

        //fortitude, reflex, and will
        int getFortitude() { return fortitude; }
        void setFortitude(int s) { fortitude = s; }

        int getReflex() { return reflex; }
        void setReflex(int s) { reflex = s; }

        int getWill() { return will; }
        void setWill(int s) { will = s; }
        
        //AC, touch, and flat-footed
        int getAC() { return AC; }
        void setAC(int s) { AC = s; }

        int getTouchAC() { return touch; }
        void setTouchAC(int s) { touch = s; }

        int getFlatFootedAC() { return flatFooted; }
        void setFlatFootedAC(int s) { flatFooted = s; }
        
        //DR and SR
        int getDR() { return DR; }
        void setDR(int s) { DR = s; }

        int getSR() { return SR; }
        void setSR(int s) { SR = s; }

        //doubles: height and weight
        double getHeight() { return height; }
        void setHeight(double h) { height = h; }

        double getWeight() { return weight; }
        void setWeight(double w) { weight = w; }

        //strings: name, image, gender, hair and eyes
        std::string getName() { return name; }
        void setName(std::string n) { name = n; }

        std::string getImage() { return image; }
        void setImage(std::string i) { image = i; }

        std::string getGender() { return gender; }
        void setGender(std::string g) { gender = g; }

        std::string getHair() { return hair; }
        void setHair(std::string h) { hair = h; }

        std::string getEyes() { return eyes; }
        void setEyes(std::string e) { eyes = e; }

        //enums: size, race, deity, class, alignment and maneuverability
        SIZE getSize() { return size; }
        void setSize(SIZE s) { size = s; }

        RACE getRace() { return race; }
        void setRace(RACE r) { race = r; }

        DEITY getDeity() { return deity; }
        void setDeity(DEITY d) { deity = d; }

        CLASS getClass() { return clss; }
        void setClass(CLASS c) { clss = c; }

        ALIGNMENT getAlignment() { return alignment; }
        void setClass(ALIGNMENT a) { alignment = a; }

        MANEUVERABILITY getManeuverability() { return maneuverability; }
        void setClass(MANEUVERABILITY m) { maneuverability = m; }

        //set: language
        std::set<LANGUAGE> getLanguage() { return languages; }
        void addLanguage(LANGUAGE l) { languages.insert(l); }
        void subtractLanguage(LANGUAGE l) { languages.erase(l); }
        
    private: 
        int pp;
        int gp;
        int sp;
        int cp;

        int strength;
        int dexterity;
        int constitution;
        int intelligence;
        int wisdom;
        int charisma;

        int baseSpeed;                              //affected by armor penalties
        int swimSpeed;
        int climbSpeed;
        int burrowSpeed;
        int flySpeed;

        int initiative;
        int BAB;
        int CMB;
        int CMD;
        
        int hp;
        int age;                                    //TODO: add age modifiers
        int level;
        
        int fortitude;
        int reflex;
        int will;
        
        int AC;
        int touch;
        int flatFooted;
        
        int DR;
        int SR;

        double height;
        double weight;

        std::string name;
        std::string image;
        std::string gender;
        std::string hair;
        std::string eyes;
    
        SIZE size = SIZE::NONE; 
        RACE race = RACE::NONE;
        DEITY deity = DEITY::NONE;
        CLASS clss = CLASS::NONE;
        ALIGNMENT alignment = ALIGNMENT::NONE;
        MANEUVERABILITY maneuverability = MANEUVERABILITY::NONE;
        
        std::set<LANGUAGE> languages;

        //list resist, immunitiies
        //class rangedAttack;
        //class meleeAttack;

        //class skills
        //set feats
        //set traits

        //list treasure;
        //list gear;

        //class spells 
};