import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREEN_NAMES } from "../utils/screenNames";
import { BottomTabs } from "@/components/BottomTabNavigation";
const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.MainTabs}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREEN_NAMES.MainTabs} component={BottomTabs} />
    </Stack.Navigator>
  );
};
