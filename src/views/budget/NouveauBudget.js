import { View, Text } from "react-native";
import React, { useState } from "react";
import TextInputs from "../../components/TextInputs";
import { CheckBox, Divider } from "react-native-elements";
import Boutons from "../../components/Buttons";

const NouveauBudget = () => {
  const [selectedValue, setSelectedValue] = useState("Franc");
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
          <TextInputs
            label={"Description"}
            iconname={"comment"}
            iconcolor={"green"}
            placeholder={"ex: Budget initial du mois de janvier"}
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
        </View>
        <Boutons
          text={"Enregistrer"}
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

export default NouveauBudget;
