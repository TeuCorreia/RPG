import { useState } from 'react';
import type { Character, CharacterForcePower, ForceSide } from '../../types';
import {
  allForcePowersCatalog,
  getForcePowerById,
  searchForcePowers,
  getForcePowersBySide,
} from '../../data/forcePowers';
import { validateForcePowerPrerequisites, generateId } from '../../utils/abilityValidation';

interface Props {
  character: Character;
  editMode: boolean;
  onUpdateForcePowers: (powers: CharacterForcePower[]) => void;
}

export default function ForcePowerEditor({ character, editMode, onUpdateForcePowers }: Props) {
  const [showCatalog, setShowCatalog] = useState(false);
  const [editingPower, setEditingPower] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSide, setSelectedSide] = useState<ForceSide | 'all'>('all');
  const [newPowerName, setNewPowerName] = useState('');
  const [newPowerDesc, setNewPowerDesc] = useState('');

  const filteredPowers = searchQuery
    ? searchForcePowers(searchQuery)
    : selectedSide === 'all'
    ? allForcePowersCatalog
    : getForcePowersBySide(selectedSide);

  const handleAddFromCatalog = (powerId: string) => {
    const power = getForcePowerById(powerId);
    if (!power) return;

    const validation = validateForcePowerPrerequisites(powerId, character);
    if (!validation.valid) {
      alert(`Pré-requisitos não atendidos: ${validation.missing.join(', ')}`);
      return;
    }

    const newPower: CharacterForcePower = {
      id: generateId(),
      powerId: power.id,
      name: power.name,
      description: power.description,
    };

    onUpdateForcePowers([...character.forcePowers, newPower]);
    setShowCatalog(false);
  };

  const handleAddCustom = () => {
    if (!newPowerName.trim()) return;

    const newPower: CharacterForcePower = {
      id: generateId(),
      powerId: 'custom',
      name: newPowerName.trim(),
      description: newPowerDesc.trim(),
    };

    onUpdateForcePowers([...character.forcePowers, newPower]);
    setNewPowerName('');
    setNewPowerDesc('');
  };

  const handleUpdatePower = (powerId: string, updates: Partial<CharacterForcePower>) => {
    const updatedPowers = character.forcePowers.map(power =>
      power.id === powerId ? { ...power, ...updates } : power
    );
    onUpdateForcePowers(updatedPowers);
  };

  const handleRemovePower = (powerId: string) => {
    const updatedPowers = character.forcePowers.filter(power => power.id !== powerId);
    onUpdateForcePowers(updatedPowers);
  };

  const getSideColor = (side: ForceSide) => {
    switch (side) {
      case 'light': return '#4ade80';
      case 'dark': return '#ef4444';
      case 'universal': return '#a78bfa';
    }
  };

  const getSideLabel = (side: ForceSide) => {
    switch (side) {
      case 'light': return 'Luz';
      case 'dark': return 'Escuridão';
      case 'universal': return 'Universal';
    }
  };

  return (
    <div className="force-power-editor">
      <div className="force-power-editor-header">
        <h3>Poderes da Força</h3>
        {editMode && (
          <button className="add-btn" onClick={() => setShowCatalog(true)}>
            + Adicionar
          </button>
        )}
      </div>

      <div className="force-power-list">
        {character.forcePowers.length === 0 ? (
          <p className="empty-text">Nenhum poder da Força</p>
        ) : (
          character.forcePowers.map(power => {
            const catalogPower = allForcePowersCatalog.find(p => p.id === power.powerId);
            const side = catalogPower?.side || 'universal';

            return (
              <div key={power.id} className="force-power-item">
                {editMode && editingPower === power.id ? (
                  <div className="force-power-edit-form">
                    <input
                      type="text"
                      value={power.name}
                      onChange={e => handleUpdatePower(power.id, { name: e.target.value })}
                    />
                    <textarea
                      value={power.description}
                      onChange={e => handleUpdatePower(power.id, { description: e.target.value })}
                      rows={2}
                    />
                    <div className="force-power-edit-actions">
                      <button onClick={() => setEditingPower(null)}>Salvar</button>
                      <button onClick={() => handleRemovePower(power.id)} className="danger">
                        Remover
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="force-power-info">
                      <div className="force-power-header">
                        <strong>{power.name}</strong>
                        <span
                          className="side-badge"
                          style={{ backgroundColor: getSideColor(side) }}
                        >
                          {getSideLabel(side)}
                        </span>
                        {catalogPower && (
                          <>
                            <span className="dc-badge">DC {catalogPower.dc}</span>
                            <span className="cost-badge">{catalogPower.cost} FP</span>
                          </>
                        )}
                      </div>
                      {power.description && <p>{power.description}</p>}
                      {catalogPower && (
                        <div className="power-details">
                          {catalogPower.effect && <span>Efeito: {catalogPower.effect}</span>}
                          {catalogPower.duration && <span>Duração: {catalogPower.duration}</span>}
                          {catalogPower.range && <span>Alcance: {catalogPower.range}</span>}
                        </div>
                      )}
                    </div>
                    {editMode && (
                      <button
                        className="edit-btn"
                        onClick={() => setEditingPower(power.id)}
                      >
                        Editar
                      </button>
                    )}
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      {showCatalog && (
        <div className="catalog-modal">
          <div className="catalog-content">
            <div className="catalog-header">
              <h3>Adicionar Poder da Força</h3>
              <button onClick={() => setShowCatalog(false)}>×</button>
            </div>

            <input
              type="text"
              placeholder="Buscar poder..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="catalog-search"
            />

            <div className="side-tabs">
              <button
                className={selectedSide === 'all' ? 'active' : ''}
                onClick={() => setSelectedSide('all')}
              >
                Todos
              </button>
              <button
                className={selectedSide === 'light' ? 'active light' : ''}
                onClick={() => setSelectedSide('light')}
              >
                Luz
              </button>
              <button
                className={selectedSide === 'dark' ? 'active dark' : ''}
                onClick={() => setSelectedSide('dark')}
              >
                Escuridão
              </button>
              <button
                className={selectedSide === 'universal' ? 'active universal' : ''}
                onClick={() => setSelectedSide('universal')}
              >
                Universal
              </button>
            </div>

            <div className="catalog-list">
              {filteredPowers.map(power => {
                const alreadyHas = character.forcePowers.some(p => p.name === power.name);
                const validation = validateForcePowerPrerequisites(power.id, character);

                return (
                  <div
                    key={power.id}
                    className={`catalog-item ${alreadyHas ? 'owned' : ''} ${!validation.valid ? 'locked' : ''}`}
                  >
                    <div className="catalog-item-info">
                      <div className="catalog-item-header">
                        <strong>{power.name}</strong>
                        <span
                          className="side-badge"
                          style={{ backgroundColor: getSideColor(power.side) }}
                        >
                          {getSideLabel(power.side)}
                        </span>
                        <span className="dc-badge">DC {power.dc}</span>
                        <span className="cost-badge">{power.cost} FP</span>
                      </div>
                      <p>{power.description}</p>
                      {power.effect && <p className="effect">{power.effect}</p>}
                      {power.prerequisites && power.prerequisites.length > 0 && (
                        <span className="prereqs">
                          Requisitos: {power.prerequisites.join(', ')}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddFromCatalog(power.id)}
                      disabled={alreadyHas || !validation.valid}
                    >
                      {alreadyHas ? 'Possui' : validation.valid ? 'Adicionar' : 'Bloqueado'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="custom-add">
              <h4>Ou adicionar customizado:</h4>
              <input
                type="text"
                placeholder="Nome do poder"
                value={newPowerName}
                onChange={e => setNewPowerName(e.target.value)}
              />
              <textarea
                placeholder="Descrição (opcional)"
                value={newPowerDesc}
                onChange={e => setNewPowerDesc(e.target.value)}
                rows={2}
              />
              <button onClick={handleAddCustom} disabled={!newPowerName.trim()}>
                Adicionar Customizado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
