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
        `🚨Le montant de la dépense dépasse le budget souscrit.
Veuillez soit augmenter votre budget, soit ajuster le montant de la dépense.!`
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

  const updateDepense = async ({
    montant,
    devise,
    description,
    idcategorie,
    id_depense,
    montantDepenseAvant,
  }) => {
    const totalMontant = await getTotalBudgetForCurrentMonth2();

    if (!isReady || !db) return;

    setLoading(true);
    if (montant > totalMontant.total_montant) {
      //creation de budget
      alert(
        `🚨Le montant de la dépense dépasse le budget souscrit.
Veuillez soit augmenter votre budget, soit ajuster le montant de la dépense.!`
      );
    } else {
      db.runAsync(
        `UPDATE Budget
                     SET montant_initial = montant_initial + ?
                     WHERE strftime('%Y-%m', date_budget) = strftime('%Y-%m', 'now');`,
        [montantDepenseAvant]
      )
        .then(() => {
          //maintant nous allons supprimer dans le budget
          db.runAsync(
            `UPDATE Budget
                         SET montant_initial = montant_initial - ?
                         WHERE strftime('%Y-%m', date_budget) = strftime('%Y-%m', 'now');`,
            [montant]
          )
            .then(() => {
              //maintant nous modifier dans le depense
              db.runAsync(
                "UPDATE Depenses SET  id_budget=?,id_categorie=?,montant=?,description=? where id_depense=? ",
                [
                  totalMontant?.id_budget,
                  idcategorie,
                  montant,
                  description,
                  id_depense,
                ]
              )
                .then(({ rowsAffected, ke }) => {
                  alert("✅ Modification reussie !");
                  getDepense();
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

  const deleteDepense = ({ id_depense, montant }) => {
    if (!isReady || !db) return;

    setLoading(true);
    //passe la modification d la soustration du budget pour valider le depense
    db.runAsync(
      `UPDATE Budget
               SET montant_initial = montant_initial + ?
               WHERE strftime('%Y-%m', date_budget) = strftime('%Y-%m', 'now');`,
      [montant]
    )
      .then(() => {
        //maintant nous allons supprimer
        db.runAsync("DELETE FROM Depenses where id_depense=? ", [id_depense])
          .then(({ rowsAffected, ke }) => {
            alert("✅ Suppression reussie !");
            getDepense();
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

  const coutDepense = () => {
    if (!isReady || !db) return;

    setLoading(true);

    db.getFirstAsync("SELECT count(*) as total FROM Depenses;")
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

  return {
    data,
    dataEl,
    loading,
    error,
    setError,
    createDepense,
    getDepense,
    isReady,
    db,
    coutDepense,
    deleteDepense,
    updateDepense,
  };
};

export default useDepense;
