export type Alignment = 
  | 'lawful-good'
  | 'neutral-good'
  | 'chaotic-good'
  | 'lawful-neutral'
  | 'true-neutral'
  | 'chaotic-neutral'
  | 'lawful-evil'
  | 'neutral-evil'
  | 'chaotic-evil';

export type Race = 
  | 'dwarf'
  | 'elf'
  | 'gnome'
  | 'half-elf'
  | 'half-orc'
  | 'halfling'
  | 'human';

export type Size = 
  | 'fine'
  | 'diminutive'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge'
  | 'gargantuan'
  | 'colossal';

export type Tab = 
  | 'overview'
  | 'details'
  | 'inventory'
  | 'skills'
  | 'spells'
  | 'conditions';

export interface Spell {
  id?: string;
  name: string;
  school: string;
  level?: string;
  casting_time: string;
  components: string;
  range: string;
  target?: string;
  effect?: string;
  area?: string;
  duration: string;
  saving_throw: string;
  spell_resistance: string;
  description: string;
}

export interface Character {
  name: string;
  classes: string[];
  alignment: Alignment;
  race: Race;
  deity: string;
  size: Size;
  gender: string;
  height: string;
  age: string;
  weight: string;  
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number; 
  currHp: number;  
  maxHp: number;  
  nonLethal: number;  
  fortitude: number;  
  reflex: number;  
  will: number;   
  land: string;   
  swim: string;  
  fly: string;  
  climb: string;  
  burrow: string;  
  init: number;  
  bab: number;  
  melee: string; 
  ranged: string; 
  cmb: number; 
  ac: number;
  touch: number;  
  ff: number;  
  cmd: number;  
  dr: string;
  sr: number;   
}