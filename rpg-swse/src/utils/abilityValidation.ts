import type { Character } from '../types';
import { featsCatalog, getFeatById } from '../data/feats';
import { getTalentsByClasses } from '../data/talents';
import { getForcePowersBySide } from '../data/forcePowers';

// ==================== VERIFICAÇÃO DE PRÉ-REQUISITOS ====================

export function validateFeatPrerequisites(
  featId: string,
  character: Character
): { valid: boolean; missing: string[] } {
  const feat = getFeatById(featId);
  if (!feat) return { valid: false, missing: ['Feat não encontrado'] };

  if (!feat.prerequisites) return { valid: true, missing: [] };

  const missing: string[] = [];

  feat.prerequisites.forEach(prereq => {
    if (prereq.includes('BAB')) {
      const babRequired = parseInt(prereq.match(/\d+/)?.[0] || '0');
      if (character.level < babRequired) {
        missing.push(`BAB +${babRequired} (atual: ${character.level})`);
      }
    } else if (prereq.includes('Força')) {
      const attrRequired = parseInt(prereq.match(/\d+/)?.[0] || '0');
      if (character.attributes.STR < attrRequired) {
        missing.push(`Força ${attrRequired} (atual: ${character.attributes.STR})`);
      }
    } else if (prereq.includes('Destreza')) {
      const attrRequired = parseInt(prereq.match(/\d+/)?.[0] || '0');
      if (character.attributes.DEX < attrRequired) {
        missing.push(`Destreza ${attrRequired} (atual: ${character.attributes.DEX})`);
      }
    } else if (prereq.includes('Constituição')) {
      const attrRequired = parseInt(prereq.match(/\d+/)?.[0] || '0');
      if (character.attributes.CON < attrRequired) {
        missing.push(`Constituição ${attrRequired} (atual: ${character.attributes.CON})`);
      }
    } else if (prereq.includes('Inteligência')) {
      const attrRequired = parseInt(prereq.match(/\d+/)?.[0] || '0');
      if (character.attributes.INT < attrRequired) {
        missing.push(`Inteligência ${attrRequired} (atual: ${character.attributes.INT})`);
      }
    } else if (prereq.includes('Sabedoria')) {
      const attrRequired = parseInt(prereq.match(/\d+/)?.[0] || '0');
      if (character.attributes.WIS < attrRequired) {
        missing.push(`Sabedoria ${attrRequired} (atual: ${character.attributes.WIS})`);
      }
    } else if (prereq.includes('Carisma')) {
      const attrRequired = parseInt(prereq.match(/\d+/)?.[0] || '0');
      if (character.attributes.CHA < attrRequired) {
        missing.push(`Carisma ${attrRequired} (atual: ${character.attributes.CHA})`);
      }
    } else if (prereq.includes('Proficiência')) {
      // Verificar se tem o feat de proficiência
      if (!character.feats.some(f => f.name.includes(prereq))) {
        missing.push(prereq);
      }
    } else {
      // Verificar feats pré-requisitos
      if (!character.feats.some(f => f.name === prereq)) {
        missing.push(prereq);
      }
    }
  });

  return { valid: missing.length === 0, missing };
}

export function validateTalentPrerequisites(
  talentName: string,
  character: Character
): { valid: boolean; missing: string[] } {
  const allClasses = character.classes.map(c => c.name);
  const talentsOfClass = getTalentsByClasses(allClasses);
  const talent = talentsOfClass.find(t => t.name === talentName);

  if (!talent) return { valid: false, missing: ['Talento não encontrado para esta classe'] };

  if (!talent.prerequisites) return { valid: true, missing: [] };

  const missing: string[] = [];

  talent.prerequisites.forEach(prereq => {
    if (!character.talents.some(t => t.name === prereq)) {
      missing.push(prereq);
    }
  });

  return { valid: missing.length === 0, missing };
}

export function validateForcePowerPrerequisites(
  powerId: string,
  character: Character
): { valid: boolean; missing: string[] } {
  const allPowers = [
    ...getForcePowersBySide('light'),
    ...getForcePowersBySide('dark'),
    ...getForcePowersBySide('universal'),
  ];
  const power = allPowers.find(p => p.id === powerId);

  if (!power) return { valid: false, missing: ['Poder da Força não encontrado'] };

  if (!power.prerequisites) return { valid: true, missing: [] };

  const missing: string[] = [];

  power.prerequisites.forEach(prereq => {
    if (prereq.includes('Usar a Força')) {
      const required = parseInt(prereq.match(/\d+/)?.[0] || '0');
      const hasTrained = character.trainedSkills.includes('Usar a Força');
      const skillBonus = hasTrained ? 5 : 0;
      const chaMod = Math.floor((character.attributes.CHA - 10) / 2);
      const halfLevel = Math.floor(character.level / 2);
      const total = chaMod + halfLevel + skillBonus;

      if (total < required) {
        missing.push(`Usar a Força +${required} (atual: +${total})`);
      }
    } else if (prereq.includes('Mecânica')) {
      const required = parseInt(prereq.match(/\d+/)?.[0] || '0');
      const hasTrained = character.trainedSkills.includes('Mecânica');
      const skillBonus = hasTrained ? 5 : 0;
      const intMod = Math.floor((character.attributes.INT - 10) / 2);
      const halfLevel = Math.floor(character.level / 2);
      const total = intMod + halfLevel + skillBonus;

      if (total < required) {
        missing.push(`Mecânica +${required} (atual: +${total})`);
      }
    } else if (prereq.includes('Percepção')) {
      const required = parseInt(prereq.match(/\d+/)?.[0] || '0');
      const hasTrained = character.trainedSkills.includes('Percepção');
      const skillBonus = hasTrained ? 5 : 0;
      const wisMod = Math.floor((character.attributes.WIS - 10) / 2);
      const halfLevel = Math.floor(character.level / 2);
      const total = wisMod + halfLevel + skillBonus;

      if (total < required) {
        missing.push(`Percepção +${required} (atual: +${total})`);
      }
    }
  });

  return { valid: missing.length === 0, missing };
}

// ==================== FEATS DISPONÍVEIS ====================

export function getAvailableFeatsForCharacter(character: Character) {
  return featsCatalog.filter(feat => {
    // Não mostrar feats já possuídos
    if (character.feats.some(cf => cf.name === feat.name)) return false;

    // Verificar pré-requisitos
    const validation = validateFeatPrerequisites(feat.id, character);
    return validation.valid;
  });
}

// ==================== TALENTOS DISPONÍVEIS ====================

export function getAvailableTalentsForCharacter(character: Character) {
  const allClasses = character.classes.map(c => c.name);
  return getTalentsByClasses(allClasses).filter(talent => {
    // Não mostrar talentos já possuídos
    if (character.talents.some(ct => ct.name === talent.name)) return false;

    // Verificar pré-requisitos
    const validation = validateTalentPrerequisites(talent.name, character);
    return validation.valid;
  });
}

// ==================== PODERES DA FORÇA DISPONÍVEIS ====================

export function getAvailableForcePowersForCharacter(character: Character) {
  const allPowers = [
    ...getForcePowersBySide('light'),
    ...getForcePowersBySide('dark'),
    ...getForcePowersBySide('universal'),
  ];

  return allPowers.filter(power => {
    // Não mostrar poderes já possuídos
    if (character.forcePowers.some(fp => fp.name === power.name)) return false;

    // Verificar pré-requisitos
    const validation = validateForcePowerPrerequisites(power.id, character);
    return validation.valid;
  });
}

// ==================== CÁLCULO DE CARGA ====================

export function calculateEncumbrance(character: Character): {
  totalWeight: number;
  maxCapacity: number;
  lightLoad: number;
  heavyLoad: number;
  isEncumbered: boolean;
  isOverloaded: boolean;
} {
  // Calcular capacidade baseada na STR
  const strMod = Math.floor((character.attributes.STR - 10) / 2);
  const baseCapacity = 100 + (strMod * 10);

  // Calcular peso total do inventário
  const totalWeight = character.inventory.reduce(
    (total, item) => total + item.weight * item.quantity,
    0
  );

  // Adicionar peso de armas e armaduras
  const weaponsWeight = character.weapons.reduce(
    (total, weapon) => total + weapon.weight,
    0
  );
  const armorWeight = character.armor?.weight || 0;
  const totalWithEquipment = totalWeight + weaponsWeight + armorWeight;

  // Limites de carga
  const lightLoad = baseCapacity * 0.5;
  const heavyLoad = baseCapacity;

  return {
    totalWeight: totalWithEquipment,
    maxCapacity: baseCapacity,
    lightLoad,
    heavyLoad,
    isEncumbered: totalWithEquipment > lightLoad,
    isOverloaded: totalWithEquipment > heavyLoad,
  };
}

// ==================== CÁLCULO DE DEFESA COM ARMADURA ====================

export function calculateDefenseWithArmor(
  baseDefense: number,
  character: Character
): number {
  if (!character.armor) return baseDefense;

  const dexMod = Math.floor((character.attributes.DEX - 10) / 2);
  const maxDex = character.armor.maxDexBonus;
  const effectiveDex = Math.min(dexMod, maxDex);

  // Bônus de armadura = reflexBonus (simplificado)
  const armorBonus = character.armor.reflexBonus;

  return baseDefense + armorBonus + effectiveDex - baseDefense;
}

// ==================== GERAÇÃO DE IDs ÚNICOS ====================

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
