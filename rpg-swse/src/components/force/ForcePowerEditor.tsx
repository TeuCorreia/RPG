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
  const [mainTab, setMainTab] = useState<'catalog' | 'mine'>('catalog');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [newPowerName, setNewPowerName] = useState('');
  const [newPowerDesc, setNewPowerDesc] = useState('');

  const myPowers = character.forcePowers;

  const filteredPowers = searchQuery
    ? searchForcePowers(searchQuery)
    : selectedSide === 'all'
    ? allForcePowersCatalog
    : getForcePowersBySide(selectedSide);

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

  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
        <div className="catalog-overlay" onClick={() => setShowCatalog(false)}>
          <div className="catalog-modal" onClick={e => e.stopPropagation()}>

            <div className="catalog-header">
              <h3>Adicionar Poder da Força</h3>
              <button className="catalog-close" onClick={() => setShowCatalog(false)}>×</button>
            </div>

            <div className="catalog-main-tabs">
              <button
                className={`catalog-main-tab ${mainTab === 'catalog' ? 'active' : ''}`}
                onClick={() => setMainTab('catalog')}
              >
                Habilidades
              </button>
              <button
                className={`catalog-main-tab ${mainTab === 'mine' ? 'active' : ''}`}
                onClick={() => setMainTab('mine')}
              >
                Minhas Habilidades ({myPowers.length})
              </button>
            </div>

            {mainTab === 'catalog' ? (
              <>
                <div className="side-tabs" style={{ padding: '12px 20px 0' }}>
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

                <div className="catalog-search-wrapper">
                  <span className="catalog-search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar poder..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="catalog-search"
                  />
                </div>

                <div className="catalog-skill-list">
                  {filteredPowers.length === 0 && (
                    <p className="empty-text" style={{ padding: 20 }}>Nenhum poder encontrado</p>
                  )}
                  {filteredPowers.map(power => {
                    const alreadyHas = character.forcePowers.some(p => p.name === power.name);
                    const validation = validateForcePowerPrerequisites(power.id, character);
                    const isExpanded = expandedCards.has(power.id);

                    return (
                      <div
                        key={power.id}
                        className={`skill-card ${alreadyHas ? 'owned' : ''} ${!validation.valid ? 'locked' : ''} ${isExpanded ? 'expanded' : ''}`}
                      >
                        <div className="skill-card-header" onClick={() => toggleCard(power.id)}>
                          <span className="skill-card-chevron">{isExpanded ? '▾' : '▸'}</span>
                          <span className="skill-card-name">{power.name}</span>
                          <span
                            className="side-badge"
                            style={{ backgroundColor: getSideColor(power.side) }}
                          >
                            {getSideLabel(power.side)}
                          </span>
                          <span className="class-badge">DC {power.dc}</span>
                          <span className="tree-badge">{power.cost} FP</span>
                          <button
                            className="skill-card-add"
                            onClick={e => { e.stopPropagation(); handleAddFromCatalog(power.id); }}
                            disabled={alreadyHas || !validation.valid}
                          >
                            {alreadyHas ? '✓' : '+'}
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="skill-card-body">
                            <p className="skill-card-desc">{power.description}</p>
                            {power.effect && <p className="skill-card-desc" style={{ color: 'var(--success)', fontStyle: 'italic' }}>Efeito: {power.effect}</p>}
                            {power.prerequisites && power.prerequisites.length > 0 && (
                              <span className="skill-card-prereqs">
                                Requisitos: {power.prerequisites.join(', ')}
                              </span>
                            )}
                            {!validation.valid && (
                              <span className="skill-card-blocked">
                                Pré-requisitos não atendidos: {validation.missing.join(', ')}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="catalog-search-wrapper">
                  <span className="catalog-search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar nos seus poderes..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="catalog-search"
                  />
                </div>
                <div className="catalog-skill-list">
                  {myPowers.filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <p className="empty-text" style={{ padding: 20 }}>
                      {myPowers.length === 0 ? 'Nenhum poder adicionado' : 'Nenhum resultado'}
                    </p>
                  )}
                  {myPowers
                    .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(power => {
                      const catalogPower = allForcePowersCatalog.find(p => p.id === power.powerId);
                      const side = catalogPower?.side || 'universal';
                      const isExpanded = expandedCards.has(power.id);
                      return (
                        <div key={power.id} className={`skill-card owned ${isExpanded ? 'expanded' : ''}`}>
                          <div className="skill-card-header" onClick={() => toggleCard(power.id)}>
                            <span className="skill-card-chevron">{isExpanded ? '▾' : '▸'}</span>
                            <span className="skill-card-name">{power.name}</span>
                            <span
                              className="side-badge"
                              style={{ backgroundColor: getSideColor(side) }}
                            >
                              {getSideLabel(side)}
                            </span>
                            {catalogPower && (
                              <>
                                <span className="class-badge">DC {catalogPower.dc}</span>
                                <span className="tree-badge">{catalogPower.cost} FP</span>
                              </>
                            )}
                            {power.powerId === 'custom' && <span className="class-badge">Custom</span>}
                            {editMode && (
                              <button
                                className="skill-card-remove"
                                onClick={e => { e.stopPropagation(); handleRemovePower(power.id); }}
                              >
                                ×
                              </button>
                            )}
                          </div>
                          {isExpanded && (
                            <div className="skill-card-body">
                              {power.description && <p className="skill-card-desc">{power.description}</p>}
                              {catalogPower && (
                                <div className="power-details" style={{ marginTop: 4 }}>
                                  {catalogPower.effect && <span>Efeito: {catalogPower.effect}</span>}
                                  {catalogPower.duration && <span>Duração: {catalogPower.duration}</span>}
                                  {catalogPower.range && <span>Alcance: {catalogPower.range}</span>}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>

                {editMode && (
                  <div className="custom-add">
                    <h4>Adicionar Customizado</h4>
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
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
