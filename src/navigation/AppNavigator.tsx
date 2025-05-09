import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigation } from "./AuthNavigation";
import { MainNavigation } from "./MainNavigation";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { View, Text } from "react-native";


const USE_AUTHENTICATION = false; // Cambiar a true cuando se necesite la autenticación

export const AppNavigator = () => {
  if (USE_AUTHENTICATION) {
    return (
      <ClerkProvider
        publishableKey={
          "pk_test_cHJlY2lvdXMtbWlkZ2UtNjEuY2xlcmsuYWNjb3VudHMuZGV2JA"
        }
      >
        <InnerNavigation />
      </ClerkProvider>
    );
  }

  // Modo sin autenticación - va directamente a MainNavigation
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

const InnerNavigation = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isSignedIn ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};
