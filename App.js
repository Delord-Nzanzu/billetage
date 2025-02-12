import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import StackNav from "./src/router/StackNav";
import PresentationScreen from "./src/views/principale/PresentationScreen";
import 'react-native-gesture-handler';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="#040332" style="light" />
      <NavigationContainer>
        <PresentationScreen />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
