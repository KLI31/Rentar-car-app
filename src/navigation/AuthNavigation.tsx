import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MotiView } from "moti";
import { SCREEN_NAMES } from "../utils/screenNames";
import SplashScreen from "@/screens/splashScreen/SplashScreen";
import { HomeScreen } from "@/screens/home/HomeScreen";
const Stack = createNativeStackNavigator();

export const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.Splash}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREEN_NAMES.Splash} component={SplashScreen} />
      {/* <Stack.Screen name={SCREEN_NAMES.Home} component={HomeScreen} /> */}
    </Stack.Navigator>
  );
};
