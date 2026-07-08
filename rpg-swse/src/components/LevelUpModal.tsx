import { useState } from 'react';
import type { Character, AttributeName } from '../types';
import { getHpGain, getLevelUpGains, getAbilityModifier } from '../utils/calculations';
import { classList } from '../data/classes';

interface Props {
  character: Character;
  onConfirm: (updates: Partial<Character>) => void;
  onClose: () => void;
}

const attrNames: AttributeName[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
const attrLabels: Record<AttributeName, string> = {
  STR: 'Força', DEX: 'Destreza', CON: 'Constituição',
  INT: 'Inteligência', WIS: 'Sabedoria', CHA: 'Carisma',
};

export function LevelUpModal({ character, onConfirm, onClose }: Props) {
  const nextLevel = character.level + 1;
  const gains = getLevelUpGains(nextLevel);
  const conMod = getAbilityModifier(character.attributes.CON);
  const hpGain = getHpGain(character.heroicClass, conMod);
  const cls = classList.find(c => c.name === character.heroicClass);

  const [featName, setFeatName] = useState('');
  const [talentName, setTalentName] = useState('');
  const [selectedAttrs, setSelectedAttrs] = useState<AttributeName[]>([]);

  function toggleAttr(attr: AttributeName) {
    if (selectedAttrs.includes(attr)) {
      setSelectedAttrs(selectedAttrs.filter(a => a !== attr));
    } else if (selectedAttrs.length < gains.stats) {
      setSelectedAttrs([...selectedAttrs, attr]);
    }
  }

  function handleLevelUp() {
    if (gains.stats > 0 && selectedAttrs.length < gains.stats) return;

    const updatedAttrs = { ...character.attributes };
    selectedAttrs.forEach(attr => { updatedAttrs[attr] += 1; });

    const updates: Partial<Character> = {
      level: nextLevel,
      attributes: updatedAttrs,
      currentHp: character.currentHp + hpGain,
    };

    if (featName.trim()) {
      updates.feats = [...character.feats, featName.trim()];
    }
    if (talentName.trim()) {
      updates.talents = [...character.talents, talentName.trim()];
    }

    onConfirm(updates);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content levelup-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Subir para Nível {nextLevel}</h2>

        <div className="levelup-summary">
          <div className="levelup-badge">{character.level} → {nextLevel}</div>
          <p className="levelup-desc">
            {cls?.description?.split('.')[0]}.
          </p>
        </div>

        <div className="levelup-section">
          <span className="levelup-icon material-symbols-outlined">favorite</span>
          <div>
            <strong>+{hpGain} HP</strong>
            <small>{cls?.hpPerLevel}/2 + CON ({conMod >= 0 ? '+' : ''}{conMod})</small>
          </div>
        </div>

        <div className="levelup-section">
          <span className="levelup-icon material-symbols-outlined">bolt</span>
          <div>
            <strong>Metade do nível</strong>
            <small>Bônus aumenta para +{Math.floor(nextLevel / 2)}</small>
          </div>
        </div>

        {gains.feat && (
          <div className="levelup-section">
            <span className="levelup-icon material-symbols-outlined">stars</span>
            <div style={{ flex: 1 }}>
              <strong>Novo Feat</strong>
              <input
                className="levelup-input"
                placeholder="Nome do feat..."
                value={featName}
                onChange={e => setFeatName(e.target.value)}
              />
            </div>
          </div>
        )}

        {gains.talent && (
          <div className="levelup-section">
            <span className="levelup-icon material-symbols-outlined">auto_awesome</span>
            <div style={{ flex: 1 }}>
              <strong>Novo Talento</strong>
              <input
                className="levelup-input"
                placeholder="Nome do talento..."
                value={talentName}
                onChange={e => setTalentName(e.target.value)}
              />
            </div>
          </div>
        )}

        {gains.stats > 0 && (
          <div className="levelup-section levelup-stats">
            <span className="levelup-icon material-symbols-outlined">trending_up</span>
            <div style={{ flex: 1 }}>
              <strong>Aumentar {gains.stats} Atributos</strong>
              <small>Selecione {gains.stats} atributos para +1</small>
              <div className="levelup-attr-grid">
                {attrNames.map(attr => {
                  const selected = selectedAttrs.includes(attr);
                  const locked = selectedAttrs.length >= gains.stats && !selected;
                  return (
                    <button
                      key={attr}
                      className={`levelup-attr-btn ${selected ? 'selected' : ''} ${locked ? 'locked' : ''}`}
                      onClick={() => !locked && toggleAttr(attr)}
                    >
                      <span className="attr-abbr">{attr}</span>
                      <span className="attr-val">{character.attributes[attr]} → {character.attributes[attr] + (selected ? 1 : 0)}</span>
                      <span className="attr-label">{attrLabels[attr]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="levelup-actions">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button
            className="btn-primary"
            onClick={handleLevelUp}
            disabled={gains.stats > 0 && selectedAttrs.length < gains.stats}
          >
            Subir para Nível {nextLevel}
          </button>
        </div>
      </div>
    </div>
  );
}
