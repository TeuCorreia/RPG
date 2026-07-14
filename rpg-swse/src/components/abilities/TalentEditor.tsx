import { useState, useMemo } from 'react';
import type { Character, CharacterTalent, HeroicClass } from '../../types';
import { getTalentsByClasses, getTalentById, searchTalents } from '../../data/talents';
import { prestigeClasses } from '../../data/prestigeClasses';
import { validateTalentPrerequisites, generateId } from '../../utils/abilityValidation';

interface Props {
  character: Character;
  editMode: boolean;
  onUpdateTalents: (talents: CharacterTalent[]) => void;
}

const CATEGORIES: { key: HeroicClass; label: string }[] = [
  { key: 'Soldado', label: 'Soldado' },
  { key: 'Jedi', label: 'Jedi' },
  { key: 'Nobre', label: 'Nobre' },
  { key: 'Vigarista', label: 'Vigarista' },
  { key: 'Explorador', label: 'Explorador' },
  { key: 'Mundano', label: 'Mundano' },
];

export default function TalentEditor({ character, editMode, onUpdateTalents }: Props) {
  const [showCatalog, setShowCatalog] = useState(false);
  const [editingTalent, setEditingTalent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mainTab, setMainTab] = useState<'catalog' | 'mine'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<HeroicClass | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [newTalentName, setNewTalentName] = useState('');
  const [newTalentDesc, setNewTalentDesc] = useState('');

  const allClasses = character.classes.map(c => c.name);
  const classTalents = getTalentsByClasses(allClasses);

  const prestigeData = character.prestigeClass
    ? prestigeClasses.find(p => p.id === character.prestigeClass!.classId)
    : null;
  const prestigeTalents = prestigeData
    ? classTalents.filter(t => prestigeData.talentTrees.includes(t.tree))
    : [];

  const allAvailableTalents = [...classTalents, ...prestigeTalents.filter(t => !classTalents.some(ct => ct.id === t.id))];

  const subCategories = useMemo(() => {
    if (!selectedCategory) return [];
    const trees = allAvailableTalents.filter(t => t.class === selectedCategory);
    return [...new Set(trees.map(t => t.tree))];
  }, [selectedCategory, allAvailableTalents]);

  const filteredTalents = useMemo(() => {
    if (searchQuery) {
      return searchTalents(searchQuery).filter(t => allAvailableTalents.some(at => at.id === t.id));
    }
    let result = allAvailableTalents;
    if (selectedCategory) {
      result = result.filter(t => t.class === selectedCategory);
    }
    if (selectedSub) {
      result = result.filter(t => t.tree === selectedSub);
    }
    return result;
  }, [searchQuery, selectedCategory, selectedSub, allAvailableTalents]);

  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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

  const myTalents = character.talents;

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
        <div className="catalog-overlay" onClick={() => setShowCatalog(false)}>
          <div className="catalog-modal" onClick={e => e.stopPropagation()}>

            <div className="catalog-header">
              <h3>Adicionar Talentos</h3>
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
                Minhas Habilidades ({myTalents.length})
              </button>
            </div>

            {mainTab === 'catalog' ? (
              <>
                <div className="catalog-categories">
                  {CATEGORIES.map(cat => {
                    const count = allAvailableTalents.filter(t => t.class === cat.key).length;
                    if (count === 0) return null;
                    return (
                      <button
                        key={cat.key}
                        className={`catalog-category ${selectedCategory === cat.key ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedCategory(selectedCategory === cat.key ? null : cat.key);
                          setSelectedSub(null);
                        }}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {selectedCategory && subCategories.length > 0 && (
                  <div className="catalog-subcategories">
                    {subCategories.map(sub => (
                      <button
                        key={sub}
                        className={`catalog-sub-chip ${selectedSub === sub ? 'active' : ''}`}
                        onClick={() => setSelectedSub(selectedSub === sub ? null : sub)}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}

                <div className="catalog-search-wrapper">
                  <span className="catalog-search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar talento..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="catalog-search"
                  />
                </div>

                <div className="catalog-skill-list">
                  {filteredTalents.length === 0 && (
                    <p className="empty-text" style={{ padding: 20 }}>Nenhum talento encontrado</p>
                  )}
                  {filteredTalents.map(talent => {
                    const alreadyHas = character.talents.some(t => t.name === talent.name);
                    const validation = validateTalentPrerequisites(talent.name, character);
                    const isExpanded = expandedCards.has(talent.id);

                    return (
                      <div
                        key={talent.id}
                        className={`skill-card ${alreadyHas ? 'owned' : ''} ${!validation.valid ? 'locked' : ''} ${isExpanded ? 'expanded' : ''}`}
                      >
                        <div className="skill-card-header" onClick={() => toggleCard(talent.id)}>
                          <span className="skill-card-chevron">{isExpanded ? '▾' : '▸'}</span>
                          <span className="skill-card-name">{talent.name}</span>
                          {allClasses.length > 1 && (
                            <span className="class-badge">{talent.class}</span>
                          )}
                          <span className="tree-badge">{talent.tree}</span>
                          <button
                            className="skill-card-add"
                            onClick={e => { e.stopPropagation(); handleAddFromCatalog(talent.id); }}
                            disabled={alreadyHas || !validation.valid}
                          >
                            {alreadyHas ? '✓' : '+'}
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="skill-card-body">
                            <p className="skill-card-desc">{talent.description}</p>
                            {talent.prerequisites && talent.prerequisites.length > 0 && (
                              <span className="skill-card-prereqs">
                                Requisitos: {talent.prerequisites.join(', ')}
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
                    placeholder="Buscar nos seus talentos..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="catalog-search"
                  />
                </div>
                <div className="catalog-skill-list">
                  {myTalents.filter(t => !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <p className="empty-text" style={{ padding: 20 }}>
                      {myTalents.length === 0 ? 'Nenhum talento adicionado' : 'Nenhum resultado'}
                    </p>
                  )}
                  {myTalents
                    .filter(t => !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(talent => {
                      const isExpanded = expandedCards.has(talent.id);
                      return (
                        <div key={talent.id} className={`skill-card owned ${isExpanded ? 'expanded' : ''}`}>
                          <div className="skill-card-header" onClick={() => toggleCard(talent.id)}>
                            <span className="skill-card-chevron">{isExpanded ? '▾' : '▸'}</span>
                            <span className="skill-card-name">{talent.name}</span>
                            {talent.tree && <span className="tree-badge">{talent.tree}</span>}
                            {talent.source === 'custom' && <span className="class-badge">Custom</span>}
                            {editMode && (
                              <button
                                className="skill-card-remove"
                                onClick={e => { e.stopPropagation(); handleRemoveTalent(talent.id); }}
                              >
                                ×
                              </button>
                            )}
                          </div>
                          {isExpanded && talent.description && (
                            <div className="skill-card-body">
                              <p className="skill-card-desc">{talent.description}</p>
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
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
