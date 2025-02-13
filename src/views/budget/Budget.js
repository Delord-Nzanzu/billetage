import { View, Text } from "react-native";
import React from "react";
import Header from "../../components/Header";
import Boutons from "../../components/Buttons";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Budget = () => {
  const nav = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}>
      <Header
        iconenameMaterialUi={"attach-money"}
        title={"Budget"}
        subTite={"Ajouter les Budgets"}
      />
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          margin: 10,
        }}>
        <Boutons
          text={"Nouveau"}
          backgroundColor={"#040332"}
          colorText={"#FFF"}
          iconname={"arrowright"}
          colorIcon={"#fff"}
          width={"30%"}
          onPress={() => nav.navigate("NouveauBudget")}
        />
      </View>
      <View
        style={{
          margin: 20,
          marginTop: -10,
        }}>
        <Text
          style={{
            fontFamily: "monst",
            fontSize: 18,
          }}>
          Listes de budget
        </Text>
        <Divider
          style={{
            width: "100%",
            marginTop: 10,
            marginBottom: 10,
            borderColor: "gray",
          }}
        />
      </View>
    </View>
  );
};

export default Budget;
