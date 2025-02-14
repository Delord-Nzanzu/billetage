import { useEffect, useState } from "react";
import useDatabase from "../database/useDBcreate";
import * as SecureStorage from "expo-secure-store";

const useCategories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { db, isReady, initDB } = useDatabase();

  //   useEffect(() => {
  //     initDB();
  //   }, []);

  //   console.log("data;", db);

  const createCategories = ({ designation }) => {
    if (!isReady || !db) return;

    setLoading(true);
    db.runAsync("INSERT INTO Categorie_de_Depense (nom) VALUES (?);", [
      designation,
    ])
      .then(({ rowsAffected, ke }) => {
        alert("✅ Catégorie ajoutée !");
        // console.log("enregistrer", ke);
        // if (rowsAffected > 0) {
        //   alert("✅ Catégorie ajoutée !");
        // } else {
        //   alert("❌ Échec d'ajout !");
        // }
      })
      .catch((error) => {
        setError(true);
        console.error("🚨 Erreur :", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      });
  };

  const updateCategories = ({ designation, id_categories }) => {
    if (!isReady || !db) return;

    setLoading(true);
    db.runAsync("UPDATE Categorie_de_Depense SET nom=? WHERE id_categorie=?;", [
      designation,
      id_categories,
    ])
      .then(({ rowsAffected, ke }) => {
        alert("✅ Catégorie Modifié !");
      })
      .catch((error) => {
        setError(true);
        console.error("🚨 Erreur :", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      });
  };

  const deleteCategories = ({ id }) => {
    if (!isReady || !db) return;

    setLoading(true);
    db.runAsync("DELETE FROM Categorie_de_Depense WHERE id_categorie = ?;", [
      id,
    ])
      .then(({ rowsAffected, ke }) => {
        alert("✅ Suppression reussie !");
        getCategories();
      })
      .catch((error) => {
        setError(true);
        console.error("🚨 Erreur :", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      });
  };

  const getCategories = () => {
    if (!isReady || !db) return;

    setLoading(true);

    db.getAllAsync("SELECT * FROM Categorie_de_Depense;")
      .then((categories) => {
        // console.log("📌 Catégories récupérées :", categories);
        setData(categories);
      })
      .catch((error) => {
        console.error("🚨 Erreur lors de la récupération :", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      });
  };

  const coutCategories = () => {
    if (!isReady || !db) return;

    setLoading(true);

    db.getAllAsync("SELECT count(*) as total FROM Categorie_de_Depense;")
      .then((categories) => {
        // console.log("📌 Catégories récupérées :", categories);
        setData(categories);
      })
      .catch((error) => {
        console.error("🚨 Erreur lors de la récupération :", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      });
  };

//   useEffect(() => {
//     if (isReady) {
//       getCategories();
//     }
//   }, [isReady]);

  return {
    createCategories,
    error,
    loading,
    getCategories,
    data,
    deleteCategories,
    updateCategories,
    isReady
  };
};

export default useCategories;
