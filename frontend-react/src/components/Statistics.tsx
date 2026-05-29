import { Character } from '../types'

import Aeliana from '../images/Aeliana.jpg';

interface StatisticsProps {
  character: Character;
  setCharacter: (character: Character) => void
}

function Statistics({character, setCharacter}: StatisticsProps) {
  return (
    <div className="header">
      <div className="header-grid">
        <div className="image-container">
          <img className="character-image" src={Aeliana} alt="character image" width="384px" height="216px"/>
        </div>
  
        <div className="header-right">
          <div className="card">
            <p className="label">Name</p>
            <input type="text" className="value-input" defaultValue={character.name}/> 
          </div>
  
          <div className="header-right-grid">
            <div className="card">
              <p className="label">Class</p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                {character.classes.map((cls, index) => (
                  <input key={index} type="text" className="value-input" defaultValue={cls} />
                ))}
              </div>
            </div>
  
            <div className="overview-grid">
              <div className="card">
                <p className="label">Alignment</p>
                <select className="value-input" defaultValue={character.alignment}>
                  <option value="lawful-good">Lawful Good</option>
                  <option value="neutral-good">Neutral Good</option>
                  <option value="chaotic-good">Chaotic Good</option>
                  <option value="lawful-neutral">Lawful Neutral</option>
                  <option value="true-neutral">True Neutral</option>
                  <option value="chaotic-neutral">Chaotic Neutral</option>
                  <option value="lawful-evil">Lawful Evil</option>
                  <option value="neutral-evil">Neutral Evil</option>
                  <option value="chaotic-evil">Chaotic Evil</option>
                </select>
              </div>
              <div className="card">
                <p className="label">Race</p>
                <select className="value-input" defaultValue={character.race}>
                  <option value="dwarf">Dwarf</option>
                  <option value="elf">Elf</option>
                  <option value="gnome">Gnome</option>
                  <option value="half-elf">Half-Elf</option>
                  <option value="halfling">Halfling</option>
                  <option value="half-orc">Half-Orc</option>
                  <option value="human">Human</option>
                </select>
              </div>
              <div className="card">
                <p className="label">Gender</p>
                <input type="text" className="value-input" defaultValue={character.gender}/>
              </div>
              <div className="card">
                <p className="label">Height</p>
                <input type="text" className="value-input" defaultValue={character.height}/>
              </div>
              <div className="card">
                <p className="label">Deity</p>
                <input type="text" className="value-input" defaultValue={character.deity}/>
              </div>
              <div className="card">
                <p className="label">Size</p>
                <select className="value-input" defaultValue={character.size}>
                  <option value="fine">Fine</option>
                  <option value="diminutive">Diminutive</option>
                  <option value="tiny">Tiny</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="huge">Huge</option>
                  <option value="gargantuan">Gargantuan</option>
                </select>
              </div>
              <div className="card">
                <p className="label">Age</p>
                <input type="text" className="value-input" defaultValue={character.age}/>
              </div>
              <div className="card">
                <p className="label">Weight</p>
                <input type="text" className="value-input" defaultValue={character.weight}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;