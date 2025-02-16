import { View, Text, Dimensions } from "react-native";
import React, { useEffect } from "react";
import {
  LineChart,
  // BarChart,
  // PieChart,
  // ProgressChart,
  // ContributionGraph,
  // StackedBarChart
} from "react-native-chart-kit";
import useDepense from "../hooks/depense/useDepense";

const ChartGraphic = () => {
  const { dataMonth, isReady, getTotalBudgetSelonMois } = useDepense();

  useEffect(() => {
    if (isReady) {
      getTotalBudgetSelonMois();
    }
  }, [isReady]);

  useEffect(() => {
    console.log(dataMonth);
  }, []);

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
        }}>
        Dépense Mensuel
      </Text>
      <LineChart
        data={{
          labels: [
            "Jan.",
            "Feb.",
            "March",
            "Ap.",
            "May",
            "June",
            "Juil.",
            "Aout",
            "Sep.",
            "Oct.",
            "Nov.",
            "Dec.",
          ],
          datasets: [
            {
              data: (dataMonth.length > 0 ? dataMonth : Array(12).fill(0)).map(
                (val) => {
                  const num = Number(val);
                  return isNaN(num) ? 0 : num;
                }
              ),
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={230}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#040332",
          backgroundGradientFrom: "#040332",
          backgroundGradientTo: "#040332",
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "4",
            stroke: "#ffa726",
          },
          propsForLabels: {
            dx: 15, // Décale les labels vers la droite
          },
        }}
        bezier
        style={{
          marginVertical: 10,
          borderRadius: 5,
          margin: 1,
        }}
      />
    </View>
  );
};

export default ChartGraphic;
