import type { AttributeName } from '../types';
import { getAbilityModifier } from '../utils/calculations';

interface Props {
  name: AttributeName;
  score: number;
  onChange: (value: number) => void;
  onRoll?: () => void;
  readonly?: boolean;
}

const attrLabels: Record<AttributeName, string> = {
  STR: 'Força',
  DEX: 'Destreza',
  CON: 'Constituição',
  INT: 'Inteligência',
  WIS: 'Sabedoria',
  CHA: 'Carisma',
};

export function AttributeBlock({ name, score, onChange, onRoll, readonly }: Props) {
  const modifier = getAbilityModifier(score);
  const modStr = modifier >= 0 ? `+${modifier}` : `${modifier}`;

  return (
    <div className="attribute-block" onClick={onRoll} style={{ cursor: onRoll ? 'pointer' : 'default' }}>
      <div className="attr-label">{attrLabels[name]}</div>
      <div className="attr-abbr">{name}</div>
      {readonly ? (
        <div className="attr-score">{score}</div>
      ) : (
        <input
          type="number"
          className="attr-input"
          value={score}
          min={3}
          max={18}
          onChange={e => onChange(parseInt(e.target.value) || 10)}
          onClick={e => e.stopPropagation()}
        />
      )}
      <div className="attr-modifier">{modStr}</div>
    </div>
  );
}
