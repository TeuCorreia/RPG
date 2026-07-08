import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useRef } from 'react';

const navItems = [
  { path: '/dashboard', icon: 'person_search', label: 'Personagens' },
  { path: '/progression', icon: 'trending_up', label: 'Níveis' },
  { path: '/about', icon: 'auto_stories', label: 'Sobre' },
];

export function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      bgRef.current.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(74, 125, 255, 0.03) 0%, transparent 40%)`;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  if (!user) return <Outlet />;

  function isActive(path: string) {
    return location.pathname === path;
  }

  return (
    <div className="app-layout">
      <div ref={bgRef} className="light-follow" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(74, 125, 255, 0.03) 0%, transparent 40%)' }} />

      {/* Sidebar (Desktop) */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1>C.R.I.S.</h1>
          <small>Star Wars Saga Edition</small>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-avatar">
            <span className="icon">account_circle</span>
          </div>
          <div className="sidebar-user-name">{user}</div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-btn" onClick={() => navigate('/character/new')}>
            <span className="icon">add</span>
            Nova Ficha
          </button>
          <button className="sidebar-link danger" onClick={logout} style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <span className="icon">logout</span>
            Sair
          </button>
        </div>
      </aside>

      {/* Top Bar (Mobile) */}
      <header className="top-bar">
        <span className="top-bar-title">C.R.I.S.</span>
        <div style={{ display: 'flex', gap: 12 }}>
          <span className="icon" style={{ color: 'var(--accent)', cursor: 'pointer', fontSize: 24 }}>account_circle</span>
          <span className="icon" style={{ color: 'var(--text-muted)', cursor: 'pointer', fontSize: 24 }}>settings</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-with-sidebar">
        <div className="main-content-inner">
          <Outlet />
        </div>
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="bottom-nav">
        <Link to="/dashboard" className={`bottom-nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
          <span className="icon">home</span>
          <span>Home</span>
        </Link>
        <Link to="/progression" className={`bottom-nav-link ${isActive('/progression') ? 'active' : ''}`}>
          <span className="icon">trending_up</span>
          <span>Níveis</span>
        </Link>
        <Link to="/about" className={`bottom-nav-link ${isActive('/about') ? 'active' : ''}`}>
          <span className="icon">group</span>
          <span>Sobre</span>
        </Link>
        <div className="bottom-nav-create">
          <button className="bottom-nav-create-btn" onClick={() => navigate('/character/new')}>
            <span className="icon" style={{ fontSize: 28 }}>add</span>
          </button>
          <div className="bottom-nav-label">Criar</div>
        </div>
        <button className="bottom-nav-link" onClick={logout}>
          <span className="icon">logout</span>
          <span>Sair</span>
        </button>
      </nav>
    </div>
  );
}
