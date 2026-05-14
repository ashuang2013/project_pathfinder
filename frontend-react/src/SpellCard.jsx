function SpellCard(
    { name, school, level, casting_time, components, range, area, target, effect, duration, 
      saving_throw, spell_resistance, description }) {
  return (
    <div className="spell-card">
      <h2>{name}</h2>
      <b>School: </b> {school} <br /> <b>Level: </b> {level} <br />
      <h4>CASTING</h4>
      <b>Casting Time: </b> {casting_time} <br />
      <b>Components: </b> {components} <br />
      <h4>EFFECT</h4>
      <b>Range: </b> {range} <br />
      <b>Target: </b> {target} <br />
      <b>Effect: </b> {effect} <br />
      <b>Area: </b> {area} <br />
      <b>Duration: </b> {duration} <br />
      <b>Saving Throw: </b> {saving_throw} <br /> <b>Spell Resistance: </b> {spell_resistance} <br />
      <h4>DESCRIPTION</h4>
      <b>Description: </b> {description} <br />
    </div>
  );
}

export default SpellCard;