import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // DEMO LOGIN — replace with Firebase signInWithEmailAndPassword when ready
  async function login(email, password) {
    if (email === "admin@rentnest.com" && password === "admin123") {
      const user = { uid: "admin001", email, displayName: "Admin User" };
      setCurrentUser(user);
      setUserRole("admin");
      return user;
    }
    throw new Error("Invalid credentials. Use the demo account below.");
  }

  function logout() {
    setCurrentUser(null);
    setUserRole(null);
  }

  return (
    <AuthContext.Provider value={{ currentUser, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
