import { useState } from 'react';
import { useDiceRoller } from '../hooks/useDiceRoller';

interface Props {
  roller: ReturnType<typeof useDiceRoller>;
  compact?: boolean;
}

export function DiceRoller({ roller, compact }: Props) {
  const [expression, setExpression] = useState('1d20');

  const diceOptions = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];

  function addToExpression(die: string) {
    const match = expression.match(/^(\d+)d\d+(\+?-?\d*)?$/);
    if (match) {
      setExpression(`${match[1]}${die}${match[2] || ''}`);
    } else {
      setExpression(`1${die}`);
    }
  }

  function roll() {
    roller.rollCustom(expression);
  }

  return (
    <div className={`dice-roller ${compact ? 'compact' : ''}`}>
      <h3>Rolagem de Dados</h3>
      <div className="dice-input-row">
        <input
          type="text"
          value={expression}
          onChange={e => setExpression(e.target.value)}
          className="dice-input"
          placeholder="ex: 2d6+3"
        />
        <button className="btn-roll" onClick={roll}>Rolar</button>
      </div>
      <div className="dice-quick">
        {diceOptions.map(d => (
          <button key={d} className="btn-die" onClick={() => addToExpression(d)}>{d}</button>
        ))}
      </div>
      <div className="dice-history">
        {roller.history.slice(0, 5).map(r => (
          <div key={r.timestamp} className="roll-entry">
            <span className="roll-expr">{r.expression}</span>
            <span className="roll-result">= {r.result}</span>
            <span className="roll-details">[{r.rolls.join(', ')}]</span>
          </div>
        ))}
      </div>
    </div>
  );
}
