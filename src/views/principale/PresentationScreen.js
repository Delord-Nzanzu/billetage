import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
// import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");

const PresentationScreen = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      title: "Bienvenue sur l'App de Billetage",
      description:
        "Cette application vous permet de facilement répartir un montant donné en fonction des billets que vous possédez.",
    },
    {
      title: "Comment ça marche ?",
      description:
        "Vous entrez un montant, choisissez votre devise, puis l'application calcule la répartition des billets.",
    },
    {
      title: "Démarrez maintenant !",
      description:
        "Appuyez sur le bouton ci-dessous pour commencer à utiliser l'application.",
      button: (
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Principale")}
          style={{
            backgroundColor: "#040332",
            padding: 15,
            margin: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "monst",
            }}>
            Commencer
          </Text>
        </TouchableOpacity>
      ),
    },
  ];

  return (
    <View
      // colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.container}>
      <Carousel
        loop={false}
        width={width}
        height={400}
        data={slides}
        scrollAnimationDuration={800}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            {item?.button ? (
              <View style={{ width: "100%" }}>{item.button}</View>
            ) : (
              <Text></Text>
            )}
          </View>
        )}
      />
      <Text style={styles.pagination}>
        {currentIndex + 1} / {slides.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  slide: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: width * 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 25,
    // fontWeight: "bold",
    textAlign: "center",
    fontFamily: "monst",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "monst-r",
  },
  pagination: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: "monst",
    color: "#040332",
  },
});

export default PresentationScreen;
