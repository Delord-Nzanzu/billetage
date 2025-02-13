import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AntDesing from "react-native-vector-icons/MaterialIcons";
import Header from "../../components/Header";

const HomeDepense = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}>
      <StatusBar translucent={true} backgroundColor="#040332" style="light" />
      <Header
        iconenameMaterialUi={"home"}
        title={"Gestion de dépense"}
        subTite={
          "Gerer vos depense quotidienne toute en vous assurent de l'evolution chaque fin du mois"
        }
      />
      <View
        style={{
          marginTop: 50,
          margin: 20,
        }}>
        <Text>HomeDepense</Text>
      </View>
    </View>
  );
};

export default HomeDepense;
