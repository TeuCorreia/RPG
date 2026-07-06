import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUsers, saveUsers, getSession, saveSession, clearSession } from '../utils/storage';

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
  }, []);

  function login(username: string, password: string): boolean {
    const users = getUsers();
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      setUser(username);
      saveSession(username);
      return true;
    }
    return false;
  }

  function register(username: string, password: string): boolean {
    const users = getUsers();
    if (users.find(u => u.username === username)) return false;
    users.push({ username, password });
    saveUsers(users);
    setUser(username);
    saveSession(username);
    return true;
  }

  function logout() {
    setUser(null);
    clearSession();
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
