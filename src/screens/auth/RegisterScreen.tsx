import React, { useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const { signUp, isLoaded } = useSignUp();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Animaciones
  const buttonScale = new Animated.Value(1);
  const logoOpacity = new Animated.Value(0);
  const logoPosition = new Animated.Value(30);

  React.useEffect(() => {
    // Animación de entrada del logo
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoPosition, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleRegister = async () => {
    if (!isLoaded) return;

    animateButton();
    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Redirige a la pantalla de verificación OTP con tipo de flujo 'register'
      navigation.navigate("OtpVerification", { email, flowType: "register" });

    } catch (err: any) {
      console.log("Signup error:", err);
      Alert.alert("Error en el registro", err.errors?.[0]?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [{ translateY: logoPosition }],
              },
            ]}
          >
            <Image
              source={require("../../../assets/Onboardingimages/onboarding1.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>¡Crea tu cuenta!</Text>
            <Text style={styles.subtitle}>
              Regístrate para empezar con Kriscar
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#868686"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Nombre completo"
                placeholderTextColor="#868686"
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#868686"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Correo electrónico"
                placeholderTextColor="#868686"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#868686"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#868686"
                style={styles.input}
                secureTextEntry={!mostrarPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setMostrarPassword((prev) => !prev)}
              >
                <FontAwesome
                  name={mostrarPassword ? "eye-slash" : "eye"}
                  size={20}
                  color="#868686"
                />
              </TouchableOpacity>
            </View>

            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[
                  styles.registerButton,
                  isLoading && styles.registerButtonDisabled,
                ]}
                onPress={handleRegister}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <Text style={styles.registerText}>
                  {isLoading ? "Creando cuenta..." : "Registrarse"}
                </Text>
                {isLoading && (
                  <ActivityIndicator
                    color="#FFF"
                    style={styles.loadingIndicator}
                  />
                )}
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>o regístrate con</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() =>
                  Alert.alert("Próximamente", "Registro con Google no implementado aún")
                }
              >
                <FontAwesome name="google" size={20} color="#DB4437" />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.footerLink}>Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00375B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#868686',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FBFE',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    color: '#00375B',
    fontSize: 16,
  },
  toggleButton: {
    padding: 8,
  },
  registerButton: {
    backgroundColor: '#00375B',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#00375B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E1E8ED',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#868686',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E8ED',
    backgroundColor: '#FFFFFF',
  },
  socialButtonText: {
    color: '#DB4437',
    fontWeight: '600',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    color: '#868686',
    fontSize: 14,
    marginRight: 4,
  },
  footerLink: {
    color: '#00375B',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;