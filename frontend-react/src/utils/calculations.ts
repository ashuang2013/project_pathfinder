import { AbilityScore, Character } from '../types'

export function getModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function getSkillModifier(
  abilityScore: number,
  ranks: number,
  isClassSkill: boolean
): number {
  const abilityMod = Math.floor((abilityScore - 10) / 2);
  const classSkillBonus = isClassSkill && ranks > 0 ? 3 : 0;
  return abilityMod + ranks + classSkillBonus;
}

export function getAbilityScore(character: Character, ability: AbilityScore): number {
  const map: Record<AbilityScore, number> = {
    str: character.str,
    dex: character.dex,
    con: character.con,
    int: character.int,
    wis: character.wis,
    cha: character.cha,
  };
  return map[ability];
}