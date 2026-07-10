import type { ForceSide } from '../types';

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

// ==================== PODERES DA FORÇA - LUZ ====================

export const lightSidePowers: ForcePowerCatalog[] = [
  // Poderes Básicos
  {
    id: 'fp-force-communication',
    name: 'Comunicação Telepática',
    description: 'Comunicar pensamentos com outro ser sensível à Força.',
    dc: 10,
    cost: 1,
    side: 'light',
    effect: 'Comunicação bidirecional por 10 minutos.',
    duration: '10 minutos',
    range: '1km',
  },
  {
    id: 'fp-force-enhanced-mobility',
    name: 'Agilidade da Força',
    description: 'Aumentar velocidade e reflexos.',
    dc: 12,
    cost: 1,
    side: 'light',
    effect: '+2 DEX e +10 deslocamento por 5 rodadas.',
    duration: '5 rodadas',
  },
  {
    id: 'fp-force-healing',
    name: 'Cura pela Força',
    description: 'Canalizar a Força para curar ferimentos.',
    dc: 15,
    cost: 2,
    side: 'light',
    effect: 'Recuperar 2d6+mod de CHA de PV.',
    duration: 'Instantâneo',
  },
  {
    id: 'fp-force-jump',
    name: 'Salto da Força',
    description: 'Usar a Força para saltar distâncias sobre-humanas.',
    dc: 10,
    cost: 1,
    side: 'light',
    effect: 'Saltar até 10m de altura ou 15m de distância.',
    duration: 'Instantâneo',
  },
  {
    id: 'fp-force-push',
    name: 'Empurrão Telepático',
    description: 'Empurrar objetos ou seres com a mente.',
    dc: 12,
    cost: 1,
    side: 'light',
    effect: 'Empurrar 1 objeto (até 50kg) ou 1 ser (até 10m).',
    duration: 'Instantâneo',
    range: '10m',
  },
  {
    id: 'fp-force-pull',
    name: 'Puxão Telepático',
    description: 'Puxar objetos ou seres em sua direção.',
    dc: 12,
    cost: 1,
    side: 'light',
    effect: 'Puxar 1 objeto (até 50kg) ou 1 ser (até 10m).',
    duration: 'Instantâneo',
    range: '10m',
  },
  {
    id: 'fp-force-grab',
    name: 'Agarrar da Força',
    description: 'Segurar ou manipular objetos à distância.',
    dc: 14,
    cost: 2,
    side: 'light',
    effect: 'Controlar 1 objeto (até 100kg) por 5 rodadas.',
    duration: '5 rodadas',
    range: '15m',
  },
  {
    id: 'fp-force-sense',
    name: 'Sentir a Força',
    description: 'Detectar seres vivos e perigos próximos.',
    dc: 10,
    cost: 1,
    side: 'light',
    effect: 'Detectar seres vivos em 30m. +4 Percepção.',
    duration: '5 minutos',
  },
  {
    id: 'fp-force-protection',
    name: 'Proteção da Força',
    description: 'Criar campo de força defensivo.',
    dc: 15,
    cost: 2,
    side: 'light',
    effect: '+4 AC e +2 resistências por 5 rodadas.',
    duration: '5 rodadas',
  },
  {
    id: 'fp-force-speed',
    name: 'Velocidade da Força',
    description: 'Mover-se em velocidade sobre-humana.',
    dc: 14,
    cost: 2,
    side: 'light',
    effect: 'Dobrar deslocamento. Ataque extra.',
    duration: '3 rodadas',
  },

  // Poderes Intermediários
  {
    id: 'fp-force-levitation',
    name: 'Levitação',
    description: 'Flutuar no ar usando a Força.',
    dc: 15,
    cost: 2,
    side: 'light',
    effect: 'Voar lentamente (3m/rodada).',
    duration: '5 minutos',
  },
  {
    id: 'fp-force-mind-trick',
    name: 'Truque Mental',
    description: 'Influenciar a mente de um ser.',
    dc: 18,
    cost: 3,
    side: 'light',
    prerequisites: ['Usar a Força 12+'],
    effect: 'Controlar ações simples de 1 ser.',
    duration: '1 minuto',
    range: '10m',
  },
  {
    id: 'fp-force-clarity',
    name: 'Clareza da Força',
    description: 'Expandir percepção e consciência.',
    dc: 14,
    cost: 2,
    side: 'light',
    effect: '+6 Percepção e +4 Iniciativa.',
    duration: '10 minutos',
  },
  {
    id: 'fp-force-augmentation',
    name: 'Aumento da Força',
    description: 'Aumentar atributos físicos.',
    dc: 16,
    cost: 3,
    side: 'light',
    effect: '+4 a 2 atributos à escolha.',
    duration: '5 minutos',
  },
  {
    id: 'fp-force-repulsion',
    name: 'Repulsão',
    description: 'Empurrar todos os seres ao redor.',
    dc: 18,
    cost: 3,
    side: 'light',
    effect: 'Empurrar todos em 5m. Queda ou atordoamento.',
    duration: 'Instantâneo',
  },
  {
    id: 'fp-force-blinding',
    name: 'Ofuscar',
    description: 'Cegar um ser temporariamente.',
    dc: 14,
    cost: 2,
    side: 'light',
    effect: 'Cegar 1 ser por 1d4 rodadas.',
    duration: '1d4 rodadas',
    range: '10m',
  },

  // Poderes Avançados
  {
    id: 'fp-force-mind-scan',
    name: 'Escaneamento Mental',
    description: 'Ler pensamentos superficiais.',
    dc: 20,
    cost: 4,
    side: 'light',
    prerequisites: ['Usar a Força 15+'],
    effect: 'Ler pensamentos de 1 ser por 10 minutos.',
    duration: '10 minutos',
    range: '5m',
  },
  {
    id: 'fp-force-life-detection',
    name: 'Detecção de Vida',
    description: 'Detectar todos os seres vivos em grande área.',
    dc: 18,
    cost: 3,
    side: 'light',
    effect: 'Mapear todos os seres vivos em 100m.',
    duration: '1 minuto',
  },
  {
    id: 'fp-force-telekinesis-mastery',
    name: 'Telecinese Superior',
    description: 'Mover objetos pesados com precisão.',
    dc: 22,
    cost: 4,
    side: 'light',
    prerequisites: ['Usar a Força 18+'],
    effect: 'Mover até 500kg. Ataque com objetos.',
    duration: '5 rodadas',
    range: '20m',
  },
  {
    id: 'fp-force-healing-mastery',
    name: 'Cura Superior',
    description: 'Curar ferimentos graves e doenças.',
    dc: 22,
    cost: 5,
    side: 'light',
    prerequisites: ['Usar a Força 18+'],
    effect: 'Curar 6d6+mod de CHA de PV. Remover doenças.',
    duration: 'Instantâneo',
  },
  {
    id: 'fp-force-presence',
    name: 'Presença da Força',
    description: 'Exalar poder da Força para intimidar.',
    dc: 20,
    cost: 4,
    side: 'light',
    prerequisites: ['Usar a Força 15+'],
    effect: 'Inimigos em 10m fazem -2 nos ataques.',
    duration: '5 rodadas',
  },
];

// ==================== PODERES DA FORÇA - ESCURIDÃO ====================

export const darkSidePowers: ForcePowerCatalog[] = [
  // Poderes Básicos
  {
    id: 'fp-force-choke',
    name: 'Estrangulamento',
    description: 'Estrangular um ser com a Força.',
    dc: 15,
    cost: 2,
    side: 'dark',
    prerequisites: ['Usar a Força 8+'],
    effect: 'Estrangular 1 ser. 1d6 dano por rodada.',
    duration: 'Até soltar',
    range: '10m',
  },
  {
    id: 'fp-force-scream',
    name: 'Grito da Força',
    description: 'Projetar terror através da Força.',
    dc: 14,
    cost: 2,
    side: 'dark',
    effect: 'Assustar todos em 10m (DC 15).',
    duration: '1d4 rodadas',
  },
  {
    id: 'fp-force-rage',
    name: 'Fúria da Força',
    description: 'Canalizar raiva em poder.',
    dc: 12,
    cost: 1,
    side: 'dark',
    effect: '+4 STR, -2 AC, +2d6 dano.',
    duration: '5 rodadas',
  },
  {
    id: 'fp-force-lightning',
    name: 'Relâmpago da Força',
    description: 'Lançar raios de energia sombria.',
    dc: 18,
    cost: 3,
    side: 'dark',
    prerequisites: ['Usar a Força 12+'],
    effect: '4d6 dano elétrico em cone.',
    duration: 'Instantâneo',
    range: '15m',
  },
  {
    id: 'fp-force-death',
    name: 'Toque da Morte',
    description: 'Drenar a vida de um ser.',
    dc: 22,
    cost: 5,
    side: 'dark',
    prerequisites: ['Usar a Força 18+'],
    effect: '8d6 dano. DC 20 ou morre.',
    duration: 'Instantâneo',
    range: 'Toque',
  },
  {
    id: 'fp-force-fear',
    name: 'Medo da Força',
    description: 'Infundir medo paralisante.',
    dc: 14,
    cost: 2,
    side: 'dark',
    effect: '1 ser fica paralisado de medo.',
    duration: '1d4 rodadas',
    range: '10m',
  },
  {
    id: 'fp-force-hate',
    name: 'Ódio da Força',
    description: 'Alimentar-se de ódio para ganhar poder.',
    dc: 12,
    cost: 1,
    side: 'dark',
    effect: '+2 a todos os ataques e dano.',
    duration: '5 rodadas',
  },
  {
    id: 'fp-force-drain',
    name: 'Drenagem da Força',
    description: 'Drenar Force Points de outro ser.',
    dc: 18,
    cost: 3,
    side: 'dark',
    prerequisites: ['Usar a Força 12+'],
    effect: 'Drenar 2d6 FP do alvo.',
    duration: 'Instantâneo',
    range: '10m',
  },
  {
    id: 'fp-force-corruption',
    name: 'Corrupção',
    description: 'Corromper a mente de um ser.',
    dc: 20,
    cost: 4,
    side: 'dark',
    prerequisites: ['Usar a Força 15+'],
    effect: 'Tornar 1 ser hostil por 1 hora.',
    duration: '1 hora',
    range: '5m',
  },
  {
    id: 'fp-force-dominate',
    name: 'Dominação',
    description: 'Controlar totalmente a mente.',
    dc: 22,
    cost: 5,
    side: 'dark',
    prerequisites: ['Usar a Força 18+'],
    effect: 'Controlar ações de 1 ser.',
    duration: '10 minutos',
    range: '5m',
  },

  // Poderes Intermediários
  {
    id: 'fp-force-dark-presence',
    name: 'Presença Sombria',
    description: 'Exalar energia sombria.',
    dc: 16,
    cost: 3,
    side: 'dark',
    effect: 'Todos em 10m fazem -2 nos testes.',
    duration: '5 rodadas',
  },
  {
    id: 'fp-force-sith-alchemy',
    name: 'Alquimia Sith',
    description: 'Corromper materiais com a Força.',
    dc: 20,
    cost: 4,
    side: 'dark',
    prerequisites: ['Mecânica 10+'],
    effect: 'Criar item sombrio (+2 dano).',
    duration: 'Permanente',
  },
  {
    id: 'fp-force-force-imbue',
    name: 'Imbuir na Força',
    description: 'Carregar objeto com energia sombria.',
    dc: 18,
    cost: 3,
    side: 'dark',
    effect: 'Arma causa +2d6 dano sombrio.',
    duration: '10 minutos',
  },
  {
    id: 'fp-force-death-field',
    name: 'Campo da Morte',
    description: 'Drenar vida de todos ao redor.',
    dc: 22,
    cost: 5,
    side: 'dark',
    prerequisites: ['Usar a Força 18+'],
    effect: 'Drenar 2d6 PV de todos em 10m.',
    duration: 'Instantâneo',
  },
  {
    id: 'fp-force-obliterate',
    name: 'Obliterar',
    description: 'Destruir matéria com a Força.',
    dc: 24,
    cost: 6,
    side: 'dark',
    prerequisites: ['Usar a Força 20+'],
    effect: 'Destruir 1 objeto (até 100kg).',
    duration: 'Instantâneo',
    range: '15m',
  },
];

// ==================== PODERES DA FORÇA - UNIVERSAL ====================

export const universalPowers: ForcePowerCatalog[] = [
  {
    id: 'fp-force-precognition',
    name: 'Premonição',
    description: 'Sentir eventos futuros.',
    dc: 12,
    cost: 1,
    side: 'universal',
    effect: '+4 Iniciativa e resistências.',
    duration: '5 minutos',
  },
  {
    id: 'fp-force-telepathy',
    name: 'Telepatia',
    description: 'Ler pensamentos superficiais.',
    dc: 14,
    cost: 2,
    side: 'universal',
    effect: 'Ler pensamentos de 1 ser.',
    duration: '1 minuto',
    range: '10m',
  },
  {
    id: 'fp-force-sense-danger',
    name: 'Sentir Perigo',
    description: 'Perceber ameaças iminentes.',
    dc: 10,
    cost: 1,
    side: 'universal',
    effect: '+6 Percepção contra emboscadas.',
    duration: '1 hora',
  },
  {
    id: 'fp-force-astrotech',
    name: 'Astrotécnico',
    description: 'Sentir o estado de máquinas e naves.',
    dc: 14,
    cost: 2,
    side: 'universal',
    effect: '+5 Mecânica e Usar Computador.',
    duration: '30 minutos',
  },
  {
    id: 'fp-force-comprehend',
    name: 'Compreensão',
    description: 'Entender qualquer idioma.',
    dc: 14,
    cost: 2,
    side: 'universal',
    effect: 'Falar e entender qualquer idioma.',
    duration: '10 minutos',
  },
  {
    id: 'fp-force-empathy',
    name: 'Empatia',
    description: 'Sentir emoções de outros seres.',
    dc: 12,
    cost: 1,
    side: 'universal',
    effect: 'Detectar emoções e intenções.',
    duration: '5 minutos',
    range: '10m',
  },
  {
    id: 'fp-force-enhance-ability',
    name: 'Aumentar Atributo',
    description: 'Aumentar 1 atributo temporariamente.',
    dc: 15,
    cost: 2,
    side: 'universal',
    effect: '+4 em 1 atributo.',
    duration: '5 minutos',
  },
  {
    id: 'fp-force-farsight',
    name: 'Visão Distante',
    description: 'Ver à distância.',
    dc: 14,
    cost: 2,
    side: 'universal',
    effect: 'Ver detalhes em 1km de distância.',
    duration: '1 minuto',
  },
  {
    id: 'fp-force-project-image',
    name: 'Projetar Imagem',
    description: 'Criar ilusão visual.',
    dc: 16,
    cost: 3,
    side: 'universal',
    effect: 'Criar imagem realista de 1 pessoa.',
    duration: '5 minutos',
  },
  {
    id: 'fp-force-phantom',
    name: 'Fenômeno',
    description: 'Criar ilusões sensoriais.',
    dc: 18,
    cost: 3,
    side: 'universal',
    effect: 'Enganar todos os sentidos.',
    duration: '10 minutos',
  },
];

// ==================== CATÁLOGO COMPLETO ====================

export const allForcePowersCatalog: ForcePowerCatalog[] = [
  ...lightSidePowers,
  ...darkSidePowers,
  ...universalPowers,
];

// ==================== FUNÇÕES UTILITÁRIAS ====================

export function getForcePowersBySide(side: ForceSide): ForcePowerCatalog[] {
  return allForcePowersCatalog.filter(power => power.side === side);
}

export function getForcePowerById(id: string): ForcePowerCatalog | undefined {
  return allForcePowersCatalog.find(power => power.id === id);
}

export function searchForcePowers(query: string): ForcePowerCatalog[] {
  const lowerQuery = query.toLowerCase();
  return allForcePowersCatalog.filter(
    power =>
      power.name.toLowerCase().includes(lowerQuery) ||
      power.description.toLowerCase().includes(lowerQuery)
  );
}

export function getAvailableForcePowers(
  skillLevel: number,
  characterPowers: string[]
): ForcePowerCatalog[] {
  return allForcePowersCatalog.filter(power => {
    // Não mostrar poderes já possuídos
    if (characterPowers.some(cp => cp === power.name)) return false;

    // Verificar pré-requisitos de skill
    if (power.prerequisites) {
      return power.prerequisites.every(prereq => {
        if (prereq.includes('Usar a Força')) {
          const required = parseInt(prereq.match(/\d+/)?.[0] || '0');
          return skillLevel >= required;
        }
        return true;
      });
    }

    return true;
  });
}

export function calculateForceDC(
  chaModifier: number,
  halfLevel: number,
  trained: boolean,
  baseDC: number
): number {
  return baseDC + chaModifier + halfLevel + (trained ? 5 : 0);
}
