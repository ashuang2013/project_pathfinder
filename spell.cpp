#include <string>
#include <vector>
#include <iostream>

#include "spell.h"

spell::spell(int type, std::string SR, std::string name, std::string save, std::string range, std::string effect, std::string duration, 
    std::string description, std::string castingTime, std::vector<std::string> level, std::vector<std::string> school,
    std::vector<std::string> components) {
        this -> type = type;

        this -> SR = SR;
        this -> name = name;
        this -> save = save;
        this -> range = range;
        this -> effect = effect;
        this -> duration = duration;
        this -> description = description;
        this -> castingTime = castingTime;

        this -> level = level;
        this -> school = school;
        this -> components = components;
}
            
std::string spell::getSR() { return SR; }
void spell::setSR(std::string s) { SR = s; }

std::string spell::getName() { return name; }
void spell::setName(std::string s) { name = s; }

std::string spell::getSave() { return save; }
void spell::setSave(std::string s) { save = s; }

std::string spell::getRange() { return range; }
void spell::setRange(std::string s) { range = s; }

std::string spell::getEffect() { return effect; }
void spell::setEffect(std::string s) { effect = s; }

std::string spell::getDuration() { return duration; }
void spell::setDuration(std::string s) { duration = s; }

std::string spell::getDescription() { return description; }
void spell::setDescription(std::string s) { description = s; }

std::string spell::getCastingTime() { return castingTime; }
void spell::setCastingTime(std::string s) { castingTime = s; }

std::vector<std::string> spell::getLevel() { return level; }
void spell::setLevel(std::vector<std::string> s) { level = s; }

std::vector<std::string> spell::getSchool() { return school; }
void spell::setSchool(std::vector<std::string> s) { school = s; };
    
std::vector<std::string> spell::getComponents() { return components; }
void spell::setComponents(std::vector<std::string> s) { components = s; }

//http://courses.cms.caltech.edu/cs11/material/cpp/donnie/cpp-ops.html
bool spell::operator > (const spell &obj) const { return (name > obj.name); }
bool spell::operator < (const spell &obj) const { return (name < obj.name); }
bool spell::operator = (const spell &obj) const { return (name == obj.name); }

void printVector(std::vector<std::string> &vector) {
    std::cout << vector[0];

    for(int i = 1; i < vector.size(); i++) {
        std::cout << ", " << vector[i];
    }
}

void spell::printSpell() {
    std::cout << name << std::endl;
    std::cout << "School: ";
    printVector(school);
    std::cout << "; Level: "; 
    printVector(level);
    std::cout << std::endl;

    std::cout << "-----------------------------------------\nCASTING\n-----------------------------------------" << std::endl;
    std::cout << "Casting Time: " << castingTime << "\nComponents: ";
    printVector(components);
    std::cout << std::endl;  

    std::cout << "-----------------------------------------\nEFFECT\n-----------------------------------------" << std::endl;
    std::string output;
    switch(type) {
        case 0:     output = "Range: " + range + "\nEffect: " + effect + "\nDuration: " + duration + "\nSaving Throw: " + save + "; Spell Resistance: " + SR + "\n"; break;
        case 1:     output = "Range: " + range + "\nTarget: " + effect + "\nDuration: " + duration + "\nSaving Throw: " + save + "; Spell Resistance: " + SR + "\n"; break;
        case 2:     output = "Range: " + range + "\nArea: " + effect + "\nDuration: " + duration + "\nSaving Throw: " + save + "; Spell Resistance: " + SR + "\n"; break;
        case 3:     output = "Range: " + range + "\nTarget or Area: " + effect + "\nDuration: " + duration + "\nSaving Throw: " + save + "; Spell Resistance: " + SR + "\n"; break;
        case 4:     output = "Range: " + range + "\nTarget: " + effect + "\nDuration: " + duration + "\n"; break;
        case 5:     output = "Range: " + range + "\nTarget, Effect, or Area: " + effect + "\nDuration: " + duration + "\nSaving Throw: " + save + "; Spell Resistance: " + SR + "\n"; break;
        default:    output = ""; break;
    } 
    std::cout << output;

    std::cout << "-----------------------------------------\nDESCRIPTION\n-----------------------------------------" << std::endl;
    std::cout << description << std::endl;      
}