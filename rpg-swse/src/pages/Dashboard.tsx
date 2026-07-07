import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCharacters } from '../hooks/useCharacter';
import { CharacterCard } from '../components/CharacterCard';
import { calculateMaxHp } from '../utils/calculations';

export function Dashboard() {
  const { user } = useAuth();
  const { characters, remove } = useCharacters();
  const navigate = useNavigate();

  const totalHp = characters.reduce((sum, c) => sum + calculateMaxHp(c), 0);
  const avgLevel = characters.length > 0
    ? Math.round(characters.reduce((sum, c) => sum + c.level, 0) / characters.length)
    : 0;

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Crônicas da Galáxia</h1>
        <p className="dashboard-subtitle">
          Bem-vindo de volta, {user}. A Força está com você. Suas crônicas estão prontas para serem expandidas.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card-new">
          <span className="icon stat-icon">group</span>
          <span className="stat-value">{characters.length}</span>
          <span className="stat-label">Fichas</span>
        </div>
        <div className="stat-card-new">
          <span className="icon stat-icon">trending_up</span>
          <span className="stat-value">{avgLevel}</span>
          <span className="stat-label">Nível Médio</span>
        </div>
        <div className="stat-card-new">
          <span className="icon stat-icon">favorite</span>
          <span className="stat-value">{totalHp}</span>
          <span className="stat-label">HP Total</span>
        </div>
      </div>

      {/* Characters Section */}
      <div className="section-header">
        <h2>
          <span className="icon" style={{ color: 'var(--accent)' }}>person_search</span>
          Seus Personagens
        </h2>
        {characters.length > 0 && (
          <button
            className="sidebar-btn"
            onClick={() => navigate('/character/new')}
            style={{ width: 'auto', padding: '8px 16px', fontSize: 12, margin: 0 }}
          >
            <span className="icon" style={{ fontSize: 16 }}>add</span>
            Nova Ficha
          </button>
        )}
      </div>

      <div className="char-grid">
        {characters.length === 0 && (
          <div className="summon-card" style={{ gridColumn: '1 / -1' }} onClick={() => navigate('/character/new')}>
            <span className="icon">add_circle</span>
            <h3>Criar Novo Herói</h3>
            <p>Expanda seu roster e comece uma nova jornada lendária.</p>
          </div>
        )}
        {characters.map(char => (
          <div key={char.id} style={{ position: 'relative' }}>
            <CharacterCard
              character={char}
              onClick={() => navigate(`/character/${char.id}`)}
              onDelete={() => {
                if (confirm(`Tem certeza que deseja excluir "${char.name}"?`)) remove(char.id);
              }}
            />
          </div>
        ))}
        {characters.length > 0 && (
          <div className="summon-card glass-panel" onClick={() => navigate('/character/new')}>
            <span className="icon">add_circle</span>
            <h3>Convocar Novo Herói</h3>
            <p>Expanda seu roster e comece uma nova jornada lendária.</p>
          </div>
        )}
      </div>

    </div>
  );
}
