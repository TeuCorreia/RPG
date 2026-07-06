import { useState } from 'react';

export interface RollResult {
  expression: string;
  result: number;
  rolls: number[];
  timestamp: number;
}

export function useDiceRoller() {
  const [history, setHistory] = useState<RollResult[]>([]);

  function rollD20(modifier = 0): RollResult {
    const roll = Math.floor(Math.random() * 20) + 1;
    const result = roll + modifier;
    const entry: RollResult = {
      expression: `1d20${modifier >= 0 ? '+' : ''}${modifier}`,
      result,
      rolls: [roll],
      timestamp: Date.now(),
    };
    setHistory(prev => [entry, ...prev].slice(0, 50));
    return entry;
  }

  function rollCustom(expression: string): RollResult {
    const match = expression.match(/^(\d+)d(\d+)(?:\+(-?\d+))?$/);
    if (!match) {
      const entry: RollResult = {
        expression,
        result: 0,
        rolls: [],
        timestamp: Date.now(),
      };
      setHistory(prev => [entry, ...prev].slice(0, 50));
      return entry;
    }
    const count = parseInt(match[1]);
    const die = parseInt(match[2]);
    const mod = match[3] ? parseInt(match[3]) : 0;
    const rolls: number[] = [];
    for (let i = 0; i < count; i++) {
      rolls.push(Math.floor(Math.random() * die) + 1);
    }
    const total = rolls.reduce((a, b) => a + b, 0) + mod;
    const entry: RollResult = {
      expression,
      result: total,
      rolls,
      timestamp: Date.now(),
    };
    setHistory(prev => [entry, ...prev].slice(0, 50));
    return entry;
  }

  function clearHistory() {
    setHistory([]);
  }

  return { history, rollD20, rollCustom, clearHistory };
}
