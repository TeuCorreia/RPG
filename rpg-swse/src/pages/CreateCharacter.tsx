import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AttributeName, SkillName, HeroicClass, Attributes } from '../types';
import { useCharacters } from '../hooks/useCharacter';
import { speciesList } from '../data/species';
import { classList } from '../data/classes';
import { getClassSkills, getSkillKeyAbility, skillsData, isClassSkill as checkClassSkill } from '../data/skills';
import { getAbilityModifier, calculateSkillModifier } from '../utils/calculations';
import { AttributeBlock } from '../components/AttributeBlock';

const steps = ['Geral', 'Atributos', 'Classe', 'Perícias', 'Equipamento', 'Revisão'];

const allSkills: SkillName[] = [
  'Acrobacia', 'Escalar', 'Enganação', 'Resistência',
  'Obter Informação', 'Iniciativa', 'Salto', 'Conhecimento',
  'Mecânica', 'Percepção', 'Persuasão', 'Pilotagem',
  'Montaria', 'Furtividade', 'Sobrevivência', 'Nadar',
  'Tratar Ferimentos', 'Usar Computador', 'Usar a Força'
];

const attrLabels: Record<string, string> = {
  STR: 'Força', DEX: 'Destreza', CON: 'Constituição',
  INT: 'Inteligência', WIS: 'Sabedoria', CHA: 'Carisma',
};

function groupSkillsByAbility(skills: SkillName[]): [AttributeName, SkillName[]][] {
  const groups = new Map<AttributeName, SkillName[]>();
  for (const skill of skills) {
    const keyAbility = getSkillKeyAbility(skill);
    if (!groups.has(keyAbility)) groups.set(keyAbility, []);
    groups.get(keyAbility)!.push(skill);
  }
  return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
}

const speciesColors: Record<string, string> = {
  'Humano': '#4a7dff',
  'Bothan': '#8b5cf6',
  'Cereano': '#06b6d4',
  'Droide': '#64748b',
  'Ewok': '#84cc16',
  'Gungan': '#10b981',
  'Ithoriano': '#22c55e',
  'Kel Dor': '#e94560',
  'Mon Calamari': '#0ea5e9',
  'Quarren': '#6366f1',
  'Rodiano': '#ef4444',
  'Sullustano': '#f97316',
  'Twi\'lek': '#d946ef',
  'Wookiee': '#a16207',
  'Zabrak': '#dc2626',
};

export function CreateCharacter() {
  const navigate = useNavigate();
  const { create } = useCharacters();
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [speciesIndex, setSpeciesIndex] = useState(0);
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [attributes, setAttributes] = useState<Attributes>({ STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 });
  const [heroicClass, setHeroicClass] = useState<HeroicClass>('Jedi');
  const [trainedSkills, setTrainedSkills] = useState<SkillName[]>([]);
  const [appearance, setAppearance] = useState('');
  const [background, setBackground] = useState('');
  const [credits, setCredits] = useState(500);

  const species = speciesList[speciesIndex];
  const selectedClass = classList.find(c => c.name === heroicClass)!;
  const classSkills = getClassSkills(heroicClass);
  const intMod = getAbilityModifier(attributes.INT);
  const maxTrained = selectedClass.trainedSkills + Math.max(0, intMod);
  const speciesMod = species.attributeModifiers;

  function getAppliedAttributes(): Attributes {
    return {
      STR: Math.min(18, Math.max(3, attributes.STR + (speciesMod.str || 0))),
      DEX: Math.min(18, Math.max(3, attributes.DEX + (speciesMod.dex || 0))),
      CON: Math.min(18, Math.max(3, attributes.CON + (speciesMod.con || 0))),
      INT: Math.min(18, Math.max(3, attributes.INT + (speciesMod.int || 0))),
      WIS: Math.min(18, Math.max(3, attributes.WIS + (speciesMod.wis || 0))),
      CHA: Math.min(18, Math.max(3, attributes.CHA + (speciesMod.cha || 0))),
    };
  }

  function toggleSkill(skill: SkillName) {
    if (!checkClassSkill(skill, heroicClass)) {
      setError(`${skill} não é uma perícia de classe disponível.`);
      return;
    }
    setTrainedSkills(prev => {
      if (prev.includes(skill)) return prev.filter(s => s !== skill);
      if (prev.length >= maxTrained) {
        setError(`Máximo de ${maxTrained} perícias treinadas`);
        return prev;
      }
      setError('');
      return [...prev, skill];
    });
  }

  function handleAttributeChange(attr: AttributeName, value: number) {
    setAttributes(prev => ({ ...prev, [attr]: Math.min(18, Math.max(3, value)) }));
  }

  function handleCreate() {
    if (!name) { setError('Nome é obrigatório'); return; }
    setLoading(true);
    setError('');
    try {
      const applied = getAppliedAttributes();
      const char = create({
        name,
        image: image || undefined,
        species: species.name,
        heroicClass,
        level: 1,
        xp: 0,
        age,
        gender,
        height,
        weight,
        attributes: applied,
        trainedSkills,
        feats: [...species.bonusFeats],
        talents: [],
        forcePowers: [],
        weapons: [],
        armor: null,
        inventory: [],
        credits,
        currentHp: selectedClass.hpPerLevel + getAbilityModifier(applied.CON),
        currentFp: 5 + Math.floor(1 / 2),
        currentCondition: 0,
        appearance,
        background,
      });
      if (!char) {
        setError('Erro ao criar: você não está autenticado.');
        setLoading(false);
        return;
      }
      window.setTimeout(() => {
        navigate(`/character/${char.id}`, { replace: true });
      }, 0);
    } catch (e) {
      setLoading(false);
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        setError('Imagem muito grande! Use uma imagem menor ou URL.');
      } else {
        setError(`Erro ao criar personagem: ${e instanceof Error ? e.message : 'Tente novamente.'}`);
      }
    }
  }

  function renderStep() {
    switch (step) {
      case 0: return (
        <div className="step-content">
          <h2>Informações Gerais</h2>
          <label>Nome do Personagem
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Luke Skywalker" />
          </label>
          <label>Escolha sua Espécie</label>
          <div className="species-grid">
            {speciesList.map((s, i) => {
              const color = speciesColors[s.name] || '#4a7dff';
              const initial = s.name.charAt(0);
              return (
                <div
                  key={s.name}
                  className={`species-card ${i === speciesIndex ? 'selected' : ''}`}
                  onClick={() => setSpeciesIndex(i)}
                >
                  <div className="species-img" style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}>
                    {s.image ? (
                      <img src={s.image} alt={s.name} />
                    ) : (
                      <span className="species-placeholder" style={{ background: color }}>{initial}</span>
                    )}
                  </div>
                  <div className="species-info">
                    <strong>{s.name}</strong>
                    <small>
                      {Object.entries(s.attributeModifiers)
                        .filter(([, v]) => v !== 0)
                        .map(([k, v]) => `${k} ${v >= 0 ? '+' : ''}${v}`)
                        .join(', ') || 'Padrão'}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="species-detail">
            <p><em>{species.description}</em></p>
            <div className="species-abilities">
              <h4>Habilidades Especiais</h4>
              <ul>{species.specialAbilities.map(a => <li key={a.name}><strong>{a.name}:</strong> {a.description}</li>)}</ul>
            </div>
          </div>
          <div className="form-row">
            <label>Idade <input type="number" value={age} onChange={e => setAge(parseInt(e.target.value))} /></label>
            <label>Gênero <input type="text" value={gender} onChange={e => setGender(e.target.value)} placeholder="Ex: Masculino" /></label>
            <label>Altura <input type="text" value={height} onChange={e => setHeight(e.target.value)} placeholder="Ex: 1,75m" /></label>
            <label>Peso <input type="text" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ex: 75kg" /></label>
          </div>
        </div>
      );

      case 1: return (
        <div className="step-content">
          <h2>Atributos (3-18)</h2>
          <p>Distribua os atributos base. Os modificadores raciais serão aplicados automaticamente.</p>
          <div className="attributes-grid">
            {(Object.keys(attributes) as AttributeName[]).map(attr => (
              <AttributeBlock
                key={attr}
                name={attr}
                score={attributes[attr]}
                onChange={v => handleAttributeChange(attr, v)}
              />
            ))}
          </div>
          <div className="applied-attributes">
            <h3>Atributos Finais (com modificador racial)</h3>
            <div className="attributes-grid small">
              {(Object.entries(getAppliedAttributes()) as [AttributeName, number][]).map(([attr, score]) => (
                <div key={attr} className="applied-attr">
                  <strong>{attr}:</strong> {score} ({getAbilityModifier(score) >= 0 ? '+' : ''}{getAbilityModifier(score)})
                </div>
              ))}
            </div>
          </div>
        </div>
      );

      case 2: return (
        <div className="step-content">
          <h2>Classe</h2>
          <div className="class-grid">
            {classList.map(cls => (
              <div
                key={cls.name}
                className={`class-card ${heroicClass === cls.name ? 'selected' : ''}`}
                onClick={() => {
                  setHeroicClass(cls.name);
                  setTrainedSkills([]);
                }}
              >
                <h3>{cls.name}</h3>
                <p>{cls.description}</p>
                <div className="class-stats">
                  <span><strong>HP/Nível:</strong> d{cls.hpPerLevel}</span>
                  <span><strong>Perícias:</strong> {cls.trainedSkills} + INT</span>
                  <span><strong>Atributos-chave:</strong> {cls.keyAbilities.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

      case 3: {
        const skillGroups = groupSkillsByAbility(allSkills);
        const trainedCount = trainedSkills.length;
        return (
          <div className="step-content">
            <h2>Perícias</h2>
            <p>Selecione as perícias treinadas. Apenas perícias de classe podem ser escolhidas no 1º nível.</p>
            {error && <p className="error-msg">{error}</p>}

            <div className="skill-progress">
              <div className="skill-progress-header">
                <span>Perícias Treinadas</span>
                <span className="skill-progress-count">{trainedCount} / {maxTrained}</span>
              </div>
              <div className="skill-progress-track">
                <div
                  className="skill-progress-fill"
                  style={{ width: `${Math.min(100, (trainedCount / maxTrained) * 100)}%` }}
                />
              </div>
              {trainedCount < 1 && (
                <div className="skill-progress-hint">Mínimo de 1 perícia treinada exigido</div>
              )}
              {trainedCount === maxTrained && (
                <div className="skill-progress-hint max">Máximo atingido! Remova alguma perícia para adicionar outra.</div>
              )}
            </div>

            <div className="skill-groups">
              {skillGroups.map(([ability, skills]) => (
                <details key={ability} className="skill-group" open>
                  <summary className="skill-group-header">
                    <span className="skill-group-ability">{ability}</span>
                    <span className="skill-group-label">{attrLabels[ability]}</span>
                    <span className="skill-group-count">
                      {skills.filter(s => trainedSkills.includes(s)).length}/{skills.length}
                    </span>
                  </summary>
                  <div className="skill-group-body">
                    {skills.map(skill => {
                      const isClassSkill = classSkills.includes(skill);
                      const isTrained = trainedSkills.includes(skill);
                      const flatChar = {
                        attributes: getAppliedAttributes(),
                        trainedSkills,
                        level: 1,
                        heroicClass,
                        currentHp: 0, currentCondition: 0, xp: 0,
                        id: '', userId: '', name: '', species: '',
                        age: 0, gender: '', height: '', weight: '',
                        feats: [], talents: [], forcePowers: [],
                        weapons: [], armor: null, inventory: [],
                        credits: 0, appearance: '', background: '',
                        createdAt: 0, updatedAt: 0,
                      };
                      const bonus = calculateSkillModifier(skill, flatChar as any);
                      const modStr = bonus >= 0 ? `+${bonus}` : `${bonus}`;
                      const skillData = skillsData.find(s => s.name === skill);
                      return (
                        <label
                          key={skill}
                          className={`skill-group-item ${isClassSkill ? 'class' : 'locked'} ${isTrained ? 'trained' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={isTrained}
                            disabled={!isClassSkill}
                            onChange={() => toggleSkill(skill)}
                          />
                          <div className="skill-group-item-info">
                            <span className="skill-group-item-name">{skill}</span>
                            <span className={`skill-group-item-bonus ${bonus >= 0 ? 'positive' : 'negative'}`}>
                              {modStr}
                            </span>
                          </div>
                          <div className="skill-group-item-desc">
                            {skillData?.description}
                          </div>
                          <div className="skill-group-item-tags">
                            {isClassSkill && <span className="skill-tag class">Classe</span>}
                            {!isClassSkill && <span className="skill-tag locked">Bloqueada</span>}
                            {!skillData?.untrainedUse && <span className="skill-tag untrained">Só Treinado</span>}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      }

      case 4: return (
        <div className="step-content">
          <h2>Equipamento Inicial</h2>
          <p>Você começa com créditos para comprar equipamento básico.</p>
          <label>Créditos Iniciais
            <input type="number" value={credits} onChange={e => setCredits(parseInt(e.target.value))} />
          </label>

          <div style={{ marginTop: 20, padding: 16, background: 'var(--bg-secondary)', borderRadius: 10 }}>
            <h3 style={{ fontSize: 13, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Avatar do Personagem</h3>
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
            >
              <div style={{
                width: 80, height: 80, borderRadius: 8, overflow: 'hidden',
                border: '2px dashed var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: image ? 'none' : 'var(--bg-card)',
                flexShrink: 0,
              }}>
                {image ? (
                  <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span className="icon" style={{ color: 'var(--text-muted)', fontSize: 28 }}>add_photo_alternate</span>
                )}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', marginBottom: 2 }}>Escolher imagem</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>PNG, JPG ou URL</div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              style={{ display: 'none' }}
              onChange={e => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = ev => setImage(ev.target?.result as string);
                reader.readAsDataURL(file);
              }}
            />
            <input
              type="url"
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="Ou cole uma URL..."
              style={{ marginTop: 8 }}
            />
            {image && (
              <button
                className="btn-small btn-secondary"
                onClick={() => setImage('')}
                style={{ marginTop: 8 }}
              >
                Remover imagem
              </button>
            )}
          </div>

          <div className="textarea-group">
            <label>Aparência
              <textarea value={appearance} onChange={e => setAppearance(e.target.value)} rows={3} placeholder="Descreva a aparência do seu personagem..." />
            </label>
            <label>História / Background
              <textarea value={background} onChange={e => setBackground(e.target.value)} rows={5} placeholder="Conte a história do seu personagem..." />
            </label>
          </div>
        </div>
      );

      case 5: return (
        <div className="step-content review">
          <h2>Revisão da Ficha</h2>
          {error && <p className="error-msg">{error}</p>}
          <div className="review-grid">
            <div><strong>Nome:</strong> {name}</div>
            <div><strong>Espécie:</strong> {species.name}</div>
            <div><strong>Classe:</strong> {heroicClass}</div>
            <div><strong>Nível:</strong> 1</div>
            <div><strong>HP:</strong> {selectedClass.hpPerLevel + getAbilityModifier(getAppliedAttributes().CON)}</div>
            <div><strong>Créditos:</strong> {credits}</div>
          </div>
          <div className="review-attributes">
            <h3>Atributos</h3>
            <div className="attributes-grid small">
              {(Object.entries(getAppliedAttributes()) as [AttributeName, number][]).map(([attr, score]) => (
                <div key={attr}>{attr}: {score} ({getAbilityModifier(score) >= 0 ? '+' : ''}{getAbilityModifier(score)})</div>
              ))}
            </div>
          </div>
          <div className="review-skills">
            <h3>Perícias Treinadas</h3>
            <p>{trainedSkills.length > 0 ? trainedSkills.join(', ') : 'Nenhuma'}</p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="create-character">
      <h1>Criar Personagem</h1>
      <div className="step-indicator">
        {steps.map((s, i) => (
          <div key={s} className={`step-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`} onClick={() => i < step && setStep(i)}>
            {s}
          </div>
        ))}
      </div>
      {renderStep()}
      <div className="step-nav">
        {step > 0 && <button className="btn-secondary" onClick={() => setStep(step - 1)}>Anterior</button>}
        {step < steps.length - 1 && <button className="btn-primary" onClick={() => setStep(step + 1)}>Próximo</button>}
        {step === steps.length - 1 && <button className="btn-primary" onClick={handleCreate} disabled={loading}>{loading ? 'Criando...' : 'Criar Personagem'}</button>}
      </div>
    </div>
  );
}
