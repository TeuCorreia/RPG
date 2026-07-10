export type AttributeName = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export type HeroicClass = 'Jedi' | 'Nobre' | 'Vigarista' | 'Explorador' | 'Soldado' | 'Mundano';

export type SkillName =
  | 'Acrobacia' | 'Escalar' | 'Enganação' | 'Resistência'
  | 'Obter Informação' | 'Iniciativa' | 'Salto' | 'Conhecimento'
  | 'Mecânica' | 'Percepção' | 'Persuasão' | 'Pilotagem'
  | 'Montaria' | 'Furtividade' | 'Sobrevivência' | 'Nadar'
  | 'Tratar Ferimentos' | 'Usar Computador' | 'Usar a Força';

export interface Attributes {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
}

export interface Skill {
  name: SkillName;
  keyAbility: AttributeName;
  trained: boolean;
  classSkill: boolean;
}

export interface Feat {
  name: string;
  description: string;
  prerequisites?: string;
}

export interface Talent {
  name: string;
  description: string;
  tree: string;
  prerequisites?: string[];
}

export interface ForcePower {
  name: string;
  description: string;
  dc?: number;
}

export interface Weapon {
  name: string;
  attackBonus: number;
  damage: string;
  critRange: string;
  type: string;
  weight: number;
  range?: string;
  properties?: string;
}

export interface Armor {
  name: string;
  reflexBonus: number;
  maxDexBonus: number;
  armorCheckPenalty: number;
  weight: number;
}

export interface Equipment {
  name: string;
  quantity: number;
  weight: number;
  description?: string;
}

// ==================== NOVOS TYPES - INVENTÁRIO ====================

export type EquipmentCategory = 'weapon' | 'armor' | 'gear' | 'consumable' | 'tool';

export interface InventoryItem {
  id: string;
  name: string;
  category: EquipmentCategory;
  quantity: number;
  weight: number;
  cost: number;
  description?: string;
  equipped?: boolean;
  // Para armas
  attackBonus?: number;
  damage?: string;
  critRange?: string;
  range?: string;
  // Para armaduras
  reflexBonus?: number;
  maxDexBonus?: number;
  armorCheckPenalty?: number;
}

export interface EquipmentCatalogItem {
  id: string;
  name: string;
  category: EquipmentCategory;
  weight: number;
  cost: number;
  description: string;
  // Para armas
  attackBonus?: number;
  damage?: string;
  critRange?: string;
  range?: string;
  properties?: string;
  // Para armaduras
  reflexBonus?: number;
  maxDexBonus?: number;
  armorCheckPenalty?: number;
}

// ==================== NOVOS TYPES - HABILIDADES ====================

export type AbilitySource = 'species' | 'class' | 'level' | 'custom';

export interface CharacterFeat {
  id: string;
  name: string;
  description: string;
  prerequisites?: string[];
  source: AbilitySource;
  levelGained?: number;
}

export interface CharacterTalent {
  id: string;
  name: string;
  description: string;
  tree?: string;
  prerequisites?: string[];
  source: AbilitySource;
  levelGained?: number;
}

// ==================== NOVOS TYPES - PODERES DA FORÇA ====================

export type ForceSide = 'light' | 'dark' | 'universal';

export interface ForcePowerCatalog {
  id: string;
  name: string;
  description: string;
  dc: number;
  cost: number;
  side: ForceSide;
  prerequisites?: string[];
  effect: string;
  duration?: string;
  range?: string;
}

export interface CharacterForcePower {
  id: string;
  powerId: string;
  name: string;
  description: string;
  customNotes?: string;
  timesUsed?: number;
}

export interface ClassEntry {
  name: HeroicClass;
  level: number;
}

export interface Character {
  id: string;
  userId: string;
  name: string;
  species: string;
  image?: string;
  heroicClass: HeroicClass;
  classes: ClassEntry[];
  level: number;
  xp: number;
  age: number;
  gender: string;
  height: string;
  weight: string;
  attributes: Attributes;
  trainedSkills: SkillName[];
  feats: CharacterFeat[];
  talents: CharacterTalent[];
  forcePowers: CharacterForcePower[];
  weapons: Weapon[];
  armor: Armor | null;
  inventory: InventoryItem[];
  credits: number;
  currentHp: number;
  currentFp: number;
  skillOverrides?: Partial<Record<SkillName, number>>;
  hpOverride?: number;
  fpOverride?: number;
  reflexOverride?: number;
  fortitudeOverride?: number;
  willOverride?: number;
  currentCondition: number;
  appearance: string;
  background: string;
  notes: string;
  createdAt: number;
  updatedAt: number;
}

export interface SpeciesModifiers {
  str?: number;
  dex?: number;
  con?: number;
  int?: number;
  wis?: number;
  cha?: number;
}

export interface SpeciesData {
  name: string;
  description: string;
  attributeModifiers: SpeciesModifiers;
  size: 'Small' | 'Medium' | 'Large';
  speed: number;
  bonusFeats: string[];
  bonusSkills: SkillName[];
  image: string;
  specialAbilities: { name: string; description: string }[];
}

export interface ClassData {
  name: HeroicClass;
  description: string;
  keyAbilities: AttributeName[];
  hpPerLevel: number;
  defenseBonuses: { reflex: number; fortitude: number; will: number };
  trainedSkills: number;
  classSkills: SkillName[];
  talentTrees: string[];
}

export interface UserProfile {
  username: string;
  password: string;
  createdAt: number;
}
