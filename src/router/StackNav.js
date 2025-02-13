import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoaderScreen } from "../views/loader/Loader";
import Principale from "../views/principale/Principale";
import PresentationScreen from "../views/principale/PresentationScreen";
import Billetage from "../views/billetage/Billetage";
import HomeDepense from "../views/depense/HomeDepense";

const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator
      initialRouteName="LoaderScreen"
      screenOptions={{
        headerShown: false,
        title: "Billetage",
      }}>
      <Stack.Screen name="LoaderScreen" component={LoaderScreen} />
      <Stack.Screen name="PresentationScreen" component={PresentationScreen} />
      <Stack.Screen name="Principale" component={Principale} />
      <Stack.Screen name="Billetage" component={Billetage} />
      <Stack.Screen name="HomeDepense" component={HomeDepense} />
    </Stack.Navigator>
  );
}
