import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AntDesing from "react-native-vector-icons/MaterialIcons";
import Header from "../../components/Header";
import { Divider } from "react-native-elements";
import { Data } from "../../data/Data";
import ChartGraphic from "../../components/ChartGraphic";
import { useNavigation } from "@react-navigation/native";

const HomeDepense = () => {
  const nav=useNavigation()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}>
      <StatusBar translucent={true} backgroundColor="#040332" style="light" />
      <Header
        iconenameMaterialUi={"home"}
        title={"Gestion de dépense"}
        subTite={
          "Gerer vos depense quotidienne toute en vous assurent de l'evolution chaque fin du mois"
        }
      />
      <ScrollView>
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
              onPress={()=>nav.navigate(e.link)}
                key={key}
                style={{
                  padding: 10,
                  margin: 5,
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
                  180
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
                  18
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
                  300
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
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeDepense;
