import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import useBudget from "../budget/useBudget";
import useDatabase from "../database/useDBcreate";

const useDepense = () => {
  const [data, setData] = useState([]);
  const [dataEl, setDataEl] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { db, isReady } = useDatabase();
  const { getTotalBudgetForCurrentMonth2 } = useBudget();

  const createDepense = async ({
    montant,
    devise,
    description,
    idcategorie,
  }) => {
    const totalMontant = await getTotalBudgetForCurrentMonth2();

    if (!isReady || !db) return;

    setLoading(true);
    if (montant > totalMontant.total_montant) {
      //creation de budget
      alert(
        "🚨 Le montant de la depense est superieur au budget souscrit \n veillez soit augmenter votre budget ou soit equilibre le montant de la depense !"
      );
    } else {
      //passe la modification d la soustration du budget pour valider le depense
      db.runAsync(
        `UPDATE Budget
               SET montant_initial = montant_initial - ?
               WHERE strftime('%Y-%m', date_budget) = strftime('%Y-%m', 'now');`,
        [montant]
      )
        .then(() => {
          //maintant nous allons enregistrer
          db.runAsync(
            "INSERT INTO Depenses (id_budget,id_categorie,montant,description) VALUES (?,?,?,?);",
            [totalMontant?.id_budget, idcategorie, montant, description]
          )
            .then(({ rowsAffected, ke }) => {
              alert("✅ Depense ajoutée !");
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
        })
        .catch((error) => {
          setError(true);
          console.error("🚨 Erreur lors de la mise à jour :", error);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        });
    }
  };

  const getDepense = () => {
    if (!isReady || !db) return;

    setLoading(true);

    db.getAllAsync(
      `
      SELECT Depenses.*, 
             Budget.montant_initial, 
             Budget.devise, 
             Budget.date_budget, 
             Categorie_de_Depense.nom AS categorie_nom 
      FROM Depenses 
      INNER JOIN Budget ON Depenses.id_budget = Budget.id_budget 
      INNER JOIN Categorie_de_Depense ON Depenses.id_categorie = Categorie_de_Depense.id_categorie;
    `
    )
      .then((result) => {
        // console.log("📌 Dépenses récupérées :", result);
        setData(result);
      })
      .catch((error) => {
        console.error(
          "🚨 Erreur lors de la récupération des dépenses :",
          error
        );
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 5000); // Réduction du délai pour une meilleure UX
      });
  };

  
  return {
    data,
    dataEl,
    loading,
    error,
    setError,
    createDepense,
    getDepense,
    isReady,
    db
  };
};

export default useDepense;
