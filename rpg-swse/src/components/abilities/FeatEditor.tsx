import { useState } from 'react';
import type { Character, CharacterFeat } from '../../types';
import { featsCatalog, getFeatById, searchFeats } from '../../data/feats';
import { validateFeatPrerequisites, generateId } from '../../utils/abilityValidation';

interface Props {
  character: Character;
  editMode: boolean;
  onUpdateFeats: (feats: CharacterFeat[]) => void;
}

export default function FeatEditor({ character, editMode, onUpdateFeats }: Props) {
  const [showCatalog, setShowCatalog] = useState(false);
  const [editingFeat, setEditingFeat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mainTab, setMainTab] = useState<'catalog' | 'mine'>('catalog');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [newFeatName, setNewFeatName] = useState('');
  const [newFeatDesc, setNewFeatDesc] = useState('');

  const myFeats = character.feats;

  const filteredFeats = searchQuery
    ? searchFeats(searchQuery)
    : featsCatalog;

  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddFromCatalog = (featId: string) => {
    const feat = getFeatById(featId);
    if (!feat) return;

    const validation = validateFeatPrerequisites(featId, character);
    if (!validation.valid) {
      alert(`Pré-requisitos não atendidos: ${validation.missing.join(', ')}`);
      return;
    }

    const newFeat: CharacterFeat = {
      id: generateId(),
      name: feat.name,
      description: feat.description,
      prerequisites: feat.prerequisites,
      source: 'class',
    };

    onUpdateFeats([...character.feats, newFeat]);
  };

  const handleAddCustom = () => {
    if (!newFeatName.trim()) return;

    const newFeat: CharacterFeat = {
      id: generateId(),
      name: newFeatName.trim(),
      description: newFeatDesc.trim(),
      source: 'custom',
    };

    onUpdateFeats([...character.feats, newFeat]);
    setNewFeatName('');
    setNewFeatDesc('');
  };

  const handleUpdateFeat = (featId: string, updates: Partial<CharacterFeat>) => {
    const updatedFeats = character.feats.map(feat =>
      feat.id === featId ? { ...feat, ...updates } : feat
    );
    onUpdateFeats(updatedFeats);
  };

  const handleRemoveFeat = (featId: string) => {
    const updatedFeats = character.feats.filter(feat => feat.id !== featId);
    onUpdateFeats(updatedFeats);
  };

  return (
    <div className="feat-editor">
      <div className="feat-editor-header">
        <h3>Feats</h3>
        {editMode && (
          <button className="add-btn" onClick={() => setShowCatalog(true)}>
            + Adicionar
          </button>
        )}
      </div>

      <div className="feat-list">
        {character.feats.length === 0 ? (
          <p className="empty-text">Nenhum feat</p>
        ) : (
          character.feats.map(feat => (
            <div key={feat.id} className="feat-item">
              {editMode && editingFeat === feat.id ? (
                <div className="feat-edit-form">
                  <input
                    type="text"
                    value={feat.name}
                    onChange={e => handleUpdateFeat(feat.id, { name: e.target.value })}
                  />
                  <textarea
                    value={feat.description}
                    onChange={e => handleUpdateFeat(feat.id, { description: e.target.value })}
                    rows={2}
                  />
                  <div className="feat-edit-actions">
                    <button onClick={() => setEditingFeat(null)}>Salvar</button>
                    <button onClick={() => handleRemoveFeat(feat.id)} className="danger">
                      Remover
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="feat-info">
                    <strong>{feat.name}</strong>
                    {feat.description && <p>{feat.description}</p>}
                    <span className="feat-source">{feat.source}</span>
                  </div>
                  {editMode && (
                    <button
                      className="edit-btn"
                      onClick={() => setEditingFeat(feat.id)}
                    >
                      Editar
                    </button>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>

      {showCatalog && (
        <div className="catalog-overlay" onClick={() => setShowCatalog(false)}>
          <div className="catalog-modal" onClick={e => e.stopPropagation()}>

            <div className="catalog-header">
              <h3>Adicionar Feats</h3>
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
                Minhas Habilidades ({myFeats.length})
              </button>
            </div>

            {mainTab === 'catalog' ? (
              <>
                <div className="catalog-search-wrapper">
                  <span className="catalog-search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar feat..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="catalog-search"
                  />
                </div>

                <div className="catalog-skill-list">
                  {filteredFeats.length === 0 && (
                    <p className="empty-text" style={{ padding: 20 }}>Nenhum feat encontrado</p>
                  )}
                  {filteredFeats.map(feat => {
                    const alreadyHas = character.feats.some(f => f.name === feat.name);
                    const validation = validateFeatPrerequisites(feat.id, character);
                    const isExpanded = expandedCards.has(feat.id);

                    return (
                      <div
                        key={feat.id}
                        className={`skill-card ${alreadyHas ? 'owned' : ''} ${!validation.valid ? 'locked' : ''} ${isExpanded ? 'expanded' : ''}`}
                      >
                        <div className="skill-card-header" onClick={() => toggleCard(feat.id)}>
                          <span className="skill-card-chevron">{isExpanded ? '▾' : '▸'}</span>
                          <span className="skill-card-name">{feat.name}</span>
                          <button
                            className="skill-card-add"
                            onClick={e => { e.stopPropagation(); handleAddFromCatalog(feat.id); }}
                            disabled={alreadyHas || !validation.valid}
                          >
                            {alreadyHas ? '✓' : '+'}
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="skill-card-body">
                            <p className="skill-card-desc">{feat.description}</p>
                            {feat.prerequisites && feat.prerequisites.length > 0 && (
                              <span className="skill-card-prereqs">
                                Requisitos: {feat.prerequisites.join(', ')}
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
                    placeholder="Buscar nos seus feats..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="catalog-search"
                  />
                </div>
                <div className="catalog-skill-list">
                  {myFeats.filter(f => !searchQuery || f.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <p className="empty-text" style={{ padding: 20 }}>
                      {myFeats.length === 0 ? 'Nenhum feat adicionado' : 'Nenhum resultado'}
                    </p>
                  )}
                  {myFeats
                    .filter(f => !searchQuery || f.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(feat => {
                      const isExpanded = expandedCards.has(feat.id);
                      return (
                        <div key={feat.id} className={`skill-card owned ${isExpanded ? 'expanded' : ''}`}>
                          <div className="skill-card-header" onClick={() => toggleCard(feat.id)}>
                            <span className="skill-card-chevron">{isExpanded ? '▾' : '▸'}</span>
                            <span className="skill-card-name">{feat.name}</span>
                            {feat.source === 'custom' && <span className="class-badge">Custom</span>}
                            {editMode && (
                              <button
                                className="skill-card-remove"
                                onClick={e => { e.stopPropagation(); handleRemoveFeat(feat.id); }}
                              >
                                ×
                              </button>
                            )}
                          </div>
                          {isExpanded && feat.description && (
                            <div className="skill-card-body">
                              <p className="skill-card-desc">{feat.description}</p>
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
                      placeholder="Nome do feat"
                      value={newFeatName}
                      onChange={e => setNewFeatName(e.target.value)}
                    />
                    <textarea
                      placeholder="Descrição (opcional)"
                      value={newFeatDesc}
                      onChange={e => setNewFeatDesc(e.target.value)}
                      rows={2}
                    />
                    <button onClick={handleAddCustom} disabled={!newFeatName.trim()}>
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
