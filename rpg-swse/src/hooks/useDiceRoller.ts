import { useState, useEffect } from 'react';

export interface RollResult {
  expression: string;
  result: number;
  rolls: number[];
  timestamp: number;
}

export interface DicePreset {
  id: string;
  name: string;
  expression: string;
  description?: string;
}

const STORAGE_KEY = 'rpg_swse_dice_presets';

function loadPresets(): DicePreset[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function savePresets(presets: DicePreset[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
}

export function useDiceRoller() {
  const [history, setHistory] = useState<RollResult[]>([]);
  const [presets, setPresets] = useState<DicePreset[]>(loadPresets);

  useEffect(() => {
    savePresets(presets);
  }, [presets]);

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

  function rollPreset(presetId: string): RollResult | null {
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return null;
    return rollCustom(preset.expression);
  }

  function savePreset(name: string, expression: string, description?: string): DicePreset {
    const newPreset: DicePreset = {
      id: `preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      expression,
      description,
    };
    setPresets(prev => [...prev, newPreset]);
    return newPreset;
  }

  function updatePreset(id: string, updates: Partial<DicePreset>) {
    setPresets(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  }

  function deletePreset(id: string) {
    setPresets(prev => prev.filter(p => p.id !== id));
  }

  function clearHistory() {
    setHistory([]);
  }

  return {
    history,
    presets,
    rollD20,
    rollCustom,
    rollPreset,
    savePreset,
    updatePreset,
    deletePreset,
    clearHistory,
  };
}
