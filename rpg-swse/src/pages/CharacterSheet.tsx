import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { SkillName, AttributeName, Weapon } from '../types';
import { useCharacters } from '../hooks/useCharacter';
import { useDiceRoller } from '../hooks/useDiceRoller';
import { AttributeBlock } from '../components/AttributeBlock';
import { DefenseBlock } from '../components/DefenseBlock';
import { SkillsList } from '../components/SkillsList';
import { ConditionTracker } from '../components/ConditionTracker';
import { DiceRoller } from '../components/DiceRoller';
import { calculateDefense, calculateMaxHp, calculateSkillModifier, calculateForcePoints, getAbilityModifier } from '../utils/calculations';
import { speciesList } from '../data/species';

export function CharacterSheet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, update, remove } = useCharacters();
  const roller = useDiceRoller();
  const [char, setChar] = useState(getById(id || ''));
  const [editMode, setEditMode] = useState(false);
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

  const maxHp = calculateMaxHp(char);
  const species = speciesList.find(s => s.name === char.species);
  const defenses = [
    { label: 'Reflexo', value: calculateDefense('reflex', char) },
    { label: 'Fortitude', value: calculateDefense('fortitude', char) },
    { label: 'Vontade', value: calculateDefense('will', char) },
  ];

  function updateChar(partial: Partial<typeof char>) {
    const updated = { ...char, ...partial };
    setChar(updated);
    update(updated);
  }

  function handleRollSkill(skill: SkillName) {
    roller.rollD20(calculateSkillModifier(skill, char));
    setShowRoller(true);
  }

  function handleRollAttribute(attr: AttributeName) {
    roller.rollD20(getAbilityModifier(char.attributes[attr]));
    setShowRoller(true);
  }

  function addWeapon() {
    if (!newWeapon.name) return;
    updateChar({ weapons: [...char.weapons, { ...newWeapon }] });
    setNewWeapon({ name: '', attackBonus: 0, damage: '', critRange: '20', type: '', weight: 0 });
  }

  function removeWeapon(index: number) {
    updateChar({ weapons: char.weapons.filter((_, i) => i !== index) });
  }

  function addItem() {
    if (!newItem.name) return;
    updateChar({ inventory: [...char.inventory, { ...newItem, description: '' }] });
    setNewItem({ name: '', quantity: 1, weight: 0 });
  }

  function removeItem(index: number) {
    updateChar({ inventory: char.inventory.filter((_, i) => i !== index) });
  }

  return (
    <div className="character-sheet">
      <div className="sheet-header">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>← Voltar</button>
        <h1>{char.name}</h1>
        <div className="sheet-controls">
          <button className="btn-secondary" onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Visualizar' : 'Editar'}
          </button>
          <button className="btn-dice" onClick={() => setShowRoller(!showRoller)} title="Rolar Dados">🎲</button>
          <button className="btn-danger" onClick={() => { if (confirm('Excluir este personagem?')) { remove(char.id); navigate('/dashboard'); } }}>
            Excluir
          </button>
        </div>
      </div>

      <div className="sheet-info">
        <span className="info-badge species-badge">{char.species}</span>
        <span className="info-badge class-badge">{char.heroicClass}</span>
        <span className="info-badge">Nível {char.level}</span>
        <span className="info-badge">XP: {char.xp}</span>
        <span className="info-badge">{char.credits} Cr</span>
      </div>

      <div className="sheet-body">
        <div className="sheet-left">
          <div className="section attributes-section">
            <h2>Atributos</h2>
            <div className="attributes-grid">
              {(Object.keys(char.attributes) as AttributeName[]).map(attr => (
                <AttributeBlock
                  key={attr}
                  name={attr}
                  score={char.attributes[attr]}
                  onChange={v => updateChar({ attributes: { ...char.attributes, [attr]: v } })}
                  onRoll={() => handleRollAttribute(attr)}
                  readonly={!editMode}
                />
              ))}
            </div>
          </div>

          <div className="section hp-section">
            <div className="hp-block">
              <div className="hp-header">
                <h2>HP</h2>
                <span className="hp-max">Máx: {maxHp}</span>
              </div>
              <div className="hp-value">
                <input
                  type="number"
                  value={char.currentHp}
                  onChange={e => updateChar({ currentHp: parseInt(e.target.value) || 0 })}
                />
                <span className="hp-separator">/</span>
                <span className="hp-max-value">{maxHp}</span>
              </div>
            </div>
            <div className="fp-block">
              <h2>Força</h2>
              <span className="fp-count">{calculateForcePoints(char.level)}</span>
              <span className="fp-label">Pontos</span>
            </div>
          </div>

          <div className="section">
            <DefenseBlock defenses={defenses} />
          </div>

          <div className="section condition-section">
            <ConditionTracker
              currentStep={char.currentCondition}
              onChange={v => updateChar({ currentCondition: v })}
            />
          </div>

          <div className="section initiative-section">
            <h2>Iniciativa</h2>
            <div className="initiative-block">
              <span className="initiative-value">
                {getAbilityModifier(char.attributes.DEX) >= 0 ? '+' : ''}{getAbilityModifier(char.attributes.DEX)}
              </span>
              <span className="initiative-label">d20 + Mod. Destreza</span>
            </div>
          </div>

          <div className="section dt-section">
            <h2>Limiar de Dano</h2>
            <span className="dt-value">{calculateDefense('fortitude', char)}</span>
          </div>
        </div>

        <div className="sheet-right">
          <div className="section skills-section">
            <SkillsList
              character={char}
              onToggleSkill={skill => {
                const trained = char.trainedSkills.includes(skill);
                updateChar({
                  trainedSkills: trained
                    ? char.trainedSkills.filter(s => s !== skill)
                    : [...char.trainedSkills, skill]
                });
              }}
              onRollSkill={handleRollSkill}
              editable={editMode}
            />
          </div>

          <div className="section weapons-section">
            <h2>Armas</h2>
            {char.weapons.length === 0 && <p className="empty-text">Nenhuma arma</p>}
            {char.weapons.map((w, i) => (
              <div key={i} className="weapon-row" onClick={() => {
                const bonus = (w.attackBonus || 0) + Math.floor(char.level / 2);
                roller.rollD20(bonus);
                setShowRoller(true);
              }} style={{ cursor: 'pointer' }}>
                <div className="weapon-name">{w.name}</div>
                <div className="weapon-stats">
                  <span title="Bônus de ataque">ATQ: +{w.attackBonus + Math.floor(char.level / 2)}</span>
                  <span title="Dano">{w.damage}</span>
                  <span title="Crítico">Crit: {w.critRange}</span>
                </div>
                {editMode && <button className="btn-small btn-danger" onClick={e => { e.stopPropagation(); removeWeapon(i); }}>×</button>}
              </div>
            ))}
            {editMode && (
              <div className="add-row">
                <input placeholder="Nome da arma" value={newWeapon.name} onChange={e => setNewWeapon({ ...newWeapon, name: e.target.value })} />
                <input placeholder="Dano (ex: 2d8+3)" value={newWeapon.damage} onChange={e => setNewWeapon({ ...newWeapon, damage: e.target.value })} />
                <button className="btn-primary btn-small" onClick={addWeapon}>+</button>
              </div>
            )}
          </div>

          <div className="section">
            <h2>Inventário</h2>
            {char.inventory.length === 0 ? <p className="empty-text">Vazio</p> : char.inventory.map((item, i) => (
              <div key={i} className="item-row">
                <span className="item-name">{item.name}</span>
                <span className="item-qty">x{item.quantity}</span>
                {editMode && <button className="btn-small btn-danger" onClick={() => removeItem(i)}>×</button>}
              </div>
            ))}
            {editMode && (
              <div className="add-row">
                <input placeholder="Item" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                <input type="number" placeholder="Qtd" className="qty-input" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })} />
                <button className="btn-primary btn-small" onClick={addItem}>+</button>
              </div>
            )}
          </div>

          <div className="section feats-section">
            <h2>Talento & Feats</h2>
            <div className="feat-group">
              <h3>Feats</h3>
              {char.feats.length === 0 ? <p className="empty-text">Nenhum</p> : char.feats.map((f, i) => <div key={i} className="feat-item">✦ {f}</div>)}
            </div>
            <div className="feat-group">
              <h3>Poderes da Força</h3>
              {char.forcePowers.length === 0 ? <p className="empty-text">Nenhum</p> : char.forcePowers.map((p, i) => <div key={i} className="feat-item">✦ {p}</div>)}
            </div>
          </div>

          <div className="section notes-section">
            <h2>Aparência</h2>
            <p>{char.appearance || 'Nenhuma descrição'}</p>
            <h2>História</h2>
            <p>{char.background || 'Nenhuma história'}</p>
          </div>
        </div>
      </div>

      {showRoller && (
        <div className="floating-roller">
          <DiceRoller roller={roller} />
          <button className="btn-secondary btn-full" onClick={() => setShowRoller(false)}>Fechar</button>
        </div>
      )}
    </div>
  );
}
