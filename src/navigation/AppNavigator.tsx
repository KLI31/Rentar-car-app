import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigation } from "./AuthNavigation";
import { MainNavigation } from "./MainNavigation";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { View, Text } from "react-native";

const USE_AUTHENTICATION = true;

export const AppNavigator = () => {
  if (USE_AUTHENTICATION) {
    return (
      <ClerkProvider
        publishableKey="pk_test_ZGVhci10aWdlci0yNC5jbGVyay5hY2NvdW50cy5kZXYk"
      >
        <InnerNavigation />
      </ClerkProvider>
    );
  }

  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
};

const InnerNavigation = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading authentication...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isSignedIn ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};
