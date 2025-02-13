import { View, Text } from "react-native";
import React from "react";
import AntDesing from "react-native-vector-icons/MaterialIcons";

const Header = ({ iconenameMaterialUi, title, subTite }) => {
  return (
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
        <View style={{ marginRight: 1, marginLeft: -10 }}>
          <AntDesing name={iconenameMaterialUi} color={"#fff"} size={50} />
        </View>
        <View>
          <Text
            style={{
              color: "#fff",
              fontFamily: "monst",
              fontSize: 25,
            }}>
            {title}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontFamily: "monst-r",
              fontSize: 18,
              marginTop: 1,

            }}>
            {subTite}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
