import { useState } from 'react';

interface TalentItem {
  name: string;
  desc: string;
}

interface TalentTree {
  name: string;
  talents: TalentItem[];
}

interface ClassTrees {
  class: string;
  trees: TalentTree[];
}

const progression = [
  { level: 1, feats: 1, talents: 1, stats: 0, hpBonus: 'Classe + CON', desc: 'Primeiro nível: perícias iniciais, talento bônus humano (se aplicável), +1 talento de árvore.' },
  { level: 2, feats: 0, talents: 0, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Bônus de metade do nível aumenta para +1.' },
  { level: 3, feats: 1, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo feat (geral ou da sua lista de classe) e um novo talento.' },
  { level: 4, feats: 0, talents: 0, stats: 2, hpBonus: 'Metade do dado de vida + CON', desc: 'Aumenta dois atributos diferentes em +1. Bônus de metade do nível aumenta para +2.' },
  { level: 5, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 6, feats: 1, talents: 0, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo feat. Bônus de metade do nível aumenta para +3.' },
  { level: 7, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 8, feats: 0, talents: 0, stats: 2, hpBonus: 'Metade do dado de vida + CON', desc: 'Aumenta dois atributos diferentes em +1. Bônus de metade do nível aumenta para +4. Pode entrar em Prestige Classes se cumprir os pré-requisitos.' },
  { level: 9, feats: 1, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo feat e um novo talento.' },
  { level: 10, feats: 0, talents: 0, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Bônus de metade do nível aumenta para +5.' },
  { level: 11, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 12, feats: 1, talents: 0, stats: 2, hpBonus: 'Metade do dado de vida + CON', desc: 'Aumenta dois atributos diferentes em +1. Ganha um novo feat. Bônus de metade do nível aumenta para +6.' },
  { level: 13, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 14, feats: 0, talents: 0, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Bônus de metade do nível aumenta para +7.' },
  { level: 15, feats: 1, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo feat e um novo talento.' },
  { level: 16, feats: 0, talents: 0, stats: 2, hpBonus: 'Metade do dado de vida + CON', desc: 'Aumenta dois atributos diferentes em +1. Bônus de metade do nível aumenta para +8.' },
  { level: 17, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 18, feats: 1, talents: 0, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo feat. Bônus de metade do nível aumenta para +9.' },
  { level: 19, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 20, feats: 1, talents: 0, stats: 2, hpBonus: 'Metade do dado de vida + CON', desc: 'Aumenta dois atributos diferentes em +1. Ganha um novo feat. Bônus de metade do nível atinge +10.' },
];

const classHp = [
  { name: 'Jedi', die: 'd8', hp1: 8, hpNext: 4, desc: 'Guerreiros da Força com boa resistência.' },
  { name: 'Nobre', die: 'd6', hp1: 6, hpNext: 3, desc: 'Diplomatas e líderes, menos robustos.' },
  { name: 'Vigarista', die: 'd6', hp1: 6, hpNext: 3, desc: 'Malandros ágeis, vida mediana.' },
  { name: 'Explorador', die: 'd8', hp1: 8, hpNext: 4, desc: 'Sobrevivencialistas resistentes.' },
  { name: 'Soldado', die: 'd10', hp1: 10, hpNext: 5, desc: 'Mestres do combate, os mais durões.' },
  { name: 'Mundano', die: 'd4', hp1: 4, hpNext: 2, desc: 'Pessoas comuns, muito frágeis.' },
];

const talentTreesByClass: ClassTrees[] = [
  {
    class: 'Jedi',
    trees: [
      {
        name: 'Guardião Jedi',
        talents: [
          { name: 'Bloqueio', desc: 'Usa o sabre de luz para bloquear ataques corpo a corpo. Requer um sabre de luz em mãos.' },
          { name: 'Desvio', desc: 'Desvia tiros de blaster com o sabre de luz. Requer o talento Bloqueio.' },
          { name: 'Especialização em Armas', desc: '+1 em jogadas de dano com sabres de luz.' },
        ],
      },
      {
        name: 'Cônsul Jedi',
        talents: [
          { name: 'Persuasão da Força', desc: 'Usa a Força para influenciar mentes fracas, como se estivesse usando Persuasão.' },
          { name: 'Percepção da Força', desc: 'Usa a Força para perceber o ambiente ao redor, mesmo com sentidos normais bloqueados.' },
          { name: 'Truque Mental', desc: 'Convence uma criatura de que algo é verdadeiro por 1 rodada se falhar em Vontade.' },
        ],
      },
      {
        name: 'Sentinela Jedi',
        talents: [
          { name: 'Furtividade da Força', desc: 'Esconde sua presença na Força, tornando-se invisível para detecção pela Força.' },
          { name: 'Rastreio da Força', desc: 'Rastreia criaturas ou objetos através da Força.' },
          { name: 'Sentido Sombrio', desc: 'Sente a presença do Lado Sombrio e criaturas corrompidas pela Força.' },
        ],
      },
      {
        name: 'Adepto da Força',
        talents: [
          { name: 'Redemoinho da Força', desc: 'Cria um redemoinho de energia da Força que causa dano em área.' },
          { name: 'Relâmpago da Força', desc: 'Dispara descargas elétricas da Força contra um alvo.' },
          { name: 'Meditação de Batalha', desc: 'Concede bônus em ataques e defesas para aliados em combate.' },
        ],
      },
    ],
  },
  {
    class: 'Soldado',
    trees: [
      {
        name: 'Armadura',
        talents: [
          { name: 'Defesa com Armadura', desc: 'Reduz a penalidade de armadura na Defesa de Reflexo. Permite usar o bônus de armadura em Reflexo.' },
          { name: 'Defesa com Armadura Aprimorada', desc: 'Melhora ainda mais o uso de armaduras, aumentando o bônus de Defesa.' },
          { name: 'Juggernaut', desc: 'Ignora redução de deslocamento por armadura e recebe bônus em manobras de combate.' },
        ],
      },
      {
        name: 'Comando',
        talents: [
          { name: 'Análise de Batalha', desc: 'Estuda um oponente como ação de movimento para ganhar +2 em ataques contra ele.' },
          { name: 'Coordenar', desc: 'Coordena aliados para conceder bônus em ataques ou defesas.' },
          { name: 'Táticas de Campo', desc: 'Concede +1 de bônus em jogadas de ataque para aliados próximos.' },
        ],
      },
      {
        name: 'Arma Pesada',
        talents: [
          { name: 'Apoiar', desc: 'Reduz penalidade por disparar armas pesadas sem estar apoiado.' },
          { name: 'Golpe Possante', desc: '+2 de dano corpo a corpo ao custo de -5 na jogada de ataque.' },
          { name: 'Ataque Penetrante', desc: 'Ignora redução de dano e alguns bônus de defesa do alvo.' },
        ],
      },
      {
        name: 'Especialista em Armas',
        talents: [
          { name: 'Foco em Arma', desc: '+1 em jogadas de ataque com uma categoria de arma (sabre, blaster, etc.).' },
          { name: 'Especialização em Arma', desc: '+2 em dano com a categoria de arma escolhida em Foco em Arma.' },
          { name: 'Especialização Avançada', desc: '+2 adicional em dano (total +4) com a categoria de arma escolhida.' },
        ],
      },
    ],
  },
  {
    class: 'Vigarista',
    trees: [
      {
        name: 'Sorte',
        talents: [
          { name: 'Sorte do Tolo', desc: 'Uma vez por encontro, rola 1d6 e adiciona o resultado em um teste de perícia.' },
          { name: 'Tiro de Sorte', desc: 'Gasta um Ponto de Força para transformar um ataque que errou em um acerto.' },
          { name: 'Sorte Absurda', desc: 'Uma vez por sessão, pode rolar novamente qualquer teste recém realizado.' },
        ],
      },
      {
        name: 'Engenhoca',
        talents: [
          { name: 'Criar Própria Sorte', desc: 'Pode usar Enganação no lugar de Pilotagem ou Mecânica uma vez por encontro.' },
          { name: 'Reconstruir', desc: 'Recupera um item quebrado ou danificado com sucesso em teste de Mecânica.' },
          { name: 'Peças Sobressalentes', desc: 'Sempre encontra peças para reparar equipamentos, mesmo em situações adversas.' },
        ],
      },
      {
        name: 'Sorte de Vigarista',
        talents: [
          { name: 'Antes Sorte Que Tino', desc: 'Usa sorte em vez de habilidade para testes de perícia uma vez por encontro.' },
          { name: 'Gambiarra', desc: 'Faz equipamento funcionar temporariamente apesar de danos severos.' },
          { name: 'Talento Natural', desc: 'Escolha uma perícia; você a considera como treinada mesmo sem sê-lo.' },
        ],
      },
      {
        name: 'Escaramuçador',
        talents: [
          { name: 'Golpe Traiçoeiro', desc: '+1 de dano contra alvos desprevenidos ou que não podem agir.' },
          { name: 'Ataque Furtivo', desc: '+2d6 de dano extra contra oponentes que perderam a Destreza na Defesa.' },
          { name: 'Escaramuça', desc: 'Move e ataca sem sofrer ataques de oportunidade.' },
        ],
      },
    ],
  },
  {
    class: 'Explorador',
    trees: [
      {
        name: 'Consciência',
        talents: [
          { name: 'Sentidos Aguçados', desc: '+5 em Percepção. Você percebe coisas que outros não notam.' },
          { name: 'Evasão', desc: 'Se passar em um teste de Reflexo contra ataques de área, não sofre dano.' },
          { name: 'Evasão Aprimorada', desc: 'Mesmo se falhar em Reflexo contra ataques de área, sofre apenas metade do dano.' },
        ],
      },
      {
        name: 'Brigão',
        talents: [
          { name: 'Valentão', desc: '+2 em testes de agarrão e golpes desarmados.' },
          { name: 'Força Selvagem', desc: 'Uma vez por encontro, causa +1d6 de dano em um ataque corpo a corpo.' },
          { name: 'Repulsão', desc: 'Empurra um oponente para trás em 1 quadrado com um ataque corpo a corpo bem-sucedido.' },
        ],
      },
      {
        name: 'Camuflagem',
        talents: [
          { name: 'Camuflagem', desc: 'Pode se camuflar em ambientes naturais, recebendo +5 em Furtividade.' },
          { name: 'Esconder-se à Vista', desc: 'Pode usar Furtividade mesmo quando observado diretamente, se houver cobertura.' },
          { name: 'Furtividade Aprimorada', desc: 'Pode se mover com velocidade normal sem penalidade em Furtividade.' },
        ],
      },
      {
        name: 'Passos Longos',
        talents: [
          { name: 'Passada Larga', desc: 'Seu deslocamento base aumenta em +2.' },
          { name: 'Retirada Rápida', desc: 'Ao usar a ação de retirada, move o dobro do deslocamento.' },
          { name: 'Pés Firmes', desc: 'Ignora terreno difícil e não sofre penalidades por movimento.' },
        ],
      },
    ],
  },
  {
    class: 'Nobre',
    trees: [
      {
        name: 'Influência',
        talents: [
          { name: 'Líder Nato', desc: 'Aliados a até 6 quadrados recebem +1 em jogadas de ataque.' },
          { name: 'Inspirar Confiança', desc: 'Aliados recebem +2 em testes de Vontade contra medo e influência.' },
          { name: 'Fortificar Aliado', desc: 'Um aliado recebe +2 em uma jogada de ataque, perícia ou defesa por 1 rodada.' },
        ],
      },
      {
        name: 'Liderança',
        talents: [
          { name: 'Comandar Aliado', desc: 'Um aliado pode realizar uma ação adicional imediatamente.' },
          { name: 'Reunir', desc: 'Remove condição de medo ou abalado de aliados próximos.' },
          { name: 'Confiança', desc: 'Aliados próximos recebem +2 em testes de Percepção e Iniciativa.' },
        ],
      },
      {
        name: 'Linhagem',
        talents: [
          { name: 'Herança Nobre', desc: 'Começa com o dobro de créditos e recebe +2 em Persuasão com nobres.' },
          { name: 'Riqueza', desc: 'Recebe uma renda semanal de créditos e pode adquirir itens raros.' },
          { name: 'Conexões', desc: 'Pode usar contatos para obter informações, favores ou itens.' },
        ],
      },
      {
        name: 'Militar',
        talents: [
          { name: 'Táticas de Implantação', desc: 'Concede +4 em Iniciativa para aliados no início do combate.' },
          { name: 'Estratégia de Campo', desc: 'Todos os aliados recebem +1 em Defesa contra um tipo de oponente.' },
          { name: 'Reforços', desc: 'Uma vez por sessão, aliados adicionais chegam para ajudar no combate.' },
        ],
      },
    ],
  },
  {
    class: 'Mundano',
    trees: [
      {
        name: 'Sobrevivente',
        talents: [
          { name: 'Durão', desc: '+5 pontos de vida. Você é mais resistente que a maioria.' },
          { name: 'Recuperação Rápida', desc: 'Recupera o dobro de pontos de vida com descanso.' },
          { name: 'Instinto de Sobrevivência', desc: 'Uma vez por dia, pode rolar novamente um teste de resistência fracassado.' },
        ],
      },
    ],
  },
];

const featExamples = [
  { name: 'Sensibilidade à Força', desc: 'Permite sentir a Força. Pré-requisito para classes da Força e poderes.' },
  { name: 'Treinamento na Força', desc: 'Concede poderes da Força adicionais (3 poderes por feat).' },
  { name: 'Foco em Arma (sabre)', desc: '+1 em jogadas de ataque com sabres de luz.' },
  { name: 'Foco em Perícia', desc: '+5 em uma perícia específica.' },
  { name: 'Esquiva', desc: '+1 na Defesa de Reflexo contra um oponente.' },
  { name: 'Mobilidade', desc: '+2 na Defesa de Reflexo contra ataques de oportunidade ao se mover.' },
  { name: 'Tiro à Queima-Roupa', desc: '+1 em ataques à distância contra alvos a até 6 quadrados.' },
  { name: 'Tiro Rápido', desc: 'Ataque extra com -2 de penalidade em todos os ataques.' },
  { name: 'Duas Armas', desc: 'Reduz penalidade por empunhar duas armas.' },
  { name: 'Derrubar', desc: 'Tenta derrubar o oponente como ação de ataque.' },
];

const prestigeClasses = [
  { name: 'Cavaleiro Jedi', level: 7, requirements: 'Sensibilidade à Força, Bloqueio, Desvio, BAB +6', description: 'Especialização avançada nos caminhos da Força.' },
  { name: 'Mestre Jedi', level: 9, requirements: 'Cavaleiro Jedi, 7 talents de árvores Jedi', description: 'Mestria absoluta nos caminhos Jedi.' },
  { name: 'Aprendiz Sith', level: 7, requirements: 'Sensibilidade à Força, 2 talents de Força, BAB +5', description: 'Iniciação nos segredos do Lado Sombrio.' },
  { name: 'Tropa de Elite', level: 8, requirements: 'BAB +7, 2 feats de combate', description: 'Força militar de elite com treinamento de combate superior.' },
  { name: 'Oficial', level: 7, requirements: 'Líder Nato, Coordenar, BAB +3', description: 'Comandante tático que lidera tropas em batalha.' },
  { name: 'Senhor do Crime', level: 8, requirements: 'Sorte do Tolo, Ataque Furtivo, 8 em Enganação', description: 'Mestre do submundo do crime e da intimidação.' },
];

const summaryCards = [
  { label: 'HP', value: 'Todo nível', color: 'var(--hp-color)' },
  { label: 'Talents', value: 'Níveis ímpares', color: 'var(--talent-color)' },
  { label: 'Feats', value: '1,3,6,9,12,15,18', color: 'var(--feat-color)' },
  { label: 'Atributos', value: '4,8,12,16,20', color: 'var(--stat-color)' },
  { label: 'Prestige', value: 'Nível 8+', color: 'var(--accent)' },
];

export function LevelProgression() {
  const [expandedTalents, setExpandedTalents] = useState<Record<string, boolean>>({});

  function toggleTalent(key: string) {
    setExpandedTalents(prev => ({ ...prev, [key]: !prev[key] }));
  }
  return (
    <div className="level-progression">
      <h1 className="progression-title">Progressão por Nível</h1>
      <p className="progression-subtitle">
        No Star Wars Saga Edition, existem 5 coisas principais que um personagem ganha ao subir de nível:
        <strong> HP, Talentos, Feats, Aumento de Atributos</strong> e <strong>Acesso a Classes de Prestígio</strong>.
      </p>

      {/* Summary Cards */}
      <div className="progression-summary-grid">
        {summaryCards.map(card => (
          <div key={card.label} className="progression-summary-card" style={{ borderTopColor: card.color }}>
            <strong>{card.label}</strong>
            <small>{card.value}</small>
          </div>
        ))}
      </div>

      {/* ===== TALENTS ===== */}
      <section className="sheet-panel progression-section">
        <h3 className="sheet-panel-title">1. Talentos (Talents)</h3>
        <div className="progression-section-body">
          <p>
            Os <strong>talentos</strong> são habilidades especiais ligadas à sua classe. Pense neles como técnicas
            ou especializações que tornam seu personagem único. Cada classe possui várias <strong>Árvores de
            Talentos</strong> — você escolhe um talento por vez e pode avançar mais fundo na árvore
            conforme ganha níveis.
          </p>

          <div className="progression-highlight" style={{ borderLeftColor: 'var(--talent-color)' }}>
            <div>
              <strong>Quando você ganha talentos:</strong> Todo <strong>nível ímpar</strong> (1, 3, 5, 7, 9, 11, 13, 15, 17, 19).
              Total de <strong>10 talentos</strong> até o nível 20.
            </div>
          </div>

          <h4 className="progression-subsection-title">Árvores de Talentos por Classe</h4>
          <div className="talent-trees-grid">
            {talentTreesByClass.map(cls => (
              <details key={cls.class} className="talent-tree-group">
                <summary className="talent-tree-header">
                  <strong>{cls.class}</strong>
                  <span className="talent-tree-count">{cls.trees.length} árvores</span>
                </summary>
                <div className="talent-tree-body">
                  {cls.trees.map(tree => (
                    <div key={tree.name} className="talent-tree-card">
                      <strong className="talent-tree-name">{tree.name}</strong>
                      <ul className="talent-tree-list">
                        {tree.talents.map(t => {
                          const key = `${cls.class}-${tree.name}-${t.name}`;
                          const open = expandedTalents[key];
                          return (
                            <li key={t.name} className="talent-item">
                              <span className="talent-item-name">{t.name}</span>
                              <button
                                className="talent-item-btn"
                                onClick={() => toggleTalent(key)}
                                aria-label="Ver descrição"
                              >
                                {open ? '−' : '+'}
                              </button>
                              {open && <div className="talent-item-desc">{t.desc}</div>}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATS ===== */}
      <section className="sheet-panel progression-section">
        <h3 className="sheet-panel-title">2. Feats</h3>
        <div className="progression-section-body">
          <p>
            Os <strong>Feats</strong> são treinamentos, técnicas ou aptidões gerais que qualquer personagem pode
            aprender. Eles <strong>não estão ligados à classe</strong>, embora algumas classes concedam feats bônus.
            Feats permitem personalizar seu estilo de jogo — um Jedi com <em>Tiro à Queima-Roupa</em> ou um Soldado
            com <em>Sensibilidade à Força</em> criam combinações únicas.
          </p>

          <div className="progression-highlight" style={{ borderLeftColor: 'var(--feat-color)' }}>
            <div>
              <strong>Quando você ganha Feats:</strong> Níveis <strong>1, 3, 6, 9, 12, 15, 18</strong>.
              Total de <strong>7 feats</strong> até o nível 20 (mais bônus de classe/espécie).
            </div>
          </div>

          <h4 className="progression-subsection-title">Exemplos de Feats</h4>
          <div className="feat-examples-grid">
            {featExamples.map(feat => (
              <div key={feat.name} className="feat-example-card">
                <strong className="feat-example-name">{feat.name}</strong>
                <span className="feat-example-desc">{feat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TALENTS VS FEATS ===== */}
      <section className="sheet-panel progression-section">
        <h3 className="sheet-panel-title">Diferença entre Talentos e Feats</h3>
        <div className="progression-section-body">
          <p>
            Essa é uma das principais dúvidas de novos jogadores. A diferença fundamental:
          </p>
          <div className="comparison-grid">
            <div className="comparison-card comparison-talents">
              <h4>Talents</h4>
              <ul>
                <li>Ligados à sua <strong>classe</strong></li>
                <li>Definem sua <strong>especialização</strong></li>
                <li>Obtidos em <strong>níveis ímpares</strong></li>
                <li>São mais <strong>poderosos</strong> e específicos</li>
                <li>Organizados em <strong>árvores</strong> (pré-requisitos)</li>
              </ul>
            </div>
            <div className="comparison-card comparison-feats">
              <h4>Feats</h4>
              <ul>
                <li>Qualquer personagem pode pegar</li>
                <li>Funcionam como <strong>treinamentos gerais</strong></li>
                <li>Obtidos a cada <strong>3 níveis</strong></li>
                <li>São mais <strong>amplos</strong> e versáteis</li>
                <li>Podem ter pré-requisitos simples</li>
              </ul>
            </div>
          </div>
          <p className="progression-note">
            <em>Os talentos fazem seu personagem ser único dentro da classe, enquanto os Feats permitem
            personalizar o estilo de jogo e criar combinações muito diferentes entre personagens da mesma classe.</em>
          </p>
        </div>
      </section>

      {/* ===== ATTRIBUTES ===== */}
      <section className="sheet-panel progression-section">
        <h3 className="sheet-panel-title">3. Aumento de Atributos</h3>
        <div className="progression-section-body">
          <p>
            Nos níveis <strong>4, 8, 12, 16 e 20</strong>, você aumenta <strong>dois atributos diferentes
            em +1 cada</strong>. Esse aumento é aplicado diretamente no escore, que por sua vez aumenta
            o modificador do atributo.
          </p>

          <div className="progression-highlight" style={{ borderLeftColor: 'var(--stat-color)' }}>
            <div>
              <strong>Exemplo:</strong> DEX 15 &rarr; 16 (modificador vai de +2 para +3) e CON 12 &rarr; 13 (modificador permanece +1).
              Ao final do nível 20, você terá +10 pontos distribuídos em atributos.
            </div>
          </div>

          <div className="attr-progression-visual">
            {[4, 8, 12, 16, 20].map(lvl => (
              <div key={lvl} className="attr-progression-step">
                <div className="attr-progression-level">Nv {lvl}</div>
                <div className="attr-progression-bonus">+2</div>
                <div className="attr-progression-desc">dois atributos</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BAB, HALF LEVEL, DEFENSES ===== */}
      <section className="sheet-panel progression-section">
        <h3 className="sheet-panel-title">4. BAB, Metade do Nível e Defesas</h3>
        <div className="progression-section-body">
          <h4 className="progression-subsection-title">Base Attack Bonus (BAB)</h4>
          <p>
            O <strong>BAB</strong> é seu bônus de ataque base, que aumenta conforme a classe.
            Classes combatentes (Jedi e Soldado) possuem progressão mais rápida (igual ao nível),
            enquanto classes não-combatentes (Nobre, Vigarista) progridem mais devagar (3/4 do nível).
            O BAB determina quantos ataques você pode fazer por rodada e sua precisão em combate.
          </p>

          <h4 className="progression-subsection-title">Bônus de Metade do Nível</h4>
          <p>
            No Saga Edition, muitos testes recebem <strong>+ metade do nível</strong> (arredondado para baixo).
            Esse bônus é aplicado em: ataques, perícias e algumas habilidades.
          </p>
          <div className="half-level-grid">
            {[1, 2, 4, 6, 10, 14, 18, 20].map(lvl => (
              <div key={lvl} className="half-level-item">
                <span className="half-level-lv">Nv {lvl}</span>
                <span className="half-level-bonus">+{Math.floor(lvl / 2)}</span>
              </div>
            ))}
          </div>

          <h4 className="progression-subsection-title">Defesas (Reflexo, Fortitude, Vontade)</h4>
          <p>
            As defesas <strong>Reflexo</strong> (esquivar), <strong>Fortitude</strong> (resistir) e
            <strong>Vontade</strong> (mente) também aumentam conforme você sobe de nível. Cada classe
            tem progressões diferentes — por exemplo, Jedi ganha +2 em Vontade, Soldado ganha +2 em
            Fortitude, Vigarista ganha +2 em Reflexo.
          </p>
        </div>
      </section>

      {/* ===== PRESTIGE CLASSES ===== */}
      <section className="sheet-panel progression-section">
        <h3 className="sheet-panel-title">5. Classes de Prestígio (Nível 8+)</h3>
        <div className="progression-section-body">
          <p>
            A partir do <strong>nível 8</strong>, se cumprir os pré-requisitos, seu personagem pode
            entrar em uma <strong>classe mais especializada</strong>, chamada Classe de Prestígio. Elas
            representam a evolução da carreira do personagem — um Jedi pode se tornar Cavaleiro Jedi,
            um Soldado pode virar Tropa de Elite, um Vigarista pode se tornar Senhor do Crime.
          </p>
          <div className="prestige-grid">
            {prestigeClasses.map(pc => (
              <div key={pc.name} className="prestige-card">
                <div className="prestige-header">
                  <strong className="prestige-name">{pc.name}</strong>
                  <span className="prestige-level">Nv {pc.level}+</span>
                </div>
                <div className="prestige-reqs">
                  <span className="prestige-reqs-label">Pré-requisitos:</span>
                  <span className="prestige-reqs-text">{pc.requirements}</span>
                </div>
                <p className="prestige-desc">{pc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLASS HP TABLE ===== */}
      <section className="sheet-panel" style={{ marginBottom: 24 }}>
        <h3 className="sheet-panel-title">Pontos de Vida por Classe</h3>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
          Todo nível você ganha HP de acordo com sua classe. No 1º nível você recebe o valor cheio
          do dado de vida + modificador de Constituição. Nos níveis seguintes, recebe metade do dado + CON.
        </p>
        <div className="progression-class-grid">
          {classHp.map(cls => (
            <div key={cls.name} className="progression-class-card">
              <strong>{cls.name}</strong>
              <span>d{cls.die}</span>
              <span className="hp-detail">1º: +{cls.hp1} + CON</span>
              <span className="hp-detail">Seguintes: +{cls.hpNext} + CON</span>
              <span className="hp-detail">{cls.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROGRESSION TABLE ===== */}
      <section className="sheet-panel" style={{ marginBottom: 24 }}>
        <h3 className="sheet-panel-title">Tabela de Progressão</h3>
        <div className="progression-table-wrapper">
          <table className="progression-table">
            <thead>
              <tr>
                <th>Nv</th>
                <th>Bônus Metade</th>
                <th>Feats</th>
                <th>Talento</th>
                <th>Atributos</th>
                <th>HP</th>
              </tr>
            </thead>
            <tbody>
              {progression.map(row => (
                <tr key={row.level} className={row.level % 2 === 0 ? 'even' : ''}>
                  <td className="prog-level">{row.level}</td>
                  <td className="prog-half">+{Math.floor(row.level / 2)}</td>
                  <td className="prog-feats">{row.feats > 0 ? `+${row.feats}` : '-'}</td>
                  <td className="prog-talents">{row.talents > 0 ? `+${row.talents}` : '-'}</td>
                  <td className="prog-stats">{row.stats > 0 ? `+${row.stats}` : '-'}</td>
                  <td className="prog-hp">{row.hpBonus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== PER-LEVEL DETAILS ===== */}
      <section className="sheet-panel" style={{ marginBottom: 24 }}>
        <h3 className="sheet-panel-title">Detalhamento por Nível</h3>
        <div className="progression-details">
          {progression.map(row => (
            <details key={row.level} className="progression-detail-item">
              <summary className="progression-detail-header">
                <span className="prog-detail-level">Nível {row.level}</span>
                <span className="prog-detail-summary">
                  {row.feats > 0 && 'Feat '}
                  {row.talents > 0 && 'Talento '}
                  {row.stats > 0 && '+Atributos '}
                  {row.level === 1 && 'Nível inicial'}
                </span>
              </summary>
              <div className="progression-detail-body">
                <p>{row.desc}</p>
                <ul>
                  {row.level === 1 && (
                    <>
                      <li>Ganha <strong>{row.feats} feat</strong> inicial (+1 bônus humano se aplicável)</li>
                      <li>Ganha <strong>{row.talents} talento</strong> de uma árvore disponível</li>
                      <li>Escolhe perícias treinadas com base na classe</li>
                    </>
                  )}
                  {row.feats > 0 && row.level > 1 && <li>Ganha <strong>{row.feats} feat</strong> (geral ou de classe)</li>}
                  {row.talents > 0 && row.level > 1 && <li>Ganha <strong>{row.talents} talento</strong> de uma árvore disponível</li>}
                  {row.stats > 0 && <li>Aumenta <strong>dois atributos</strong> diferentes em +1</li>}
                  <li>Bônus de <strong>metade do nível</strong> aumenta para +{Math.floor(row.level / 2)}</li>
                  <li>Ganha <strong>{row.hpBonus}</strong> pontos de vida</li>
                  {row.level >= 8 && row.level % 2 === 0 && <li><strong>Pode entrar em Classes de Prestígio</strong> se cumprir os pré-requisitos</li>}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ===== RESUMO ===== */}
      <section className="sheet-panel">
        <h3 className="sheet-panel-title">Resumo Rápido</h3>
        <div className="quick-summary">
          <div className="quick-summary-row header">
            <span>Nível</span>
            <span>O que você ganha</span>
          </div>
          <div className="quick-summary-row">
            <span>Todo nível</span>
            <span>HP, BAB, Defesas e +½ nível em vários testes</span>
          </div>
          <div className="quick-summary-row">
            <span>Níveis ímpares</span>
            <span><strong>1 Talento</strong></span>
          </div>
          <div className="quick-summary-row">
            <span>1, 3, 6, 9, 12...</span>
            <span><strong>1 Feat</strong></span>
          </div>
          <div className="quick-summary-row">
            <span>4, 8, 12, 16, 20</span>
            <span><strong>+1</strong> em dois atributos diferentes</span>
          </div>
          <div className="quick-summary-row">
            <span>Nível 8+</span>
            <span>Pode entrar em <strong>Classes de Prestígio</strong></span>
          </div>
        </div>
      </section>
    </div>
  );
}
