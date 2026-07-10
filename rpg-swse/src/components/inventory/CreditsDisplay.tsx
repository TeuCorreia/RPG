import { useState } from 'react';

interface Props {
  credits: number;
  editMode: boolean;
  onUpdate: (credits: number) => void;
}

export default function CreditsDisplay({ credits, editMode, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(credits.toString());

  const handleClick = () => {
    if (editMode) {
      setEditValue(credits.toString());
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    const value = parseInt(editValue) || 0;
    onUpdate(Math.max(0, value));
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="credits-display editing">
        <input
          type="number"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          min={0}
        />
        <span className="credits-suffix">Cr</span>
      </div>
    );
  }

  return (
    <div
      className={`credits-display ${editMode ? 'editable' : ''}`}
      onClick={handleClick}
    >
      <span className="credits-icon">CR</span>
      <span className="credits-value">{credits.toLocaleString()}</span>
      <span className="credits-suffix">Cr</span>
    </div>
  );
}
