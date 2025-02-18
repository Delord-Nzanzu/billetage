import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import useDatabase from "../database/useDBcreate";

const useBudget = () => {
  const [data, setData] = useState([]);
  const [dataEl, setDataEl] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { db, isReady } = useDatabase();
  const [montantSelonLeMois, setMontantSelonLeMois] = useState(0);

  const createBudget = async ({ montant, devise, description }) => {
    // getTotalBudgetForCurrentMonth();
    const totalMontant = await getTotalBudgetForCurrentMonth();
    console.log("budget initial", totalMontant);
    if (!isReady || !db) return;

    setLoading(true);
    if (totalMontant.total_montant === 0) {
      //creationnouveau budget du mois
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
    } else {
      db.runAsync(
        `UPDATE Budget 
             SET montant_initial = montant_initial + ? 
             WHERE strftime('%Y-%m', date_budget) = strftime('%Y-%m', 'now');`,
        [montant]
      )
        .then(() => {
          alert("✅ Budget mis à jour !");
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

  const updateBudget = ({ montant, devise, description, id }) => {
    if (!isReady || !db) return;

    setLoading(true);
    db.runAsync(
      "UPDATE Budget SET montant_initial=?,devise=?,description=? WHERE id_budget=?;",
      [montant, devise, description, id]
    )
      .then(() => {
        alert("✅ Budget Modifié !");
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

  //   const getTotalBudgetForMonth = async (mois = "2025-02") => {
  //     if (!db) return;

  //     try {
  //       const result = await db.getFirstAsync(
  //         `SELECT strftime('%Y-%m', date_budget) AS mois,
  //                 SUM(montant_initial) AS total_montant
  //          FROM Budget
  //          WHERE strftime('%Y-%m', date_budget) = ?
  //          GROUP BY mois;`, // Regroupe bien par mois
  //         [mois] // Ex: "2025-02"
  //       );

  //       console.log(
  //         "📌 Somme du budget pour le mois",
  //         mois,
  //         ":",
  //         result || "Aucun budget trouvé"
  //       );
  //       return result || { mois, total_montant: 0 }; // Retourne 0 si aucun résultat
  //     } catch (error) {
  //       console.error(
  //         "🚨 Erreur lors du calcul du budget pour",
  //         mois,
  //         ":",
  //         error
  //       );
  //       return null;
  //     }
  //   };

  //recupperation de la somme total selon chaque mois
  const getTotalBudgetForCurrentMonth = async () => {
    if (!db) return;

    try {
      const result = await db.getFirstAsync(
        `SELECT strftime('%Y-%m', date_budget) AS mois, 
                COALESCE(SUM(montant_initial), 0) AS total_montant,
                id_budget
         FROM Budget 
         WHERE strftime('%Y-%m', date_budget) = strftime('%Y-%m', 'now') 
         GROUP BY mois;`
      );

      if (result) {
        // console.log(
        //   `📌 Budget total pour ${result.mois} : ${result.total_montant} :${result.id_budget}`
        // );
        setMontantSelonLeMois(result.total_montant);
        return result.total_montant;
      } else {
        const currentMonth = new Date().toISOString().slice(0, 7);
        // console.log(`📌 Aucun budget trouvé pour ${currentMonth}, total = 0`);
        return { mois: currentMonth, total_montant: 0 };
      }
    } catch (error) {
      console.error(
        "🚨 Erreur lors du calcul du budget du mois en cours :",
        error
      );
      return null;
    }
  };

  //recupperation de la somme total selon chaque mois
  const getTotalBudgetForCurrentMonth2 = async () => {
    if (!db) return;

    try {
      const result = await db.getFirstAsync(
        `SELECT strftime('%Y-%m', date_budget) AS mois, 
                COALESCE(SUM(montant_initial), 0) AS total_montant,
                id_budget
         FROM Budget 
         WHERE strftime('%Y-%m', date_budget) = strftime('%Y-%m', 'now') 
         GROUP BY mois;`
      );

      if (result) {
        // console.log(
        //   `📌 Budget total pour ${result.mois} : ${result.total_montant} :${result.id_budget}`
        // );
        setMontantSelonLeMois(result.total_montant);
        return result;
      } else {
        const currentMonth = new Date().toISOString().slice(0, 7);
        // console.log(`📌 Aucun budget trouvé pour ${currentMonth}, total = 0`);
        return { mois: currentMonth, total_montant: 0 };
      }
    } catch (error) {
      console.error(
        "🚨 Erreur lors du calcul du budget du mois en cours :",
        error
      );
      return null;
    }
  };

  //reccuperation de tous le enregistrement du budget

  const coutBudget = () => {
    if (!isReady || !db) return;

    setLoading(true);

    db.getFirstAsync("SELECT count(*) as total FROM Budget;")
      .then((categories) => {
        // console.log("📌 Catégories récupérées :", categories?.total);
        setDataEl(categories?.total);
      })
      .catch((error) => {
        console.error("🚨 Erreur lors de la récupération :", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
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
        }, 2000);
      });
  };

  useEffect(() => {
    if (isReady) {
      getTotalBudgetForCurrentMonth();
    }
  }, [isReady]);

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
    montantSelonLeMois,
    coutBudget,
    getTotalBudgetForCurrentMonth,
    getTotalBudgetForCurrentMonth2,
  };
};

export default useBudget;
