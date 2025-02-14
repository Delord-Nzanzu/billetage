import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function useDatabase() {
  const nav = useNavigation();
  const [db, setDb] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const initialisationBD = async () => {
    try {
      const database = await SQLite.openDatabaseAsync("gdepense.db");
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS Budget (
          id_budget INTEGER PRIMARY KEY AUTOINCREMENT,
          montant_initial REAL NOT NULL,
          devise TEXT NOT NULL,
          mois TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Categorie_de_Depense (
          id_categorie INTEGER PRIMARY KEY AUTOINCREMENT,
          nom TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Depenses (
          id_depense INTEGER PRIMARY KEY AUTOINCREMENT,
          id_budget INTEGER,
          id_categorie INTEGER,
          montant REAL NOT NULL,
          description TEXT,
          date TEXT NOT NULL,
          FOREIGN KEY (id_budget) REFERENCES Budget(id_budget),
          FOREIGN KEY (id_categorie) REFERENCES Categorie_de_Depense(id_categorie)
        );
      `);

      console.log("✅ Tables créées avec succès !");
      setDb(database);
      setIsReady(true);
      nav.navigate("PresentationScreen");
    } catch (error) {
      console.error("🚨 Erreur lors de la création des tables :", error);
    }
  };

  return { db, isReady, initialisationBD };
}
