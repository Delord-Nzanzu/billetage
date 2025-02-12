import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function Principale(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <StatusBar translucent={true} backgroundColor="#040332" style="light" />
      <TouchableOpacity onPress={()=>props.navigation.navigate("Billetage")} >
      <Text>Billetage</Text>
      </TouchableOpacity>
    </View>
  );
}
