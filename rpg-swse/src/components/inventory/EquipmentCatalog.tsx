import { useState } from 'react';
import type { EquipmentCatalogItem, EquipmentCategory } from '../../types';
import { allEquipmentCatalog, getEquipmentByCategory } from '../../data/equipment';

interface Props {
  onSelect: (item: EquipmentCatalogItem) => void;
  onClose: () => void;
}

const categoryLabels: Record<EquipmentCategory, string> = {
  weapon: 'Armas',
  armor: 'Armaduras',
  gear: 'Equipamentos',
  consumable: 'Consumíveis',
  tool: 'Ferramentas',
};

export default function EquipmentCatalog({ onSelect, onClose }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory>('weapon');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = searchQuery
    ? allEquipmentCatalog.filter(
        item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : getEquipmentByCategory(selectedCategory);

  return (
    <div className="equipment-catalog-modal">
      <div className="catalog-content">
        <div className="catalog-header">
          <h3>Catálogo de Equipamentos</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="catalog-search">
          <input
            type="text"
            placeholder="Buscar equipamento..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {!searchQuery && (
          <div className="catalog-tabs">
            {(Object.keys(categoryLabels) as EquipmentCategory[]).map(cat => (
              <button
                key={cat}
                className={`catalog-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        )}

        <div className="catalog-items-list">
          {filteredItems.length === 0 ? (
            <div className="no-items">
              <p>Nenhum equipamento encontrado</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <div key={item.id} className="catalog-item-row">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="item-description">{item.description}</p>
                  <div className="item-stats">
                    {item.damage && <span>Dano: {item.damage}</span>}
                    {item.critRange && <span>Ameaça: {item.critRange}</span>}
                    {item.reflexBonus !== undefined && (
                      <span>Bônus: +{item.reflexBonus}</span>
                    )}
                    <span>Peso: {item.weight}kg</span>
                    <span>Custo: {item.cost} Cr</span>
                  </div>
                </div>
                <button
                  className="select-item-btn"
                  onClick={() => onSelect(item)}
                >
                  Adicionar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
