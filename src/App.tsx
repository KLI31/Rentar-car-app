import { AppNavigator } from "./navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { ThemeProvider } from "./context/ThemeContext";
import { useFonts } from "expo-font";
import { IcoMoon } from "./utils/icons";
enableScreens();

export default function App() {
  const [fontsLoaded] = useFonts({
    IcoMoon: IcoMoon,
  });

  console.log(fontsLoaded);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
