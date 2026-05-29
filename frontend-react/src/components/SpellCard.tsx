import { useState } from 'react';

import { Spell } from '../types'

function SpellCard({spell}: {spell: Spell}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="spell-card" onClick={() => setExpanded(!expanded)}>
      <h2>{spell.name}</h2>
      <b>School: </b> {spell.school} <br /> <b>Level: </b> {spell.level} <br />
      {expanded && <div>
        <h4>CASTING</h4>
        <b>Casting Time: </b> {spell.casting_time} <br />
        <b>Components: </b> {spell.components} <br />
        <h4>EFFECT</h4>
        <b>Range: </b> {spell.range} <br />
        <b>Target: </b> {spell.target} <br />
        <b>Effect: </b> {spell.effect} <br />
        <b>Area: </b> {spell.area} <br />
        <b>Duration: </b> {spell.duration} <br />
        <b>Saving Throw: </b> {spell.saving_throw} <br /> <b>Spell Resistance: </b> {spell.spell_resistance} <br />
        <h4>DESCRIPTION</h4>
        <b>Description: </b> {spell.description} <br />
      </div>}
    </div>
  );
}

export default SpellCard;