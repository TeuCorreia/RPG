import { useState } from 'react';
import type { SkillName, Character, AttributeName } from '../types';
import { calculateSkillModifier } from '../utils/calculations';
import { skillsData, getSkillKeyAbility, isClassSkill as checkClassSkill } from '../data/skills';

interface Props {
  character: Character;
  onToggleSkill?: (skill: SkillName) => void;
  onRollSkill?: (skill: SkillName) => void;
  onSkillBonusChange?: (skill: SkillName, value: number) => void;
  editable?: boolean;
}

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

export function SkillsList({ character, onToggleSkill, onRollSkill, onSkillBonusChange, editable }: Props) {
  const [search, setSearch] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const allSkillNames: SkillName[] = skillsData.map(s => s.name);

  const filteredSkills = search.trim()
    ? allSkillNames.filter(s =>
        s.toLowerCase().includes(search.toLowerCase()) ||
        getSkillKeyAbility(s).includes(search.toUpperCase())
      )
    : allSkillNames;

  const skillGroups = groupSkillsByAbility(filteredSkills);

  function toggleGroup(ability: string) {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      if (next.has(ability)) next.delete(ability);
      else next.add(ability);
      return next;
    });
  }

  function getBonusColor(bonus: number): string {
    if (bonus >= 10) return 'var(--gold)';
    if (bonus >= 5) return 'var(--success)';
    if (bonus >= 0) return 'var(--text-primary)';
    return 'var(--danger)';
  }

  return (
    <div className="skills-list">
      <div className="skills-list-header">
        <h3>Perícias</h3>
        <div className="skills-search">
          <span className="icon icon-sm">search</span>
          <input
            type="text"
            placeholder="Buscar perícia..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {skillGroups.length === 0 && (
        <div className="skills-empty">Nenhuma perícia encontrada</div>
      )}

      <div className="skill-groups-list">
        {skillGroups.map(([ability, skills]) => {
          const isCollapsed = collapsedGroups.has(ability);
          return (
            <div key={ability} className="skill-card-group">
              <button
                className="skill-card-group-header"
                onClick={() => toggleGroup(ability)}
              >
                <span className="skill-card-group-abbr">{ability}</span>
                <span className="skill-card-group-label">{attrLabels[ability]}</span>
                <span className={`skill-card-group-chevron ${isCollapsed ? 'collapsed' : ''}`}>
                  ▼
                </span>
              </button>

              {!isCollapsed && (
                <div className="skill-card-group-body">
                  {skills.map(skillName => {
                    const skillData = skillsData.find(s => s.name === skillName);
                    if (!skillData) return null;
                    const trained = character.trainedSkills.includes(skillName);
                    const calcBonus = calculateSkillModifier(skillName, character);
                    const override = character.skillOverrides?.[skillName];
                    const bonus = override ?? calcBonus;
                    const modStr = bonus >= 0 ? `+${bonus}` : `${bonus}`;
                    const isClassSkill = checkClassSkill(skillName, character.classes);
                    const canUseUntrained = skillData.untrainedUse;
                    const usable = trained || canUseUntrained;

                    return (
                      <div
                        key={skillName}
                        className={`skill-card-item ${trained ? 'trained' : ''} ${!usable ? 'cant-use' : ''}`}
                        onClick={() => onRollSkill?.(skillName)}
                        style={{ cursor: onRollSkill ? 'pointer' : 'default' }}
                      >
                        <div className="skill-card-item-left">
                          {editable && onToggleSkill ? (
                            <input
                              type="checkbox"
                              checked={trained}
                              disabled={!isClassSkill}
                              onChange={() => onToggleSkill(skillName)}
                              onClick={e => e.stopPropagation()}
                              className="skill-checkbox"
                            />
                          ) : (
                            <span className={`skill-checkmark ${trained ? 'trained' : ''}`}>
                              {trained ? '✓' : ''}
                            </span>
                          )}
                          <div className="skill-card-item-info">
                            <span className="skill-card-item-name">{skillName}</span>
                            <span className="skill-card-item-key">{skillData.keyAbility}</span>
                          </div>
                        </div>
                        <div className="skill-card-item-right">
                          {editable && onSkillBonusChange ? (
                            <input
                              type="number"
                              className="skill-bonus-input"
                              value={bonus}
                              onClick={e => e.stopPropagation()}
                              onChange={e => onSkillBonusChange(skillName, parseInt(e.target.value) || 0)}
                            />
                          ) : (
                            <span
                              className="skill-card-item-bonus"
                              style={{ color: getBonusColor(bonus) }}
                              onClick={() => onRollSkill?.(skillName)}
                            >
                              {modStr}
                            </span>
                          )}
                          {!editable && onRollSkill && (
                            <span className="skill-card-item-roll-icon icon">casino</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {editable && (
        <div className="skills-legend">
          <span><span className="legend-dot class" /> Perícia de Classe</span>
          <span><span className="legend-dot trained" /> Treinada</span>
          <span><span className="legend-dot locked" /> Bloqueada</span>
        </div>
      )}
    </div>
  );
}
