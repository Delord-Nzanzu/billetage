import { View, TextInput, Text } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";

const TextInputs = ({
  id,
  value,
  onChange,
  onBlue,
  placeholder,
  keyboardType,
  width,
  iconname,
  iconcolor,
  focusable,
  secureTextEntry,
  error,
  texterror,
  label,
}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 14,
          color: "gray",
          fontFamily: "monst-r",
          marginLeft: 10,
          marginTop: 10,
          marginBottom: 5,
        }}>
        {label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          borderColor: error ? "red" : "#040332",
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}>
        {iconname ? (
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "center",
              // alignItems: "center",
              height: "100%",
            }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 70,
              }}>
              <AntDesign
                name={iconname}
                color={iconcolor ? iconcolor : "#040332"}
                size={25}
                style={{
                  borderRadius: 0,
                }}
              />
            </View>
            <Divider
              style={{
                borderWidth: 0.5,
                borderColor: error ? "red" : "#040332",
                height: "100%",
                margin: 10,
                // marginRight: 10,
                // marginLeft: 10,
                marginTop: -1,
              }}
            />
          </View>
        ) : (
          <Text></Text>
        )}

        <TextInput
          id={id}
          value={value}
          onChangeText={onChange}
          onBlur={onBlue}
          placeholder={placeholder}
          keyboardType={keyboardType}
          focusable={focusable}
          secureTextEntry={secureTextEntry}
          // error={error}
          style={{
            // borderColor: "none",
            width: width ? width : "100%",
            height: 50,
            fontFamily: "monst-r",
            fontSize: 16,
          }}
        />
      </View>
      {error ? (
        <Text
          style={{
            fontSize: 9,
            color: "red",
            fontFamily: "monst-r",
            marginLeft: 10,
          }}>
          {texterror}
        </Text>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default TextInputs;
