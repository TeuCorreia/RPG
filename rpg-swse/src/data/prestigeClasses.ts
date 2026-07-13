import type { Character } from '../types';

export interface PrestigePrerequisites {
  bab?: number;
  feats?: string[];
  talents?: string[];
  skills?: { name: string; minRank: number }[];
  forceSensitive?: boolean;
}

export interface PrestigeClassData {
  id: string;
  name: string;
  entryLevel: number;
  maxLevel: number;
  requirements: PrestigePrerequisites;
  description: string;
  benefits: string[];
  hpPerLevel: number;
  defenseBonuses: { reflex: number; fortitude: number; will: number };
  talentTrees: string[];
  icon: string;
}

export const prestigeClasses: PrestigeClassData[] = [
  {
    id: 'cavaleiro-jedi',
    name: 'Cavaleiro Jedi',
    entryLevel: 1,
    maxLevel: 10,
    requirements: {
      bab: 6,
      feats: ['Sensibilidade à Força'],
      talents: ['Bloqueio', 'Desvio'],
    },
    description: 'Especialização avançada nos caminhos da Força. O Cavaleiro Jedi é um guerreiro devotado que combina combate marcial com poder da Força, protegendo a galáxia com sabre de luz em mãos.',
    benefits: [
      '+1 em jogadas de ataque com sabres de luz por nível',
      'Ganha talentos de árvores Jedi',
      'Acesso a habilidades de Combate com a Força',
      'Progressão de BAB completa',
    ],
    hpPerLevel: 6,
    defenseBonuses: { reflex: 1, fortitude: 1, will: 1 },
    talentTrees: ['Guardião Jedi', 'Sentinela Jedi'],
    icon: 'local_fire_department',
  },
  {
    id: 'mestre-jedi',
    name: 'Mestre Jedi',
    entryLevel: 1,
    maxLevel: 10,
    requirements: {
      bab: 8,
      feats: ['Sensibilidade à Força', 'Treinamento na Força'],
      talents: ['Bloqueio', 'Desvio', 'Percepção da Força'],
    },
    description: 'Mestria absoluta nos caminhos Jedi. O Mestre Jedi é um guia espiritual e combatente lendário, cujo domínio da Força transcende os limites mortais.',
    benefits: [
      '+2 em testes de Usar a Força',
      'Pode usar poderes da Força sem gastar Pontos de Força (1/enc)',
      'Ganha talentos de todas as árvores Jedi',
      'Defesas aumentam em +1',
    ],
    hpPerLevel: 4,
    defenseBonuses: { reflex: 0, fortitude: 0, will: 2 },
    talentTrees: ['Adepto da Força', 'Cônsul Jedi'],
    icon: 'auto_stories',
  },
  {
    id: 'aprendiz-sith',
    name: 'Aprendiz Sith',
    entryLevel: 1,
    maxLevel: 10,
    requirements: {
      bab: 5,
      feats: ['Sensibilidade à Força'],
      talents: [],
      forceSensitive: true,
    },
    description: 'Iniciação nos segredos do Lado Sombrio. O Aprendiz Sith canaliza raiva e ódio para moldar a Força em armas de destruição, buscando poder a qualquer custo.',
    benefits: [
      '+1d6 de dano sombrio em ataques com a Força',
      'Ganha talentos de árvores Sith',
      'Pode usar Poderes da Força sombrios',
      'Resistência a efeitos mentais do Lado Sombrio',
    ],
    hpPerLevel: 6,
    defenseBonuses: { reflex: 1, fortitude: 1, will: 1 },
    talentTrees: ['Guardião Jedi', 'Adepto da Força'],
    icon: 'whatshot',
  },
  {
    id: 'tropa-elite',
    name: 'Tropa de Elite',
    entryLevel: 1,
    maxLevel: 10,
    requirements: {
      bab: 7,
      feats: ['Foco em Arma (qualquer)', 'Especialização em Arma'],
    },
    description: 'Força militar de elite com treinamento de combate superior. Membros de Tropa de Elite são os soldados mais mortais da galáxia, versáteis e implacáveis em qualquer campo de batalha.',
    benefits: [
      '+1 em jogadas de ataque por nível',
      '+1d6 de dano extra em todos os ataques',
      'Ganha talentos de árvores Soldado',
      'Imunidade a medo em combate',
    ],
    hpPerLevel: 8,
    defenseBonuses: { reflex: 1, fortitude: 1, will: 0 },
    talentTrees: ['Arma Pesada', 'Especialista em Armas'],
    icon: 'military_tech',
  },
  {
    id: 'oficial',
    name: 'Oficial',
    entryLevel: 1,
    maxLevel: 10,
    requirements: {
      bab: 3,
      feats: ['Líder Nato'],
      talents: ['Coordenar'],
    },
    description: 'Comandante tático que lidera tropas em batalha. O Oficial é um estrategista nato, capaz de coordenar esforços de combate e inspirar seus aliados a superarem seus limites.',
    benefits: [
      'Concede +1 em ataques e defesas para aliados (escala com nível)',
      'Pode dar ações extras a aliados 1/enc',
      'Ganha talentos de árvores Nobre',
      '+2 em Iniciativa',
    ],
    hpPerLevel: 6,
    defenseBonuses: { reflex: 0, fortitude: 0, will: 2 },
    talentTrees: ['Liderança', 'Militar'],
    icon: 'shield',
  },
  {
    id: 'senhor-crime',
    name: 'Senhor do Crime',
    entryLevel: 1,
    maxLevel: 10,
    requirements: {
      bab: 4,
      feats: ['Sorte do Tolo'],
      talents: ['Ataque Furtivo'],
      skills: [{ name: 'Enganação', minRank: 8 }],
    },
    description: 'Mestre do submundo do crime e da intimidação. O Senhor do Crime comanda impérios clandestinos com astúcia e força bruta, manipulando aliados e inimigos com igual maestria.',
    benefits: [
      '+1d6 de dano em Ataque Furtivo por 3 níveis',
      'Pode intimar oponentes como ação de movimento',
      'Ganha talentos de árvores Vigarista',
      '+2 em Enganação e Persuasão',
    ],
    hpPerLevel: 6,
    defenseBonuses: { reflex: 2, fortitude: 0, will: 0 },
    talentTrees: ['Escaramuçador', 'Sorte'],
    icon: 'payments',
  },
];

export function getPrestigeClassById(id: string): PrestigeClassData | undefined {
  return prestigeClasses.find(pc => pc.id === id);
}

export function validatePrestigePrerequisites(
  prestige: PrestigeClassData,
  character: Character
): { eligible: boolean; missing: string[] } {
  const missing: string[] = [];
  const req = prestige.requirements;

  if (req.bab !== undefined) {
    const currentBab = character.level;
    if (currentBab < req.bab) {
      missing.push(`BAB +${req.bab} (atual: +${currentBab})`);
    }
  }

  if (req.feats) {
    for (const featName of req.feats) {
      if (!character.feats.some(f => f.name === featName)) {
        missing.push(`Feat: ${featName}`);
      }
    }
  }

  if (req.talents) {
    for (const talentName of req.talents) {
      if (!character.talents.some(t => t.name === talentName)) {
        missing.push(`Talento: ${talentName}`);
      }
    }
  }

  if (req.skills) {
    for (const skillReq of req.skills) {
      const isTrained = character.trainedSkills.includes(skillReq.name as any);
      const skillBonus = isTrained ? 5 : 0;
      const keyAbilityMap: Record<string, keyof Character['attributes']> = {
        'Enganação': 'CHA',
        'Persuasão': 'CHA',
        'Percepção': 'WIS',
        'Mecânica': 'INT',
        'Usar a Força': 'CHA',
        'Furtividade': 'DEX',
        'Acrobacia': 'DEX',
        'Iniciativa': 'DEX',
        'Escalar': 'STR',
        'Salto': 'STR',
        'Pilotagem': 'DEX',
        'Montaria': 'CHA',
        'Resistência': 'CON',
        'Sobrevivência': 'WIS',
        'Nadar': 'CON',
        'Tratar Ferimentos': 'WIS',
        'Usar Computador': 'INT',
        'Conhecimento': 'INT',
        'Obter Informação': 'CHA',
      };
      const attrKey = keyAbilityMap[skillReq.name];
      const attrMod = attrKey ? Math.floor((character.attributes[attrKey] - 10) / 2) : 0;
      const halfLevel = Math.floor(character.level / 2);
      const total = halfLevel + attrMod + skillBonus;

      if (total < skillReq.minRank) {
        missing.push(`${skillReq.name} +${skillReq.minRank} (atual: +${total})`);
      }
    }
  }

  if (req.forceSensitive) {
    if (!character.feats.some(f => f.name === 'Sensibilidade à Força')) {
      missing.push('Sensibilidade à Força (feat)');
    }
  }

  return { eligible: missing.length === 0, missing };
}
