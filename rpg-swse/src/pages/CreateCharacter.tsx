import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AttributeName, SkillName, HeroicClass, Attributes } from '../types';
import { useCharacters } from '../hooks/useCharacter';
import { speciesList } from '../data/species';
import { classList } from '../data/classes';
import { getClassSkills } from '../data/skills';
import { getAbilityModifier } from '../utils/calculations';
import { AttributeBlock } from '../components/AttributeBlock';

const steps = ['Geral', 'Atributos', 'Classe', 'Perícias', 'Equipamento', 'Revisão'];

const allSkills: SkillName[] = [
  'Acrobacia', 'Escalar', 'Enganação', 'Resistência',
  'Obter Informação', 'Iniciativa', 'Salto', 'Conhecimento',
  'Mecânica', 'Percepção', 'Persuasão', 'Pilotagem',
  'Montaria', 'Furtividade', 'Sobrevivência', 'Nadar',
  'Tratar Ferimentos', 'Usar Computador', 'Usar a Força'
];

const speciesColors: Record<string, string> = {
  'Humano': '#4a7dff',
  'Bothan': '#8b5cf6',
  'Cereano': '#06b6d4',
  'Droide': '#64748b',
  'Dug': '#f59e0b',
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

  const [name, setName] = useState('');
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
    const applied = getAppliedAttributes();
    const char = create({
      name,
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
      currentCondition: 0,
      appearance,
      background,
    });
    if (char) navigate(`/character/${char.id}`);
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

      case 3: return (
        <div className="step-content">
          <h2>Perícias</h2>
          <p>Selecione até <strong>{maxTrained}</strong> perícias treinadas (mín. 1). Perícias de classe em destaque.</p>
          {error && <p className="error-msg">{error}</p>}
          <div className="skills-selection">
            {allSkills.map(skill => {
              const isClassSkill = classSkills.includes(skill);
              const isTrained = trainedSkills.includes(skill);
              return (
                <label key={skill} className={`skill-option ${isClassSkill ? 'class-skill' : ''} ${isTrained ? 'trained' : ''}`}>
                  <input
                    type="checkbox"
                    checked={isTrained}
                    disabled={!isClassSkill}
                    onChange={() => toggleSkill(skill)}
                  />
                  {skill} {isClassSkill ? '(Classe)' : ''}
                </label>
              );
            })}
          </div>
        </div>
      );

      case 4: return (
        <div className="step-content">
          <h2>Equipamento Inicial</h2>
          <p>Você começa com créditos para comprar equipamento básico.</p>
          <label>Créditos Iniciais
            <input type="number" value={credits} onChange={e => setCredits(parseInt(e.target.value))} />
          </label>
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
        {step === steps.length - 1 && <button className="btn-primary" onClick={handleCreate}>Criar Personagem</button>}
      </div>
    </div>
  );
}
