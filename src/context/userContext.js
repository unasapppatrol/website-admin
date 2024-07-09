// TokenContext.js

import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  const storeID = async (value) => {
    try {
      localStorage.setItem("id", value);
      setId(value);
    } catch (error) {
      console.error("Error storing id user:", error);
    }
  };

  const storeRole = async (value) => {
    try {
      localStorage.setItem("role", value);
      setRole(value);
    } catch (error) {
      console.error("Error storing role user", error);
    }
  };
  const storeUsername = async (value) => {
    try {
      localStorage.setItem("username", value);
      setUser(value);
    } catch (error) {
      console.error("Error storing role user", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        id,
        setId,
        storeID,
        role,
        setRole,
        storeRole,
        user,
        setUser,
        storeUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
