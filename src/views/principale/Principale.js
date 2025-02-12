import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AntDesing from "react-native-vector-icons/MaterialIcons";
import { Divider } from "react-native-elements";

export default function Principale(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        // justifyContent: "center",
        // alignItems: "center",
      }}>
      <StatusBar translucent={true} backgroundColor="#040332" style="light" />
      <View
        style={{
          height: "20%",
          backgroundColor: "#040332",
          justifyContent: "center",
          padding: 20,
          borderBottomEndRadius: 30,
          //   borderBottomLeftRadius:10
        }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginLeft: -15,
          }}>
          <View style={{ marginRight: -10, marginLeft: -10 }}>
            <AntDesing name="attach-money" color={"#fff"} size={50} />
          </View>
          <View>
            <Text
              style={{
                color: "#fff",
                fontFamily: "monst",
                fontSize: 25,
              }}>
              Gestion de dépense & Billetages
            </Text>
            <Text
              style={{
                color: "#fff",
                fontFamily: "monst-r",
                fontSize: 18,
                marginTop: 1,
              }}>
              Cette application vous permet de gérer vos dépenses tout en
              facilitant la répartition d'un montant donné en fonction des
              billets disponibles.
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          margin: 20,
        }}>
        <View
          style={{
            flexDirection: "row",
          }}>
          <AntDesing
            name="edit"
            color={"#2a2670"}
            size={25}
            style={{ marginRight: 5 }}
          />
          <Text style={{ fontFamily: "monst", fontSize: 25 }}>Menu</Text>
        </View>
        <Divider
          style={{
            width: "100%",
            marginTop: 10,
            marginBottom: 10,
            borderColor: "gray",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-between",
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Billetage")}
            style={{
              width: "48%",
              elevation: 2,
              backgroundColor: "#040332",
              borderColor: "#040332",
              borderWidth: 1.5,
              borderRadius: 10,
              padding: 25,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <AntDesing name="attach-money" color={"#fff"} size={35} />
            <Text
              style={{
                fontFamily: "monst",
                fontSize: 20,
                color: "#fff",
              }}>
              Billetage
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("cette service n'est pas encore disponible")}
            style={{
              width: "48%",
              elevation: 2,
              backgroundColor: "#2a2670",
              borderColor: "#2a2670",
              borderWidth: 1.5,
              borderRadius: 10,
              padding: 25,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <AntDesing name="calendar-today" color={"#fff"} size={35} />
            <Text
              style={{
                fontFamily: "monst",
                fontSize: 20,
                color: "#fff",
              }}>
              Dépense
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
