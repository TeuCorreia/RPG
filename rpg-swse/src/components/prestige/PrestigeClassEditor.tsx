import { useState } from 'react';
import type { Character } from '../../types';
import { prestigeClasses, validatePrestigePrerequisites, type PrestigeClassData } from '../../data/prestigeClasses';

interface Props {
  character: Character;
  editMode: boolean;
  onUpdatePrestige: (prestige: Character['prestigeClass']) => void;
}

export default function PrestigeClassEditor({ character, editMode, onUpdatePrestige }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const hasPrestige = !!character.prestigeClass;

  function handleSelect(prestige: PrestigeClassData) {
    if (!editMode || hasPrestige) return;
    if (!confirm(`Selecionar ${prestige.name}? Isso será confirmado e não poderá ser desfeito facilmente.`)) return;
    onUpdatePrestige({
      classId: prestige.id,
      className: prestige.name,
      level: 1,
    });
  }

  function handleRemove() {
    if (!confirm('Remover classe de prestígio? Isso reverterá todos os ganhos dessa classe.')) return;
    onUpdatePrestige(undefined);
  }

  function handleLevelUp() {
    if (!character.prestigeClass) return;
    const pcData = prestigeClasses.find(p => p.id === character.prestigeClass!.classId);
    if (!pcData) return;
    if (character.prestigeClass.level >= pcData.maxLevel) return;
    onUpdatePrestige({
      ...character.prestigeClass,
      level: character.prestigeClass.level + 1,
    });
  }

  if (hasPrestige) {
    const pcData = prestigeClasses.find(p => p.id === character.prestigeClass!.classId);
    if (!pcData) return null;
    const currentLevel = character.prestigeClass!.level;

    return (
      <div className="prestige-active">
        <div className="prestige-active-header">
          <div className="prestige-active-info">
            <span className="icon" style={{ fontSize: 28, color: 'var(--accent)' }}>{pcData.icon}</span>
            <div>
              <h3 className="prestige-active-name">{pcData.name}</h3>
              <span className="prestige-active-level">Nível {currentLevel} / {pcData.maxLevel}</span>
            </div>
          </div>
          {editMode && (
            <div className="prestige-active-actions">
              {currentLevel < pcData.maxLevel && (
                <button className="btn-primary btn-small" onClick={handleLevelUp}>
                  <span className="icon" style={{ fontSize: 16 }}>trending_up</span>
                  Avançar
                </button>
              )}
              <button className="btn-danger btn-small" onClick={handleRemove}>
                <span className="icon" style={{ fontSize: 16 }}>close</span>
                Remover
              </button>
            </div>
          )}
        </div>

        <div className="prestige-active-benefits">
          <h4>Benefícios do Nível {currentLevel}</h4>
          <ul>
            {pcData.benefits.map((b, i) => (
              <li key={i} className="prestige-benefit-item">
                <span className="icon" style={{ fontSize: 14, color: 'var(--success)' }}>check_circle</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="prestige-active-stats">
          <div className="prestige-stat">
            <span className="prestige-stat-label">HP por nível</span>
            <span className="prestige-stat-value">+{pcData.hpPerLevel}</span>
          </div>
          <div className="prestige-stat">
            <span className="prestige-stat-label">BAB</span>
            <span className="prestige-stat-value">+{currentLevel}</span>
          </div>
          <div className="prestige-stat">
            <span className="prestige-stat-label">Reflexo</span>
            <span className="prestige-stat-value">+{pcData.defenseBonuses.reflex}</span>
          </div>
          <div className="prestige-stat">
            <span className="prestige-stat-label">Fortitude</span>
            <span className="prestige-stat-value">+{pcData.defenseBonuses.fortitude}</span>
          </div>
          <div className="prestige-stat">
            <span className="prestige-stat-label">Vontade</span>
            <span className="prestige-stat-value">+{pcData.defenseBonuses.will}</span>
          </div>
          <div className="prestige-stat">
            <span className="prestige-stat-label">Árvores</span>
            <span className="prestige-stat-value">{pcData.talentTrees.join(', ')}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="prestige-selector">
      <div className="prestige-selector-intro">
        <span className="icon" style={{ fontSize: 32, color: 'var(--accent)' }}>military_tech</span>
        <div>
          <h3>Classes de Prestígio</h3>
          <p>A partir do nível 8, seu personagem pode ingressar em uma Classe de Prestígio — uma especialização avançada que reflete sua evolução na galáxia.</p>
        </div>
      </div>

      <div className="prestige-grid-editor">
        {prestigeClasses.map(pc => {
          const validation = validatePrestigePrerequisites(pc, character);
          const isExpanded = expandedId === pc.id;
          const canSelect = editMode && validation.eligible;

          return (
            <div
              key={pc.id}
              className={`prestige-editor-card ${validation.eligible ? 'eligible' : 'locked'} ${isExpanded ? 'expanded' : ''}`}
            >
              <div
                className="prestige-editor-card-header"
                onClick={() => setExpandedId(isExpanded ? null : pc.id)}
              >
                <div className="prestige-editor-card-title">
                  <span className="icon" style={{ fontSize: 22, color: validation.eligible ? 'var(--accent)' : 'var(--text-muted)' }}>{pc.icon}</span>
                  <div>
                    <strong className="prestige-editor-name">{pc.name}</strong>
                    <span className="prestige-editor-entry">Nível de entrada: {pc.entryLevel} | Máx: {pc.maxLevel}</span>
                  </div>
                </div>
                <div className="prestige-editor-card-status">
                  {validation.eligible ? (
                    <span className="prestige-status-badge eligible">
                      <span className="icon" style={{ fontSize: 14 }}>check_circle</span>
                      Elegível
                    </span>
                  ) : (
                    <span className="prestige-status-badge locked">
                      <span className="icon" style={{ fontSize: 14 }}>lock</span>
                      Bloqueado
                    </span>
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="prestige-editor-card-body">
                  <p className="prestige-editor-desc">{pc.description}</p>

                  <div className="prestige-editor-reqs">
                    <strong>Pré-requisitos:</strong>
                    <ul>
                      {pc.requirements.bab !== undefined && (
                        <li className={character.level >= pc.requirements.bab ? 'met' : 'unmet'}>
                          <span className="icon" style={{ fontSize: 14 }}>{character.level >= pc.requirements.bab ? 'check_circle' : 'cancel'}</span>
                          BAB +{pc.requirements.bab} (atual: +{character.level})
                        </li>
                      )}
                      {pc.requirements.feats?.map(feat => {
                        const has = character.feats.some(f => f.name === feat);
                        return (
                          <li key={feat} className={has ? 'met' : 'unmet'}>
                            <span className="icon" style={{ fontSize: 14 }}>{has ? 'check_circle' : 'cancel'}</span>
                            Feat: {feat}
                          </li>
                        );
                      })}
                      {pc.requirements.talents?.map(talent => {
                        const has = character.talents.some(t => t.name === talent);
                        return (
                          <li key={talent} className={has ? 'met' : 'unmet'}>
                            <span className="icon" style={{ fontSize: 14 }}>{has ? 'check_circle' : 'cancel'}</span>
                            Talento: {talent}
                          </li>
                        );
                      })}
                      {pc.requirements.skills?.map(skillReq => {
                        const isTrained = character.trainedSkills.includes(skillReq.name as any);
                        const keyAbilityMap: Record<string, keyof Character['attributes']> = {
                          'Enganação': 'CHA', 'Persuasão': 'CHA', 'Percepção': 'WIS',
                          'Mecânica': 'INT', 'Usar a Força': 'CHA', 'Furtividade': 'DEX',
                          'Acrobacia': 'DEX', 'Iniciativa': 'DEX', 'Escalar': 'STR',
                          'Salto': 'STR', 'Pilotagem': 'DEX', 'Montaria': 'CHA',
                          'Resistência': 'CON', 'Sobrevivência': 'WIS', 'Nadar': 'CON',
                          'Tratar Ferimentos': 'WIS', 'Usar Computador': 'INT',
                          'Conhecimento': 'INT', 'Obter Informação': 'CHA',
                        };
                        const attrKey = keyAbilityMap[skillReq.name];
                        const attrMod = attrKey ? Math.floor((character.attributes[attrKey] - 10) / 2) : 0;
                        const halfLevel = Math.floor(character.level / 2);
                        const total = halfLevel + attrMod + (isTrained ? 5 : 0);
                        const met = total >= skillReq.minRank;
                        return (
                          <li key={skillReq.name} className={met ? 'met' : 'unmet'}>
                            <span className="icon" style={{ fontSize: 14 }}>{met ? 'check_circle' : 'cancel'}</span>
                            {skillReq.name} +{skillReq.minRank} (atual: +{total})
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="prestige-editor-benefits">
                    <strong>Benefícios:</strong>
                    <ul>
                      {pc.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="prestige-editor-stats">
                    <span>HP: +{pc.hpPerLevel}/nível</span>
                    <span>Reflexo: +{pc.defenseBonuses.reflex}</span>
                    <span>Fortitude: +{pc.defenseBonuses.fortitude}</span>
                    <span>Vontade: +{pc.defenseBonuses.will}</span>
                  </div>

                  {canSelect && (
                    <button className="btn-primary prestige-select-btn" onClick={() => handleSelect(pc)}>
                      <span className="icon" style={{ fontSize: 18 }}>add_circle</span>
                      Selecionar {pc.name}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
