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
  const [newFeatName, setNewFeatName] = useState('');
  const [newFeatDesc, setNewFeatDesc] = useState('');

  const filteredFeats = searchQuery
    ? searchFeats(searchQuery)
    : featsCatalog;

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
    setShowCatalog(false);
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
        <div className="catalog-modal">
          <div className="catalog-content">
            <div className="catalog-header">
              <h3>Adicionar Feat</h3>
              <button onClick={() => setShowCatalog(false)}>×</button>
            </div>

            <input
              type="text"
              placeholder="Buscar feat..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="catalog-search"
            />

            <div className="catalog-list">
              {filteredFeats.map(feat => {
                const alreadyHas = character.feats.some(f => f.name === feat.name);
                const validation = validateFeatPrerequisites(feat.id, character);

                return (
                  <div
                    key={feat.id}
                    className={`catalog-item ${alreadyHas ? 'owned' : ''} ${!validation.valid ? 'locked' : ''}`}
                  >
                    <div className="catalog-item-info">
                      <strong>{feat.name}</strong>
                      <p>{feat.description}</p>
                      {feat.prerequisites && (
                        <span className="prereqs">
                          Requisitos: {feat.prerequisites.join(', ')}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddFromCatalog(feat.id)}
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
          </div>
        </div>
      )}
    </div>
  );
}
