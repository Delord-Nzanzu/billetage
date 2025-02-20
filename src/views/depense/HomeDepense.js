import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AntDesing from "react-native-vector-icons/MaterialIcons";
import Header from "../../components/Header";
import { Divider } from "react-native-elements";
import { Data } from "../../data/Data";
import ChartGraphic from "../../components/ChartGraphic";
import { useNavigation } from "@react-navigation/native";
import useCategories from "../../hooks/categorie/useCategories";
import useBudget from "../../hooks/budget/useBudget";
import useDepense from "../../hooks/depense/useDepense";
import BarChartGraphic from "../../components/BarChartGraphic";

const HomeDepense = () => {
  const { coutCategories, isReady, loading, dataEl } = useCategories();
  const { coutBudget, dataEl: datbugetCount } = useBudget();
  const {
    dataEl: datDepense,
    coutDepense,
    getTotalBudgetSelonMois,
    getTotalSelonCategorie,
  } = useDepense();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      coutCategories();
      coutBudget();
      coutDepense();
      getTotalBudgetSelonMois();
      getTotalSelonCategorie();
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    if (isReady) {
      coutCategories();
      coutBudget();
      coutDepense();
      getTotalBudgetSelonMois();
      getTotalSelonCategorie();
    }
  }, [isReady]);

  const nav = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}>
      <StatusBar translucent={true} backgroundColor="#040332" style="light" />
      <Header
        // iconenameMaterialUi={"home"}
        title={"Gestion de dépense"}
        subTite={
          "Gérez vos dépenses quotidiennes tout en suivant leur évolution à la fin de chaque mois."
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            margin: 20,
            flexDirection: "row",
          }}>
          <AntDesing name={"edit-note"} color={"blue"} size={20} />
          <Text
            style={{
              fontFamily: "monst",
              fontSize: 18,
              marginLeft: 10,
            }}>
            Menu
          </Text>
        </View>
        <View style={{ margin: 20 }}>
          <Divider
            style={{
              width: "100%",
              marginTop: -20,
              marginBottom: 10,
              borderColor: "gray",
            }}
          />
          {Data.map((e, key) => {
            return (
              <TouchableOpacity
                onPress={() => nav.navigate(e.link)}
                key={key}
                style={{
                  padding: 10,
                  margin: 1,
                  borderColor: e.colorContur,
                  borderWidth: 2,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: "row",
                  }}>
                  <View>
                    <AntDesing name={e.icon} color={"green"} size={25} />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#000",
                        fontFamily: "monst",
                        fontSize: 18,
                      }}>
                      {e.title}
                    </Text>
                    <Text
                      style={{
                        color: "gray",
                        fontFamily: "monst",
                        fontSize: 14,
                      }}>
                      {e.subTitle}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            marginTop: -5,
            margin: 20,
            flexDirection: "row",
          }}>
          <AntDesing name={"auto-graph"} color={"#2a2670"} size={20} />
          <Text
            style={{
              fontFamily: "monst",
              fontSize: 18,
              marginLeft: 10,
            }}>
            Graphique
          </Text>
        </View>
        <View style={{ margin: 20 }}>
          <Divider
            style={{
              width: "100%",
              marginTop: -20,
              marginBottom: 10,
              borderColor: "gray",
            }}
          />
          <View>
            <Text
              style={{
                fontFamily: "monst",
                fontSize: 18,
                marginLeft: 10,
                marginBottom: 10,
              }}>
              Evolution
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View
                style={{
                  elevation: 2,
                  minWidth: "31%",
                  backgroundColor: "blue",
                  padding: 20,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "monst",
                    fontSize: 18,
                    textAlign: "center",
                  }}>
                  Catégorie
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "monst",
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: 10,
                  }}>
                  {loading === true ? (
                    <View>
                      <Text
                        style={{
                          fontFamily: "monst-r",
                          color: "#fff",
                        }}>
                        ...
                      </Text>
                    </View>
                  ) : (
                    dataEl
                  )}
                </Text>
              </View>
              <View
                style={{
                  elevation: 2,
                  minWidth: "31%",
                  backgroundColor: "#2a2670",
                  padding: 20,
                  borderRadius: 10,
                  marginLeft: 10,
                }}>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "monst",
                    fontSize: 18,
                    textAlign: "center",
                  }}>
                  Budget
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "monst",
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: 10,
                  }}>
                  {loading === true ? (
                    <View>
                      <Text
                        style={{
                          fontFamily: "monst-r",
                          color: "#fff",
                        }}>
                        ...
                      </Text>
                    </View>
                  ) : (
                    datbugetCount
                  )}
                </Text>
              </View>
              <View
                style={{
                  elevation: 2,
                  minWidth: "31%",
                  backgroundColor: "#040332",
                  padding: 20,
                  borderRadius: 10,
                  marginLeft: 10,
                }}>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "monst",
                    fontSize: 18,
                    textAlign: "center",
                  }}>
                  Dépense
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "monst",
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: 10,
                  }}>
                  {loading === true ? (
                    <View>
                      <Text
                        style={{
                          fontFamily: "monst-r",
                          color: "#fff",
                        }}>
                        ...
                      </Text>
                    </View>
                  ) : (
                    datDepense
                  )}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginLeft: -20,
            }}>
            <ChartGraphic />
          </View>
          <View
            style={{
              marginLeft: -20,
              marginTop: 10,
            }}>
            <BarChartGraphic />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeDepense;
