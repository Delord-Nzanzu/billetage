import { View, Text, useWindowDimensions, Image } from "react-native";
import * as React from "react";
import { useFonts } from "expo-font";
import { Grid, Flow } from "react-native-animated-spinkit";
import { StatusBar } from "expo-status-bar";

export const LoaderScreen = (props) => {
  const { width } = useWindowDimensions();
  const [loaded] = useFonts({
    monst: require("../../../assets/fonts/static/Montserrat-Bold.ttf"),
    "monst-r": require("../../../assets/fonts/static/Montserrat-Regular.ttf"),
  });

  React.useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        props.navigation.navigate("PresentationScreen");
      }, 5000);
    }
  }, [loaded]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        justifyContent: "space-between",
      }}>
      <StatusBar translucent={true} backgroundColor="#040332" style="light" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}>
          <Image
            style={[
              { flex: 0.6, justifyContent: "center" },
              { width, resizeMode: "contain" },
            ]}
            source={require("../../../assets/dollar.png")}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              color: "#000",
              fontSize: 16,
            }}>
            Veuillez patienter
          </Text>
          <Flow
            style={{
              marginTop: 10,
              marginLeft:10
            }}
            size={20}
            color={"#040332"}
          />
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Grid size={30} color={"#040332"} />
      </View>
    </View>
  );
};
