import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function useDatabase() {
  const nav = useNavigation();
  const [db, setDb] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const initialisationBD = async () => {
    try {
      const database = await SQLite.openDatabaseAsync("bdgestions.db");
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS Budget (
          id_budget INTEGER PRIMARY KEY AUTOINCREMENT,
          montant_initial REAL NOT NULL,
          devise TEXT NOT NULL,
          description TEXT NULL,
          date_budget TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')) 
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
      // setDb(database);
      // setIsReady(true);
      nav.navigate("PresentationScreen");
    } catch (error) {
      console.error("🚨 Erreur lors de la création des tables :", error);
    }
  };
  const initDB = async () => {
    try {
      const database = await SQLite.openDatabaseAsync("bdgestions.db");
      setDb(database);
      setIsReady(true);
      // console.log("✅ Base de données initialisée !");
    } catch (error) {
      console.error("🚨 Erreur d'initialisation de la BD :", error);
    }
  };

  useEffect(() => {
    initDB(); // Démarrer l'initialisation au montage du composant
  }, []);

  return { db, isReady, initialisationBD, initDB };
}
