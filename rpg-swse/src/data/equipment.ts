import type { EquipmentCatalogItem, EquipmentCategory } from '../types';

// ==================== ARMAS ====================

export const weaponsCatalog: EquipmentCatalogItem[] = [
  // Sabres de Luz
  {
    id: 'weapon-lightsaber',
    name: 'Sabre de Luz',
    category: 'weapon',
    weight: 1,
    cost: 2000,
    description: 'Arma energética lendária dos Jedi. Corta através de quase qualquer material.',
    attackBonus: 0,
    damage: '2d8',
    critRange: '19-20',
    range: 'Melee',
    properties: 'Acuidade, Atordoar (DC 15)',
  },
  {
    id: 'weapon-lightsaber-double',
    name: 'Sabre de Luz Duplo',
    category: 'weapon',
    weight: 2,
    cost: 4000,
    description: 'Sabre de luz com duas lâminas. Usado por guerreiros da Força.',
    attackBonus: 0,
    damage: '2d8',
    critRange: '19-20',
    range: 'Melee',
    properties: 'Acuidade, Duas Lâminas',
  },
  {
    id: 'weapon-lightsaber-shoto',
    name: 'Sabre de Luz Shoto',
    category: 'weapon',
    weight: 0.5,
    cost: 1500,
    description: 'Sabre de luz curto, ideal para defesa e combate dual.',
    attackBonus: 0,
    damage: '2d6',
    critRange: '19-20',
    range: 'Melee',
    properties: 'Acuidade, Leve',
  },

  // Blasters
  {
    id: 'weapon-blaster-pistol',
    name: 'Blaster de Bolso',
    category: 'weapon',
    weight: 1,
    cost: 400,
    description: 'Arma de energia compacta, popular entre smugglers e agentes.',
    attackBonus: 0,
    damage: '2d6',
    critRange: '20',
    range: '10m',
    properties: 'Arma de Energia',
  },
  {
    id: 'weapon-blaster-heavy',
    name: 'Blaster Pesado',
    category: 'weapon',
    weight: 5,
    cost: 1000,
    description: 'Blaster de mão com mais poder de fogo.',
    attackBonus: 0,
    damage: '3d6',
    critRange: '20',
    range: '12m',
    properties: 'Arma de Energia, Acuidade',
  },
  {
    id: 'weapon-blaster-rifle',
    name: 'Rifle Blaster',
    category: 'weapon',
    weight: 4,
    cost: 900,
    description: 'Rifle de energia padrão das forças militares.',
    attackBonus: 0,
    damage: '3d6',
    critRange: '20',
    range: '20m',
    properties: 'Arma de Energia',
  },
  {
    id: 'weapon-blaster-sniper',
    name: 'Blaster de Precisão',
    category: 'weapon',
    weight: 6,
    cost: 2000,
    description: 'Blaster de longo alcance com mira avançada.',
    attackBonus: 0,
    damage: '4d6',
    critRange: '18-20',
    range: '50m',
    properties: 'Arma de Energia, Precisão',
  },
  {
    id: 'weapon-repeating-blaster',
    name: 'Blaster Repetidor',
    category: 'weapon',
    weight: 8,
    cost: 1500,
    description: 'Blaster automático com alta cadência de tiro.',
    attackBonus: 0,
    damage: '3d6',
    critRange: '20',
    range: '25m',
    properties: 'Arma de Energia, Automática',
  },

  // Armas Brancas
  {
    id: 'weapon-vibroblade',
    name: 'Lâmina Vibratória',
    category: 'weapon',
    weight: 1,
    cost: 350,
    description: 'Espada com lâmina de vibração molecular.',
    attackBonus: 0,
    damage: '2d6',
    critRange: '19-20',
    range: 'Melee',
    properties: 'Acuidade',
  },
  {
    id: 'weapon-vibroaxe',
    name: 'Machado Vibratório',
    category: 'weapon',
    weight: 3,
    cost: 500,
    description: 'Machado com lâmina de vibração para cortes pesados.',
    attackBonus: 0,
    damage: '2d8',
    critRange: '20',
    range: 'Melee',
    properties: '',
  },
  {
    id: 'weapon-force-pike',
    name: 'Pique de Força',
    category: 'weapon',
    weight: 2,
    cost: 1000,
    description: 'Arma longa energética usada pela Guarda Real.',
    attackBonus: 0,
    damage: '2d8',
    critRange: '20',
    range: 'Melee',
    properties: 'Alcance Duplo',
  },
  {
    id: 'weapon-cortosis-gauntlet',
    name: 'Manopla de Cortosis',
    category: 'weapon',
    weight: 1,
    cost: 1500,
    description: 'Luva que resiste a sabres de luz. Permite bloquear.',
    attackBonus: 0,
    damage: '1d6',
    critRange: '20',
    range: 'Melee',
    properties: 'Bloqueio de Sabre',
  },

  // Armas de Arremesso
  {
    id: 'weapon-thrown-dagger',
    name: 'Adaga de Arremesso',
    category: 'weapon',
    weight: 0.5,
    cost: 20,
    description: 'Adaga leve para arremesso.',
    attackBonus: 0,
    damage: '1d4',
    critRange: '19-20',
    range: '6m',
    properties: 'Acuidade, Arremesso',
  },
  {
    id: 'weapon-thermal-det',
    name: 'Detonador Térmico',
    category: 'weapon',
    weight: 1,
    cost: 300,
    description: 'Grenada de energia que causa explosão devastadora.',
    attackBonus: 0,
    damage: '6d6',
    critRange: '20',
    range: '10m',
    properties: 'Área (3m), Explosivo',
  },

  // Armas de Arco
  {
    id: 'weapon-bowcaster',
    name: 'Arco Blaster',
    category: 'weapon',
    weight: 3,
    cost: 600,
    description: 'Arco energético Wookiee. Potente e silencioso.',
    attackBonus: 0,
    damage: '3d6',
    critRange: '20',
    range: '20m',
    properties: 'Arma de Energia',
  },
];

// ==================== ARMADURAS ====================

export const armorCatalog: EquipmentCatalogItem[] = [
  // Armaduras Leves
  {
    id: 'armor-clothing',
    name: 'Roupas Comuns',
    category: 'armor',
    weight: 1,
    cost: 0,
    description: 'Roupas básicas sem proteção significativa.',
    reflexBonus: 0,
    maxDexBonus: 10,
    armorCheckPenalty: 0,
  },
  {
    id: 'armor-combat-vest',
    name: 'Colete de Combate',
    category: 'armor',
    weight: 3,
    cost: 200,
    description: 'Colete leve com proteção contra impactos.',
    reflexBonus: 1,
    maxDexBonus: 6,
    armorCheckPenalty: 0,
  },
  {
    id: 'armor-padded-armor',
    name: 'Armadura Acolchoada',
    category: 'armor',
    weight: 5,
    cost: 400,
    description: 'Armadura leve com camadas de absorção.',
    reflexBonus: 2,
    maxDexBonus: 5,
    armorCheckPenalty: 0,
  },
  {
    id: 'armor-leather-armor',
    name: 'Armadura de Couro',
    category: 'armor',
    weight: 6,
    cost: 500,
    description: 'Couro tratado com proteção moderada.',
    reflexBonus: 2,
    maxDexBonus: 4,
    armorCheckPenalty: -1,
  },

  // Armaduras Médias
  {
    id: 'armor-combat-armor',
    name: 'Armadura de Combate',
    category: 'armor',
    weight: 8,
    cost: 1000,
    description: 'Armadura padrão militar com boa proteção.',
    reflexBonus: 4,
    maxDexBonus: 3,
    armorCheckPenalty: -2,
  },
  {
    id: 'armor-behavioral',
    name: 'Armadura de Conduta',
    category: 'armor',
    weight: 10,
    cost: 1500,
    description: 'Armadura usada por tropas de elite.',
    reflexBonus: 5,
    maxDexBonus: 2,
    armorCheckPenalty: -3,
  },
  {
    id: 'armor-mandalorian',
    name: 'Armadura Mandaloriana',
    category: 'armor',
    weight: 12,
    cost: 3000,
    description: 'Armadura legendaria dos Mandos. Resistente a blasters.',
    reflexBonus: 6,
    maxDexBonus: 2,
    armorCheckPenalty: -3,
  },

  // Armaduras Pesadas
  {
    id: 'armor-heavy-armor',
    name: 'Armadura Pesada',
    category: 'armor',
    weight: 15,
    cost: 2000,
    description: 'Armadura completa com máxima proteção.',
    reflexBonus: 8,
    maxDexBonus: 1,
    armorCheckPenalty: -5,
  },
  {
    id: 'armor-sith-armor',
    name: 'Armadura Sith',
    category: 'armor',
    weight: 12,
    cost: 5000,
    description: 'Armadura sombria com proteção contra a Força.',
    reflexBonus: 7,
    maxDexBonus: 2,
    armorCheckPenalty: -4,
  },

  // Escudos
  {
    id: 'armor-energy-shield',
    name: 'Escudo de Energia',
    category: 'armor',
    weight: 2,
    cost: 2500,
    description: 'Campo de força portátil que absorve impactos.',
    reflexBonus: 3,
    maxDexBonus: 4,
    armorCheckPenalty: -1,
  },
];

// ==================== EQUIPAMENTOS GERAIS ====================

export const gearCatalog: EquipmentCatalogItem[] = [
  // Equipamento Básico
  {
    id: 'gear-backpack',
    name: 'Mochila',
    category: 'gear',
    weight: 2,
    cost: 50,
    description: 'Mochila para carregar equipamentos.',
  },
  {
    id: 'gear-bedroll',
    name: 'Saco de Dormir',
    category: 'gear',
    weight: 3,
    cost: 30,
    description: 'Saco acolchoado para descanso.',
  },
  {
    id: 'gear-rope',
    name: 'Corda (10m)',
    category: 'gear',
    weight: 2,
    cost: 10,
    description: 'Corda resistente para escalada e amarração.',
  },
  {
    id: 'gear-grappling-hook',
    name: 'Gancho de Escalada',
    category: 'gear',
    weight: 1,
    cost: 20,
    description: 'Gancho metálico para escalada.',
  },
  {
    id: 'gear-flashlight',
    name: 'Lanterna',
    category: 'gear',
    weight: 1,
    cost: 25,
    description: 'Fonte de luz portátil.',
  },
  {
    id: 'gear-binoculars',
    name: 'Binóculos',
    category: 'gear',
    weight: 1,
    cost: 100,
    description: 'Binóculos com zoom para observação.',
  },
  {
    id: 'gear-comlink',
    name: 'Comlink',
    category: 'gear',
    weight: 0.5,
    cost: 75,
    description: 'Dispositivo de comunicação sem fio.',
  },
  {
    id: 'gear-datapad',
    name: 'Datapad',
    category: 'gear',
    weight: 1,
    cost: 300,
    description: 'Computador portátil para dados e comunicação.',
  },

  // Equipamento Médico
  {
    id: 'gear-medpac',
    name: 'Kit Médico',
    category: 'tool',
    weight: 1,
    cost: 50,
    description: 'Básico para tratar ferimentos leves. +5 Tratar Ferimentos.',
  },
  {
    id: 'gear-medpac-advanced',
    name: 'Kit Médico Avançado',
    category: 'tool',
    weight: 2,
    cost: 200,
    description: 'Equipamento médico completo. +10 Tratar Ferimentos.',
  },
  {
    id: 'gear-stimpack',
    name: 'Stimpack',
    category: 'consumable',
    weight: 0.5,
    cost: 25,
    description: 'Injeção que restaura 1d8+2 pontos de vida.',
  },
  {
    id: 'gear-adrenal',
    name: 'Adrenalina',
    category: 'consumable',
    weight: 0.5,
    cost: 50,
    description: 'Aumenta STR ou DEX em +2 por 1 minuto.',
  },

  // Equipamento Técnico
  {
    id: 'gear-slicing-kit',
    name: 'Kit de Invusão',
    category: 'tool',
    weight: 2,
    cost: 500,
    description: 'Equipamento para hackear sistemas. +5 Usar Computador.',
  },
  {
    id: 'gear-repair-kit',
    name: 'Kit de Reparos',
    category: 'tool',
    weight: 3,
    cost: 200,
    description: 'Ferramentas para consertar equipamentos. +5 Mecânica.',
  },
  {
    id: 'gear-spy-droid',
    name: 'Drone Espião',
    category: 'tool',
    weight: 1,
    cost: 750,
    description: 'Mini-drone para vigilância e reconhecimento.',
  },
  {
    id: 'gear-macrobinoculars',
    name: 'Macro Binóculos',
    category: 'tool',
    weight: 2,
    cost: 400,
    description: 'Binóculos de longo alcance com sensors.',
  },

  // Combustível e Munição
  {
    id: 'gear-power-cell',
    name: 'Célula de Energia',
    category: 'consumable',
    weight: 1,
    cost: 100,
    description: 'Recarrega armas de energia (50 tiros).',
  },
  {
    id: 'gear-rocket-fuel',
    name: 'Combustível de Foguete',
    category: 'consumable',
    weight: 5,
    cost: 200,
    description: 'Combustível para propelentes e naves.',
  },

  // Tesouros e Valores
  {
    id: 'gear-credit-chip',
    name: 'Chip de Créditos',
    category: 'gear',
    weight: 0,
    cost: 0,
    description: 'Chip magnético contendo créditos.',
  },
  {
    id: 'gear-gemstone',
    name: 'Pedra Preciosa',
    category: 'gear',
    weight: 0.1,
    cost: 500,
    description: 'Gema valiosa para troca ou joalheria.',
  },
];

// ==================== CATÁLOGO COMPLETO ====================

export const allEquipmentCatalog: EquipmentCatalogItem[] = [
  ...weaponsCatalog,
  ...armorCatalog,
  ...gearCatalog,
];

// ==================== FUNÇÕES UTILITÁRIAS ====================

export function getEquipmentByCategory(category: EquipmentCategory): EquipmentCatalogItem[] {
  return allEquipmentCatalog.filter(item => item.category === category);
}

export function getEquipmentById(id: string): EquipmentCatalogItem | undefined {
  return allEquipmentCatalog.find(item => item.id === id);
}

export function searchEquipment(query: string): EquipmentCatalogItem[] {
  const lowerQuery = query.toLowerCase();
  return allEquipmentCatalog.filter(
    item =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
  );
}
