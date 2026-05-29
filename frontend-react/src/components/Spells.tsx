import { useState, useEffect } from 'react';

import { Spell } from '../types'

import SpellCard from './SpellCard'

function Spells() {
  const schools = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];
  const classes = ['Wizard', 'Sorcerer', 'Cleric', 'Paladin', 'Ranger', 'Druid', 'Bard', 'Rogue'];

  const [spells, initSpells] = useState<Spell[]>([]);

  const [searchFilter, setSearchFilter] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [classFilter, setClassFilter] = useState(''); //includes class and level

<<<<<<< HEAD:frontend-react/src/components/Spell.jsx
  async function fetchSpells() {
      const response = await fetch('https://api.yangystudios.com/spells');
      const data = await response.json();
      initSpells(data);
  }

  useEffect(() => {
    fetchSpells();
  }, []);

=======
>>>>>>> feature/react:frontend-react/src/components/Spells.tsx
  const filteredSpells = spells.filter(sp =>
    (sp.name.toLowerCase().includes(searchFilter.toLowerCase()) && 
    (schoolFilter === '' || sp.school === schoolFilter.toLowerCase()) &&
    (classFilter === '' || !sp.level || sp.level.includes(classFilter.toLowerCase())))
  ); 

  useEffect(() => {
    async function fetchSpells() {
      const response = await fetch('https://api.yangystudios.com/spells');
      const data = await response.json();
      initSpells(data);
    }
    fetchSpells();
  }, []);
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchFilter}
        onChange={e => setSearchFilter(e.target.value)}
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

export default Spells;