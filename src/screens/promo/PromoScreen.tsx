import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@/utils/icons";

export default function PromoScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <View>
        <Icon
          name="arrow-left"
          size={24}
          color={"#000"}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>New year 2022 25% off promo</Text>
      </View>
      <View style={styles.promoBox}>
        <Text style={styles.promoLabel}>PROMO CODE</Text>
        <Text style={styles.promoCode}>BUT123</Text>
        <TouchableOpacity style={styles.copyButton}>
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>
        To celebrate new year 2022, we are giving a special promo for you.
        Redeem a rent of car and get new year reward for every checkout this
        period
      </Text>
      <Text style={styles.termsTitle}>Terms and Conditions</Text>
      <Text style={styles.term}>• Minumum rent of £30 value</Text>
      <Text style={styles.term}>
        • All rent process only accepted in Tembalang and Jatingaleh
      </Text>
      <Text style={styles.term}>• Only accept for credit card payment</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  promoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f8fa",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  promoLabel: { color: "#888", marginRight: 8 },
  promoCode: { fontWeight: "bold", fontSize: 16, marginRight: 16 },
  copyButton: {
    backgroundColor: "#232b5d",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  copyText: { color: "#fff", fontWeight: "bold" },
  description: { color: "#888", marginBottom: 16 },
  termsTitle: { fontWeight: "bold", marginTop: 16, marginBottom: 8 },
  term: { color: "#888", marginBottom: 4 },
});
