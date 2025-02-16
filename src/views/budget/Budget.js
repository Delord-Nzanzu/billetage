import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Boutons from "../../components/Buttons";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import useBudget from "../../hooks/budget/useBudget";
import AntDesing from "react-native-vector-icons/MaterialIcons";

const Budget = () => {
  const [refreshing, setRefreshing] = useState(false);
  const nav = useNavigation();
  const { getBudget, data, loading, isReady, deleteBudget } = useBudget();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getBudget();
      setRefreshing(false);
    }, 2000);
  };

  const suppressionBudget = (e) => {
    // console.log("delete", e);
    deleteBudget({ id: e.id_budget });
  };

  const gotUpdate = (e) => {
    nav.navigate("NouveauBudget", { data: e });
  };

  useEffect(() => {
    if (isReady) {
      getBudget();
    }
  }, [isReady]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}>
      <Header
        // iconenameMaterialUi={"attach-money"}
        title={"Budget"}
        subTite={
          "Un budget est une estimation des revenus et des dépenses sur une période donnée. Vous pouvez ajouter ou modifier, cela dependra de vos besoins."
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            margin: 10,
          }}>
          <Boutons
            text={"Nouveau"}
            backgroundColor={"#040332"}
            colorText={"#FFF"}
            iconname={"arrowright"}
            colorIcon={"#fff"}
            width={"30%"}
            onPress={() => nav.navigate("NouveauBudget", { data: null })}
          />
        </View>
        <View
          style={{
            margin: 20,
            marginTop: -10,
          }}>
          <Text
            style={{
              fontFamily: "monst",
              fontSize: 18,
            }}>
            Listes de budget
          </Text>
          <Divider
            style={{
              width: "100%",
              marginTop: 10,
              marginBottom: 10,
              borderColor: "gray",
            }}
          />
        </View>
        <View>
          {loading === true ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                minHeight: "400%",
              }}>
              <Text
                style={{
                  fontFamily: "monst-r",
                  fontSize: 18,
                }}>
                Chargement ...{" "}
              </Text>
            </View>
          ) : data.length === 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                minHeight: "300%",
              }}>
              <Text
                style={{
                  fontFamily: "monst-r",
                  fontSize: 18,
                }}>
                La liste de budget est vide, veillez commencer a enregistrer le
                budget
              </Text>
            </View>
          ) : (
            data.map((e, key) => {
              const montantBuget = new Intl.NumberFormat("de-DE").format(
                e.montant_initial
              );
              return (
                <View
                  key={key}
                  style={{
                    padding: 10,
                    marginTop: -10,
                    margin: 20,
                    backgroundColor: key % 2 === 0 ? "#fff" : "#F9F9F9",
                    borderColor: key % 2 === 0 ? "#040332" : "#F9F9F9",
                    borderWidth: 1,
                    borderRadius: 5,
                    elevation: 1,
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                        }}>
                        <Text
                          style={{
                            fontFamily: "monst",
                            fontSize: 20,
                            marginTop: 10,
                          }}>
                          {montantBuget}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "monst",
                            fontSize: 20,
                            marginTop: 10,
                            marginLeft: 10,
                          }}>
                          {e.devise}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: "monst-i",
                          fontSize: 14,
                          // marginTop: 10,
                          marginLeft: 10,
                          color: "gray",
                          marginLeft: -1,
                        }}>
                        {e.description}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "monst-r",
                          fontSize: 14,
                          // marginTop: 10,
                          marginLeft: 10,
                          color: "green",
                          marginLeft: -1,
                        }}>
                        {e.date_budget}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                      }}>
                      <TouchableOpacity
                        onPress={() => gotUpdate(e)}
                        style={{
                          padding: 10,
                          backgroundColor: "#2a2670",
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                        }}>
                        <AntDesing
                          name="edit"
                          color={"#fff"}
                          size={25}
                          style={{ marginRight: 5 }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => suppressionBudget(e)}
                        style={{
                          padding: 10,
                          backgroundColor: "red",
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 10,
                        }}>
                        <AntDesing
                          name="delete"
                          color={"#fff"}
                          size={25}
                          style={{ marginRight: 5 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Budget;
