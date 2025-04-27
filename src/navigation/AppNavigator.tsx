import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigation } from "./AuthNavigation";
import { MainNavigation } from "./MainNavigation";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  // Agrega aquí más rutas según necesites
};

export const AppNavigator = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRouterPush = (path: string) => {
    navigation.navigate(path as keyof RootStackParamList);
  };

  const handleRouterReplace = (path: string) => {
    navigation.reset({
      index: 0,
      routes: [{ name: path as keyof RootStackParamList }],
    });
  };

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      routerPush={handleRouterPush}
      routerReplace={handleRouterReplace}
    >
      <InnerNavigation />
    </ClerkProvider>
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
