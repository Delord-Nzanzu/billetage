import React, { useEffect } from "react";
import { View, Dimensions, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import useDepense from "../hooks/depense/useDepense";

const screenWidth = Dimensions.get("window").width;

const BarChartGraphic = () => {
  const { categories, montants, getTotalSelonCategorie, isReady } =
    useDepense();

  useEffect(() => {
    if (isReady) {
      getTotalSelonCategorie();
    }
  }, [isReady]);

  return (
    <View
      style={{
        marginTop: 15,
        marginRight: 20,
      }}>
      <Text
        style={{
          fontFamily: "monst",
          fontSize: 18,
          marginLeft: 30,
          marginTop: -20,
        }}>
        Dépense Selon la catégorie
      </Text>
      <BarChart
        data={{
          labels: categories,
          datasets: [
            {
              data: montants,
            },
          ],
        }}
        width={screenWidth - 2} // Largeur du graphique
        height={250} // Hauteur du graphique
        yAxisLabel="$"
        yAxisSuffix="k"
        chartConfig={{
          propsForLabels: {
            dx: 15, // Décale les labels vers la droite
          },
          backgroundGradientFrom: "#040332",
          backgroundGradientTo: "#040332",
          decimalPlaces: 2,
          color: (opacity = 10) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
          propsForBackgroundLines: {
            strokeDasharray: "", // Supprime les lignes de fond
          },
        }}
        verticalLabelRotation={20} // Rotation des labels pour éviter le chevauchement
        fromZero
        showBarTops={true} // Supprime les valeurs au-dessus des barres
        showValuesOnTopOfBars // Affiche les valeurs sur les barres
        style={{
          marginVertical: 10,
          borderRadius: 5,
          margin: 1,
        }}
      />
    </View>
  );
};

export default BarChartGraphic;
