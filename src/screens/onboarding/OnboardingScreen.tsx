import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ExpandingDot } from "react-native-animated-pagination-dots";

const onboardingData = [
  {
    key: "1",
    title: "Opciones infinitas",
    subtitle: "Elige entre cientos de modelos. Recógelo o recíbelo donde quieras.",
    image: require("../../../assets/Onboardingimages/onboarding1.png"),
  },
  {
    key: "2",
    title: "Conduce con confianza",
    subtitle: "Conduce con confianza con tu elección de planes de protección, incluido el seguro.",
    image: require("../../../assets/Onboardingimages/onboarding2.png"),
  },
  {
    key: "3",
    title: "Soporte 24/7",
    subtitle: "Quédate tranquilo sabiendo que siempre estarás cubierto con asistencia en carretera.",
    image: require("../../../assets/Onboardingimages/onboarding3.png"),
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  
  // Animaciones para los botones
  const doneButtonAnim = useRef(new Animated.Value(100)).current;
  const skipButtonAnim = useRef(new Animated.Value(1)).current;
  const nextButtonAnim = useRef(new Animated.Value(1)).current;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (currentPage === onboardingData.length - 1) {
      // Animación para mostrar el botón "Empezar"
      Animated.timing(doneButtonAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
      
      // Ocultar los botones "Saltar" y "Siguiente"
      Animated.timing(skipButtonAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(nextButtonAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      // Ocultar el botón "Empezar"
      Animated.timing(doneButtonAnim, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
      
      // Mostrar los botones "Saltar" y "Siguiente"
      Animated.timing(skipButtonAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
      Animated.timing(nextButtonAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  }, [currentPage]);

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (nextPage < onboardingData.length) {
      // Animación de pulsación para el botón "Siguiente"
      Animated.sequence([
        Animated.timing(nextButtonAnim, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(nextButtonAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        flatListRef.current?.scrollToIndex({ index: nextPage, animated: true });
        setCurrentPage(nextPage);
      });
    } else {
      navigation.replace("Login");
    }
  };

  const handleSkip = () => {
    // Animación de pulsación para el botón "Saltar"
    Animated.sequence([
      Animated.timing(skipButtonAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(skipButtonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace("Login");
    });
  };

  const handleStart = () => {
    // Animación de pulsación para el botón "Empezar"
    Animated.sequence([
      Animated.timing(doneButtonAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(doneButtonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace("Login");
    });
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.page, { width }]}> 
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentPage(index);
        }}
        scrollEventThrottle={16}
      />

      <ExpandingDot
        data={onboardingData}
        scrollX={scrollX}
        inActiveDotColor="#D9D9D9"
        activeDotColor="#00375B"
        expandingDotWidth={30}
        containerStyle={styles.dotContainer}
        dotStyle={{ width: 10, height: 10, borderRadius: 5, marginHorizontal: 5 }}
      />

      <View style={styles.buttonRow}>
        {/* Botón Saltar con animación de fade y escala */}
        <Animated.View style={{ 
          opacity: skipButtonAnim,
          transform: [{ scale: skipButtonAnim }],
        }}>
          {currentPage < onboardingData.length - 1 && (
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipText}>Saltar</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Botón Siguiente con animación de fade y escala */}
        <Animated.View style={{ 
          opacity: nextButtonAnim,
          transform: [{ scale: nextButtonAnim }],
        }}>
          {currentPage < onboardingData.length - 1 && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextText}>Siguiente</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Botón Empezar con animación de deslizamiento desde la derecha */}
        <Animated.View style={{ 
          position: 'absolute',
          right: 30,
          transform: [{ translateX: doneButtonAnim }],
        }}>
          {currentPage === onboardingData.length - 1 && (
            <TouchableOpacity 
              style={styles.doneButton} 
              onPress={handleStart}
              activeOpacity={0.7}
            >
              <Text style={styles.doneText}>Empezar</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  page: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00375B",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#868686",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  dotContainer: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
  },
  buttonRow: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  skipText: {
    color: "#868686",
    fontSize: 16,
    fontWeight: "500",
  },
  nextButton: {
    backgroundColor: "#00375B",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  nextText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  doneButton: {
    backgroundColor: "#00375B",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  doneText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default OnboardingScreen;