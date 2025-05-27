import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MotiView } from "moti";
import { SCREEN_NAMES } from "../utils/screenNames";
import SplashScreen from "@/screens/splashScreen/SplashScreen";
import { HomeScreen } from "@/screens/home/HomeScreen";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import { BottomTabs } from "../components/BottomTabNavigation";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import OtpVerificationScreen from "../screens/auth/OtpVerificationScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";




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
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="Main" component={BottomTabs} />
      {<Stack.Screen name={SCREEN_NAMES.Home} component={HomeScreen} />}
    </Stack.Navigator>
  );
};
