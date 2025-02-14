import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import useDatabase from "../database/useDBcreate";

const useBudget = () => {
  const [data, setData] = useState([]);
  const [dataEl, setDataEl] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { db, isReady } = useDatabase();

  const createBudget = ({ montant, devise, description }) => {
    if (!isReady || !db) return;

    setLoading(true);
    db.runAsync(
      "INSERT INTO Budget (montant_initial,devise,description) VALUES (?,?,?);",
      [montant, devise, description]
    )
      .then(({ rowsAffected, ke }) => {
        alert("✅ Budget ajoutée !");
      })
      .catch((error) => {
        setError(true);
        console.error("🚨 Erreur :", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };

  const updateBudget = ({ montant, devise, description }) => {
    if (!isReady || !db) return;

    setLoading(true);
    db.runAsync(
      "UPDATE Budget SET nmontant_initial=?,devise=?,description=? WHERE id_budget=?;",
      [montant, devise, description]
    )
      .then(({ rowsAffected, ke }) => {
        alert("✅ Catégorie Modifié !");
      })
      .catch((error) => {
        setError(true);
        // console.error("🚨 Erreur :", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };

  const deleteBudget = ({ id }) => {
    if (!isReady || !db) return;

    setLoading(true);
    db.runAsync("DELETE FROM Budget WHERE id_budget = ?;", [id])
      .then(({ rowsAffected, ke }) => {
        alert("✅ Suppression reussie !");
        getBudget();
      })
      .catch((error) => {
        setError(true);
        console.error("🚨 Erreur :", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };

  const getBudget = () => {
    if (!isReady || !db) return;

    setLoading(true);

    db.getAllAsync("SELECT * FROM Budget;")
      .then((e) => {
        // console.log("📌 Catégories récupérées :", e);
        setData(e);
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

  //   useEffect(()=>{
  //     getBudget()
  //   },[])

  return {
    data,
    dataEl,
    loading,
    error,
    db,
    isReady,
    createBudget,
    getBudget,
    deleteBudget,
    updateBudget,
  };
};

export default useBudget;
