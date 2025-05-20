import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    navigation.replace("Onboarding"); // redirige directo al onboarding
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a KistcarApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
});

export default SplashScreen;

