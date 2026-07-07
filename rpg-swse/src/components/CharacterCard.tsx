import type { Character } from '../types';
import { calculateMaxHp } from '../utils/calculations';

interface Props {
  character: Character;
  onClick: () => void;
  onDelete?: () => void;
}

const classColors: Record<string, string> = {
  Jedi: '#4a7dff',
  Nobre: '#8b5cf6',
  Vigarista: '#f59e0b',
  Explorador: '#10b981',
  Soldado: '#ef4444',
};

export function CharacterCard({ character, onClick, onDelete }: Props) {
  const maxHp = calculateMaxHp(character);
  const maxFp = 5 + Math.floor(character.level / 2);
  const color = classColors[character.heroicClass] || '#4a7dff';
  const hpPct = Math.min(100, Math.round((character.currentHp / maxHp) * 100));
  const xpNeeded = character.level * 1000;
  const xpPct = Math.min(100, Math.round((character.xp / xpNeeded) * 100));

  const displayedAttrs = ['STR', 'DEX', 'CHA'] as const;

  const speciesColorMap: Record<string, string> = {
    Humano: '#4a7dff', Bothan: '#8b5cf6', Cereano: '#06b6d4', Droide: '#64748b',
    Ewok: '#84cc16', Gungan: '#10b981', Ithoriano: '#22c55e', 'Kel Dor': '#e94560',
    'Mon Calamari': '#0ea5e9', Quarren: '#6366f1', Rodiano: '#ef4444',
    Sullustano: '#f97316', "Twi'lek": '#d946ef', Wookiee: '#a16207', Zabrak: '#dc2626',
  };
  const speciesColor = speciesColorMap[character.species] || '#4a7dff';
  const initial = character.species.charAt(0).toUpperCase();

  return (
    <div className="char-card glass-panel" onClick={onClick} style={{ borderTopColor: color }}>
      <div className="char-card-image">
        {character.image ? (
          <img src={character.image} alt={character.name} />
        ) : (
          <div style={{
            width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `linear-gradient(135deg, ${speciesColor}22, ${speciesColor}44)`,
          }}>
            <span style={{
              width: 64, height: 64, borderRadius: '50%', background: speciesColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 700, color: 'white',
            }}>{initial}</span>
          </div>
        )}
        <div className="char-card-image-fade" />
        <div className="char-card-badge" style={{ background: `${color}33`, color, border: `1px solid ${color}55` }}>
          {character.heroicClass}
        </div>
      </div>
      <div className="char-card-body">
        <h3>{character.name}</h3>
        <div className="char-card-level">
          Nv. {character.level} — {character.species}
        </div>
        <div className="char-card-bars">
          <div>
            <div className="char-bar">
              <div className="char-bar-fill hp" style={{ width: `${hpPct}%` }} />
            </div>
            <div className="char-bar-labels">
              <span>HP</span>
              <span>{character.currentHp}/{maxHp}</span>
            </div>
          </div>
          <div>
            <div className="char-bar">
              <div className="char-bar-fill fp" style={{ width: '100%' }} />
            </div>
            <div className="char-bar-labels">
              <span>FP</span>
              <span>{maxFp}/{maxFp}</span>
            </div>
          </div>
          <div>
            <div className="char-bar">
              <div className="char-bar-fill xp" style={{ width: `${xpPct}%` }} />
            </div>
            <div className="char-bar-labels">
              <span>XP</span>
              <span>{character.xp}/{xpNeeded}</span>
            </div>
          </div>
        </div>
        <div className="char-card-attrs">
          {displayedAttrs.map(attr => (
            <div key={attr} className="char-card-attr">
              <span className="char-card-attr-value">{character.attributes[attr]}</span>
              <span className="char-card-attr-label">{attr}</span>
            </div>
          ))}
        </div>
      </div>
      {onDelete && (
        <button
          className="btn-delete"
          onClick={e => { e.stopPropagation(); onDelete(); }}
          style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
        >
          <span className="icon" style={{ fontSize: 18, color: '#e94560' }}>delete</span>
        </button>
      )}
    </div>
  );
}
