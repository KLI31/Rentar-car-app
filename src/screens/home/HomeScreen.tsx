import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export const HomeScreen = () => {
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Tu aplicación de alquiler de vehículos
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#6c757d",
    textAlign: "center",
  },
});
