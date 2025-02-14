import { View, Text } from "react-native";
import React from "react";
import TextInputs from "../../components/TextInputs";
import { Divider } from "react-native-elements";
import Boutons from "../../components/Buttons";
import { useFormik } from "formik";
import * as yup from "yup";
import useCategories from "../../hooks/categorie/useCategories";

const NouveauCat = () => {
  const { createCategories, loading, error } = useCategories();

  const validation = useFormik({
    enableReinitialize: false,
    initialValues: {
      designation: "",
    },
    validationSchema: yup.object().shape({
      designation: yup.string().required("Les champs est obligatoire"),
    }),
    onSubmit:  (e, { resetForm }) => {
       createCategories({ designation: e.designation });
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
          Nouveau catégorie
        </Text>
        <Text
          style={{
            fontFamily: "monst-i",
            fontSize: 16,
            color: "gray",
          }}>
          Ajouter les catégorie qui peut constite les dépesens. (ex: Logement,
          Divertissement(Loisire), Loyer, Allimentation, Transport, etc) a vous
          d'organiser vos catgories des dépense.
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
          label={"Saisie la catégorie"}
          iconname={"file-present"}
          iconcolor={"green"}
          placeholder={"ex: logement"}
          // keyboardType={"numeric"}
          // // id={"montant"}
          value={validation.values.designation}
          onChange={validation.handleChange("designation")}
          onBlue={validation.handleBlur("designation")}
          error={
            validation.errors.designation &&
            validation.touched.designation &&
            true
          }
          texterror={
            validation.errors.designation &&
            validation.touched.designation &&
            validation.errors.designation
          }
        />
        <Boutons
          text={"Enregistrer"}
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

export default NouveauCat;
