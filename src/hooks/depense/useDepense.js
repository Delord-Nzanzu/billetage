import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
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
      console.log(
        `liste de produit : \n montant: ${montant}, 
        devise: ${devise}, i
        dcategorie: ${idcategorie}, 
        description: ${description}, 
        idBudget : ${totalMontant?.id_budget}`
      );
      //   //passe la modification d la soustration du budget pour valider le depense
      //   db.runAsync(
      //     `UPDATE Budget
      //          SET montant_initial = montant_initial - ?
      //          WHERE strftime('%Y-%m', date_budget) = strftime('%Y-%m', 'now');`,
      //     [montant]
      //   )
      //     .then(() => {
      //       //maintant nous allons enregistrer
      //       db.runAsync(
      //         "INSERT INTO Budget (montant_initial,devise,description) VALUES (?,?,?);",
      //         [montant, devise, description]
      //       )
      //         .then(({ rowsAffected, ke }) => {
      //           alert("✅ Budget ajoutée !");
      //         })
      //         .catch((error) => {
      //           setError(true);
      //           console.error("🚨 Erreur :", error);
      //         })
      //         .finally(() => {
      //           setTimeout(() => {
      //             setLoading(false);
      //           }, 2000);
      //         });
      //     })
      //     .catch((error) => {
      //       setError(true);
      //       console.error("🚨 Erreur lors de la mise à jour :", error);
      //     })
      //     .finally(() => {
      //       setTimeout(() => {
      //         setLoading(false);
      //       }, 2000);
      //     });
    }
  };

  return {
    data,
    dataEl,
    loading,
    error,
    setError,
    createDepense
  };
};

export default useDepense;
