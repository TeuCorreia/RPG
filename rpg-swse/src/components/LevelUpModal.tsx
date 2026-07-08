import { useState } from 'react';
import type { Character, AttributeName, HeroicClass } from '../types';
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
  const existingNames = new Set(character.classes.map(c => c.name));
  const availableClasses = classList.filter(c => !existingNames.has(c.name));

  const [addingNew, setAddingNew] = useState(false);
  const [selectedClass, setSelectedClass] = useState<HeroicClass>(
    character.classes[0]?.name
  );
  const hpGain = getHpGain(selectedClass, conMod);
  const cls = classList.find(c => c.name === selectedClass);

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

    const isNew = !existingNames.has(selectedClass);
    const updatedClasses = isNew
      ? [...character.classes, { name: selectedClass, level: 1 }]
      : character.classes.map(ce =>
          ce.name === selectedClass ? { ...ce, level: ce.level + 1 } : ce
        );

    const updates: Partial<Character> = {
      level: nextLevel,
      classes: updatedClasses,
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
          <p className="levelup-desc">Escolha uma classe para avançar ou adicione uma nova.</p>
        </div>

        {/* Class Selector */}
        <div className="levelup-section">
          <span className="levelup-icon material-symbols-outlined">switch_account</span>
          <div style={{ flex: 1 }}>
            <strong>Avançar / Adicionar Classe</strong>
            <div className="levelup-class-grid">
              {character.classes.map(ce => {
                const isSelected = !addingNew && ce.name === selectedClass;
                return (
                  <button
                    key={ce.name}
                    className={`levelup-class-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => { setSelectedClass(ce.name); setAddingNew(false); }}
                  >
                    <span className="class-name">{ce.name}</span>
                    <span className="class-level">{ce.level} → {ce.level + 1}</span>
                  </button>
                );
              })}
              {availableClasses.length > 0 && !addingNew && (
                <button
                  className="levelup-class-btn levelup-class-add"
                  onClick={() => setAddingNew(true)}
                >
                  <span className="class-name" style={{ fontSize: 20 }}>+</span>
                  <span className="class-level">Nova Classe</span>
                </button>
              )}
            </div>
            {addingNew && (
              <>
                <div className="levelup-class-grid" style={{ marginTop: 8 }}>
                  {availableClasses.map(ac => (
                    <button
                      key={ac.name}
                      className={`levelup-class-btn ${selectedClass === ac.name ? 'selected' : ''}`}
                      onClick={() => setSelectedClass(ac.name)}
                    >
                      <span className="class-name">{ac.name}</span>
                      <span className="class-level">Nível 1</span>
                    </button>
                  ))}
                </div>
                {selectedClass && (
                  <div className="levelup-class-detail">
                    <p className="levelup-class-detail-desc">
                      {classList.find(c => c.name === selectedClass)?.description?.split('.')[0]}.
                    </p>
                    <div className="levelup-class-detail-stats">
                      {(() => {
                        const cd = classList.find(c => c.name === selectedClass)!;
                        const defs = cd.defenseBonuses;
                        return (
                          <>
                            <div className="lcd-item">
                              <span className="lcd-label">HP</span>
                              <span className="lcd-value">+{Math.floor(cd.hpPerLevel / 2)} + CON</span>
                            </div>
                            <div className="lcd-item">
                              <span className="lcd-label">Ref</span>
                              <span className="lcd-value">{defs.reflex > 0 ? `+${defs.reflex}` : '—'}</span>
                            </div>
                            <div className="lcd-item">
                              <span className="lcd-label">Fort</span>
                              <span className="lcd-value">{defs.fortitude > 0 ? `+${defs.fortitude}` : '—'}</span>
                            </div>
                            <div className="lcd-item">
                              <span className="lcd-label">Von</span>
                              <span className="lcd-value">{defs.will > 0 ? `+${defs.will}` : '—'}</span>
                            </div>
                            <div className="lcd-item">
                              <span className="lcd-label">Atributos</span>
                              <span className="lcd-value">{cd.keyAbilities.join(', ')}</span>
                            </div>
                            <div className="lcd-item">
                              <span className="lcd-label">Perícias</span>
                              <span className="lcd-value">{cd.trainedSkills} + INT</span>
                            </div>
                            <div className="lcd-item lcd-full">
                              <span className="lcd-label">Árvores de Talento</span>
                              <span className="lcd-value">{cd.talentTrees.join(', ')}</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="levelup-section">
          <span className="levelup-icon material-symbols-outlined">favorite</span>
          <div>
            <strong>+{hpGain} HP</strong>
            <small>{cls?.name}: {cls?.hpPerLevel}/2 + CON ({conMod >= 0 ? '+' : ''}{conMod})</small>
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
            {addingNew ? `${selectedClass} — Nível 1` : `${selectedClass} — Nível ${(character.classes.find(ce => ce.name === selectedClass)?.level ?? 0) + 1}`}
          </button>
        </div>
      </div>
    </div>
  );
}
