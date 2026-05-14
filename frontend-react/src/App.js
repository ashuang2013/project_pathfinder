import logo from './logo.svg';
import SpellCard from './SpellCard'

import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [spells, initSpells] = useState([]);

  async function fetchSpells() {
      const response = await fetch('http://127.0.0.1:8000/spells');
      const data = await response.json();
      initSpells(data);
  }

  useEffect(() => {
    fetchSpells();
  }, []);

  return (
    <div>
      {spells.map(sp => (
        <SpellCard
          key={sp.id}
          name={sp.name}
          school={sp.school}
          level={sp.level}
          casting_time={sp.casting_time}
          components={sp.components}
          range={sp.range}
          area={sp.area}
          target={sp.target}
          effect={sp.effect}
          duration={sp.duration}
          saving_throw={sp.saving_throw}
          spell_resistance={sp.spell_resistance}
          description={sp.description}
        />
      ))}
    </div>
  );
}

export default App;