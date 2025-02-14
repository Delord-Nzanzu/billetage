import { View, Text, useWindowDimensions, Image } from "react-native";
import * as React from "react";
import { useFonts } from "expo-font";
import { Grid, Flow } from "react-native-animated-spinkit";
import { StatusBar } from "expo-status-bar";
import useDatabase from "../../hooks/database/useDBcreate";

export const LoaderScreen = () => {
  const { width } = useWindowDimensions();
  const { initialisationBD } = useDatabase();

  const [loaded] = useFonts({
    monst: require("../../../assets/fonts/static/Montserrat-Bold.ttf"),
    "monst-r": require("../../../assets/fonts/static/Montserrat-Regular.ttf"),
    "monst-i": require("../../../assets/fonts/static/Montserrat-Italic.ttf"),
  });

  React.useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        console.log("✅ Base de données prête !");
        initialisationBD();
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
      }}>
      <StatusBar translucent={true} backgroundColor="#040332" style="light" />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={[
            { flex: 0.6, justifyContent: "center" },
            { width, resizeMode: "contain" },
          ]}
          source={require("../../../assets/log.png")}
        />
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
            style={{ marginTop: 10, marginLeft: 10 }}
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
