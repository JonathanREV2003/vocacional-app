import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    const savedUser =
      localStorage.getItem('user') || sessionStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (data, rememberMe) => {
    setUser(data.user);
    setToken(data.token);

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('token', data.token);
    storage.setItem('user', JSON.stringify(data.user));
  };

  // Actualizar datos del usuario en estado y en el storage correspondiente
  const updateUser = (newUser) => {
    setUser(newUser);
    // Determinar dónde está guardado el token/usuario (localStorage tiene prioridad)
    const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
    if (newUser) storage.setItem('user', JSON.stringify(newUser));
    else storage.removeItem('user');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
