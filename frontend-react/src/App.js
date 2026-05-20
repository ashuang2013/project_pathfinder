import Overview from './components/Overview'
import Spell from './components/Spell'
import Statistic from './components/Statistic';
import TabBar from './components/TabBar'

import './App.css';
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [character, setCharacter] = useState({
    // header
    name: 'Aeliana Nirelith', className: 'Wizard 20, Archmage 10', 
    alignment: 'chaotic neutral', race: 'elf', deity: 'Nethys', size: 'Medium',
    gender: 'Female', height: '165 cm', age: '1000', weight: '50 kg',
    str: 16, dex: 26, con: 18, int: 48, wis: 32, cha: 24,
    currHp: 175, maxHp: 175, nonLethal: 0,
    fortitude: 20, reflex: 25, will: 40,
    land: '45 ft', swim: '45 ft', fly: '300 ft perfect', climb: '45 ft', burrow: '45 ft',
    init: 20, bab: 16, melee: '', ranged: '', cmb: 10,
    ac: 36, touch: 20, ff: 26, cmd: 25, dr: '15/-', sr: 30 
    //skills
    //details
    //inventory
    //spells
    //buffs
    //debuffs
  });  

  return (
    <div className="overview">
      <Overview character={character} setCharacter={setCharacter}/>
      <div className="top-tab">
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'overview' && <Statistic character={character} setCharacter={setCharacter}/>}
        {activeTab === 'details' && <div>Details coming soon</div>}
        {activeTab === 'inventory' && <div>Inventory coming soon</div>}
        {activeTab === 'skills' && <div>Skills coming soon</div>}
        {activeTab === 'spells' && <Spell />}
        {activeTab === 'buffs-debuffs' && <div>Buffs coming soon</div>}
      </div>
    </div>
  );
}

export default App;