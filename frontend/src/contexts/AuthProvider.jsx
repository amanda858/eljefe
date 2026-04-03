import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { api } from '../api';

export function AuthProvider({ children }) {
  // Initialise loading=true only if there is a stored token to validate.
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => !!localStorage.getItem('eljefe_token'));

  useEffect(() => {
    const token = localStorage.getItem('eljefe_token');
    if (!token) return; // loading is already false from lazy initialiser
    api.me()
      .then(setUser)
      .catch(() => localStorage.removeItem('eljefe_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    localStorage.setItem('eljefe_token', data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (name, email, password) => {
    const data = await api.register(name, email, password);
    localStorage.setItem('eljefe_token', data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('eljefe_token');
    setUser(null);
  };

  const refreshUser = async () => {
    const fresh = await api.me();
    setUser(fresh);
    return fresh;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
