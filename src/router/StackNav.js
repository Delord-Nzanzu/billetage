import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoaderScreen } from "../views/loader/Loader";
import Principale from "../views/principale/Principale";

const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator
      initialRouteName="LoaderScreen"
      screenOptions={{
        headerShown: false,
        title: "Banque du sang",
      }}>
      <Stack.Screen name="LoaderScreen" component={LoaderScreen} />
      <Stack.Screen name="Principale" component={Principale} />
    </Stack.Navigator>
  );
}
