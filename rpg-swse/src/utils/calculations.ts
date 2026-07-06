import type { Attributes, SkillName, HeroicClass, Character } from '../types';
import { classList } from '../data/classes';
import { getSkillKeyAbility } from '../data/skills';

export function getAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function getDefenseBonus(heroicClass: HeroicClass, defense: 'reflex' | 'fortitude' | 'will', level: number): number {
  const cls = classList.find(c => c.name === heroicClass);
  if (!cls) return 0;
  const bonus = cls.defenseBonuses[defense];
  return bonus + Math.floor(level / 2);
}

export function calculateDefense(
  type: 'reflex' | 'fortitude' | 'will',
  character: Character
): number {
  const { attributes, heroicClass, level } = character;
  const attrMap: Record<string, keyof Attributes> = {
    reflex: 'DEX',
    fortitude: 'CON',
    will: 'WIS'
  };
  const attr = attrMap[type];
  const mod = getAbilityModifier(attributes[attr]);
  const classBonus = getDefenseBonus(heroicClass, type, level);
  return 10 + mod + classBonus;
}

export function calculateSkillModifier(
  skill: SkillName,
  character: Character
): number {
  const { attributes, trainedSkills, level } = character;
  const keyAbility = getSkillKeyAbility(skill);
  const abilityMod = getAbilityModifier(attributes[keyAbility]);
  const halfLevel = Math.floor(level / 2);
  const trained = trainedSkills.includes(skill) ? 5 : 0;
  return halfLevel + abilityMod + trained;
}

export function calculateMaxHp(character: Character): number {
  const { heroicClass, level, attributes } = character;
  const cls = classList.find(c => c.name === heroicClass);
  if (!cls) return 0;
  const conMod = getAbilityModifier(attributes.CON);
  return cls.hpPerLevel + conMod + (level - 1) * (cls.hpPerLevel / 2 + conMod);
}

export function calculateDamageThreshold(character: Character): number {
  return calculateDefense('fortitude', character);
}

export function calculateInitiative(character: Character): number {
  return getAbilityModifier(attributes.DEX);
}

export function calculateForcePoints(level: number): number {
  return 5 + Math.floor(level / 2);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
