import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiceRoller } from '../hooks/useDiceRoller';

export function DiceLab() {
  const navigate = useNavigate();
  const roller = useDiceRoller();
  const [expression, setExpression] = useState('1d20');
  const [showPresets, setShowPresets] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [newPresetDesc, setNewPresetDesc] = useState('');
  const [editingPreset, setEditingPreset] = useState<string | null>(null);

  const diceTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];

  const handleRoll = () => {
    roller.rollCustom(expression);
  };

  const handleDiceSelect = (die: string) => {
    // Substituir o tipo de dado na expressão atual
    const newExpr = expression.replace(/d\d+/, die);
    setExpression(newExpr);
  };

  const handleSavePreset = () => {
    if (!newPresetName.trim()) return;
    roller.savePreset(newPresetName.trim(), expression, newPresetDesc.trim() || undefined);
    setNewPresetName('');
    setNewPresetDesc('');
  };

  const handleUpdatePreset = (id: string, name: string, description?: string) => {
    roller.updatePreset(id, { name, description });
    setEditingPreset(null);
  };

  const handleDeletePreset = (id: string) => {
    if (confirm('Excluir este favorito?')) {
      roller.deletePreset(id);
    }
  };

  return (
    <div className="dice-lab">
      <header className="dice-lab-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <span className="icon">arrow_back</span>
          Voltar
        </button>
        <h1>Laboratório de Dados</h1>
      </header>

      <div className="dice-lab-content">
        {/* Painel Principal */}
        <div className="main-panel">
          <div className="dice-input-section">
            <label>Expressão de Dados</label>
            <div className="dice-input-row">
              <input
                type="text"
                value={expression}
                onChange={e => setExpression(e.target.value)}
                placeholder="Ex: 2d6+3"
                className="dice-expression-input"
              />
              <button className="roll-btn" onClick={handleRoll}>
                Rolar
              </button>
            </div>

            <div className="dice-buttons">
              {diceTypes.map(die => (
                <button
                  key={die}
                  className="dice-btn"
                  onClick={() => handleDiceSelect(die)}
                >
                  {die}
                </button>
              ))}
            </div>
          </div>

          {/* Último Resultado */}
          {roller.history.length > 0 && (
            <div className="last-roll">
              <h3>Último Resultado</h3>
              <div className="roll-result">
                <span className="roll-expression">{roller.history[0].expression}</span>
                <span className="roll-value">{roller.history[0].result}</span>
                <span className="roll-details">
                  [{roller.history[0].rolls.join(', ')}]
                </span>
              </div>
            </div>
          )}

          {/* Salvar como Favorito */}
          <div className="save-preset">
            <h3>Salvar como Favorito</h3>
            <input
              type="text"
              value={newPresetName}
              onChange={e => setNewPresetName(e.target.value)}
              placeholder="Nome do favorito"
            />
            <input
              type="text"
              value={newPresetDesc}
              onChange={e => setNewPresetDesc(e.target.value)}
              placeholder="Descrição (opcional)"
            />
            <button
              className="save-btn"
              onClick={handleSavePreset}
              disabled={!newPresetName.trim()}
            >
              Salvar
            </button>
          </div>
        </div>

        {/* Painel Lateral */}
        <div className="side-panel">
          {/* Favoritos */}
          <div className="presets-section">
            <div className="presets-header">
              <h3>Favoritos</h3>
              <button
                className="toggle-btn"
                onClick={() => setShowPresets(!showPresets)}
              >
                {showPresets ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            {showPresets && (
              <div className="presets-list">
                {roller.presets.length === 0 ? (
                  <p className="empty-text">Nenhum favorito salvo</p>
                ) : (
                  roller.presets.map(preset => (
                    <div key={preset.id} className="preset-item">
                      {editingPreset === preset.id ? (
                        <div className="preset-edit">
                          <input
                            type="text"
                            defaultValue={preset.name}
                            id={`preset-name-${preset.id}`}
                          />
                          <input
                            type="text"
                            defaultValue={preset.description || ''}
                            id={`preset-desc-${preset.id}`}
                            placeholder="Descrição"
                          />
                          <div className="preset-edit-actions">
                            <button
                              onClick={() => {
                                const nameEl = document.getElementById(`preset-name-${preset.id}`) as HTMLInputElement;
                                const descEl = document.getElementById(`preset-desc-${preset.id}`) as HTMLInputElement;
                                handleUpdatePreset(preset.id, nameEl.value, descEl.value);
                              }}
                            >
                              Salvar
                            </button>
                            <button onClick={() => setEditingPreset(null)}>
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="preset-info">
                            <strong>{preset.name}</strong>
                            <span className="preset-expression">{preset.expression}</span>
                            {preset.description && (
                              <span className="preset-desc">{preset.description}</span>
                            )}
                          </div>
                          <div className="preset-actions">
                            <button
                              className="roll-preset-btn"
                              onClick={() => roller.rollPreset(preset.id)}
                            >
                              Rolar
                            </button>
                            <button
                              className="edit-preset-btn"
                              onClick={() => setEditingPreset(preset.id)}
                            >
                              Editar
                            </button>
                            <button
                              className="delete-preset-btn"
                              onClick={() => handleDeletePreset(preset.id)}
                            >
                              ×
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Histórico */}
          <div className="history-section">
            <div className="history-header">
              <h3>Histórico</h3>
              <button
                className="clear-btn"
                onClick={roller.clearHistory}
                disabled={roller.history.length === 0}
              >
                Limpar
              </button>
            </div>
            <div className="history-list">
              {roller.history.length === 0 ? (
                <p className="empty-text">Nenhuma rolagem ainda</p>
              ) : (
                roller.history.map((roll, index) => (
                  <div key={index} className="history-item">
                    <span className="history-expression">{roll.expression}</span>
                    <span className="history-result">{roll.result}</span>
                    <span className="history-rolls">
                      [{roll.rolls.join(', ')}]
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Estatísticas */}
          {roller.history.length > 0 && (
            <div className="stats-section">
              <h3>Estatísticas</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Total de Rolagens</span>
                  <span className="stat-value">{roller.history.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Maior Resultado</span>
                  <span className="stat-value">
                    {Math.max(...roller.history.map(r => r.result))}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Menor Resultado</span>
                  <span className="stat-value">
                    {Math.min(...roller.history.map(r => r.result))}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Média</span>
                  <span className="stat-value">
                    {(
                      roller.history.reduce((sum, r) => sum + r.result, 0) /
                      roller.history.length
                    ).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
