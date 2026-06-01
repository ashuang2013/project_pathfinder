import { useState } from 'react';

import { Skill } from '../types'

function SkillCard({skill}: {skill: Skill}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="skill-card" onClick={() => setExpanded(!expanded)}>
      <div className="two-col-grid">
        <b> {skill.name} </b> 
        <div className="three-col-grid">
          <b>Modifier: {skill.modifier} </b> 
          <b>Ranks: {skill.ranks}</b> 
          <b>Ability: {skill.ability}</b> 
        </div>
      </div>
      {expanded && <a 
          href={skill.description}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Full Description ↗
        </a>}
    </div>
  );
}

export default SkillCard;