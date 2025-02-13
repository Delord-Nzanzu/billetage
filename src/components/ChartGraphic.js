import { View, Text, Dimensions } from "react-native";
import React from "react";
import {
  LineChart,
  // BarChart,
  // PieChart,
  // ProgressChart,
  // ContributionGraph,
  // StackedBarChart
} from "react-native-chart-kit";

const ChartGraphic = () => {
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
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
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
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default ChartGraphic;
