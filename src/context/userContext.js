// TokenContext.js

import React, { createContext, useEffect, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  const storeID = async (value) => {
    try {
      localStorage.setItem("id", value);
    } catch (error) {
      console.error("Error storing id user:", error);
    }
  };

  const storeRole = async (value) => {
    try {
      localStorage.setItem("role", value);
    } catch (error) {
      console.error("Error storing role user", error);
    }
  };
  const storeUsername = async (value) => {
    try {
      localStorage.setItem("username", value);
    } catch (error) {
      console.error("Error storing role user", error);
    }
  };

  const retrieveID = async () => {
    try {
      const value = localStorage.getItem("id");
      if (value !== null) {
        setId(value);
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  const retrieveRole = async () => {
    try {
      const value = localStorage.getItem("role");
      if (value !== null) {
        setRole(value);
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };
  const retrieveUsername = async () => {
    try {
      const value = localStorage.getItem("username");
      if (value !== null) {
        setUser(value);
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  // Memanggil retrieveID saat context provider pertama kali di-load
  useEffect(() => {
    retrieveID();
    retrieveRole();
    retrieveUsername();
  }, []);

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
