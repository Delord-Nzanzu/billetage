import { View, Text } from "react-native";
import React from "react";
import TextInputs from "../../components/TextInputs";
import { Divider } from "react-native-elements";
import Boutons from "../../components/Buttons";

const NouveauCat = () => {
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
          Ajouter les catégorie qui peut constite les dépesens. (ex:
          Logement, Divertissement, Loyer, Allimentation, Transport, etc) a vous
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
          // value={Validation.values.montant}
          // onChange={Validation.handleChange("montant")}
          // onBlue={Validation.handleBlur("montant")}
          // error={
          //   Validation.errors.montant && Validation.touched.montant && true
          // }
          // texterror={
          //   Validation.errors.montant &&
          //   Validation.touched.montant &&
          //   Validation.errors.montant
          // }
        />
        <Boutons
          text={"Nouveau"}
          backgroundColor={"#040332"}
          colorText={"#FFF"}
          iconname={"addfile"}
          colorIcon={"#fff"}
          //   width={"30%"}
          //   onPress={() => nav.navigate("NouveauCat")}
        />
      </View>
    </View>
  );
};

export default NouveauCat;
