import type { HeroicClass } from '../types';

export interface TalentCatalogItem {
  id: string;
  name: string;
  description: string;
  tree: string;
  class: HeroicClass;
  prerequisites?: string[];
  order: number; // posição na árvore
}

// ==================== JEDI - Árvores de Talentos ====================

export const jediTalents: TalentCatalogItem[] = [
  // Guardião Jedi
  {
    id: 'talent-block',
    name: 'Bloqueio',
    description: 'Use sua arma para bloquear ataques corpo-a-corpo.',
    tree: 'Guardião Jedi',
    class: 'Jedi',
    order: 1,
  },
  {
    id: 'talent-deflect',
    name: 'Desvio',
    description: 'Desvie tiros de blaster com sua arma.',
    tree: 'Guardião Jedi',
    class: 'Jedi',
    prerequisites: ['Bloqueio'],
    order: 2,
  },
  {
    id: 'talent-weapon-specialization',
    name: 'Especialização em Arma',
    description: '+1 dano com sabres de luz.',
    tree: 'Guardião Jedi',
    class: 'Jedi',
    prerequisites: ['Desvio'],
    order: 3,
  },

  // Consul Jedi
  {
    id: 'talent-insight',
    name: 'Insight',
    description: '+2 Percepção e Intuição.',
    tree: 'Consul Jedi',
    class: 'Jedi',
    order: 1,
  },
  {
    id: 'talent-force-aura',
    name: 'Aura da Força',
    description: 'Sentir presenças e emoções em 10m.',
    tree: 'Consul Jedi',
    class: 'Jedi',
    prerequisites: ['Insight'],
    order: 2,
  },
  {
    id: 'talent-force-mastery',
    name: 'Maestria na Força',
    description: 'Bônus de +5 em testes de Usar a Força.',
    tree: 'Consul Jedi',
    class: 'Jedi',
    prerequisites: ['Aura da Força'],
    order: 3,
  },

  // Sentinela Jedi
  {
    id: 'talent-jedi-Espionage',
    name: 'Espionagem Jedi',
    description: '+2 Furtividade e Enganação.',
    tree: 'Sentinela Jedi',
    class: 'Jedi',
    order: 1,
  },
  {
    id: 'talent-jedi-Sense-Deception',
    name: 'Sentir Engano',
    description: 'Detectar mentiras automaticamente.',
    tree: 'Sentinela Jedi',
    class: 'Jedi',
    prerequisites: ['Espionagem Jedi'],
    order: 2,
  },
  {
    id: 'talent-jedi-Mind-Trick',
    name: 'Truque Mental',
    description: 'Usar a Força para influenciar mentes.',
    tree: 'Sentinela Jedi',
    class: 'Jedi',
    prerequisites: ['Sentir Engano'],
    order: 3,
  },

  // Adepto da Força
  {
    id: 'talent-force-Bond',
    name: 'Vínculo da Força',
    description: 'Criar conexão telepática com aliados.',
    tree: 'Adepto da Força',
    class: 'Jedi',
    order: 1,
  },
  {
    id: 'talent-force-Healing',
    name: 'Cura pela Força',
    description: 'Curar 1d6+mod de CHA de PV.',
    tree: 'Adepto da Força',
    class: 'Jedi',
    prerequisites: ['Vínculo da Força'],
    order: 2,
  },
  {
    id: 'talent-force-Resurrection',
    name: 'Ressurreição',
    description: 'Reviver um aliado falecido.',
    tree: 'Adepto da Força',
    class: 'Jedi',
    prerequisites: ['Cura pela Força'],
    order: 3,
  },
];

// ==================== NOBRE - Árvores de Talentos ====================

export const nobreTalents: TalentCatalogItem[] = [
  // Influência
  {
    id: 'talent-commanding-voice',
    name: 'Voz Comandante',
    description: '+2 Persuasão e Intimidação.',
    tree: 'Influência',
    class: 'Nobre',
    order: 1,
  },
  {
    id: 'talent-lead',
    name: 'Coordenar',
    description: 'Conceder +1 atestes de aliados adjacêntes.',
    tree: 'Influência',
    class: 'Nobre',
    prerequisites: ['Voz Comandante'],
    order: 2,
  },
  {
    id: 'talent-rally',
    name: 'Motivar',
    description: 'Aliados recuperam 1d6 PV.',
    tree: 'Influência',
    class: 'Nobre',
    prerequisites: ['Liderar'],
    order: 3,
  },

  // Liderança
  {
    id: 'talent-inspire-confidence',
    name: 'Inspirar Confiança',
    description: '+2 nos testes de resistência dos aliados.',
    tree: 'Liderança',
    class: 'Nobre',
    order: 1,
  },
  {
    id: 'talent-rally-the-troops',
    name: 'Reunir Tropas',
    description: 'Aliados recuperem PV e removem condições.',
    tree: 'Liderança',
    class: 'Nobre',
    prerequisites: ['Inspirar Confiança'],
    order: 2,
  },
  {
    id: 'talent-inspire-greatness',
    name: 'Inspirar Grandeza',
    description: '+4 atestes de aliados contra medo.',
    tree: 'Liderança',
    class: 'Nobre',
    prerequisites: ['Reunir Tropas'],
    order: 3,
  },

  // Linhagem
  {
    id: 'talent-wealth',
    name: 'Riqueza',
    description: 'Dobrar renda mensal. +500 Cr iniciais.',
    tree: 'Linhagem',
    class: 'Nobre',
    order: 1,
  },
  {
    id: 'talent-connecti0ns',
    name: 'Conexões',
    description: 'Contatos em 3 cidades. +5 Obter Informação.',
    tree: 'Linhagem',
    class: 'Nobre',
    prerequisites: ['Riqueza'],
    order: 2,
  },
  {
    id: 'talent-deniability',
    name: 'Negação',
    description: 'Imunidade a investigações. +10 Enganação.',
    tree: 'Linhagem',
    class: 'Nobre',
    prerequisites: ['Conexões'],
    order: 3,
  },

  // Militar
  {
    id: 'talent-tactical-Expertise',
    name: 'Expertise Tática',
    description: '+2 Ataque e +2 AC quando em posição defensiva.',
    tree: 'Militar',
    class: 'Nobre',
    order: 1,
  },
  {
    id: 'talent-battle-Meditation',
    name: 'Meditação de Batalha',
    description: 'Conceder +1 a ataque de aliados em 10m.',
    tree: 'Militar',
    class: 'Nobre',
    prerequisites: ['Expertise Tática'],
    order: 2,
  },
  {
    id: 'talent-force-Deition',
    name: 'Decisão de Força',
    description: 'Ignorar um erro crítico uma vez por cena.',
    tree: 'Militar',
    class: 'Nobre',
    prerequisites: ['Meditação de Batalha'],
    order: 3,
  },
];

// ==================== VIGARISTA - Árvores de Talentos ====================

export const vigaristaTalents: TalentCatalogItem[] = [
  // Sorte
  {
    id: 'talent-junk-Rider',
    name: 'Junk Rider',
    description: '+2 Mecânica para improvisar armadilhas.',
    tree: 'Sorte',
    class: 'Vigarista',
    order: 1,
  },
  {
    id: 'talent-slippery-Mind',
    name: 'Mente Escorregadia',
    description: 'Imunidade a controle mental.',
    tree: 'Sorte',
    class: 'Vigarista',
    prerequisites: ['Junk Rider'],
    order: 2,
  },
  {
    id: 'talent-alter-Date',
    name: 'Alterar Dados',
    description: 'Rolar novamente um dado uma vez por cena.',
    tree: 'Sorte',
    class: 'Vigarista',
    prerequisites: ['Mente Escorregadia'],
    order: 3,
  },

  // Engenhoca
  {
    id: 'talent-gadget-Expert',
    name: 'Expert em Gadgets',
    description: '+5 Mecânica e Usar Computador.',
    tree: 'Engenhoca',
    class: 'Vigarista',
    order: 1,
  },
  {
    id: 'talent-master-Installer',
    name: 'Mestre Instalador',
    description: 'Instalar 2 upgrades em armas/armaduras.',
    tree: 'Engenhoca',
    class: 'Vigarista',
    prerequisites: ['Expert em Gadgets'],
    order: 2,
  },
  {
    id: 'talent-superior-Construction',
    name: 'Construção Superior',
    description: 'Armas/armaduras com +1 bônus.',
    tree: 'Engenhoca',
    class: 'Vigarista',
    prerequisites: ['Mestre Instalador'],
    order: 3,
  },

  // Sorte de Vigarista
  {
    id: 'talent-sleight-of-Hand',
    name: 'Mão Rápida',
    description: '+5 Furtividade para pegar itens.',
    tree: 'Sorte de Vigarista',
    class: 'Vigarista',
    order: 1,
  },
  {
    id: 'talent-trick-Shot',
    name: 'Tiro Truque',
    description: 'Atirar em objeto específico (-5).',
    tree: 'Sorte de Vigarista',
    class: 'Vigarista',
    prerequisites: ['Mão Rápida'],
    order: 2,
  },
  {
    id: 'talent-targeted-Strike',
    name: 'Golpe Mirado',
    description: 'Acertar local específico (+2d6 dano).',
    tree: 'Sorte de Vigarista',
    class: 'Vigarista',
    prerequisites: ['Tiro Truque'],
    order: 3,
  },

  // Escaramucador
  {
    id: 'talent-sneak-attack',
    name: 'Ataque Furtivo',
    description: '+1d6 de dano em ataques furtivos (flanqueando ou surpreendendo oponentes).',
    tree: 'Escaramucador',
    class: 'Vigarista',
    order: 1,
  },
  {
    id: 'talent-draw-Fire',
    name: 'Atrair Fogo',
    description: '-2 AC para +2 ataque de aliados.',
    tree: 'Escaramucador',
    class: 'Vigarista',
    order: 2,
  },
  {
    id: 'talent-harmful-Tech',
    name: 'Tecnologia Nociva',
    description: '+1d6 dano com armadilhas.',
    tree: 'Escaramucador',
    class: 'Vigarista',
    prerequisites: ['Atrair Fogo'],
    order: 3,
  },
  {
    id: 'talent-master-Saboteur',
    name: 'Mestre Sabotador',
    description: 'Dobrar dano de explosivos.',
    tree: 'Escaramucador',
    class: 'Vigarista',
    prerequisites: ['Tecnologia Nociva'],
    order: 4,
  },
];

// ==================== EXPLORADOR - Árvores de Talentos ====================

export const exploradorTalents: TalentCatalogItem[] = [
  // Consciência
  {
    id: 'talent-acute-Senses',
    name: 'Sentidos Aguçados',
    description: '+2 Percepção. Detectar emboscadas.',
    tree: 'Consciência',
    class: 'Explorador',
    order: 1,
  },
  {
    id: 'talent-Keen-Senses',
    name: 'Sentidos Afiados',
    description: 'Não pode ser surpreendido.',
    tree: 'Consciência',
    class: 'Explorador',
    prerequisites: ['Sentidos Aguçados'],
    order: 2,
  },
  {
    id: 'talent-Sixth-Sense',
    name: 'Sexto Sentido',
    description: '+2 Iniciativa e resistências.',
    tree: 'Consciência',
    class: 'Explorador',
    prerequisites: ['Sentidos Afiados'],
    order: 3,
  },

  // Brigueiro
  {
    id: 'talent-brawl',
    name: 'Briga',
    description: '+1d6 dano desarmado.',
    tree: 'Brigueiro',
    class: 'Explorador',
    order: 1,
  },
  {
    id: 'talent-martial-Artist',
    name: 'Arte Marcial',
    description: 'Golpe crítico com desarmado (19-20).',
    tree: 'Brigueiro',
    class: 'Explorador',
    prerequisites: ['Briga'],
    order: 2,
  },
  {
    id: 'talent-savage-Martial',
    name: 'Arte Marcial Selvagem',
    description: '+2d6 dano desarmado.',
    tree: 'Brigueiro',
    class: 'Explorador',
    prerequisites: ['Arte Marcial'],
    order: 3,
  },

  // Camuflagem
  {
    id: 'talent-hide-in-Plain-Sight',
    name: 'Esconder à Vista',
    description: 'Pode se esconder em áreas abertas.',
    tree: 'Camuflagem',
    class: 'Explorador',
    order: 1,
  },
  {
    id: 'talent-misdirection',
    name: 'Desviar Atenção',
    description: '+5 Enganação para distrair.',
    tree: 'Camuflagem',
    class: 'Explorador',
    prerequisites: ['Esconder à Vista'],
    order: 2,
  },
  {
    id: 'talent-fade',
    name: 'Desvanecer',
    description: 'Tornar-se invisível 1 rodada.',
    tree: 'Camuflagem',
    class: 'Explorador',
    prerequisites: ['Desviar Atenção'],
    order: 3,
  },

  // Passos Longos
  {
    id: 'talent-endurance',
    name: 'Resistência',
    description: '+5 Resistência. Ignorar difficult terrain.',
    tree: 'Passos Longos',
    class: 'Explorador',
    order: 1,
  },
  {
    id: 'talent-wild-Instinct',
    name: 'Instinto Selvagem',
    description: '+2 Sobrevivência e Furtividade.',
    tree: 'Passos Longos',
    class: 'Explorador',
    prerequisites: ['Resistência'],
    order: 2,
  },
  {
    id: 'talent-mountain-Stride',
    name: 'Passo Montanhês',
    description: 'Escalar sem corda. +10m deslocamento.',
    tree: 'Passos Longos',
    class: 'Explorador',
    prerequisites: ['Instinto Selvagem'],
    order: 3,
  },
];

// ==================== SOLDADO - Árvores de Talentos ====================

export const soldadoTalents: TalentCatalogItem[] = [
  // Armadura
  {
    id: 'talent-armor-Proficiency',
    name: 'Proficiência em Armadura',
    description: 'Ignorar penalidades de armadura.',
    tree: 'Armadura',
    class: 'Soldado',
    order: 1,
  },
  {
    id: 'talent-armor-Mastery',
    name: 'Maestria em Armadura',
    description: '+2 AC em armaduras pesadas.',
    tree: 'Armadura',
    class: 'Soldado',
    prerequisites: ['Proficiência em Armadura'],
    order: 2,
  },
  {
    id: 'talent-juggernaut',
    name: 'Juggernaut',
    description: 'Não pode ser derrubado. +10 PV.',
    tree: 'Armadura',
    class: 'Soldado',
    prerequisites: ['Maestria em Armadura'],
    order: 3,
  },

  // Comando
  {
    id: 'talent-inspire-Resilience',
    name: 'Inspirar Resiliência',
    description: '+2 resistências dos aliados.',
    tree: 'Comando',
    class: 'Soldado',
    order: 1,
  },
  {
    id: 'talent-frightening-Presence',
    name: 'Presença Aterrorizante',
    description: 'Inimigos fazem -2 nos ataques.',
    tree: 'Comando',
    class: 'Soldado',
    prerequisites: ['Inspirar Resiliência'],
    order: 2,
  },
  {
    id: 'talent-fearsome',
    name: 'Temível',
    description: 'Aliados ganham +1d6 PV temporários.',
    tree: 'Comando',
    class: 'Soldado',
    prerequisites: ['Presença Aterrorizante'],
    order: 3,
  },

  // Arma Pesada
  {
    id: 'talent-heavy-Weapon-Proficiency',
    name: 'Proficiência Arma Pesada',
    description: 'Usar armas pesadas sem penalidade.',
    tree: 'Arma Pesada',
    class: 'Soldado',
    order: 1,
  },
  {
    id: 'talent-heavy-Weapon-Mastery',
    name: 'Maestria Arma Pesada',
    description: '+2 dano com armas pesadas.',
    tree: 'Arma Pesada',
    class: 'Soldado',
    prerequisites: ['Proficiência Arma Pesada'],
    order: 2,
  },
  {
    id: 'talent-devastating-Strike',
    name: 'Golpe Devastador',
    description: '+4d6 dano uma vez por cena.',
    tree: 'Arma Pesada',
    class: 'Soldado',
    prerequisites: ['Maestria Arma Pesada'],
    order: 3,
  },

  // Especialista em Armas
  {
    id: 'talent-weapon-Proficiency',
    name: 'Proficiência em Arma',
    description: 'Treinamento com todas as armas.',
    tree: 'Especialista em Armas',
    class: 'Soldado',
    order: 1,
  },
  {
    id: 'talent-weapon-Mastery',
    name: 'Maestria em Arma',
    description: '+1 ataque e +1d6 dano.',
    tree: 'Especialista em Armas',
    class: 'Soldado',
    prerequisites: ['Proficiência em Arma'],
    order: 2,
  },
  {
    id: 'talent-weapon-Expert',
    name: 'Expert em Arma',
    description: 'Crítico automático 1 vez por cena.',
    tree: 'Especialista em Armas',
    class: 'Soldado',
    prerequisites: ['Maestria em Arma'],
    order: 3,
  },
];

// ==================== MUNDANO - Árvores de Talentos ====================

export const mundanoTalents: TalentCatalogItem[] = [
  // Sobrevivente
  {
    id: 'talent-tough-as-Nails',
    name: 'Duro como unha',
    description: '+3 PV. Ignorar 1 condição.',
    tree: 'Sobrevivente',
    class: 'Mundano',
    order: 1,
  },
  {
    id: 'talent-hold-It-Together',
    name: 'Aguentar Firme',
    description: 'Recuperar 1d6 PV uma vez por cena.',
    tree: 'Sobrevivente',
    class: 'Mundano',
    prerequisites: ['Duro como unha'],
    order: 2,
  },
  {
    id: 'talent-last-Stand',
    name: 'Último Recurso',
    description: 'Continuar lutando com 0 PV (1 rodada).',
    tree: 'Sobrevivente',
    class: 'Mundano',
    prerequisites: ['Aguentar Firme'],
    order: 3,
  },

  // Improvisar
  {
    id: 'talent-scrounge',
    name: 'Catador',
    description: '+5 Sobrevivência para encontrar suprimentos.',
    tree: 'Improvisar',
    class: 'Mundano',
    order: 1,
  },
  {
    id: 'talent-jury-Rig',
    name: 'Conserto Rápido',
    description: 'Reparar 1d6 PV de equipamento.',
    tree: 'Improvisar',
    class: 'Mundano',
    prerequisites: ['Catador'],
    order: 2,
  },
  {
    id: 'talent-improvised-Weaponry',
    name: 'Armas Improvisadas',
    description: '+2 dano com armas improvisadas.',
    tree: 'Improvisar',
    class: 'Mundano',
    prerequisites: ['Conserto Rápido'],
    order: 3,
  },

  // Comunicação
  {
    id: 'talent-street-Smart',
    name: 'Esperto de Rua',
    description: '+3 Obter Informação e Persuasão.',
    tree: 'Comunicação',
    class: 'Mundano',
    order: 1,
  },
  {
    id: 'talent-connected',
    name: 'Conectado',
    description: 'Contatos em 5 cidades. +5 Enganação.',
    tree: 'Comunicação',
    class: 'Mundano',
    prerequisites: ['Esperto de Rua'],
    order: 2,
  },
  {
    id: 'talent-influential',
    name: 'Influente',
    description: 'Pedir favores. +5 Persuasão.',
    tree: 'Comunicação',
    class: 'Mundano',
    prerequisites: ['Conectado'],
    order: 3,
  },

  // Adaptável
  {
    id: 'talent-jack-of-All-Trades',
    name: 'Mão de Todos',
    description: 'Usar qualquer perícia sem treinamento.',
    tree: 'Adaptável',
    class: 'Mundano',
    order: 1,
  },
  {
    id: 'talent-brick-Wall',
    name: 'Muro de Tijolos',
    description: '+5 em um teste resistido.',
    tree: 'Adaptável',
    class: 'Mundano',
    prerequisites: ['Mão de Todos'],
    order: 2,
  },
  {
    id: 'talent-force-of-Will',
    name: 'Força de Vontade',
    description: 'Imunidade a efeitos de medo.',
    tree: 'Adaptável',
    class: 'Mundano',
    prerequisites: ['Muro de Tijolos'],
    order: 3,
  },
];

// ==================== CATÁLOGO COMPLETO ====================

export const allTalentsCatalog: TalentCatalogItem[] = [
  ...jediTalents,
  ...nobreTalents,
  ...vigaristaTalents,
  ...exploradorTalents,
  ...soldadoTalents,
  ...mundanoTalents,
];

// ==================== FUNÇÕES UTILITÁRIAS ====================

export function getTalentsByClass(heroicClass: HeroicClass): TalentCatalogItem[] {
  return allTalentsCatalog.filter(talent => talent.class === heroicClass);
}

export function getTalentsByClasses(classes: HeroicClass[]): TalentCatalogItem[] {
  return allTalentsCatalog.filter(talent => classes.includes(talent.class));
}

export function getTalentsByTree(tree: string): TalentCatalogItem[] {
  return allTalentsCatalog.filter(talent => talent.tree === tree);
}

export function getTalentById(id: string): TalentCatalogItem | undefined {
  return allTalentsCatalog.find(talent => talent.id === id);
}

export function searchTalents(query: string): TalentCatalogItem[] {
  const lowerQuery = query.toLowerCase();
  return allTalentsCatalog.filter(
    talent =>
      talent.name.toLowerCase().includes(lowerQuery) ||
      talent.description.toLowerCase().includes(lowerQuery)
  );
}

export function getAvailableTalents(
  heroicClass: HeroicClass,
  characterTalents: string[]
): TalentCatalogItem[] {
  return getTalentsByClass(heroicClass).filter(talent => {
    // Não mostrar talentos já possuídos
    if (characterTalents.some(ct => ct === talent.name)) return false;

    // Verificar pré-requisitos
    if (talent.prerequisites) {
      return talent.prerequisites.every(prereq =>
        characterTalents.includes(prereq)
      );
    }

    return true;
  });
}
