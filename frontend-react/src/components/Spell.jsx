import SpellCard from './SpellCard'

import { useState, useEffect } from 'react';

function Spell() {
  const [spells, initSpells] = useState([]);
  const [search, setSearch] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [classFilter, setClassFilter] = useState(''); //includes class and level

  async function fetchSpells() {
      const response = await fetch('http://127.0.0.1:8000/spells');
      const data = await response.json();
      initSpells(data);
  }

  useEffect(() => {
    fetchSpells();
  }, []);

  const filteredSpells = spells.filter(sp =>
    (sp.name.toLowerCase().includes(search.toLowerCase()) && 
    (schoolFilter === '' || sp.school === schoolFilter.toLowerCase()) &&
    (classFilter === '' || sp.level.includes(classFilter.toLowerCase())))
  ); 

  const schools = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];
  const classes = ['Wizard', 'Sorcerer', 'Cleric', 'Paladin', 'Ranger', 'Druid', 'Bard', 'Rogue'];
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search spells..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select value={schoolFilter} onChange={e => setSchoolFilter(e.target.value)}>
        <option value="">All Schools</option>
        {schools.map(school => (
          <option key={school} value={school}>{school}</option>
        ))}
      </select>
      <select value={classFilter} onChange={e => setClassFilter(e.target.value)}>
        <option value="">All Classes</option>
        {classes.map(cls => (
          <option key={cls} value={cls}>{cls}</option>
        ))}
      </select>
      {filteredSpells.map(sp => (
        <SpellCard key={sp.id} spell={sp} />
      ))}
    </div>
    );
}

export default Spell;