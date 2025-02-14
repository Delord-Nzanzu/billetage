import { useState } from "react";
import useDatabase from "../database/useDBcreate";
import * as SecureStorage from "expo-secure-store";

const useCategories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { db, isReady } = useDatabase();

  const createCategories = (designation) => {
    if (!isReady || !db) return;

    setLoading(true);
    db.runAsync("INSERT INTO Categorie_de_Depense (nom) VALUES (?);", [
      designation,
    ])
      .then(({ rowsAffected }) => {
        if (rowsAffected > 0) {
          alert("✅ Catégorie ajoutée !");
        } else {
          alert("❌ Échec d'ajout !");
        }
      })
      .catch((error) => {
        setError(true);
        console.error("🚨 Erreur :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getCategories = () => {
    if (!isReady || !db) return;

    db.getAllAsync("SELECT * FROM Categorie_de_Depense;")
      .then((categories) => {
        console.log("📌 Catégories récupérées :", categories);
        setData(categories);
      })
      .catch((error) => {
        console.error("🚨 Erreur lors de la récupération :", error);
      });
  };

  return { createCategories, error, loading, getCategories, data };
};

export default useCategories;
