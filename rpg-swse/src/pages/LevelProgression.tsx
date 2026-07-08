const progression = [
  { level: 1, feats: 1, talents: 1, stats: 0, hpBonus: 'Classe + CON', desc: 'Primeiro nível: perícias iniciais, talento bônus humano (se aplicável), +1 talento de árvore.' },
  { level: 2, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento de qualquer árvore que você tenha acesso.' },
  { level: 3, feats: 1, talents: 0, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo feat (geral ou da sua lista de classe).' },
  { level: 4, feats: 0, talents: 0, stats: 2, hpBonus: 'Metade do dado de vida + CON', desc: 'Aumenta dois atributos diferentes em +1.' },
  { level: 5, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 6, feats: 1, talents: 0, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo feat.' },
  { level: 7, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 8, feats: 1, talents: 0, stats: 2, hpBonus: 'Metade do dado de vida + CON', desc: 'Aumenta dois atributos diferentes em +1. Ganha um novo feat.' },
  { level: 9, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 10, feats: 1, talents: 0, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo feat.' },
  { level: 11, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 12, feats: 1, talents: 0, stats: 2, hpBonus: 'Metade do dado de vida + CON', desc: 'Aumenta dois atributos diferentes em +1. Ganha um novo feat.' },
  { level: 13, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 14, feats: 1, talents: 0, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo feat.' },
  { level: 15, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 16, feats: 1, talents: 0, stats: 2, hpBonus: 'Metade do dado de vida + CON', desc: 'Aumenta dois atributos diferentes em +1. Ganha um novo feat.' },
  { level: 17, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 18, feats: 1, talents: 0, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo feat.' },
  { level: 19, feats: 0, talents: 1, stats: 0, hpBonus: 'Metade do dado de vida + CON', desc: 'Ganha um novo talento.' },
  { level: 20, feats: 1, talents: 0, stats: 2, hpBonus: 'Metade do dado de vida + CON', desc: 'Aumenta dois atributos diferentes em +1. Ganha um novo feat.' },
];

const classHp = [
  { name: 'Jedi', die: 'd8', hp1: 8, hpNext: 4 },
  { name: 'Nobre', die: 'd6', hp1: 6, hpNext: 3 },
  { name: 'Vigarista', die: 'd6', hp1: 6, hpNext: 3 },
  { name: 'Explorador', die: 'd8', hp1: 8, hpNext: 4 },
  { name: 'Soldado', die: 'd10', hp1: 10, hpNext: 5 },
  { name: 'Mundano', die: 'd4', hp1: 4, hpNext: 2 },
];

export function LevelProgression() {
  return (
    <div className="level-progression">
      <h1 className="progression-title">Progressão por Nível</h1>
      <p className="progression-subtitle">
        A cada nível, seu personagem evolui. Veja o que cada nível concede.
      </p>

      {/* Tabela de HP por Classe */}
      <section className="sheet-panel" style={{ marginBottom: 24 }}>
        <h3 className="sheet-panel-title">Vida por Classe</h3>
        <div className="progression-class-grid">
          {classHp.map(cls => (
            <div key={cls.name} className="progression-class-card">
              <strong>{cls.name}</strong>
              <span>d{cls.die}</span>
              <span className="hp-detail">1º: +{cls.hp1} + CON</span>
              <span className="hp-detail">Seguintes: +{cls.hpNext} + CON</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tabela de Progressão */}
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

      {/* Detalhamento */}
      <section className="sheet-panel" style={{ marginTop: 24, marginBottom: 24 }}>
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
                      <li>Ganha <strong>{row.talents} talento</strong> de uma árvente disponível</li>
                      <li>Escolhe perícias treinadas com base na classe</li>
                    </>
                  )}
                  {row.feats > 0 && row.level > 1 && <li>Ganha <strong>{row.feats} feat</strong> (geral ou de classe)</li>}
                  {row.talents > 0 && row.level > 1 && <li>Ganha <strong>{row.talents} talento</strong> de uma árvore disponível</li>}
                  {row.stats > 0 && <li>Aumenta <strong>dois atributos</strong> diferentes em +1</li>}
                  <li>Bônus de <strong>metade do nível</strong> aumenta para +{Math.floor(row.level / 2)}</li>
                  <li>Ganha <strong>{row.hpBonus}</strong> pontos de vida</li>
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
