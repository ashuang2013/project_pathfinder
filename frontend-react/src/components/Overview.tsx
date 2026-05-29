import { useState } from 'react';

import { getModifier } from '../utils/calculations'

import { Character } from '../types'

interface OverviewProps {
  character: Character;
  setCharacter: (character: Character) => void
}

function Overview({character, setCharacter}: OverviewProps) {
  const formatMod = (score: number): string => {
    const mod = getModifier(score)
    const sign = mod >= 0 ? '+' : '';
    return `(${sign}${mod})`;
  };

  const [newStr, setNewStr] = useState(character.str)
  const [newDex, setNewDex] = useState(character.dex)
  const [newCon, setNewCon] = useState(character.con)
  const [newInt, setNewInt] = useState(character.int)
  const [newWis, setNewWis] = useState(character.wis)
  const [newCha, setNewCha] = useState(character.cha)
  const [newCurrHp, setNewCurrHp] = useState(character.currHp)

  return(
    <div>
      <div className="title-card">
        <p className="label">Ability Scores</p>
      </div>
    
      <div className="standard-grid">
        <div className="card">
          <p className="label">Strength</p>
          <div className="stat-display">
            <input 
              type="number"
              className="value-input" 
              data-ability="str"
              value={newStr}
              onChange={e => setNewStr(parseInt(e.target.value))}
              onBlur={() => setCharacter({...character, str: newStr})}
            />
            <span className="str-modifier">{formatMod(character.str)}</span>
          </div>
        </div>
        <div className="card">
          <p className="label">Dexterity</p>
          <div className="stat-display">
            <input 
              type="number"
              className="value-input" 
              data-ability="dex"
              value={newDex}
              onChange={e => setNewDex(parseInt(e.target.value))}
              onBlur={() => setCharacter({...character, dex: newDex})}
            />
            <span className="dex-modifier">{formatMod(character.dex)}</span>
          </div>
        </div>
        <div className="card">
          <p className="label">Constitution</p>
          <div className="stat-display">
            <input 
              type="number"
              className="value-input" 
              data-ability="con"
              value={newCon}
              onChange={e => setNewCon(parseInt(e.target.value))}
              onBlur={() => setCharacter({...character, con: newCon})}
            />
            <span className="con-modifier">{formatMod(character.con)}</span>
          </div>
        </div>
        <div className="card">
          <p className="label">Intelligence</p>
          <div className="stat-display">
            <input 
              type="number"
              className="value-input" 
              data-ability="int"
              value={newInt}
              onChange={e => setNewInt(parseInt(e.target.value))}
              onBlur={() => setCharacter({...character, int: newInt})}
            />
            <span className="int-modifier">{formatMod(character.int)}</span>
          </div>
        </div>
        <div className="card">
          <p className="label">Wisdom</p>
          <div className="stat-display">
            <input 
              type="number"
              className="value-input" 
              data-ability="wis"
              value={newWis}
              onChange={e => setNewWis(parseInt(e.target.value))}
              onBlur={() => setCharacter({...character, wis: newWis})}
            />
            <span className="wis-modifier">{formatMod(character.wis)}</span>
          </div>
        </div>
        <div className="card">
          <p className="label">Charisma</p>
          <div className="stat-display">
            <input 
              type="number"
              className="value-input" 
              data-ability="cha"
              value={newCha}
              onChange={e => setNewCha(parseInt(e.target.value))}
              onBlur={() => setCharacter({...character, cha: newCha})}
            />
            <span className="cha-modifier">{formatMod(character.cha)}</span>
          </div>
        </div>
      </div>
  
      <div className="two-col-grid">
        <div>
          <div className="title-card" style={{marginBottom: '12px'}}>
            <p className="label">Hit Points</p>
          </div>
          <div className="three-col-grid">
            <div className="card">
              <p className="label">Current</p>
              <div className="stat-display">
                <input 
                  type="number"
                  id="current-hp-input"
                  value={newCurrHp}
                  onChange={e => setNewCurrHp(parseInt(e.target.value))}
                />
                <span>/ {character.maxHp}</span>
              </div>
            </div>
            <div className="card">
              <p className="label">Maximum</p>
              <p className="value">{character.maxHp}</p>
            </div>
            <div className="card">
              <p className="label">Nonlethal</p>
              <p className="value">{character.nonLethal}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="title-card" style={{marginBottom: '12px'}}>
            <p className="label">Saves</p>
          </div>
          <div className="three-col-grid">
            <div className="card">
              <p className="label">Fortitude</p>
              <p className="value">{character.fortitude}</p>
            </div>
            <div className="card">
              <p className="label">Reflex</p>
              <p className="value">{character.reflex}</p>
            </div>
            <div className="card">
              <p className="label">Will</p>
              <p className="value">{character.will}</p>
            </div>
          </div>
        </div>

      </div>

      <div className="title-card">
        <p className="label">Movement</p>
      </div>
    
      <div className="standard-grid">
        <div className="card">
          <p className="label">Land</p>
          <p className="value">{character.land}</p>
        </div>
        <div className="card">
          <p className="label">Swim</p>
          <p className="value">{character.swim}</p>
        </div>
        <div className="card">
          <p className="label">Fly</p>
          <p className="value">{character.fly}</p>
        </div>
        <div className="card">
          <p className="label">Climb</p>
          <p className="value">{character.climb}</p>
        </div>
        <div className="card">
          <p className="label">Burrow</p>
          <p className="value">{character.burrow}</p>
        </div>
      </div>

      <div className="title-card">
        <p className="label">Offense</p>
      </div>
    
      <div className="standard-grid">
        <div className="card">
          <p className="label">Initiative</p>
          <p className="value">{character.init}</p>
        </div>
        <div className="card">
          <p className="label">BAB</p>
          <p className="value">{character.bab}</p>
        </div>
        <div className="card">
          <p className="label">Melee</p>
          <p className="value">{character.melee}</p>
        </div>
        <div className="card">
          <p className="label">Ranged</p>
          <p className="value">{character.ranged}</p>
        </div>
        <div className="card">
          <p className="label">CMB</p>
          <p className="value">{character.cmb}</p>
        </div>
      </div>
  
      <div className="title-card">
        <p className="label">Defense</p>
      </div>
    
      <div className="standard-grid">
        <div className="card">
          <p className="label">AC</p>
          <p className="value">{character.ac}</p>
        </div>
        <div className="card">
          <p className="label">Touch AC</p>
          <p className="value">{character.touch}</p>
        </div>
        <div className="card">
          <p className="label">FF AC</p>
          <p className="value">{character.ff}</p>
        </div>
        <div className="card">
          <p className="label">CMD</p>
          <p className="value">{character.cmd}</p>
        </div>
        <div className="card">
          <p className="label">Damage Reduction</p>
          <p className="value">{character.dr}</p>
        </div>
        <div className="card">
          <p className="label">Spell Resistance</p>
          <p className="value">{character.sr}</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;