import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import TextInputs from "../../components/TextInputs";
import { CheckBox, Divider } from "react-native-elements";
import Boutons from "../../components/Buttons";
import SelectNonMultiple from "../../components/SelectNonMultiple";
import useCategories from "../../hooks/categorie/useCategories";
import * as yup from "yup";
import { useFormik } from "formik";

const NouveauDepense = () => {
  const [selectedValue, setSelectedValue] = useState("Franc");
  const { datListeCombo, getCategories, isReady } = useCategories();
  const [selectCateg, setSelectCat] = useState();

  useEffect(() => {
    if (isReady) {
      getCategories();
    }
  }, [isReady]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      montant: "",
      motif: "",
    },
    validationSchema: yup.object().shape({
      montant: yup.string().required("Les champs est obligatoire"),
      motif: yup.string().required("Les champs est obligatoire"),
    }),
    onSubmit: (e) => {
      console.log(selectCateg);
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
          Nouveau Dépense
        </Text>
        <Text
          style={{
            fontFamily: "monst-i",
            fontSize: 16,
            color: "gray",
          }}>
          Ajouter les Dépenses
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
          label={"Saisie la Dépense"}
          iconname={"file-present"}
          iconcolor={"green"}
          placeholder={"ex: 50$, 50000FC"}
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
        </View>

        <View
          style={{
            marginTop: 10,
          }}>
          <SelectNonMultiple
            label={"Categories"}
            data={datListeCombo}
            placeholder={"Categories"}
            setSelected={(e) => setSelectCat(e)}
          />
        </View>

        <View>
          <TextInputs
            label={"Motif de la Dépense"}
            iconname={"file-present"}
            iconcolor={"green"}
            placeholder={"ex: Achat des unites"}
            //   keyboardType={"numeric"}
            // // id={"montant"}
            value={validation.values.motif}
            onChange={validation.handleChange("motif")}
            onBlue={validation.handleBlur("motif")}
            error={validation.errors.motif && validation.touched.motif && true}
            texterror={
              validation.errors.motif &&
              validation.touched.motif &&
              validation.errors.motif
            }
          />
        </View>
        <Boutons
          text={"Enregistrer"}
          backgroundColor={"#040332"}
          colorText={"#FFF"}
          iconname={"addfile"}
          colorIcon={"#fff"}
          //   width={"30%"}
          onPress={validation.handleSubmit}
        />
      </View>
    </View>
  );
};

export default NouveauDepense;
