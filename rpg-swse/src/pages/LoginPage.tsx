import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const { login, register, user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    navigate('/dashboard');
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Preencha todos os campos');
      return;
    }

    if (isRegister) {
      if (register(username, password)) {
        navigate('/dashboard');
      } else {
        setError('Usuário já existe');
      }
    } else {
      if (login(username, password)) {
        navigate('/dashboard');
      } else {
        setError('Usuário ou senha inválidos');
      }
    }
  }

  return (
    <div className="login-page">
      <div className="stars-bg" />
      <div className="login-container">
        <div className="login-brand">
          <div className="saber-logo">
            <div className="saber-blade" />
            <div className="saber-hilt" />
          </div>
          <h1>C.R.I.S.</h1>
          <p className="brand-sub">Star Wars Saga Edition</p>
          <p className="brand-desc">Sistema de Fichas Inteligente</p>
        </div>
        <div className="login-card">
          <h2>{isRegister ? 'Criar Conta' : 'Entrar'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Usuário</label>
              <input
                type="text"
                placeholder="Seu nome de usuário"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Senha</label>
              <input
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button type="submit" className="btn-primary btn-full">
              {isRegister ? 'Cadastrar' : 'Entrar'}
            </button>
          </form>
          <p className="toggle-auth" onClick={() => { setIsRegister(!isRegister); setError(''); }}>
            {isRegister ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se'}
          </p>
        </div>
      </div>
      <div className="login-footer">
        <p>Projeto fan-made • Sem fins lucrativos</p>
      </div>
    </div>
  );
}
