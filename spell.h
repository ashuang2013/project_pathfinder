#ifndef SPELL_H
#define SPELL_H

#include <string>
#include <vector>
#include <iostream>

class spell {
    private:
        int type;

        std::string SR;
        std::string name;
        std::string save;
        std::string range;
        std::string effect;     //target and effect are interchangeable
        std::string duration;
        std::string description;
        std::string castingTime;

        std::vector<std::string> level;
        std::vector<std::string> school;
        std::vector<std::string> components;

    public:
        spell(int type, std::string SR, std::string name, std::string save, std::string range, std::string effect, std::string duration, 
            std::string description, std::string castingTime, std::vector<std::string> level, std::vector<std::string> school,
            std::vector<std::string> components);
        
        std::string getSR();
        void setSR(std::string s);

        std::string getName();
        void setName(std::string s);

        std::string getSave();
        void setSave(std::string s);

        std::string getRange();
        void setRange(std::string s);

        std::string getEffect();
        void setEffect(std::string s);

        std::string getDuration();
        void setDuration(std::string s);

        std::string getDescription();
        void setDescription(std::string s);

        std::string getCastingTime();
        void setCastingTime(std::string s);

        std::vector<std::string> getLevel();
        void setLevel(std::vector<std::string> s);

        std::vector<std::string> getSchool();
        void setSchool(std::vector<std::string> s);

        std::vector<std::string> getComponents();
        void setComponents(std::vector<std::string> s);

        bool operator > (const spell&obj) const;
        bool operator < (const spell&obj) const;
        bool operator = (const spell&obj) const;
        
        void printSpell();
};

#endif