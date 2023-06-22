#ifndef SPELLIST_H
#define SPELLIST_H

#include <set>
#include <vector>

#include "spell.h"

class spellist {
    private:
        std::set<spell> innate;

        std::set<spell> zeroth;
        std::set<spell> first;
        std::set<spell> second;
        std::set<spell> third;
        std::set<spell> fourth;
        std::set<spell> fifth;
        std::set<spell> sixth;
        std::set<spell> seventh;
        std::set<spell> eigth;
        std::set<spell> ninth;

        void printHelper(std::set<spell> &set);

    public:
        spellist(std::set<spell> innate, std::set<spell> zeroth, std::set<spell> first, std::set<spell> second, 
            std::set<spell> third, std::set<spell> fourth, std::set<spell> fifth, std::set<spell> sixth, 
            std::set<spell> seventh, std::set<spell> eigth, std::set<spell> ninth);
        
        std::set<spell> getInnate();
        void setInnate(std::set<spell> s);
        void addInnate(spell s);
        void removeInnate(spell s);

        std::set<spell> getZeroth();
        void setZeroth(std::set<spell> s);
        void addZeroth(spell s);
        void removeZeroth(spell s);
    
        std::set<spell> getFirst();
        void setFirst(std::set<spell> s);
        void addFirst(spell s);
        void removeFirst(spell s);

        std::set<spell> getSecond();
        void setSecond(std::set<spell> s);
        void addSecond(spell s);
        void removeSecond(spell s);

        std::set<spell> getThird();
        void setThird(std::set<spell> s);
        void addThird(spell s);
        void removeThird(spell s);

        std::set<spell> getFourth();
        void setFourth(std::set<spell> s);
        void addFourth(spell s);
        void removeFourth(spell s);

        std::set<spell> getFifth();
        void setFifth(std::set<spell> s);
        void addFifth(spell s);
        void removeFifth(spell s);

        std::set<spell> getSixth();
        void setSixth(std::set<spell> s);
        void addSixth(spell s);
        void removeSixth(spell s);

        std::set<spell> getSeventh();
        void setSeventh(std::set<spell> s);
        void addSeventh(spell s);
        void removeSeventh(spell s);

        std::set<spell> getEigth();
        void setEigth(std::set<spell> s);
        void addEigth(spell s);
        void removeEigth(spell s);

        std::set<spell> getNinth();
        void setNinth(std::set<spell> s);
        void addNinth(spell s);
        void removeNinth(spell s);

        void printSpellList();
        void loadSpellList(std::string fn);
};

#endif