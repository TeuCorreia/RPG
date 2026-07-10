import { useState } from 'react';
import type { Character, CharacterTalent } from '../../types';
import { getTalentsByClasses, getTalentById, searchTalents } from '../../data/talents';
import { validateTalentPrerequisites, generateId } from '../../utils/abilityValidation';

interface Props {
  character: Character;
  editMode: boolean;
  onUpdateTalents: (talents: CharacterTalent[]) => void;
}

export default function TalentEditor({ character, editMode, onUpdateTalents }: Props) {
  const [showCatalog, setShowCatalog] = useState(false);
  const [editingTalent, setEditingTalent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTree, setSelectedTree] = useState<string | null>(null);
  const [newTalentName, setNewTalentName] = useState('');
  const [newTalentDesc, setNewTalentDesc] = useState('');

  const allClasses = character.classes.map(c => c.name);
  const classTalents = getTalentsByClasses(allClasses);
  const treesByClass = allClasses.map(cls => ({
    className: cls,
    trees: [...new Set(classTalents.filter(t => t.class === cls).map(t => t.tree))],
  }));

  const filteredTalents = searchQuery
    ? searchTalents(searchQuery)
    : selectedTree
    ? classTalents.filter(t => t.tree === selectedTree)
    : classTalents;

  const handleAddFromCatalog = (talentId: string) => {
    const talent = getTalentById(talentId);
    if (!talent) return;

    const validation = validateTalentPrerequisites(talent.name, character);
    if (!validation.valid) {
      alert(`Pré-requisitos não atendidos: ${validation.missing.join(', ')}`);
      return;
    }

    const newTalent: CharacterTalent = {
      id: generateId(),
      name: talent.name,
      description: talent.description,
      tree: talent.tree,
      prerequisites: talent.prerequisites,
      source: 'class',
    };

    onUpdateTalents([...character.talents, newTalent]);
    setShowCatalog(false);
  };

  const handleAddCustom = () => {
    if (!newTalentName.trim()) return;

    const newTalent: CharacterTalent = {
      id: generateId(),
      name: newTalentName.trim(),
      description: newTalentDesc.trim(),
      source: 'custom',
    };

    onUpdateTalents([...character.talents, newTalent]);
    setNewTalentName('');
    setNewTalentDesc('');
  };

  const handleUpdateTalent = (talentId: string, updates: Partial<CharacterTalent>) => {
    const updatedTalents = character.talents.map(talent =>
      talent.id === talentId ? { ...talent, ...updates } : talent
    );
    onUpdateTalents(updatedTalents);
  };

  const handleRemoveTalent = (talentId: string) => {
    const updatedTalents = character.talents.filter(talent => talent.id !== talentId);
    onUpdateTalents(updatedTalents);
  };

  return (
    <div className="talent-editor">
      <div className="talent-editor-header">
        <h3>Talentos</h3>
        {editMode && (
          <button className="add-btn" onClick={() => setShowCatalog(true)}>
            + Adicionar
          </button>
        )}
      </div>

      <div className="talent-list">
        {character.talents.length === 0 ? (
          <p className="empty-text">Nenhum talento</p>
        ) : (
          character.talents.map(talent => (
            <div key={talent.id} className="talent-item">
              {editMode && editingTalent === talent.id ? (
                <div className="talent-edit-form">
                  <input
                    type="text"
                    value={talent.name}
                    onChange={e => handleUpdateTalent(talent.id, { name: e.target.value })}
                  />
                  <textarea
                    value={talent.description}
                    onChange={e => handleUpdateTalent(talent.id, { description: e.target.value })}
                    rows={2}
                  />
                  <div className="talent-edit-actions">
                    <button onClick={() => setEditingTalent(null)}>Salvar</button>
                    <button onClick={() => handleRemoveTalent(talent.id)} className="danger">
                      Remover
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="talent-info">
                    <strong>{talent.name}</strong>
                    {talent.tree && <span className="talent-tree">{talent.tree}</span>}
                    {talent.description && <p>{talent.description}</p>}
                  </div>
                  {editMode && (
                    <button
                      className="edit-btn"
                      onClick={() => setEditingTalent(talent.id)}
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
              <h3>Adicionar Talentos</h3>
              <button onClick={() => setShowCatalog(false)}>×</button>
            </div>

            <input
              type="text"
              placeholder="Buscar talento..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="catalog-search"
            />

            <div className="tree-tabs-grouped">
              <button
                className={`tree-tab-all ${!selectedTree ? 'active' : ''}`}
                onClick={() => setSelectedTree(null)}
              >
                Todos
              </button>
              {treesByClass.map(({ className, trees }) => (
                <div key={className} className="tree-class-group">
                  <span className="tree-class-label">{className}</span>
                  <div className="tree-class-buttons">
                    {trees.map(tree => (
                      <button
                        key={tree}
                        className={selectedTree === tree ? 'active' : ''}
                        onClick={() => setSelectedTree(tree)}
                      >
                        {tree}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="catalog-list">
              {filteredTalents.map(talent => {
                const alreadyHas = character.talents.some(t => t.name === talent.name);
                const validation = validateTalentPrerequisites(talent.name, character);

                return (
                  <div
                    key={talent.id}
                    className={`catalog-item ${alreadyHas ? 'owned' : ''} ${!validation.valid ? 'locked' : ''}`}
                  >
                    <div className="catalog-item-info">
                      <div className="catalog-item-header">
                        <strong>{talent.name}</strong>
                        {allClasses.length > 1 && (
                          <span className="class-badge">{talent.class}</span>
                        )}
                        <span className="tree-badge">{talent.tree}</span>
                      </div>
                      <p>{talent.description}</p>
                      {talent.prerequisites && talent.prerequisites.length > 0 && (
                        <span className="prereqs">
                          Requisitos: {talent.prerequisites.join(', ')}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddFromCatalog(talent.id)}
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
                placeholder="Nome do talento"
                value={newTalentName}
                onChange={e => setNewTalentName(e.target.value)}
              />
              <textarea
                placeholder="Descrição (opcional)"
                value={newTalentDesc}
                onChange={e => setNewTalentDesc(e.target.value)}
                rows={2}
              />
              <button onClick={handleAddCustom} disabled={!newTalentName.trim()}>
                Adicionar Customizado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
