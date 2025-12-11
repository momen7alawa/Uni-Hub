import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("uniHubUser");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("uniHubUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("uniHubUser");
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
