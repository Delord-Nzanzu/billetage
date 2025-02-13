import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Grid } from "react-native-animated-spinkit";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Boutons({
  text,
  disabled,
  onPress,
  iconname,
  borderColor,
  backgroundColor,
  colorText,
  colorIcon,
  width,
}) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          width: width ? width : "auto",
          backgroundColor: backgroundColor,
          alignItems: "center",
          marginTop: 10,
          borderColor: borderColor,
          borderWidth: 2,
          padding: 10,
          borderRadius: 10,
          height: 50,
          flexDirection: "row",
          justifyContent: "center",
        }}>
        {disabled ? (
          <View
            style={{
              marginRight: 10,
            }}>
            <Grid size={25} color={"#040332"} />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <AntDesign
              name={iconname}
              color={colorIcon}
              size={20}
              style={{
                borderRadius: 0,
                marginRight: 10,
              }}
            />
            <Text
              style={{
                fontFamily: "monst",
                fontSize: 18,
                color: colorText,
              }}>
              {text}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
