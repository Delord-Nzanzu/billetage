import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

export async function openDB() {
  const db = await SQLite.openDatabaseAsync("dbdepense.db");
  return db;
}

export default function dbcreate() {
    const nav = useNavigation();

  const initialisationBD = async () => {
    const db = await openDB();

    try {
      await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Budget (
        id_budget INTEGER PRIMARY KEY AUTOINCREMENT,
        montant_initial REAL NOT NULL,
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

      console.log("Tables créées avec succès !");
      nav.navigate("PresentationScreen");
    } catch (error) {
      console.error("Erreur lors de la création des tables :", error);
    }
  };
  return {
    initialisationBD,
  };
}
