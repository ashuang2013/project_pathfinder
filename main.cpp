#include <set>
#include <vector>
#include <string>
#include <iostream>

//#include "PC.h" later
#include "spell/spell.h"
#include "spell/spellist.h"

int main() {
    //CREATE THE SPELLIST
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

    spellist swsl(innate, zeroth, first, second, third, fourth, fifth, sixth, seventh, eigth, ninth);
    swsl.loadSpellList("spell/sorcererwizardsl.txt");
    //swsl.loadSpellList("sltest.txt");
    //FINISH LOADING IN SPELLIST
    swsl.printSpellList(); 

    return 0;
}