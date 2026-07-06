import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return <Outlet />;

  return (
    <div className="app-layout">
      <nav className="top-nav">
        <div className="nav-brand">
          <Link to="/dashboard">
            <span className="nav-logo">C.R.I.S.</span>
            <span className="nav-subtitle">Star Wars SE</span>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
            Fichas
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            Sobre
          </Link>
        </div>
        <div className="nav-user">
          <span>{user}</span>
          <button className="btn-logout" onClick={logout}>Sair</button>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
