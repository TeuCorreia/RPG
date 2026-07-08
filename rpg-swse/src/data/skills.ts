import type { SkillName, AttributeName, HeroicClass, ClassEntry } from '../types';

interface SkillData {
  name: SkillName;
  keyAbility: AttributeName;
  classFor: HeroicClass[];
  untrainedUse: boolean;
  description: string;
}

export const skillsData: SkillData[] = [
  {
    name: 'Acrobacia',
    keyAbility: 'DEX',
    classFor: ['Jedi', 'Vigarista'],
    untrainedUse: true,
    description: 'Equilibrar-se, dar cambalhotas e escapar de amarras.'
  },
  {
    name: 'Escalar',
    keyAbility: 'STR',
    classFor: ['Explorador', 'Soldado'],
    untrainedUse: true,
    description: 'Escalar superfícies, cordas e paredes.'
  },
  {
    name: 'Enganação',
    keyAbility: 'CHA',
    classFor: ['Nobre', 'Vigarista'],
    untrainedUse: true,
    description: 'Mentir, enganar e ludibriar outros.'
  },
  {
    name: 'Resistência',
    keyAbility: 'CON',
    classFor: ['Jedi', 'Explorador', 'Soldado'],
    untrainedUse: true,
    description: 'Resistir a fadiga, asfixia e condições adversas.'
  },
  {
    name: 'Obter Informação',
    keyAbility: 'CHA',
    classFor: ['Nobre', 'Vigarista'],
    untrainedUse: true,
    description: 'Coletar rumores locais e informações.'
  },
  {
    name: 'Iniciativa',
    keyAbility: 'DEX',
    classFor: ['Jedi', 'Nobre', 'Vigarista', 'Explorador', 'Soldado'],
    untrainedUse: true,
    description: 'Determinar a ordem de ações em combate.'
  },
  {
    name: 'Salto',
    keyAbility: 'STR',
    classFor: ['Jedi', 'Explorador', 'Soldado'],
    untrainedUse: true,
    description: 'Saltar sobre obstáculos e vãos.'
  },
  {
    name: 'Conhecimento',
    keyAbility: 'INT',
    classFor: ['Jedi', 'Nobre', 'Vigarista', 'Explorador', 'Soldado'],
    untrainedUse: true,
    description: 'Lembrar informações sobre campos específicos.'
  },
  {
    name: 'Mecânica',
    keyAbility: 'INT',
    classFor: ['Jedi', 'Vigarista', 'Explorador', 'Soldado'],
    untrainedUse: true,
    description: 'Reparar e desativar dispositivos e veículos.'
  },
  {
    name: 'Percepção',
    keyAbility: 'WIS',
    classFor: ['Jedi', 'Nobre', 'Vigarista', 'Explorador', 'Soldado'],
    untrainedUse: true,
    description: 'Notar objetos, criaturas ou detalhes ocultos.'
  },
  {
    name: 'Persuasão',
    keyAbility: 'CHA',
    classFor: ['Nobre', 'Vigarista'],
    untrainedUse: true,
    description: 'Convencer e influenciar outros.'
  },
  {
    name: 'Pilotagem',
    keyAbility: 'DEX',
    classFor: ['Jedi', 'Nobre', 'Vigarista', 'Explorador', 'Soldado'],
    untrainedUse: true,
    description: 'Pilotar e manobrar naves e veículos.'
  },
  {
    name: 'Montaria',
    keyAbility: 'DEX',
    classFor: ['Nobre', 'Explorador'],
    untrainedUse: true,
    description: 'Montar e controlar montarias.'
  },
  {
    name: 'Furtividade',
    keyAbility: 'DEX',
    classFor: ['Vigarista', 'Explorador'],
    untrainedUse: true,
    description: 'Mover-se silenciosamente e esconder-se.'
  },
  {
    name: 'Sobrevivência',
    keyAbility: 'WIS',
    classFor: ['Explorador'],
    untrainedUse: true,
    description: 'Rastrear, forragear e sobreviver em áreas selvagens.'
  },
  {
    name: 'Nadar',
    keyAbility: 'STR',
    classFor: ['Explorador', 'Soldado'],
    untrainedUse: true,
    description: 'Mover-se e manter-se flutuando na água.'
  },
  {
    name: 'Tratar Ferimentos',
    keyAbility: 'WIS',
    classFor: ['Nobre', 'Soldado'],
    untrainedUse: false,
    description: 'Prestar primeiros socorros e tratar ferimentos.'
  },
  {
    name: 'Usar Computador',
    keyAbility: 'INT',
    classFor: ['Nobre', 'Vigarista', 'Soldado'],
    untrainedUse: true,
    description: 'Acessar e manipular sistemas computacionais.'
  },
  {
    name: 'Usar a Força',
    keyAbility: 'CHA',
    classFor: ['Jedi'],
    untrainedUse: false,
    description: 'Canalizar e controlar a Força.'
  }
];

function getClassNames(classes: HeroicClass | ClassEntry[]): HeroicClass[] {
  if (Array.isArray(classes)) return classes.map(c => c.name);
  return [classes];
}

function classSkillFilter(skill: SkillName, classNames: HeroicClass[]): boolean {
  if (classNames.includes('Mundano')) return skill !== 'Usar a Força';
  return classNames.some(cn => skillsData.find(s => s.name === skill)?.classFor.includes(cn));
}

export function getClassSkills(classes: HeroicClass | ClassEntry[]): SkillName[] {
  const classNames = getClassNames(classes);
  if (classNames.includes('Mundano')) {
    return skillsData
      .filter(s => s.name !== 'Usar a Força')
      .map(s => s.name);
  }
  const result = new Set<SkillName>();
  for (const cn of classNames) {
    skillsData
      .filter(s => s.classFor.includes(cn))
      .forEach(s => result.add(s.name));
  }
  return Array.from(result);
}

export function isClassSkill(skill: SkillName, classes: HeroicClass | ClassEntry[]): boolean {
  const classNames = getClassNames(classes);
  return classSkillFilter(skill, classNames);
}

export function getSkillKeyAbility(skill: SkillName): AttributeName {
  return skillsData.find(s => s.name === skill)!.keyAbility;
}
