import type { Character } from '../types';
import { calculateMaxHp } from '../utils/calculations';

interface Props {
  character: Character;
  onClick: () => void;
  onDelete?: () => void;
}

export function CharacterCard({ character, onClick, onDelete }: Props) {
  const maxHp = calculateMaxHp(character);

  return (
    <div className="character-card" onClick={onClick}>
      <div className="card-header">
        <h3>{character.name}</h3>
        <span className="card-level">Nv. {character.level}</span>
      </div>
      <div className="card-body">
        <p><strong>{character.species}</strong> — <em>{character.heroicClass}</em></p>
        <div className="card-stats">
          <span>HP: {character.currentHp}/{maxHp}</span>
          <span>XP: {character.xp}</span>
          <span>Cr: {character.credits}</span>
        </div>
      </div>
      {onDelete && (
        <button
          className="btn-delete"
          onClick={e => { e.stopPropagation(); onDelete(); }}
        >
          Excluir
        </button>
      )}
    </div>
  );
}
