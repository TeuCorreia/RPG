import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { SkillName, AttributeName, Weapon, Character } from '../types';
import { useCharacters } from '../hooks/useCharacter';
import { useDiceRoller } from '../hooks/useDiceRoller';
import { AttributeBlock } from '../components/AttributeBlock';
import { SkillsList } from '../components/SkillsList';
import { ConditionTracker } from '../components/ConditionTracker';
import { DiceRoller } from '../components/DiceRoller';
import { calculateDefense, calculateMaxHp, calculateSkillModifier, calculateForcePoints, getAbilityModifier } from '../utils/calculations';

type Tab = 'combate' | 'habilidades' | 'rituais' | 'inventario' | 'descricao';

export function CharacterSheet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, update, remove } = useCharacters();
  const roller = useDiceRoller();
  const [char, setChar] = useState<Character | undefined>(getById(id || ''));
  const [editMode, setEditMode] = useState(false);
  const [tab, setTab] = useState<Tab>('combate');
  const [newWeapon, setNewWeapon] = useState<Weapon>({ name: '', attackBonus: 0, damage: '', critRange: '20', type: '', weight: 0 });
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, weight: 0 });
  const [showRoller, setShowRoller] = useState(false);

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
  const maxHp = calculateMaxHp(c);
  const maxFp = calculateForcePoints(c.level);
  const defenses = [
    { label: 'Reflexo', value: calculateDefense('reflex', c) },
    { label: 'Fortitude', value: calculateDefense('fortitude', c) },
    { label: 'Vontade', value: calculateDefense('will', c) },
  ];
  const hpPct = Math.min(100, Math.round((c.currentHp / maxHp) * 100));
  const conditionLabels = ['Normal', 'Lento', 'Atordoado', 'Inconsciente'];
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

  function addItem() {
    if (!newItem.name) return;
    updateChar({ inventory: [...c.inventory, { ...newItem, description: '' }] });
    setNewItem({ name: '', quantity: 1, weight: 0 });
  }

  function removeItem(index: number) {
    updateChar({ inventory: c.inventory.filter((_, i) => i !== index) });
  }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'combate', label: 'Combate', icon: 'swords' },
    { key: 'habilidades', label: 'Habilidades', icon: 'psychology' },
    { key: 'rituais', label: 'Rituais', icon: 'auto_stories' },
    { key: 'inventario', label: 'Inventário', icon: 'inventory_2' },
    { key: 'descricao', label: 'Descrição', icon: 'description' },
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
          <span className="sheet-badge sheet-badge-class">{c.heroicClass}</span>
          <span className="sheet-badge sheet-badge-neutral">Nível {c.level}</span>
          <span className="sheet-badge sheet-badge-neutral">XP: {c.xp}</span>
          {c.credits > 0 && <span className="sheet-badge sheet-badge-credits">{c.credits} Cr</span>}
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
                  <span className="hp-header-value">{c.currentHp} <span>/ {maxHp}</span></span>
                </div>
                <div className="hp-bar-track">
                  <div className="hp-bar-fill hp" style={{ width: `${hpPct}%` }} />
                </div>
                {editMode && (
                  <input
                    type="number"
                    value={c.currentHp}
                    onChange={e => updateChar({ currentHp: parseInt(e.target.value) || 0 })}
                    style={{ marginTop: 8, width: '100%', textAlign: 'center', fontSize: 16 }}
                  />
                )}
              </section>
              <section className="sheet-panel">
                <div className="fp-display">
                  <h3>Força (Pontos)</h3>
                  <div className="fp-value">{maxFp}</div>
                  <div className="fp-max">Máximo: {maxFp}</div>
                </div>
              </section>
            </div>

            {/* Condition */}
            <section className="sheet-panel">
              <h3 className="sheet-panel-title">Condição</h3>
              {editMode ? (
                <ConditionTracker
                  currentStep={c.currentCondition}
                  onChange={v => updateChar({ currentCondition: v })}
                />
              ) : (
                <div className="condition-display">
                  <div className="condition-step-num">{c.currentCondition}</div>
                  <span className="condition-step-label">
                    {conditionLabels[c.currentCondition] || `Passo ${c.currentCondition}`}
                  </span>
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
                    <div className="defense-circle-ring">
                      <span className="defense-value">{d.value}</span>
                      <div className="defense-icon">
                        <span className="icon">{defenseIcons[d.label]}</span>
                      </div>
                    </div>
                    <span className="defense-circle-label">{d.label}</span>
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
              <h3>Feats</h3>
              {c.feats.length === 0 ? (
                <p className="empty-text">Nenhum</p>
              ) : (
                c.feats.map((f, i) => <div key={i} className="feat-item">✦ {f}</div>)
              )}
            </div>
            <div className="feat-group">
              <h3>Poderes da Força</h3>
              {c.forcePowers.length === 0 ? (
                <p className="empty-text">Nenhum</p>
              ) : (
                c.forcePowers.map((p, i) => <div key={i} className="feat-item">✦ {p}</div>)
              )}
            </div>
            <div className="feat-group">
              <h3>Talento</h3>
              {c.talents.length === 0 ? (
                <p className="empty-text">Nenhum</p>
              ) : (
                c.talents.map((t, i) => <div key={i} className="feat-item">✦ {t}</div>)
              )}
            </div>
          </div>
        </section>
      )}

      {tab === 'inventario' && (
        <section className="sheet-panel">
          <h3 className="sheet-panel-title">Inventário</h3>
          {c.inventory.length === 0 ? (
            <div className="inventory-empty">Mochila vazia</div>
          ) : (
            c.inventory.map((item, i) => (
              <div key={i} className="inventory-item">
                <span className="item-name">{item.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="item-qty">x{item.quantity}</span>
                  {editMode && (
                    <button className="btn-small btn-danger" onClick={() => removeItem(i)} style={{ padding: '2px 6px', fontSize: 10 }}>×</button>
                  )}
                </div>
              </div>
            ))
          )}
          {editMode && (
            <div className="inventory-add">
              <input placeholder="Item" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
              <input type="number" placeholder="Qtd" className="qty" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })} />
              <button className="btn-primary btn-small" onClick={addItem}>+</button>
            </div>
          )}
        </section>
      )}

      {tab === 'descricao' && (
        <div className="desc-section">
          <section className="sheet-panel" style={{ marginBottom: 16 }}>
            <h3>Aparência</h3>
            <p>{c.appearance || <span className="empty-text">Nenhuma descrição</span>}</p>
          </section>
          <section className="sheet-panel">
            <h3>História / Background</h3>
            <p>{c.background || <span className="empty-text">Nenhuma história</span>}</p>
          </section>
        </div>
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
