import { View, Text } from "react-native";
import React, { createContext } from "react";
import * as SQLite from "expo-sqlite";

const ContextInitial = createContext();

const ContextProvider = ({ children }) => {
  //
  const openData = async () => {
    const database = await SQLite.openDatabaseAsync("gdepense.db");
    return database;
  };

  return (
    <ContextInitial.Provider value={{ openData }}>
      {children}
    </ContextInitial.Provider>
  );
};

export default ContextProvider;
