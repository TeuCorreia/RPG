import type { SkillName, AttributeName, HeroicClass } from '../types';

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

export function getClassSkills(heroicClass: HeroicClass): SkillName[] {
  return skillsData
    .filter(s => s.classFor.includes(heroicClass))
    .map(s => s.name);
}

export function getSkillKeyAbility(skill: SkillName): AttributeName {
  return skillsData.find(s => s.name === skill)!.keyAbility;
}
