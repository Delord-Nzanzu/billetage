import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Grid } from "react-native-animated-spinkit";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Boutons({ text, disabled, onPress, iconname }) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          alignItems: "center",
          marginTop: 10,
          borderColor: "red",
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          height: 50,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {disabled ? (
          <View
            style={{
              marginRight: 10,
            }}
          >
            <Grid size={25} color={"#040332"} />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign
              name={iconname}
              color={"red"}
              size={10}
              style={{
                borderRadius: 0,
                marginRight: 10,
              }}
            />
            <Text
              style={{
                fontFamily: "monst",
                fontSize: 16,
              }}
            >
              {text}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}