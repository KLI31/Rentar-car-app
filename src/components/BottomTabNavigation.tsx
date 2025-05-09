import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "../screens/home/HomeScreen";
import useThemedStyles from "@/hooks/useThemedStyles";
import { SCREEN_NAMES } from "@/utils/screenNames";

const CarScreen = () => <View />;
const ChatScreen = () => <View />;
const ProfileScreen = () => <View />;

const Tab = createBottomTabNavigator();

function CustomTabBarButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: (event: any) => void;
}) {
  const style = useThemedStyles(styles);

  return (
    <TouchableOpacity
      style={style.customButtonContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={style.customButton}>{children}</View>
    </TouchableOpacity>
  );
}

export const BottomTabs = () => {
  const style = useThemedStyles(styles);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: style.tabBar,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={SCREEN_NAMES.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? "#3366FF" : "#222"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Car"
        component={CarScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="car"
              size={24}
              color={focused ? "#3366FF" : "#222"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Ionicons name="add" size={32} color="#fff" />,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="chatbubble-ellipses"
              size={24}
              color={focused ? "#3366FF" : "#222"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="person"
              size={24}
              color={focused ? "#3366FF" : "#222"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    tabBar: {
      position: "absolute",
      height: 70,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: theme.colors.WHITE,
      shadowColor: theme.colors.GRAY_80,
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: -3 },
      shadowRadius: 10,
      elevation: 10,
      borderTopWidth: 0,
    },
    customButtonContainer: {
      top: Platform.OS === "android" ? -30 : -25,
      justifyContent: "center",
      alignItems: "center",
    },
    customButton: {
      width: 64,
      height: 64,
      borderRadius: 20,
      backgroundColor: theme.colors.BLUE_DARK_1,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: theme.colors.BLUE_DARK_1,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  });
