import { useState } from 'react';
import type { InventoryItem, EquipmentCategory } from '../../types';
import { calculateEncumbrance } from '../../utils/abilityValidation';
import { allEquipmentCatalog } from '../../data/equipment';
import type { Character } from '../../types';

interface Props {
  character: Character;
  editMode: boolean;
  onUpdateInventory: (inventory: InventoryItem[]) => void;
  onUpdateCredits: (credits: number) => void;
  onAddWeapon?: (weapon: InventoryItem) => void;
  onAddArmor?: (armor: InventoryItem) => void;
}

const categoryLabels: Record<EquipmentCategory, string> = {
  weapon: 'Armas',
  armor: 'Armaduras',
  gear: 'Equipamentos',
  consumable: 'Consumíveis',
  tool: 'Ferramentas',
};

const categoryIcons: Record<EquipmentCategory, string> = {
  weapon: '',
  armor: '',
  gear: '',
  consumable: '',
  tool: '',
};

export default function InventoryList({
  character,
  editMode,
  onUpdateInventory,
  onUpdateCredits,
}: Props) {
  const [filter, setFilter] = useState<EquipmentCategory | 'all'>('all');
  const [showCatalog, setShowCatalog] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemWeight, setNewItemWeight] = useState(0);

  const encumbrance = calculateEncumbrance(character);

  const filteredInventory =
    filter === 'all'
      ? character.inventory
      : character.inventory.filter(item => item.category === filter);

  const handleAddItem = () => {
    if (!newItemName.trim()) return;

    const newItem: InventoryItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newItemName.trim(),
      category: 'gear',
      quantity: newItemQty,
      weight: newItemWeight,
      cost: 0,
    };

    onUpdateInventory([...character.inventory, newItem]);
    setNewItemName('');
    setNewItemQty(1);
    setNewItemWeight(0);
  };

  const handleAddFromCatalog = (catalogItem: (typeof allEquipmentCatalog)[0]) => {
    const existingItem = character.inventory.find(item => item.id === catalogItem.id);

    if (existingItem) {
      // Incrementar quantidade
      const updatedInventory = character.inventory.map(item =>
        item.id === catalogItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      onUpdateInventory(updatedInventory);
    } else {
      // Adicionar novo item
      const newItem: InventoryItem = {
        id: catalogItem.id,
        name: catalogItem.name,
        category: catalogItem.category,
        quantity: 1,
        weight: catalogItem.weight,
        cost: catalogItem.cost,
        description: catalogItem.description,
        attackBonus: catalogItem.attackBonus,
        damage: catalogItem.damage,
        critRange: catalogItem.critRange,
        range: catalogItem.range,
        reflexBonus: catalogItem.reflexBonus,
        maxDexBonus: catalogItem.maxDexBonus,
        armorCheckPenalty: catalogItem.armorCheckPenalty,
      };
      onUpdateInventory([...character.inventory, newItem]);
    }
    setShowCatalog(false);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    const updatedInventory = character.inventory.map(item =>
      item.id === itemId
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0);

    onUpdateInventory(updatedInventory);
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedInventory = character.inventory.filter(item => item.id !== itemId);
    onUpdateInventory(updatedInventory);
  };

  const handleToggleEquipped = (itemId: string) => {
    const updatedInventory = character.inventory.map(item =>
      item.id === itemId
        ? { ...item, equipped: !item.equipped }
        : item
    );
    onUpdateInventory(updatedInventory);
  };

  const handleUpdateCredits = (value: number) => {
    onUpdateCredits(Math.max(0, value));
  };

  return (
    <div className="inventory-container">
      {/* Header com créditos e encumbrância */}
      <div className="inventory-header">
        <div className="credits-section">
          <span className="credits-label">Créditos:</span>
          {editMode ? (
            <input
              type="number"
              className="credits-input"
              value={character.credits}
              onChange={e => handleUpdateCredits(parseInt(e.target.value) || 0)}
              min={0}
            />
          ) : (
            <span className="credits-value">{character.credits} Cr</span>
          )}
        </div>

        <div className="encumbrance-section">
          <span className="encumbrance-label">Peso:</span>
          <span
            className={`encumbrance-value ${
              encumbrance.isOverloaded
                ? 'overloaded'
                : encumbrance.isEncumbered
                ? 'encumbered'
                : 'normal'
            }`}
          >
            {encumbrance.totalWeight.toFixed(1)} / {encumbrance.maxCapacity} kg
          </span>
        </div>
      </div>

      {/* Filtros */}
      <div className="inventory-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todos
        </button>
        {(Object.keys(categoryLabels) as EquipmentCategory[]).map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {categoryIcons[cat]} {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Lista de itens */}
      <div className="inventory-list">
        {filteredInventory.length === 0 ? (
          <div className="empty-inventory">
            <p>Mochila vazia</p>
            {editMode && (
              <button className="add-catalog-btn" onClick={() => setShowCatalog(true)}>
                Adicionar do Catálogo
              </button>
            )}
          </div>
        ) : (
          filteredInventory.map(item => (
            <div
              key={item.id}
              className={`inventory-item ${item.equipped ? 'equipped' : ''}`}
            >
              <div className="item-info">
                <span className="item-category-icon">
                  {categoryIcons[item.category]}
                </span>
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  {item.description && (
                    <span className="item-description">{item.description}</span>
                  )}
                  <div className="item-stats">
                    {item.damage && <span>Dano: {item.damage}</span>}
                    {item.critRange && <span>Ameaça: {item.critRange}</span>}
                    {item.reflexBonus !== undefined && (
                      <span>Bônus: +{item.reflexBonus}</span>
                    )}
                    {item.weight > 0 && <span>{item.weight}kg</span>}
                  </div>
                </div>
              </div>

              <div className="item-actions">
                {editMode && (
                  <>
                    <button
                      className="equipped-toggle"
                      onClick={() => handleToggleEquipped(item.id)}
                      title={item.equipped ? 'Desequipar' : 'Equipar'}
                    >
                      {item.equipped ? '' : ''}
                    </button>
                    <div className="quantity-controls">
                      <button onClick={() => handleUpdateQuantity(item.id, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      ×
                    </button>
                  </>
                )}
                {!editMode && item.quantity > 1 && (
                  <span className="quantity-badge">x{item.quantity}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Formulário de adição manual */}
      {editMode && (
        <div className="add-item-form">
          <input
            type="text"
            placeholder="Nome do item"
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleAddItem()}
          />
          <input
            type="number"
            placeholder="Qtd"
            value={newItemQty}
            onChange={e => setNewItemQty(parseInt(e.target.value) || 1)}
            min={1}
            className="qty-input"
          />
          <input
            type="number"
            placeholder="Peso"
            value={newItemWeight}
            onChange={e => setNewItemWeight(parseFloat(e.target.value) || 0)}
            min={0}
            step={0.1}
            className="weight-input"
          />
          <button className="add-btn" onClick={handleAddItem}>
            Adicionar
          </button>
          <button className="catalog-btn" onClick={() => setShowCatalog(true)}>
            Catálogo
          </button>
        </div>
      )}

      {/* Modal do Catálogo */}
      {showCatalog && (
        <div className="catalog-modal">
          <div className="catalog-modal-content">
            <h3>Catálogo de Equipamentos</h3>
            <button className="close-btn" onClick={() => setShowCatalog(false)}>
              ×
            </button>

            <div className="catalog-categories">
              {(Object.keys(categoryLabels) as EquipmentCategory[]).map(cat => (
                <div key={cat} className="catalog-category">
                  <h4>
                    {categoryIcons[cat]} {categoryLabels[cat]}
                  </h4>
                  <div className="catalog-items">
                    {allEquipmentCatalog
                      .filter(item => item.category === cat)
                      .map(item => (
                        <div key={item.id} className="catalog-item">
                          <div className="catalog-item-info">
                            <span className="catalog-item-name">{item.name}</span>
                            <span className="catalog-item-cost">{item.cost} Cr</span>
                          </div>
                          <button
                            className="add-catalog-item-btn"
                            onClick={() => handleAddFromCatalog(item)}
                          >
                            +
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
