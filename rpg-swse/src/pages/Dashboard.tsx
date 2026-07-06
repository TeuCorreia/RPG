import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCharacters } from '../hooks/useCharacter';
import { CharacterCard } from '../components/CharacterCard';
import { calculateMaxHp } from '../utils/calculations';

export function Dashboard() {
  const { user, logout } = useAuth();
  const { characters, remove } = useCharacters();
  const navigate = useNavigate();

  const totalHp = characters.reduce((sum, c) => sum + calculateMaxHp(c), 0);
  const avgLevel = characters.length > 0
    ? Math.round(characters.reduce((sum, c) => sum + c.level, 0) / characters.length)
    : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-welcome">
        <div className="welcome-text">
          <h1>Bem-vindo, {user}</h1>
          <p>Que a Força esteja com você</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn-primary btn-with-icon" onClick={() => navigate('/character/new')}>
            <span className="btn-icon">+</span> Nova Ficha
          </button>
          <button className="btn-logout" onClick={logout}>
            Sair
          </button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-value">{characters.length}</span>
          <span className="stat-label">Fichas</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{avgLevel}</span>
          <span className="stat-label">Nível Médio</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalHp}</span>
          <span className="stat-label">HP Total</span>
        </div>
      </div>

      <div className="character-grid">
        {characters.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">⚔️</div>
            <h2>Nenhum personagem ainda</h2>
            <p>Crie seu primeiro herói da galáxia!</p>
            <button className="btn-primary" onClick={() => navigate('/character/new')}>
              Criar Personagem
            </button>
          </div>
        )}
        {characters.map(char => (
          <CharacterCard
            key={char.id}
            character={char}
            onClick={() => navigate(`/character/${char.id}`)}
            onDelete={() => {
              if (confirm(`Tem certeza que deseja excluir "${char.name}"?`)) remove(char.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
