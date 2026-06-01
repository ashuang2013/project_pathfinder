import { useState, useEffect } from 'react';

import { SKILL_DEFINITIONS } from '../constants/Skills'
import { Character, Skill } from '../types'
import { getAbilityScore, getSkillModifier } from '../utils/calculations'

import SkillCard from './SkillCard'

function Skills({ character }: { character: Character }) {
  const [skills, initSkills] = useState<Skill[]>([]);

  useEffect(() => {
    initSkills(SKILL_DEFINITIONS.map(sk => ({
      ...sk,
      modifier: getSkillModifier(getAbilityScore(character, sk.ability), sk.ranks, sk.class_skill)})));
  }, []);

  return (
    <div>
      {skills.map(sk => (
        <SkillCard key={sk.name} skill={sk} />
      ))}
    </div>
    );
}

export default Skills;