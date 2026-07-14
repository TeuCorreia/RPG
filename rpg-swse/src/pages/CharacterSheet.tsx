import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { SkillName, AttributeName, Weapon, Character, InventoryItem, CharacterFeat, CharacterTalent, CharacterForcePower } from '../types';
import { useCharacters } from '../hooks/useCharacter';
import { useDiceRoller } from '../hooks/useDiceRoller';
import { AttributeBlock } from '../components/AttributeBlock';
import { SkillsList } from '../components/SkillsList';

import { DiceRoller } from '../components/DiceRoller';
import { LevelUpModal } from '../components/LevelUpModal';
import InventoryList from '../components/inventory/InventoryList';
import FeatEditor from '../components/abilities/FeatEditor';
import TalentEditor from '../components/abilities/TalentEditor';
import ForcePowerEditor from '../components/force/ForcePowerEditor';
import PrestigeClassEditor from '../components/prestige/PrestigeClassEditor';
import { calculateDefense, calculateMaxHp, calculateSkillModifier, calculateForcePoints, getAbilityModifier, calculateXpForLevel } from '../utils/calculations';
import { speciesList } from '../data/species';

type Tab = 'combate' | 'habilidades' | 'rituais' | 'inventario' | 'descricao' | 'prestigio';

export function CharacterSheet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, update, remove } = useCharacters();
  const roller = useDiceRoller();
  const [char, setChar] = useState<Character | undefined>(getById(id || ''));
  const [editMode, setEditMode] = useState(false);
  const [tab, setTab] = useState<Tab>('combate');
  const [newWeapon, setNewWeapon] = useState<Weapon>({ name: '', attackBonus: 0, damage: '', critRange: '20', type: '', weight: 0 });
  const [showRoller, setShowRoller] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    setChar(getById(id || ''));
  }, [id, getById]);

  if (!char) return (
    <div className="not-found">
      <h1>Personagem não encontrado</h1>
      <button className="btn-primary" onClick={() => navigate('/dashboard')}>Voltar</button>
    </div>
  );

  const c = char;
  const baseMaxHp = calculateMaxHp(c);
  const baseMaxFp = calculateForcePoints(c.level);
  const maxHp = c.hpOverride ?? baseMaxHp;
  const maxFp = c.fpOverride ?? baseMaxFp;
  const baseDefenses = {
    reflex: calculateDefense('reflex', c),
    fortitude: calculateDefense('fortitude', c),
    will: calculateDefense('will', c),
  };
  const defenses = [
    { key: 'reflex' as const, label: 'Reflexo', value: c.reflexOverride ?? baseDefenses.reflex },
    { key: 'fortitude' as const, label: 'Fortitude', value: c.fortitudeOverride ?? baseDefenses.fortitude },
    { key: 'will' as const, label: 'Vontade', value: c.willOverride ?? baseDefenses.will },
  ];
  const overrideMap: Record<string, string> = { reflex: 'reflexOverride', fortitude: 'fortitudeOverride', will: 'willOverride' };
  const hpPct = Math.min(100, Math.round((c.currentHp / maxHp) * 100));

  const attrLabels: Record<AttributeName, string> = { STR: 'Força', DEX: 'Destreza', CON: 'Constituição', INT: 'Inteligência', WIS: 'Sabedoria', CHA: 'Carisma' };
  const defenseIcons: Record<string, string> = { Reflexo: 'shield', Fortitude: 'fitness_center', Vontade: 'psychology' };

  function updateChar(partial: Partial<Character>) {
    const updated = { ...c, ...partial } as Character;
    setChar(updated);
    update(updated);
  }

  function handleRollSkill(skill: SkillName) {
    roller.rollD20(calculateSkillModifier(skill, c));
    setShowRoller(true);
  }

  function handleRollAttribute(attr: AttributeName) {
    roller.rollD20(getAbilityModifier(c.attributes[attr]));
    setShowRoller(true);
  }

  function addWeapon() {
    if (!newWeapon.name) return;
    updateChar({ weapons: [...c.weapons, { ...newWeapon }] });
    setNewWeapon({ name: '', attackBonus: 0, damage: '', critRange: '20', type: '', weight: 0 });
  }

  function removeWeapon(index: number) {
    updateChar({ weapons: c.weapons.filter((_, i) => i !== index) });
  }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'combate', label: 'Combate', icon: 'swords' },
    { key: 'habilidades', label: 'Perícias', icon: 'psychology' },
    { key: 'rituais', label: 'Habilidades', icon: 'auto_stories' },
    { key: 'inventario', label: 'Inventário', icon: 'inventory_2' },
    { key: 'descricao', label: 'Descrição', icon: 'description' },
    ...(c.level >= 8 ? [{ key: 'prestigio' as Tab, label: 'Prestígio', icon: 'military_tech' }] : []),
  ];

  return (
    <div className="sheet-v2">
      {/* Header */}
      <header className="sheet-header-v2">
        <button className="sheet-back" onClick={() => navigate('/dashboard')}>
          <span className="icon" style={{ fontSize: 16 }}>arrow_back</span>
          Voltar
        </button>
        <h1 className="sheet-name">{c.name}</h1>
        <div className="sheet-badges">
          <span className="sheet-badge sheet-badge-species">{c.species}</span>
          {c.classes.map(ce => (
            <span key={ce.name} className="sheet-badge sheet-badge-class">{ce.name} {ce.level}</span>
          ))}
          {c.prestigeClass && (
            <span className="sheet-badge sheet-badge-prestige">{c.prestigeClass.className} {c.prestigeClass.level}</span>
          )}
          <span className="sheet-badge sheet-badge-neutral">Nível {c.level}</span>
          <span className="sheet-badge sheet-badge-neutral">XP: {c.xp}</span>
          {c.credits > 0 && <span className="sheet-badge sheet-badge-credits">{c.credits} Cr</span>}
        </div>

        {/* XP Bar */}
        <div className="sheet-xp-bar">
          {editMode ? (
            <div className="sheet-xp-edit">
              <span className="sheet-xp-label">XP:</span>
              <input
                type="number"
                className="sheet-xp-input"
                value={c.xp}
                onChange={e => updateChar({ xp: Math.max(0, parseInt(e.target.value) || 0) })}
                min={0}
              />
            </div>
          ) : (
            <>
              <div className="sheet-xp-track">
                <div
                  className="sheet-xp-fill"
                  style={{ width: `${c.level >= 20 ? 100 : Math.min(100, ((c.xp - calculateXpForLevel(c.level)) / (calculateXpForLevel(c.level + 1) - calculateXpForLevel(c.level))) * 100)}%` }}
                />
              </div>
              <span className="sheet-xp-label">
                {c.xp} / {c.level >= 20 ? '—' : calculateXpForLevel(c.level + 1)} XP
              </span>
              {c.level < 20 && (
                <button className="sheet-btn sheet-btn-levelup" onClick={() => setShowLevelUp(true)} disabled={c.xp < calculateXpForLevel(c.level + 1)}>
                  <span className="icon" style={{ fontSize: 18, color: 'var(--gold)' }}>trending_up</span>
                  Subir
                </button>
              )}
            </>
          )}
        </div>

        <div className="sheet-actions">
          <button className="sheet-btn" onClick={() => setEditMode(!editMode)}>
            <span className="icon" style={{ fontSize: 18 }}>{editMode ? 'visibility' : 'edit'}</span>
            {editMode ? 'Visualizar' : 'Editar'}
          </button>
          <button className="sheet-btn sheet-btn-dice" onClick={() => setShowRoller(!showRoller)} title="Rolar Dados">
            <span className="icon" style={{ fontSize: 20 }}>casino</span>
          </button>
          <button className="sheet-btn sheet-btn-danger" onClick={() => { if (confirm('Excluir este personagem?')) { remove(c.id); navigate('/dashboard'); } }}>
            <span className="icon" style={{ fontSize: 18 }}>delete</span>
            Excluir
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="sheet-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`sheet-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'combate' && (
        <div className="combat-grid">
          <div className="combat-left">
            {/* Attributes */}
            <section className="sheet-panel">
              <h3 className="sheet-panel-title">Atributos</h3>
              <div className="attr-grid-v2">
                {(Object.keys(c.attributes) as AttributeName[]).map(attr => {
                  const mod = getAbilityModifier(c.attributes[attr]);
                  const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
                  if (editMode) {
                    return (
                      <AttributeBlock
                        key={attr}
                        name={attr}
                        score={c.attributes[attr]}
                        onChange={v => updateChar({ attributes: { ...c.attributes, [attr]: v } })}
                        onRoll={() => handleRollAttribute(attr)}
                        readonly={!editMode}
                      />
                    );
                  }
                  return (
                    <div key={attr} className="attr-card-v2" onClick={() => handleRollAttribute(attr)} style={{ cursor: 'pointer' }}>
                      <div className="attr-card-v2-label">{attrLabels[attr]}</div>
                      <div className="attr-card-v2-abbr">{attr}</div>
                      <div className="attr-card-v2-score">{c.attributes[attr]}</div>
                      <div className="attr-card-v2-mod">{modStr}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* HP & FP */}
            <div className="hp-fp-grid">
              <section className="sheet-panel hp-bar-section">
                <div className="hp-header">
                  <span className="hp-header-label">HP</span>
                  <span className="hp-header-value">
                    {editMode ? (
                      <input
                        type="number"
                        className="hp-edit-input"
                        value={c.currentHp}
                        onChange={e => updateChar({ currentHp: parseInt(e.target.value) || 0 })}
                      />
                    ) : (
                      <span className="hp-current">{c.currentHp}</span>
                    )}
                    <span className="hp-sep">/</span>
                    {editMode ? (
                      <input
                        type="number"
                        className="hp-edit-input hp-edit-input-max"
                        value={maxHp}
                        onChange={e => updateChar({ hpOverride: parseInt(e.target.value) || 0 })}
                      />
                    ) : (
                      <span className="hp-max">{maxHp}</span>
                    )}
                  </span>
                </div>
                <div className="hp-bar-track">
                  <div className="hp-bar-fill hp" style={{ width: `${hpPct}%` }} />
                </div>
                <div className="hp-controls">
                  <button className="inc-btn" onClick={() => updateChar({ currentHp: Math.max(0, c.currentHp - 1) })} title="-1 HP">
                    <span className="icon">remove</span>
                  </button>
                  <button className="inc-btn inc-btn-heal" onClick={() => updateChar({ currentHp: c.currentHp + 1 })} title="+1 HP">
                    <span className="icon">add</span>
                  </button>
                </div>
              </section>
              <section className="sheet-panel hp-bar-section">
                <div className="hp-header">
                  <span className="hp-header-label">FP</span>
                  <span className="hp-header-value">
                    {editMode ? (
                      <input
                        type="number"
                        className="hp-edit-input"
                        value={c.currentFp ?? maxFp}
                        onChange={e => updateChar({ currentFp: parseInt(e.target.value) || 0 })}
                      />
                    ) : (
                      <span className="hp-current">{c.currentFp ?? maxFp}</span>
                    )}
                    <span className="hp-sep">/</span>
                    {editMode ? (
                      <input
                        type="number"
                        className="hp-edit-input hp-edit-input-max"
                        value={maxFp}
                        onChange={e => updateChar({ fpOverride: parseInt(e.target.value) || 0 })}
                      />
                    ) : (
                      <span className="hp-max">{maxFp}</span>
                    )}
                  </span>
                </div>
                <div className="hp-bar-track">
                  <div className="hp-bar-fill fp" style={{ width: `${Math.min(100, ((c.currentFp ?? maxFp) / maxFp) * 100)}%` }} />
                </div>
                <div className="hp-controls">
                  <button className="inc-btn" onClick={() => updateChar({ currentFp: Math.max(0, (c.currentFp ?? maxFp) - 1) })} title="-1 FP">
                    <span className="icon">remove</span>
                  </button>
                  <button className="inc-btn inc-btn-fp" onClick={() => updateChar({ currentFp: (c.currentFp ?? maxFp) + 1 })} title="+1 FP">
                    <span className="icon">add</span>
                  </button>
                </div>
              </section>
            </div>

            {/* Destination Points */}
            <section className="sheet-panel">
              <h3 className="sheet-panel-title">Pontos de Destino</h3>
              {editMode ? (
                <div className="destination-points-display">
                  <input
                    type="number"
                    className="hp-edit-input"
                    style={{ width: 56, fontSize: 18 }}
                    value={c.destinationPoints}
                    onChange={e => updateChar({ destinationPoints: Math.max(0, parseInt(e.target.value) || 0) })}
                    min={0}
                  />
                  <span className="destination-points-label">ponto{c.destinationPoints !== 1 ? 's' : ''}</span>
                </div>
              ) : (
                <div className="destination-points-display">
                  <div className="destination-points-value">{c.destinationPoints}</div>
                  <span className="destination-points-label">ponto{c.destinationPoints !== 1 ? 's' : ''}</span>
                </div>
              )}
            </section>
          </div>

          <div className="combat-right">
            {/* Defenses */}
            <section className="sheet-panel">
              <h3 className="sheet-panel-title">Defesas</h3>
              <div className="defense-grid-v2">
                {defenses.map(d => (
                  <div key={d.label} className="defense-circle">
                    {editMode ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <input
                          type="number"
                          className="hp-edit-input"
                          style={{ width: 56, fontSize: 18 }}
                          value={d.value}
                          onChange={e => {
                            updateChar({ [overrideMap[d.key]]: parseInt(e.target.value) || 0 });
                          }}
                        />
                        <span className="defense-circle-label">{d.label}</span>
                      </div>
                    ) : (
                      <>
                        <div className="defense-circle-ring">
                          <span className="defense-value">{d.value}</span>
                          <div className="defense-icon">
                            <span className="icon">{defenseIcons[d.label]}</span>
                          </div>
                        </div>
                        <span className="defense-circle-label">{d.label}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Weapons */}
            <section className="sheet-panel">
              <div className="weapons-header">
                <h3 className="sheet-panel-title" style={{ border: 'none', padding: 0, margin: 0 }}>Armas</h3>
                {editMode && (
                  <button onClick={() => document.getElementById('new-weapon-name')?.focus()}>
                    <span className="icon" style={{ fontSize: 16 }}>add</span>
                    Nova Arma
                  </button>
                )}
              </div>
              {c.weapons.length === 0 ? (
                <div className="weapons-empty">
                  <span className="icon">swords</span>
                  <p>Nenhuma arma equipada</p>
                </div>
              ) : (
                c.weapons.map((w, i) => (
                  <div key={i} className="weapon-item" onClick={() => {
                    const bonus = (w.attackBonus || 0) + Math.floor(c.level / 2);
                    roller.rollD20(bonus);
                    setShowRoller(true);
                  }}>
                    <span className="weapon-name">{w.name}</span>
                    <div className="weapon-info">
                      <span>ATQ +{w.attackBonus + Math.floor(c.level / 2)}</span>
                      <span>{w.damage}</span>
                      <span>Crit {w.critRange}</span>
                      {editMode && (
                        <button
                          className="btn-small btn-danger"
                          onClick={e => { e.stopPropagation(); removeWeapon(i); }}
                          style={{ padding: '2px 6px', fontSize: 10 }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
              {editMode && (
                <div className="edit-add-row">
                  <input id="new-weapon-name" placeholder="Nome" value={newWeapon.name} onChange={e => setNewWeapon({ ...newWeapon, name: e.target.value })} />
                  <input placeholder="Dano" value={newWeapon.damage} onChange={e => setNewWeapon({ ...newWeapon, damage: e.target.value })} style={{ width: 100, flex: 'none' }} />
                  <button className="btn-primary btn-small" onClick={addWeapon}>+</button>
                </div>
              )}
            </section>
          </div>
        </div>
      )}

      {tab === 'habilidades' && (
        <div className="skills-tab-content">
          <section className="sheet-panel">
            <SkillsList
              character={c}
              onToggleSkill={skill => {
                const trained = c.trainedSkills.includes(skill);
                updateChar({
                  trainedSkills: trained
                    ? c.trainedSkills.filter(s => s !== skill)
                    : [...c.trainedSkills, skill]
                });
              }}
              onSkillBonusChange={(skill, value) => {
                updateChar({
                  skillOverrides: { ...c.skillOverrides, [skill]: value }
                });
              }}
              onRollSkill={handleRollSkill}
              editable={editMode}
            />
          </section>
        </div>
      )}

      {tab === 'rituais' && (
        <section className="sheet-panel">
          <div className="feats-grid">
            <div className="feat-group">
              <h3>{c.species}</h3>
              {(() => {
                const speciesData = speciesList.find(s => s.name === c.species);
                if (!speciesData || speciesData.specialAbilities.length === 0) return <p className="empty-text">Nenhuma habilidade especial</p>;
                return speciesData.specialAbilities.map((a, i) => (
                  <div key={i} className="feat-item">
                    <strong>{a.name}:</strong> {a.description}
                  </div>
                ));
              })()}
            </div>
            <FeatEditor
              character={c}
              editMode={editMode}
              onUpdateFeats={(feats: CharacterFeat[]) => updateChar({ feats })}
            />
            <ForcePowerEditor
              character={c}
              editMode={editMode}
              onUpdateForcePowers={(forcePowers: CharacterForcePower[]) => updateChar({ forcePowers })}
            />
            <TalentEditor
              character={c}
              editMode={editMode}
              onUpdateTalents={(talents: CharacterTalent[]) => updateChar({ talents })}
            />
          </div>
        </section>
      )}

      {tab === 'inventario' && (
        <section className="sheet-panel">
          <InventoryList
            character={c}
            editMode={editMode}
            onUpdateInventory={(inventory: InventoryItem[]) => updateChar({ inventory })}
            onUpdateCredits={(credits: number) => updateChar({ credits })}
          />
        </section>
      )}

      {tab === 'descricao' && (
        <div className="desc-section">
          <section className="sheet-panel" style={{ marginBottom: 16 }}>
            <h3>Aparência</h3>
            {editMode ? (
              <textarea
                className="desc-textarea"
                value={c.appearance || ''}
                onChange={e => updateChar({ appearance: e.target.value })}
                rows={4}
                placeholder="Descreva a aparência do seu personagem..."
              />
            ) : (
              <p>{c.appearance || <span className="empty-text">Nenhuma descrição</span>}</p>
            )}
          </section>
          <section className="sheet-panel">
            <h3>História / Background</h3>
            {editMode ? (
              <textarea
                className="desc-textarea"
                value={c.background || ''}
                onChange={e => updateChar({ background: e.target.value })}
                rows={6}
                placeholder="Conte a história do seu personagem..."
              />
            ) : (
              <p>{c.background || <span className="empty-text">Nenhuma história</span>}</p>
            )}
          </section>
          <section className="sheet-panel" style={{ marginTop: 16 }}>
            <h3>Anotações</h3>
            {editMode ? (
              <textarea
                className="desc-textarea"
                value={c.notes || ''}
                onChange={e => updateChar({ notes: e.target.value })}
                rows={4}
                placeholder="Anotações pessoais, lembretes, planos..."
              />
            ) : (
              <p>{c.notes || <span className="empty-text">Nenhuma anotação</span>}</p>
            )}
          </section>
        </div>
      )}

      {tab === 'prestigio' && (
        <section className="sheet-panel">
          <PrestigeClassEditor
            character={c}
            editMode={editMode}
            onUpdatePrestige={(prestige) => updateChar({ prestigeClass: prestige })}
          />
        </section>
      )}

      {/* Level Up Modal */}
      {showLevelUp && (
        <LevelUpModal
          character={c}
          onConfirm={(updates) => {
            updateChar(updates);
            setShowLevelUp(false);
          }}
          onClose={() => setShowLevelUp(false)}
        />
      )}

      {/* Dice Roller */}
      {showRoller && (
        <div className="floating-roller">
          <DiceRoller roller={roller} />
          <button className="btn-secondary btn-full" onClick={() => setShowRoller(false)}>Fechar</button>
        </div>
      )}
    </div>
  );
}
