import type { ClassData } from '../types';

export const classList: ClassData[] = [
  {
    name: 'Jedi',
    description: 'Os Jedi são os guardiões da paz e da justiça na galáxia, empunhando a Força e sabres de luz em defesa da República. São treinados desde jovens para dominar a Força e combater o lado sombrio.',
    keyAbilities: ['STR', 'DEX', 'CHA'],
    hpPerLevel: 8,
    defenseBonuses: { reflex: 1, fortitude: 1, will: 2 },
    trainedSkills: 3,
    classSkills: ['Acrobacia', 'Resistência', 'Iniciativa', 'Salto', 'Conhecimento', 'Mecânica', 'Percepção', 'Pilotagem', 'Usar a Força'],
    talentTrees: ['Cônsul Jedi', 'Guardião Jedi', 'Sentinela Jedi', 'Adepto da Força']
  },
  {
    name: 'Nobre',
    description: 'Nobres são líderes, diplomatas e comandantes que influenciam a galáxia através de sua inteligência, charme e perspicácia política. São mestres em obter o que desejam sem precisar levantar um sabre.',
    keyAbilities: ['INT', 'WIS', 'CHA'],
    hpPerLevel: 6,
    defenseBonuses: { reflex: 0, fortitude: 1, will: 2 },
    trainedSkills: 5,
    classSkills: ['Enganação', 'Obter Informação', 'Conhecimento', 'Percepção', 'Persuasão', 'Pilotagem', 'Montaria', 'Tratar Ferimentos', 'Usar Computador'],
    talentTrees: ['Influência', 'Liderança', 'Linhagem', 'Militar']
  },
  {
    name: 'Vigarista',
    description: 'Vigaristas são malandros, contrabandistas e trapaceiros que sobrevivem usando astúcia, sorte e lábia afiada. Sempre prontos para um jogo de cartas marcadas ou uma rota de fuga bem planejada.',
    keyAbilities: ['DEX', 'INT', 'CHA'],
    hpPerLevel: 6,
    defenseBonuses: { reflex: 2, fortitude: 0, will: 1 },
    trainedSkills: 5,
    classSkills: ['Enganação', 'Obter Informação', 'Iniciativa', 'Conhecimento', 'Mecânica', 'Percepção', 'Persuasão', 'Pilotagem', 'Furtividade', 'Usar Computador'],
    talentTrees: ['Sorte', 'Engenhoca', 'Sorte de Vigarista', 'Escaramuçador']
  },
  {
    name: 'Explorador',
    description: 'Exploradores são aventureiros e sobrevivencialistas, adeptos a navegar tanto por regiões selvagens quanto por ambientes urbanos perigosos. São os olhos e ouvidos de qualquer equipe.',
    keyAbilities: ['DEX', 'CON', 'WIS'],
    hpPerLevel: 8,
    defenseBonuses: { reflex: 2, fortitude: 1, will: 0 },
    trainedSkills: 4,
    classSkills: ['Escalar', 'Resistência', 'Iniciativa', 'Salto', 'Conhecimento', 'Mecânica', 'Percepção', 'Pilotagem', 'Montaria', 'Furtividade', 'Sobrevivência', 'Nadar'],
    talentTrees: ['Consciência', 'Brigão', 'Camuflagem', 'Passos Longos']
  },
  {
    name: 'Soldado',
    description: 'Soldados são guerreiros treinados, mestres em combate e tática, sejam como tropas de elite ou mercenários experientes. Especialistas em causar dano e sobreviver no campo de batalha.',
    keyAbilities: ['STR', 'DEX', 'CON'],
    hpPerLevel: 10,
    defenseBonuses: { reflex: 1, fortitude: 2, will: 0 },
    trainedSkills: 3,
    classSkills: ['Escalar', 'Resistência', 'Iniciativa', 'Salto', 'Conhecimento', 'Mecânica', 'Percepção', 'Pilotagem', 'Nadar', 'Usar Computador'],
    talentTrees: ['Armadura', 'Comando', 'Arma Pesada', 'Especialista em Armas']
  },
  {
    name: 'Mundano',
    description: 'Mundanos são pessoas comuns sem treinamento formal de combate ou habilidades excepcionais. Podem ser fazendeiros, mecânicos, comerciantes ou qualquer cidadão comum da galáxia. Sua força está na versatilidade — podem aprender qualquer perícia básica, mas jamais dominar a Força.',
    keyAbilities: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
    hpPerLevel: 4,
    defenseBonuses: { reflex: 0, fortitude: 0, will: 0 },
    trainedSkills: 4,
    classSkills: [
      'Acrobacia', 'Escalar', 'Enganação', 'Resistência',
      'Obter Informação', 'Iniciativa', 'Salto', 'Conhecimento',
      'Mecânica', 'Percepção', 'Persuasão', 'Pilotagem',
      'Montaria', 'Furtividade', 'Sobrevivência', 'Nadar',
      'Tratar Ferimentos', 'Usar Computador'
    ],
    talentTrees: ['Sobrevivente']
  }
];
