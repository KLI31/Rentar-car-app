import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SCREEN_NAMES } from "../../utils/screenNames";
import { MotiImage } from "moti";

type RootStackParamList = {
  [key in (typeof SCREEN_NAMES)[keyof typeof SCREEN_NAMES]]: undefined;
};

const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(SCREEN_NAMES.Onboarding);
    }, 3000);
  }, []);

  return <View style={styles.container}>SplashScreen</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default SplashScreen;
