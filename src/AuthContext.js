import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(status);
  }, []);

  const login = () => {
    localStorage.setItem('loggedIn', 'true');
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
