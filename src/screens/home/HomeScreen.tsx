import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import useThemedStyles from "@/hooks/useThemedStyles";
import { SCREEN_NAMES } from "@/utils/screenNames";

export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const style = useThemedStyles(styles);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <Text style={style.title}>Bienvenido</Text>
      </View>

      <View style={style.content}>
        <Text style={style.subtitle}>
          Tu aplicación de alquiler de vehículos
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_NAMES.Promo)}
        >
          <Text>Ir a las promociones</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.WHITE,
    },
    header: {
      padding: 20,
      backgroundColor: theme.colors.BLUE_LIGHT_3,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.GRAY_25,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.BLUE_DARK_1,
    },
    content: {
      flex: 1,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    subtitle: {
      fontSize: 18,
      color: theme.colors.GRAY_80,
      textAlign: "center",
    },
  });
