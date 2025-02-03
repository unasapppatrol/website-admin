import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingStorage, setLoadingStorage] = useState(true);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");

    if (storedId) setId(storedId);
    if (storedRole) setRole(storedRole);
    if (storedUsername) setUser(storedUsername);
    setLoadingStorage(false);
  }, []);

  useEffect(() => {
    if (id) {
      localStorage.setItem("id", id);
    }
    if (user) {
      localStorage.setItem("username", user);
    }
    if (role) {
      localStorage.setItem("role", role);
    }
  }, [id, role, user]);
  return (
    <UserContext.Provider
      value={{
        loadingStorage,
        id,
        setId,
        role,
        setRole,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
