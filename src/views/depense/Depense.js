import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Boutons from "../../components/Buttons";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import useDepense from "../../hooks/depense/useDepense";
import AntDesing from "react-native-vector-icons/MaterialIcons";

const Depense = () => {
  const nav = useNavigation();
  const { isReady, getDepense, data, loading } = useDepense();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getDepense();
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    if (isReady) {
      getDepense();
    }
  }, [isReady]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}>
      <Header
        iconenameMaterialUi={"attach-money"}
        title={"Dépense"}
        subTite={"Ajouter les Dépense"}
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
            onPress={() => nav.navigate("NouveauDepense")}
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
            Listes des Dépenses
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
                La liste de depense est vide, veillez commencer a enregistrer le
                budget
              </Text>
            </View>
          ) : (
            data.map((e, key) => {
              const montantDepense = new Intl.NumberFormat("de-DE").format(
                e.montant
              );
              const montantRestante = new Intl.NumberFormat("de-DE").format(
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
                            marginTop: 1,
                          }}>
                          {montantDepense}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "monst",
                            fontSize: 20,
                            marginTop: 1,
                            marginLeft: 2,
                          }}>
                          {e.devise}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: "monst-i",
                          fontSize: 18,
                          // marginTop: 10,
                          marginLeft: 10,
                          color: "gray",
                          marginLeft: -1,
                        }}>
                        {e.categorie_nom}
                      </Text>

                      <Text
                        style={{
                          fontFamily: "monst-i",
                          fontSize: 16,
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
                        // onPress={() => gotUpdate(e)}
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
                        // onPress={() => suppressionBudget(e)}
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
                  <Divider
                    style={{
                      marginTop: 10,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                    }}>
                    <Text
                      style={{
                        fontFamily: "monst-i",
                        fontSize: 20,
                        marginTop: 10,
                      }}>
                      Solde Mensuel {montantRestante}
                    </Text>

                    <Text
                      style={{
                        fontFamily: "monst-i",
                        fontSize: 20,
                        marginTop: 10,
                        marginLeft: 2,
                      }}>
                      {e.devise}
                    </Text>
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

export default Depense;
