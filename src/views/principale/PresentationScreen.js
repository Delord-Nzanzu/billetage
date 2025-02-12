import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

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
        style={{
          backgroundColor: "#040332",
          padding: 10,
          margin: 10,
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: "#fff",
          }}>
          Commencer
        </Text>
      </TouchableOpacity>
    ),
  },
];

const PresentationScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
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
            {item?.button ? <View>{item.button}</View> : <Text></Text>}
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
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  pagination: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PresentationScreen;
