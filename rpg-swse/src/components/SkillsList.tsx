import type { SkillName, Character } from '../types';
import { calculateSkillModifier } from '../utils/calculations';
import { skillsData } from '../data/skills';

interface Props {
  character: Character;
  onToggleSkill?: (skill: SkillName) => void;
  onRollSkill?: (skill: SkillName) => void;
  editable?: boolean;
}

export function SkillsList({ character, onToggleSkill, onRollSkill, editable }: Props) {
  return (
    <div className="skills-list">
      <h3>Perícias</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Perícia</th>
            <th>Atributo</th>
            <th>Bônus</th>
            {editable && <th></th>}
          </tr>
        </thead>
        <tbody>
          {skillsData.map(skill => {
            const trained = character.trainedSkills.includes(skill.name);
            const bonus = calculateSkillModifier(skill.name, character);
            const modStr = bonus >= 0 ? `+${bonus}` : `${bonus}`;
            const isClassSkill = skill.classFor.includes(character.heroicClass);
            return (
              <tr
                key={skill.name}
                className={`skill-row ${trained ? 'trained' : ''} ${!skill.untrainedUse && !trained ? 'cant-use' : ''}`}
                onClick={() => onRollSkill?.(skill.name)}
                style={{ cursor: onRollSkill ? 'pointer' : 'default' }}
              >
                <td>
                  {editable && onToggleSkill && (
                    <input
                      type="checkbox"
                      checked={trained}
                      disabled={!isClassSkill}
                      onChange={() => onToggleSkill(skill.name)}
                      onClick={e => e.stopPropagation()}
                    />
                  )}
                  {!editable && (trained ? '✓' : '')}
                </td>
                <td>{skill.name}</td>
                <td>{skill.keyAbility}</td>
                <td className="skill-bonus">{modStr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
