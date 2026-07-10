import type { InventoryItem } from '../../types';

interface Props {
  item: InventoryItem;
  editMode: boolean;
  onUpdate: (item: InventoryItem) => void;
  onRemove: () => void;
  onToggleEquipped: () => void;
}

export default function InventoryItemCard({
  item,
  editMode,
  onUpdate,
  onRemove,
  onToggleEquipped,
}: Props) {
  const handleUpdateField = (field: keyof InventoryItem, value: unknown) => {
    onUpdate({ ...item, [field]: value });
  };

  return (
    <div className={`inventory-item-card ${item.equipped ? 'equipped' : ''}`}>
      <div className="item-header">
        <span className="item-category-badge">{item.category}</span>
        {editMode && (
          <button
            className="equipped-toggle"
            onClick={onToggleEquipped}
            title={item.equipped ? 'Desequipar' : 'Equipar'}
          >
            {item.equipped ? '★' : '☆'}
          </button>
        )}
      </div>

      <div className="item-body">
        {editMode ? (
          <input
            type="text"
            className="item-name-input"
            value={item.name}
            onChange={e => handleUpdateField('name', e.target.value)}
          />
        ) : (
          <h4 className="item-name">{item.name}</h4>
        )}

        {item.description && (
          <p className="item-description">{item.description}</p>
        )}

        <div className="item-stats-grid">
          {item.damage !== undefined && (
            <div className="stat">
              <label>Dano</label>
              {editMode ? (
                <input
                  type="text"
                  value={item.damage}
                  onChange={e => handleUpdateField('damage', e.target.value)}
                />
              ) : (
                <span>{item.damage}</span>
              )}
            </div>
          )}

          {item.critRange !== undefined && (
            <div className="stat">
              <label>Ameaça</label>
              {editMode ? (
                <input
                  type="text"
                  value={item.critRange}
                  onChange={e => handleUpdateField('critRange', e.target.value)}
                />
              ) : (
                <span>{item.critRange}</span>
              )}
            </div>
          )}

          {item.reflexBonus !== undefined && (
            <div className="stat">
              <label>Bônus</label>
              {editMode ? (
                <input
                  type="number"
                  value={item.reflexBonus}
                  onChange={e =>
                    handleUpdateField('reflexBonus', parseInt(e.target.value) || 0)
                  }
                />
              ) : (
                <span>+{item.reflexBonus}</span>
              )}
            </div>
          )}

          {item.maxDexBonus !== undefined && (
            <div className="stat">
              <label>Max DEX</label>
              {editMode ? (
                <input
                  type="number"
                  value={item.maxDexBonus}
                  onChange={e =>
                    handleUpdateField('maxDexBonus', parseInt(e.target.value) || 0)
                  }
                />
              ) : (
                <span>{item.maxDexBonus}</span>
              )}
            </div>
          )}

          {item.armorCheckPenalty !== undefined && (
            <div className="stat">
              <label>Penalidade</label>
              {editMode ? (
                <input
                  type="number"
                  value={item.armorCheckPenalty}
                  onChange={e =>
                    handleUpdateField(
                      'armorCheckPenalty',
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              ) : (
                <span>{item.armorCheckPenalty}</span>
              )}
            </div>
          )}

          <div className="stat">
            <label>Peso</label>
            {editMode ? (
              <input
                type="number"
                value={item.weight}
                onChange={e =>
                  handleUpdateField('weight', parseFloat(e.target.value) || 0)
                }
                step={0.1}
                min={0}
              />
            ) : (
              <span>{item.weight}kg</span>
            )}
          </div>

          <div className="stat">
            <label>Qtd</label>
            {editMode ? (
              <input
                type="number"
                value={item.quantity}
                onChange={e =>
                  handleUpdateField('quantity', parseInt(e.target.value) || 1)
                }
                min={1}
              />
            ) : (
              <span>{item.quantity}</span>
            )}
          </div>

          <div className="stat">
            <label>Custo</label>
            {editMode ? (
              <input
                type="number"
                value={item.cost}
                onChange={e =>
                  handleUpdateField('cost', parseInt(e.target.value) || 0)
                }
                min={0}
              />
            ) : (
              <span>{item.cost} Cr</span>
            )}
          </div>
        </div>
      </div>

      {editMode && (
        <div className="item-actions">
          <button className="remove-btn" onClick={onRemove}>
            Remover
          </button>
        </div>
      )}
    </div>
  );
}
