import { View, Text } from "react-native";
import React, { useState } from "react";
import TextInputs from "../../components/TextInputs";
import { CheckBox, Divider } from "react-native-elements";
import Boutons from "../../components/Buttons";
import * as yup from "yup";
import { useFormik } from "formik";
import useBudget from "../../hooks/budget/useBudget";
import { useRoute } from "@react-navigation/native";

const NouveauBudget = () => {
  const { createBudget, loading, updateBudget } = useBudget();
  const params = useRoute();
  const { data } = params.params;

  const [selectedValue, setSelectedValue] = useState(
    data !== null ? data?.devise : "CDF"
  );

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      montant: data !== null ? parseFloat(data.montant_initial) : "",
      description: data !== null ? data.description : "",
    },
    validationSchema: yup.object().shape({
      montant: yup.string().required("Le champs est obligatoire"),
      description: yup.string().required("Le champs est obligatoire"),
    }),
    onSubmit: async (e, { resetForm }) => {
      if (data !== null) {
        // console.log("modification", e.montant);
        updateBudget({
          description: e.description,
          devise: selectedValue,
          montant: e.montant,
          id: data?.id_budget,
        });
      } else {
        await createBudget({
          description: e.description,
          devise: selectedValue,
          montant: e.montant,
        });
      }
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}>
      <View
        style={{
          marginTop: 50,
          margin: 20,
        }}>
        <Text
          style={{
            fontFamily: "monst",
            fontSize: 18,
          }}>
          Nouveau Budget
        </Text>
        <Text
          style={{
            fontFamily: "monst-i",
            fontSize: 16,
            color: "gray",
          }}>
          Ajouter le budget pour chaque mois
        </Text>
        <Divider
          style={{
            width: "100%",
            marginTop: 10,
            marginBottom: 10,
            borderColor: "gray",
          }}
        />
        <TextInputs
          label={"Saisie le budget"}
          iconname={"attach-money"}
          iconcolor={"green"}
          placeholder={"ex: 10$, 10000FC"}
          keyboardType={"numeric"}
          // // id={"montant"}
          value={validation.values.montant}
          onChange={validation.handleChange("montant")}
          onBlue={validation.handleBlur("montant")}
          error={
            validation.errors.montant && validation.touched.montant && true
          }
          texterror={
            validation.errors.montant &&
            validation.touched.montant &&
            validation.errors.montant
          }
        />

        <View
          style={{
            marginTop: 10,
            marginLeft: -8,
          }}>
          <View
            style={{
              flexDirection: "row",
            }}>
            <View style={{ marginRight: -5 }}>
              <CheckBox
                title="FC (Franc congolais)"
                checked={selectedValue === "CDF"}
                onPress={(e) => setSelectedValue("CDF")}
                checkedIcon="dot-circle-o"
                // uncheckedIcon="circle-o"
              />
            </View>
            <View>
              <CheckBox
                title="$ (Dollard Americain)"
                checked={selectedValue === "USD"}
                onPress={() => setSelectedValue("USD")}
                checkedIcon="dot-circle-o"
                //   uncheckedIcon="circle-o"
              />
            </View>
          </View>
          <TextInputs
            label={"Description"}
            iconname={"comment"}
            iconcolor={"green"}
            placeholder={"ex: Budget initial du mois de janvier"}
            // keyboardType={"numeric"}
            // // id={"montant"}
            value={validation.values.description}
            onChange={validation.handleChange("description")}
            onBlue={validation.handleBlur("description")}
            error={
              validation.errors.description &&
              validation.touched.description &&
              true
            }
            texterror={
              validation.errors.description &&
              validation.touched.description &&
              validation.errors.description
            }
          />
        </View>
        <Boutons
          text={data !== null ? "Modification" : "Enregistrer"}
          backgroundColor={"#040332"}
          colorText={"#FFF"}
          iconname={"addfile"}
          colorIcon={"#fff"}
          //   width={"30%"}
          onPress={validation.handleSubmit}
          disabled={loading}
        />
      </View>
    </View>
  );
};

export default NouveauBudget;
