import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoaderScreen } from "../views/loader/Loader";
import Principale from "../views/principale/Principale";
import PresentationScreen from "../views/principale/PresentationScreen";
import Billetage from "../views/billetage/Billetage";
import HomeDepense from "../views/depense/HomeDepense";
import Categorie from "../views/categorie/Categorie";
import NouveauCat from "../views/categorie/NouveauCat";
import Budget from "../views/budget/Budget";
import NouveauBudget from "../views/budget/NouveauBudget";
import Depense from "../views/depense/Depense";
import NouveauDepense from "../views/depense/NouveauDepense";

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
      <Stack.Screen name="Categorie" component={Categorie} />
      <Stack.Screen name="NouveauCat" component={NouveauCat} />
      <Stack.Screen name="Budget" component={Budget} />
      <Stack.Screen name="NouveauBudget" component={NouveauBudget} />
      <Stack.Screen name="Depense" component={Depense} />
      <Stack.Screen name="NouveauDepense" component={NouveauDepense} />
    </Stack.Navigator>
  );
}
