#include <set>
#include <vector>
#include <string>
#include <algorithm>
#include <fstream>
#include <sstream>
#include <iostream>
//#include <type_traits>

#include "spell.h"
#include "spellist.h"

spellist::spellist(std::set<spell> innate, std::set<spell> zeroth, std::set<spell> first, std::set<spell> second, 
    std::set<spell> third, std::set<spell> fourth, std::set<spell> fifth, std::set<spell> sixth, 
    std::set<spell> seventh,std::set<spell> eigth, std::set<spell> ninth) {
        this -> innate = innate;
        this -> zeroth = zeroth;
        this -> first = first;
        this -> second = second;
        this -> third = third;
        this -> fourth = fourth;
        this -> fifth = fifth;
        this -> sixth = sixth;
        this -> seventh = seventh;
        this -> eigth = eigth;
        this -> ninth = ninth;
}

std::set<spell> spellist::getInnate() { return innate; }
void spellist::setInnate(std::set<spell> s) { innate = s; }
void spellist::addInnate(spell s) { innate.insert(s); }
void spellist::removeInnate(spell s) { innate.erase(s); }
 
std::set<spell> spellist::getZeroth() { return zeroth; }
void spellist::setZeroth(std::set<spell> s) { zeroth = s; }
void spellist::addZeroth(spell s) { zeroth.insert(s); }
void spellist::removeZeroth(spell s) { zeroth.erase(s); }
    
std::set<spell> spellist::getFirst() { return first; }
void spellist::setFirst(std::set<spell> s) { first = s; }
void spellist::addFirst(spell s) { first.insert(s); }
void spellist::removeFirst(spell s) { first.erase(s); }

std::set<spell> spellist::getSecond() { return second; }
void spellist::setSecond(std::set<spell> s) { second = s; }
void spellist::addSecond(spell s) { second.insert(s); }
void spellist::removeSecond(spell s) { second.erase(s); }

std::set<spell> spellist::getThird() { return third; }
void spellist::setThird(std::set<spell> s) { third = s; }
void spellist::addThird(spell s) { third.insert(s); }
void spellist::removeThird(spell s) { third.erase(s); }

std::set<spell> spellist::getFourth() { return fourth; }
void spellist::setFourth(std::set<spell> s) { fourth = s; }
void spellist::addFourth(spell s) { fourth.insert(s); }
void spellist::removeFourth(spell s) { fourth.erase(s); }

std::set<spell> spellist::getFifth() { return fifth; }
void spellist::setFifth(std::set<spell> s) { fifth = s; }
void spellist::addFifth(spell s) { fifth.insert(s); }
void spellist::removeFifth(spell s) { fifth.erase(s); }

std::set<spell> spellist::getSixth() { return sixth; }
void spellist::setSixth(std::set<spell> s) { sixth = s; }
void spellist::addSixth(spell s) { sixth.insert(s); }
void spellist::removeSixth(spell s) { sixth.erase(s); }

std::set<spell> spellist::getSeventh() { return seventh; }
void spellist::setSeventh(std::set<spell> s) { seventh = s; }
void spellist::addSeventh(spell s) { seventh.insert(s); }
void spellist::removeSeventh(spell s) { seventh.erase(s); }

std::set<spell> spellist::getEigth() { return eigth; }
void spellist::setEigth(std::set<spell> s) { eigth = s; }
void spellist::addEigth(spell s) { eigth.insert(s); }
void spellist::removeEigth(spell s) { eigth.erase(s); }

std::set<spell> spellist::getNinth() { return ninth; }
void spellist::setNinth(std::set<spell> s) { ninth = s; }
void spellist::addNinth(spell s) { ninth.insert(s); }
void spellist::removeNinth(spell s) { ninth.erase(s); }

void spellist::printHelper(std::set<spell> &s) {
    for(auto itr : s) {
        itr.printSpell();
        std::cout << std::endl;
    }
}

void spellist::printSpellList() {
    std::cout << "-----------------------------------------\nINNATE\n-----------------------------------------" << std::endl;
    printHelper(innate);

    std::cout << "-----------------------------------------\nZEROTH\n-----------------------------------------" << std::endl;
    printHelper(zeroth);

    std::cout << "-----------------------------------------\nFIRST\n-----------------------------------------" << std::endl;
    printHelper(first);

    std::cout << "-----------------------------------------\nSECOND\n-----------------------------------------" << std::endl;
    printHelper(second);

    std::cout << "-----------------------------------------\nTHIRD\n-----------------------------------------" << std::endl;
    printHelper(third);

    std::cout << "-----------------------------------------\nFOURTH\n-----------------------------------------" << std::endl;
    printHelper(fourth);

    std::cout << "-----------------------------------------\nFIFTH\n-----------------------------------------" << std::endl;
    printHelper(fifth);

    std::cout << "-----------------------------------------\nSIXTH\n-----------------------------------------" << std::endl;
    printHelper(sixth);

    std::cout << "-----------------------------------------\nSEVENTH\n-----------------------------------------" << std::endl;
    printHelper(seventh);

    std::cout << "-----------------------------------------\nEIGTH\n-----------------------------------------" << std::endl;
    printHelper(eigth);

    std::cout << "-----------------------------------------\nNINTH\n-----------------------------------------" << std::endl;
    printHelper(ninth);
}

std::vector<std::string> split(std::string s, std::string delimiter) {
    size_t pos_start = 0, pos_end, delim_len = delimiter.length();
    std::string token;
    std::vector<std::string> res;

    while((pos_end = s.find(delimiter, pos_start)) != std::string::npos) {
        token = s.substr (pos_start, pos_end - pos_start);
        pos_start = pos_end + delim_len;
        res.push_back (token);
    }

    res.push_back(s.substr(pos_start));
    return res;
}

//https://stackoverflow.com/questions/2896600/how-to-replace-all-occurrences-of-a-character-in-string
std::string replaceAll(std::string str, const std::string& from, const std::string& to) {
    size_t start_pos = 0;
    while((start_pos = str.find(from, start_pos)) != std::string::npos) {
        str.replace(start_pos, from.length(), to);
        start_pos += to.length(); //handles case where 'to' is a substring of 'from'
    }
    return str;
}

spell loadSpellHelper(std::fstream &file) {
    int type;

    std::string SR;
    std::string name;
    std::string save;
    std::string range;
    std::string effect;
    std::string duration; 
    std::string description;
    std::string castingTime;
    
    std::vector<std::string> level;
    std::vector<std::string> school;
    std::vector<std::string> components;

    std::string line;

    getline(file, line);
    std::vector<std::string> temp = split(line, ", ");

    type = std::stoi(temp[0]);
    
    SR = temp[1];
    name = temp[2];
    save = temp[3];
    range = temp[4];
    effect = temp[5];
    duration = temp[6];
    castingTime = temp[7];

    getline(file, line);    description = line;
    description = replaceAll(description, "\\n", "\n");
    
    getline(file, line);    level = split(line, ", ");
    getline(file, line);    school = split(line, ", ");
    getline(file, line);    components = split(line, ", ");

    return spell(type, SR, name, save, range, effect, duration, description, castingTime,
        level, school, components);
}

void spellist::loadSpellList(std::string fn) {
    std::fstream file;
    file.open(fn, std::ios::in);

    if(file.is_open()) {
        std::string line;
        while(getline(file, line)) {
            if(line == "INNATE")        { innate.insert(loadSpellHelper(file)); }
            else if(line == "ZEROTH")   { zeroth.insert(loadSpellHelper(file)); }
            else if(line == "FIRST")    { first.insert(loadSpellHelper(file)); }
            else if(line == "SECOND")   { second.insert(loadSpellHelper(file)); }
            else if(line == "THIRD")    { third.insert(loadSpellHelper(file)); }
            else if(line == "FOURTH")   { fourth.insert(loadSpellHelper(file)); }
            else if(line == "FIFTH")    { fifth.insert(loadSpellHelper(file)); }
            else if(line == "SIXTH")    { sixth.insert(loadSpellHelper(file)); }
            else if(line == "SEVENTH")  { seventh.insert(loadSpellHelper(file)); }
            else if(line == "EIGTH")    { eigth.insert(loadSpellHelper(file)); }
            else if(line == "NINTH")    { ninth.insert(loadSpellHelper(file)); }
        }
    }
    file.close();
}