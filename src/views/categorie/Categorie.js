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
import useCategories from "../../hooks/categorie/useCategories";
import AntDesing from "react-native-vector-icons/MaterialIcons";

const Categorie = () => {
  const nav = useNavigation();
  const { getCategories, data, loading, deleteCategories } = useCategories();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getCategories();
      setRefreshing(false);
    }, 2000);
  };

  const suppressionCateg = (e) => {
    // console.log("update", e);
    deleteCategories({ id: e.id_categorie });
  };

  const gotUpdate = (e) => {
    nav.navigate("NouveauCat", { data: e });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}>
      <Header
        iconenameMaterialUi={"file-present"}
        title={"Catégorie"}
        subTite={"Les catégories sont de liste qui constitue vos quotidient"}
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
            onPress={() => nav.navigate("NouveauCat", { data: null })}
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
            Listes des catégories
          </Text>
          <Divider
            style={{
              width: "100%",
              marginTop: 10,
              marginBottom: 10,
              borderColor: "gray",
            }}
          />
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
                La liste de Catégorie est vide, veillez commencer en enregistrer
                la description de vos depense
              </Text>
            </View>
          ) : (
            data.map((e, key) => {
              return (
                <View
                  key={key}
                  style={{
                    padding: 10,
                    marginTop: 10,
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
                    <Text
                      style={{
                        fontFamily: "monst",
                        fontSize: 20,
                        marginTop: 10,
                      }}>
                      {e.nom}
                    </Text>
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
                        }}>
                        <AntDesing
                          name="edit"
                          color={"#fff"}
                          size={25}
                          style={{ marginRight: 5 }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => suppressionCateg(e)}
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

export default Categorie;
