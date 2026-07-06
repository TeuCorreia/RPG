import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { CreateCharacter } from './pages/CreateCharacter';
import { CharacterSheet } from './pages/CharacterSheet';
import { About } from './pages/About';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/character/new" element={<ProtectedRoute><CreateCharacter /></ProtectedRoute>} />
        <Route path="/character/:id" element={<ProtectedRoute><CharacterSheet /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
