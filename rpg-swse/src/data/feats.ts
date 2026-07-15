import type { HeroicClass } from '../types';

export interface FeatCatalogItem {
  id: string;
  name: string;
  description: string;
  prerequisites?: string[];
  classRestriction?: HeroicClass[];
  type: 'general' | 'combat' | 'force' | 'skill' | 'species';
}

// ==================== FEATS GERAIS ====================

export const featsCatalog: FeatCatalogItem[] = [
  // Feats de Combat
  {
    id: 'feat-weapon-finesse',
    name: 'Acuidade com Arma',
    description: 'Use DEX em vez de STR para ataques corpo-a-corpo com armas leves.',
    prerequisites: ['BAB +1'],
    type: 'combat',
  },
  {
    id: 'feat-power-attack',
    name: 'Ataque Poderoso',
    description: 'Subtraia -5 do ataque para adicionar +10 no dano.',
    prerequisites: ['BAB +1'],
    type: 'combat',
  },
  {
    id: 'feat-cleave',
    name: 'Derrubar',
    description: 'Após derrubar um oponente, faz um ataque extra contra adjacente.',
    prerequisites: ['Força 13', 'Ataque Poderoso'],
    type: 'combat',
  },
  {
    id: 'feat-great-cleave',
    name: 'Derrubar Maior',
    description: 'Derrubar sem limite de alvos por turno.',
    prerequisites: ['BAB +4', 'Força 13', 'Derrubar'],
    type: 'combat',
  },
  {
    id: 'feat-dodge',
    name: 'Esquiva',
    description: 'Escolha um oponente. +1 AC contra ele.',
    prerequisites: ['Destreza 13'],
    type: 'combat',
  },
  {
    id: 'feat-mobility',
    name: 'Mobilidade',
    description: '+4 AC contra ataques de oportunidade ao se mover.',
    prerequisites: ['Esquiva'],
    type: 'combat',
  },
  {
    id: 'feat-shot-on-the-run',
    name: 'Disparar em Movimento',
    description: 'Atira e se move no mesmo turno sem penalidade.',
    prerequisites: ['Mobilidade', 'BAB +4'],
    type: 'combat',
  },
  {
    id: 'feat-spring-attack',
    name: 'Ataque Relâmpago',
    description: 'Ataca e recua no mesmo turno sem ataques de oportunidade.',
    prerequisites: ['Mobilidade', 'BAB +4'],
    type: 'combat',
  },
  {
    id: 'feat-toughness',
    name: 'Resistência',
    description: '+1 PV por nível. +3 PV no 1° nível.',
    type: 'combat',
  },
  {
    id: 'feat-improved-initiative',
    name: 'Iniciativa Melhorada',
    description: '+4 nos testes de Iniciativa.',
    type: 'combat',
  },
  {
    id: 'feat-lightning-reflexes',
    name: 'Reflexos de Relâmpago',
    description: '+2 nos testes de Iniciativa. +1 AC.',
    prerequisites: ['Destreza 13'],
    type: 'combat',
  },
  {
    id: 'feat-weapon-focus',
    name: 'Foco em Arma',
    description: '+1 nos ataques com uma arma específica.',
    prerequisites: ['BAB +1'],
    type: 'combat',
  },
  {
    id: 'feat-weapon-specialization',
    name: 'Especialização em Arma',
    description: '+2 no dano com uma arma específica.',
    prerequisites: ['BAB +4', 'Foco em Arma'],
    type: 'combat',
  },
  {
    id: 'feat-point-blank-shot',
    name: 'Tiro a Queima-Roupa',
    description: '+1 AC e +1 dano a 3m ou menos.',
    type: 'combat',
  },
  {
    id: 'feat-precise-shot',
    name: 'Tiro Preciso',
    description: 'Atira em oponentes em combate corpo-a-corpo sem penalidade.',
    prerequisites: ['Tiro a Queima-Roupa'],
    type: 'combat',
  },
  {
    id: 'feat-rapid-shot',
    name: 'Tiro Rápido',
    description: '-2 AC para um ataque extra por turno com armas de disparo.',
    prerequisites: ['BAB +1', 'Destreza 13'],
    type: 'combat',
  },
  {
    id: 'feat-many-shot',
    name: 'Tiro Múltiplo',
    description: 'Dispara 2 projéteis simultaneamente com arco/blaster.',
    prerequisites: ['BAB +6', 'Destreza 17', 'Tiro Rápido'],
    type: 'combat',
  },
  {
    id: 'feat-two-weapon-fighting',
    name: 'Luta com Duas Armas',
    description: 'Reduz penalidade de duas armas para -2/-2.',
    prerequisites: ['Destreza 15'],
    type: 'combat',
  },
  {
    id: 'feat-improved-two-weapon',
    name: 'Luta com Duas Armas Melhorada',
    description: 'Reduz penalidade para -5/-5.',
    prerequisites: ['BAB +9', 'Luta com Duas Armas'],
    type: 'combat',
  },
  {
    id: 'feat-double-bladed',
    name: 'Lâmina Dupla',
    description: 'Treinamento com armas de lâmina dupla (sabre duplo).',
    prerequisites: ['BAB +1'],
    type: 'combat',
  },
  {
    id: 'feat-ambidextrous',
    name: 'Ambidestro',
    description: 'Usa a mão não-dominante sem penalidade.',
    type: 'combat',
  },
  {
    id: 'feat-natural-leader',
    name: 'Líder Nato',
    description: 'Concede +1 em jogadas de ataque a aliados adjacentes.',
    type: 'general',
  },
  {
    id: 'feat-lucky',
    name: 'Sorte do Tolo',
    description: 'Uma vez por cena, você pode rerolar um teste de ataque, perícia ou resistência que acabou de fazer. Deve aceitar o segundo resultado.',
    type: 'general',
  },
  {
    id: 'feat-armor-proficiency-light',
    name: 'Proficiência em Armadura Leve',
    description: 'Pode usar armaduras leves sem penalidade.',
    type: 'combat',
  },
  {
    id: 'feat-armor-proficiency-medium',
    name: 'Proficiência em Armadura Média',
    description: 'Pode usar armaduras médias sem penalidade.',
    prerequisites: ['Proficiência em Armadura Leve'],
    type: 'combat',
  },
  {
    id: 'feat-armor-proficiency-heavy',
    name: 'Proficiência em Armadura Pesada',
    description: 'Pode usar armaduras pesadas sem penalidade.',
    prerequisites: ['Proficiência em Armadura Média'],
    type: 'combat',
  },
  {
    id: 'feat-shield-proficiency',
    name: 'Proficiência em Escudo',
    description: 'Pode usar escudos sem penalidade.',
    type: 'combat',
  },

  // Feats de Perícia
  {
    id: 'feat-skill-focus',
    name: 'Foco em Perícia',
    description: '+3 em uma perícia específica.',
    type: 'skill',
  },
  {
    id: 'feat-acrobatic',
    name: 'Acrobático',
    description: '+2 Acrobacia e +2 Escalar.',
    type: 'skill',
  },
  {
    id: 'feat-athletic',
    name: 'Atlético',
    description: '+2 Escalar e +2 Nadar.',
    type: 'skill',
  },
  {
    id: 'feat-deceitful',
    name: 'Enganador',
    description: '+2 Enganação e +2 Furtividade.',
    type: 'skill',
  },
  {
    id: 'feat-nimble',
    name: 'Ágil',
    description: '+2 Acrobacia e +2 Piloto.',
    type: 'skill',
  },
  {
    id: 'feat-techie',
    name: 'Técnico',
    description: '+2 Mecânica e +2 Usar Computador.',
    type: 'skill',
  },
  {
    id: 'feat-stealthy',
    name: 'Furtivo',
    description: '+2 Furtividade e +2 Obter Informação.',
    type: 'skill',
  },
  {
    id: 'feat-persuasive',
    name: 'Persuasivo',
    description: '+2 Persuasão e +2 Intimidação.',
    type: 'skill',
  },
  {
    id: 'feat-naturalistic',
    name: 'Naturalista',
    description: '+2 Sobrevivência e +2 Percepção.',
    type: 'skill',
  },

  // Feats de Força
  {
    id: 'feat-force-sensitivity',
    name: 'Sensibilidade à Força',
    description: 'Pode sentir a Força. +2 em Usar a Força.',
    type: 'force',
  },
  {
    id: 'feat-force-training',
    name: 'Treinamento na Força',
    description: 'Concede 3 poderes da Força.',
    prerequisites: ['Sensibilidade à Força'],
    type: 'force',
  },
  {
    id: 'feat-force-crew',
    name: 'Poder da Força: Triagem',
    description: 'Permite usar a Força para reparos rápidos.',
    prerequisites: ['Sensibilidade à Força', 'Mecânica 4+'],
    type: 'force',
  },
  {
    id: 'feat-jump',
    name: 'Poder da Força: Salto',
    description: 'Use a Força para saltar distâncias sobre-humanas.',
    prerequisites: ['Sensibilidade à Força', 'Usar a Força 8+'],
    type: 'force',
  },
  {
    id: 'feat-force-hunt',
    name: 'Poder da Força: Caçada',
    description: 'Detectar seres vivos através da Força.',
    prerequisites: ['Sensibilidade à Força', 'Usar a Força 12+'],
    type: 'force',
  },
  {
    id: 'feat-force-throw',
    name: 'Poder da Força: Telecinese',
    description: 'Mover objetos à distância com a mente.',
    prerequisites: ['Sensibilidade à Força', 'Usar a Força 15+'],
    type: 'force',
  },
  {
    id: 'feat-force-communication',
    name: 'Poder da Força: Comunicação',
    description: 'Comunicar telepaticamente com outros seres sensíveis.',
    prerequisites: ['Sensibilidade à Força', 'Usar a Força 18+'],
    type: 'force',
  },

  // Feats de Espécie (concedidos)
  {
    id: 'feat-bonus-feat-human',
    name: 'Talento Bônus Humano',
    description: 'Humano receba um talento extra de qualquer tipo.',
    type: 'species',
  },
  {
    id: 'feat-fury-wookiee',
    name: 'Fúria Wookiee',
    description: 'Wookiee entra em fúria quando com menos de 1/4 PV.',
    type: 'species',
  },
  {
    id: 'feat-darkvision',
    name: 'Visão Nocturna',
    description: 'Enxerga em escuridão total até 10m.',
    type: 'species',
  },
  {
    id: 'feat-heightened-awareness',
    name: 'Percepção Aprimorada',
    description: '+2 Percepção. Não pode ser surpreendido.',
    type: 'species',
  },
  {
    id: 'feat-natural-armor',
    name: 'Armadura Natural',
    description: '+2 AC natural.',
    type: 'species',
  },
];

// ==================== FUNÇÕES UTILITÁRIAS ====================

export function getFeatsByType(type: FeatCatalogItem['type']): FeatCatalogItem[] {
  return featsCatalog.filter(feat => feat.type === type);
}

export function getFeatById(id: string): FeatCatalogItem | undefined {
  return featsCatalog.find(feat => feat.id === id);
}

export function searchFeats(query: string): FeatCatalogItem[] {
  const lowerQuery = query.toLowerCase();
  return featsCatalog.filter(
    feat =>
      feat.name.toLowerCase().includes(lowerQuery) ||
      feat.description.toLowerCase().includes(lowerQuery)
  );
}

export function getAvailableFeats(
  characterLevel: number,
  characterFeats: string[],
  characterClass?: HeroicClass
): FeatCatalogItem[] {
  return featsCatalog.filter(feat => {
    // Não mostrar feats já possuídos
    if (characterFeats.some(cf => cf === feat.name)) return false;

    // Verificar restrições de classe
    if (feat.classRestriction && characterClass) {
      if (!feat.classRestriction.includes(characterClass)) return false;
    }

    // Verificar pré-requisitos básicos (simplificado)
    if (feat.prerequisites) {
      return feat.prerequisites.every(prereq => {
        // Verificação básica de BAB
        if (prereq.includes('BAB')) {
          const babRequired = parseInt(prereq.match(/\d+/)?.[0] || '0');
          return characterLevel >= babRequired;
        }
        // Verificação de atributo
        const attrMatch = prereq.match(/(Força|Destreza|Constituição|Inteligência|Sabedoria|Carisma)\s*(\d+)/);
        if (attrMatch) {
          return true; // Simplificado - assumir que atende
        }
        // Outros pré-requisitos
        return true;
      });
    }

    return true;
  });
}
