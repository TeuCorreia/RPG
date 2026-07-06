import type { SpeciesData } from '../types';

export const speciesList: SpeciesData[] = [
  {
    name: 'Humano',
    description: 'Os humanos são a espécie mais comum e versátil da galáxia. Sua incrível capacidade de adaptação e ambição os permitiu se espalhar por inúmeros mundos, tornando-os protagonistas em praticamente todos os grandes eventos da galáxia.',
    attributeModifiers: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
    size: 'Medium',
    speed: 6,
    bonusFeats: ['Talento bônus humano'],
    bonusSkills: [],
    image: '../src/assets/race/human.jpg',
    specialAbilities: [
      { name: 'Talento Bônus', description: 'Humanos recebem um talento bônus no 1º nível.' },
      { name: 'Perícia Treinada Bônus', description: 'Humanos recebem uma perícia treinada adicional no 1º nível.' }
    ]
  },
  {
    name: 'Bothan',
    description: 'Os bothans são uma espécie de humanoides peludos conhecidos por suas intrincadas redes políticas e habilidades de coleta de informações. São famosos por sua dedicação e sacrifício em missões de espionagem.',
    attributeModifiers: { str: 0, dex: 0, con: 0, int: 2, wis: 0, cha: -2 },
    size: 'Medium',
    speed: 6,
    bonusFeats: [],
    bonusSkills: ['Obter Informação', 'Enganação'],
    image: '../src/assets/race/bothan.png',
    specialAbilities: [
      { name: 'Perícias Treinadas Bônus', description: 'Bothans recebem Obter Informação e Enganação como perícias treinadas no 1º nível.' }
    ]
  },
  {
    name: 'Cereano',
    description: 'Os cereanos são uma espécie alta e humanoide com testas avantajadas contendo cérebros binários, o que lhes concede capacidades mentais excepcionais e a habilidade de processar múltiplas linhas de pensamento simultaneamente.',
    attributeModifiers: { str: 0, dex: -2, con: 0, int: 2, wis: 2, cha: -2 },
    size: 'Medium',
    speed: 6,
    bonusFeats: [],
    bonusSkills: ['Conhecimento'],
    image: '../src/assets/race/cereano.png',
    specialAbilities: [
      { name: 'Cérebro Binário', description: 'Um cereano pode usar 10 em testes de Conhecimento mesmo quando distraído ou ameaçado.' }
    ]
  },
  {
    name: 'Droide',
    description: 'Droides são seres mecânicos com inteligência artificial, construídos para inúmeros propósitos pela galáxia. Desde protocolo até combate, cada droide é programado para funções específicas, mas alguns desenvolvem personalidades únicas.',
    attributeModifiers: { str: -2, dex: 0, con: -2, int: 2, wis: -2, cha: 0 },
    size: 'Medium',
    speed: 6,
    bonusFeats: [],
    bonusSkills: ['Conhecimento', 'Mecânica'],
    image: '../src/assets/race/droide.jpg',
    specialAbilities: [
      { name: 'Características de Droide', description: 'Droides têm imunidade a veneno, efeitos de sono, paralisia e doenças. Não respiram, comem ou dormem. São reparados em vez de curados.' },
      { name: 'Sistemas de Droide', description: 'Droides possuem visão no escuro, +5 no limiar de dano e começam com 5 pontos de vida bônus.' }
    ]
  },
  {
    name: 'Ewok',
    description: 'Ewoks são pequenos onívoros peludos nativos da lua florestal de Endor. São curiosos, engenhosos e extremamente corajosos, compensando seu tamanho com inteligência e trabalho em equipe.',
    attributeModifiers: { str: -2, dex: 0, con: 0, int: 0, wis: 2, cha: 0 },
    size: 'Small',
    speed: 4,
    bonusFeats: [],
    bonusSkills: ['Escalar', 'Percepção', 'Furtividade'],
    image: '../src/assets/race/ewok.jpg',
    specialAbilities: [
      { name: 'Pequeno', description: 'Ewoks recebem +2 na Defesa de Reflexo e em testes de Furtividade, mas -2 em testes de agarrão.' }
    ]
  },
  {
    name: 'Gungan',
    description: 'Gungans são uma espécie anfíbia do planeta Naboo, conhecidos por sua linguagem única e cultura distinta. Apesar de sua aparência peculiar, são guerreiros valentes e engenheiros talentosos.',
    attributeModifiers: { str: 0, dex: 2, con: 2, int: -2, wis: -2, cha: 0 },
    size: 'Medium',
    speed: 6,
    bonusFeats: [],
    bonusSkills: ['Nadar'],
    image: '../src/assets/race/gungan.png',
    specialAbilities: [
      { name: 'Anfíbio', description: 'Gungans podem respirar tanto ar quanto água e têm deslocamento de natação igual ao deslocamento base.' }
    ]
  },
  {
    name: 'Ithoriano',
    description: 'Ithorianos são uma espécie gentil de duas cabeças com uma profunda conexão com a natureza e tecnologia sofisticada. São conhecidos como pacíficos pastores da natureza.',
    attributeModifiers: { str: -2, dex: 0, con: 2, int: 0, wis: 2, cha: 0 },
    size: 'Medium',
    speed: 6,
    bonusFeats: [],
    bonusSkills: ['Conhecimento', 'Persuasão'],
    image: '../src/assets/race/ithoriano.jpg',
    specialAbilities: [
      { name: 'Voz Dupla', description: 'Ithorianos recebem +2 em testes de Persuasão.' }
    ]
  },
  {
    name: 'Kel Dor',
    description: 'Kel Dor são uma espécie que requer máscaras respiratórias especializadas para sobreviver em atmosferas ricas em oxigênio. Possuem sentidos aguçados e grande sabedoria.',
    attributeModifiers: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: -2 },
    size: 'Medium',
    speed: 6,
    bonusFeats: [],
    bonusSkills: ['Percepção'],
    image: '../src/assets/race/keldor.png',
    specialAbilities: [
      { name: 'Visão no Escuro', description: 'Kel Dor ignoram escuridão e podem enxergar normalmente em escuridão total a até 6 quadrados.' }
    ]
  },
  {
    name: 'Mon Calamari',
    description: 'Mon Calamari são uma espécie aquática e artística, renomada por sua construção naval e natureza pacífica. Sua criatividade e inteligência os tornam excelentes engenheiros e estrategistas.',
    attributeModifiers: { str: 0, dex: 0, con: 0, int: 2, wis: 0, cha: 0 },
    size: 'Medium',
    speed: 6,
    bonusFeats: [],
    bonusSkills: ['Mecânica', 'Percepção'],
    image: '../src/assets/race/moncalamari.png',
    specialAbilities: [
      { name: 'Anfíbio', description: 'Mon Calamari podem respirar tanto ar quanto água e têm deslocamento de natação 4.' },
      { name: 'Construtor Expert', description: 'Mon Calamari recebem +2 em testes de Mecânica.' }
    ]
  },
  {
    name: 'Quarren',
    description: 'Quarren são uma espécie aquática com tentáculos faciais do planeta Mon Calamari, conhecidos por seu pragmatismo e visão realista da vida. São excelentes negociantes e sobreviventes.',
    attributeModifiers: { str: 0, dex: 0, con: 2, int: 0, wis: 0, cha: -2 },
    size: 'Medium',
    speed: 6,
    bonusFeats: [],
    bonusSkills: ['Sobrevivência'],
    image: '../src/assets/race/quarren.jpg',
    specialAbilities: [
      { name: 'Anfíbio', description: 'Quarren podem respirar tanto ar quanto água.' }
    ]
  },
  {
    name: 'Rodiano',
    description: 'Rodianos são uma espécie reptiliana conhecida por suas excepcionais habilidades de caça e cultura de caçadores de recompensa. Seus olhos compostos e agilidade os tornam rastreadores formidáveis.',
    attributeModifiers: { str: 0, dex: 2, con: 0, int: 0, wis: -2, cha: 0 },
    size: 'Medium',
    speed: 6,
    bonusFeats: [],
    bonusSkills: ['Furtividade', 'Sobrevivência'],
    image: '../src/assets/race/rodiano2.jpg',
    specialAbilities: [
      { name: 'Caçador Expert', description: 'Rodanos recebem +2 em testes de Sobrevivência para rastrear.' }
    ]
  },
  {
    name: 'Sullustano',
    description: 'Sullustanos são uma espécie do planeta vulcânico Sullust, conhecidos por suas excepcionais habilidades de pilotagem e visão adaptada à escuridão de seus túneis subterrâneos.',
    attributeModifiers: { str: -2, dex: 2, con: 0, int: 0, wis: 0, cha: 0 },
    size: 'Medium',
    speed: 6,
    bonusFeats: [],
    bonusSkills: ['Pilotagem'],
    image: '../src/assets/race/sullustano2.jpg',
    specialAbilities: [
      { name: 'Piloto Expert', description: 'Sullustanos recebem +2 em testes de Pilotagem.' },
      { name: 'Visão no Escuro', description: 'Sullustanos ignoram escuridão e podem enxergar em escuridão total a até 6 quadrados.' }
    ]
  },
  {
    name: 'Twi\'lek',
    description: 'Twi\'leks são uma espécie humanoide com distintivos tentáculos na cabeça chamados lekku, conhecidos por suas habilidades diplomáticas e presença marcante. Sua cultura valoriza a negociação e a arte.',
    attributeModifiers: { str: 0, dex: 0, con: -2, int: 0, wis: 0, cha: 2 },
    size: 'Medium',
    speed: 6,
    bonusFeats: [],
    bonusSkills: ['Enganação', 'Persuasão'],
    image: '../src/assets/race/twilek.png',
    specialAbilities: [
      { name: 'Perícias Treinadas Bônus', description: 'Twi\'leks recebem Enganação e Persuasão como perícias treinadas no 1º nível.' }
    ]
  },
  {
    name: 'Wookiee',
    description: 'Wookiees são seres altos e peludos do planeta Kashyyyk, renomados por sua força imensa e lealdade inabalável. Apesar de sua aparência feroz, honram códigos de amizade e têm grande senso de justiça.',
    attributeModifiers: { str: 4, dex: 0, con: 2, int: -2, wis: 0, cha: -2 },
    size: 'Medium',
    speed: 6,
    bonusFeats: ['Fúria Extra'],
    bonusSkills: ['Escalar'],
    image: '../src/assets/race/wookiee.png',
    specialAbilities: [
      { name: 'Fúria', description: 'Um wookiee pode entrar em fúria como ação livre, recebendo +2 em Força e +2 em Constituição por 5 rodadas.' },
      { name: 'Constituição Poderosa', description: 'Wookiees são tratados como Grandes para capacidade de carga e ao empunhar armas.' }
    ]
  },
  {
    name: 'Zabrak',
    description: 'Zabraks são uma espécie com tatuagens faciais e chifres cranianos, conhecidos por sua forte vontade e determinação inabalável. Sua cultura celebra a independência e a força interior.',
    attributeModifiers: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 2 },
    size: 'Medium',
    speed: 6,
    bonusFeats: [],
    bonusSkills: ['Resistência'],
    image: '../src/assets/race/zabrak.jpg',
    specialAbilities: [
      { name: 'Determinação Feroz', description: 'Uma vez por dia, um zabrak pode rolar novamente um teste de resistência fracassado.' }
    ]
  }
];
