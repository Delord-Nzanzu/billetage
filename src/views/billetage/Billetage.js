import { View, Text } from "react-native";
import React, { useState } from "react";
import AntDesing from "react-native-vector-icons/MaterialIcons";
import TextInputs from "../../components/TextInputs";
import { Divider } from "react-native-elements";
import { CheckBox } from "react-native-elements";

const Billetage = () => {
  const [selectedValue, setSelectedValue] = useState("dollar");
  return (
    <View
      style={{
        flex: 1,
      }}>
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
              Billetage
            </Text>
            <Text
              style={{
                color: "#fff",
                fontFamily: "monst-r",
                fontSize: 18,
                marginTop: 1,
              }}>
              Entrez un montant et obtenez automatiquement la répartition
              optimale en billets.
            </Text>
          </View>
        </View>
      </View>
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
        />
        <Divider
          style={{
            width: "100$",
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
        <Text style={{ fontSize: 18, marginBottom: 5, fontFamily:"monst-r" }}>
          Choisissez une devise
        </Text>

        <View style={{
            flexDirection:"row"
        }} >
          <View style={{marginRight:5}} >
            <CheckBox
              title="FC (Franc congolais)"
              checked={selectedValue === "Franc"}
              onPress={(e) => setSelectedValue("Franc")}
              checkedIcon="dot-circle-o"
              //   uncheckedIcon="circle-o"
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
    </View>
  );
};

export default Billetage;
