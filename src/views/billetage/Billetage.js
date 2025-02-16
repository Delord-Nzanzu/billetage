import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import AntDesing from "react-native-vector-icons/MaterialIcons";
import TextInputs from "../../components/TextInputs";
import { Divider } from "react-native-elements";
import { CheckBox } from "react-native-elements";
import SelectMultiline from "../../components/SelectMline";
import Boutons from "../../components/Buttons";
import * as yup from "yup";
import { useFormik } from "formik";
import Header from "../../components/Header";

const dataDollard = [
  { key: 100, value: 100 },
  { key: 50, value: 50 },
  { key: 20, value: 20 },
  { key: 10, value: 10 },
  { key: 5, value: 5 },
  { key: 1, value: 1 },
];

const dataFranc = [
  { key: 20000, value: 20000 },
  { key: 10000, value: 10000 },
  { key: 5000, value: 5000 },
  { key: 1000, value: 1000 },
  { key: 500, value: 500 },
  { key: 200, value: 200 },
  { key: 100, value: 100 },
  { key: 50, value: 50 },
];

const Billetage = () => {
  const [selectedValue, setSelectedValue] = useState("Franc");
  const [selectValeurBille, setSelectValeurBille] = useState([]);
  const [billDistribution, setBilleDistribution] = useState([]);
  const [montainitial, setMontantInitial] = useState(0);

  const Validation = useFormik({
    enableReinitialize: false,
    initialValues: {
      montant: "",
    },
    validationSchema: yup.object().shape({
      montant: yup.string().required("Le champ est obligatoire"),
    }),
    onSubmit: (e) => {
      setMontantInitial(e.montant);
      let getmontant = parseFloat(e.montant);

      if (isNaN(getmontant) || getmontant <= 0) {
        alert("Veuillez entrer un montant valide");
        return;
      }

      if (selectValeurBille.length === 0) {
        alert("Veuillez entrer le billet");
        return;
      }

      let distribution = [];
      let remaining = getmontant;

      // Trier les billets en ordre décroissant
      const sortedBills = selectValeurBille
        .map((e) => Number(e)) // Convertir en nombre
        .sort((a, b) => b - a);

      const billUsage = sortedBills.map((billet) => ({
        billet,
        nombre: 0,
        total: 0,
      }));

      while (remaining > 0) {
        let distributed = false;

        for (let i = 0; i < billUsage.length; i++) {
          const billet = billUsage[i].billet;
          if (remaining >= billet) {
            billUsage[i].nombre++;
            billUsage[i].total += billet;
            remaining -= billet;
            distributed = true;
          }
        }

        if (!distributed) break; // Si aucun billet ne peut être utilisé, on arrête
      }

      distribution = billUsage.filter((b) => b.nombre > 0);
      setBilleDistribution(distribution);
    },
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header
        // iconenameMaterialUi={"attach-money"}
        title={"Billetage"}
        subTite={
          " Entrez un montant et obtenez automatiquement la répartition optimale en billets."
        }
      />

      <ScrollView>
        <View
          style={{
            margin: 10,
          }}>
          <Text
            style={{
              fontFamily: "monst",
              fontSize: 18,
            }}>
            Entre montant
          </Text>
          <TextInputs
            label={"Entre montant (En chiffre)"}
            iconname={"attach-money"}
            iconcolor={"green"}
            placeholder={"ex: 10; 100; 100000"}
            keyboardType={"numeric"}
            // id={"montant"}
            value={Validation.values.montant}
            onChange={Validation.handleChange("montant")}
            onBlue={Validation.handleBlur("montant")}
            error={
              Validation.errors.montant && Validation.touched.montant && true
            }
            texterror={
              Validation.errors.montant &&
              Validation.touched.montant &&
              Validation.errors.montant
            }
          />
          <Divider
            style={{
              width: "100%",
              marginTop: 20,
              marginBottom: 10,
              borderColor: "gray",
            }}
          />
          <Text
            style={{
              fontFamily: "monst",
              fontSize: 18,
              marginBottom: 10,
            }}>
            Autre
          </Text>
          <Text
            style={{ fontSize: 18, marginBottom: 5, fontFamily: "monst-r" }}>
            Choisissez une devise
          </Text>

          <View
            style={{
              flexDirection: "row",
            }}>
            <View style={{ marginRight: 5 }}>
              <CheckBox
                title="FC (Franc congolais)"
                checked={selectedValue === "Franc"}
                onPress={(e) => setSelectedValue("Franc")}
                checkedIcon="dot-circle-o"
                // uncheckedIcon="circle-o"
              />
            </View>
            <View>
              <CheckBox
                title="$ (Dollard Americain)"
                checked={selectedValue === "dollar"}
                onPress={() => setSelectedValue("dollar")}
                checkedIcon="dot-circle-o"
                //   uncheckedIcon="circle-o"
              />
            </View>
          </View>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 5,
              fontFamily: "monst-r",
              marginTop: 10,
            }}>
            Choisissez le(s) valeur du billetage
          </Text>
          <SelectMultiline
            label={"Valeur du billetage"}
            placeholder={"Choississez le(s) valeur du billetage"}
            data={selectedValue === "Franc" ? dataFranc : dataDollard}
            setSelected={(e) => setSelectValeurBille(e)}
          />
          <View>
            <Boutons
              text={"Billeter"}
              backgroundColor={"#040332"}
              colorText={"#FFF"}
              iconname={"edit"}
              colorIcon={"#fff"}
              onPress={Validation.handleSubmit}
            />
          </View>
          <Divider
            style={{
              width: "10%",
              marginTop: 20,
              marginBottom: 10,
              borderColor: "gray",
            }}
          />
          <View>
            <Text
              style={{
                fontFamily: "monst",
                fontSize: 18,
                marginTop: 10,
                marginBottom: 10,
              }}>
              Résultat
            </Text>
            {billDistribution.length > 0 ? (
              <View>
                {/* En-tête */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#040332",
                    padding: 10,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                  }}>
                  <Text style={{ color: "white", fontWeight: "bold", flex: 1 }}>
                    Billetage
                  </Text>
                  <Text style={{ color: "white", fontWeight: "bold", flex: 1 }}>
                    Nombre
                  </Text>
                  <Text style={{ color: "white", fontWeight: "bold", flex: 1 }}>
                    Total
                  </Text>
                </View>

                {/* Corps du tableau */}
                {billDistribution.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                      borderBottomWidth: 1,
                      borderColor: "gray",
                    }}>
                    <Text style={{ flex: 1, textAlign: "center" }}>
                      {item.billet}
                    </Text>
                    <Text style={{ flex: 1, textAlign: "center" }}>
                      {item.nombre}
                    </Text>
                    <Text style={{ flex: 1, textAlign: "center" }}>
                      {item.total}
                    </Text>
                  </View>
                ))}

                {/* Affichage du Total général */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    backgroundColor: "#040332",
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                  }}>
                  <Text style={{ color: "white", fontWeight: "bold", flex: 2 }}>
                    Total Général
                  </Text>
                  <Text style={{ color: "white", fontWeight: "bold", flex: 1 }}>
                    {billDistribution.reduce(
                      (acc, item) => acc + item.nombre,
                      0
                    )}
                  </Text>
                  <Text style={{ color: "white", fontWeight: "bold", flex: 1 }}>
                    {billDistribution.reduce(
                      (acc, item) => acc + item.total,
                      0
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    backgroundColor: "#040332",
                    // borderBottomLeftRadius: 5,
                    // borderBottomRightRadius: 5,
                    borderRadius: 5,
                    marginTop: 5,
                  }}>
                  <Text style={{ color: "white", fontWeight: "bold", flex: 2 }}>
                    Montant restant
                  </Text>
                  <Text style={{ color: "white", fontWeight: "bold", flex: 1 }}>
                    -
                  </Text>
                  <Text style={{ color: "white", fontWeight: "bold", flex: 1 }}>
                    {montainitial -
                      billDistribution.reduce(
                        (acc, item) => acc + item.total,
                        0
                      )}
                  </Text>
                </View>
              </View>
            ) : (
              <Text
                style={{
                  fontStyle: "italic",
                  color: "gray",
                  textAlign: "center",
                  fontFamily: "monst-i",
                }}>
                Aucune répartition effectuée
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Billetage;
