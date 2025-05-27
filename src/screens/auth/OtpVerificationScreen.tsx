import React, { useRef, useState } from "react";
import { useSignUp, useSignIn, useClerk } from "@clerk/clerk-expo";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

const OtpVerificationScreen = () => {
  const navigation = useNavigation<any>();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signOut } = useClerk();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputs = useRef<TextInput[]>([]);
  const route = useRoute();
  const { email, flowType } = route.params as {
    email: string;
    flowType: "register" | "reset";
  };

  const handleChange = (text: string, index: number) => {
    const updated = [...otp];
    updated[index] = text;
    setOtp(updated);
    setErrorMessage(null);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleContinue = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;

    setIsLoading(true);

    try {
      if (flowType === "register") {
        if (!isSignUpLoaded || !signUp) return;

        try {
          await signUp.attemptEmailAddressVerification({ code });
          await signOut();

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        } catch (err: any) {
          console.error("Error en verificación:", err);
          const message =
            err.errors?.[0]?.message ||
            err.message ||
            "Ocurrió un error al verificar el código.";
          setErrorMessage(message);
        }
      } else if (flowType === "reset") {
        if (!isSignInLoaded) return;
        await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code,
        });
        navigation.navigate("ResetPassword", { email });
      }
    } catch (err: any) {
      console.error("Error en verificación:", err);
      setErrorMessage("Hubo un problema al procesar el código.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      if (!email) {
        Alert.alert("Correo requerido", "Debes ingresar un correo válido.");
        return;
      }

      if (flowType === "register") {
        if (!isSignUpLoaded || !signUp) {
          Alert.alert("Error", "No se pudo reenviar el código de verificación.");
          return;
        }

        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        Alert.alert("Código reenviado", "Revisa tu correo nuevamente.");
      } else {
        if (!isSignInLoaded || !signIn) {
          Alert.alert("Error", "No se pudo iniciar el proceso de recuperación.");
          return;
        }

        await signIn.create({
          strategy: "reset_password_email_code",
          identifier: email,
        });

        Alert.alert("Código reenviado", "Revisa tu correo nuevamente.");
      }
    } catch (err: any) {
      console.error("Error al reenviar:", err);
      Alert.alert(
        "Error al reenviar",
        err.errors?.[0]?.message || "Intenta nuevamente más tarde."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revisa tu correo 📬</Text>
      <Text style={styles.subtitle}>
        Te enviamos un código de 6 dígitos a:
        {"\n"}
        <Text style={styles.email}>{email}</Text>
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref!)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && !digit && index > 0) {
                inputs.current[index - 1]?.focus();
              }
            }}
          />
        ))}
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <TouchableOpacity
        style={[styles.continueButton, isLoading && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.continueText}>Continuar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResend}>
        <Text style={styles.resendText}>
          ¿No recibiste el código? <Text style={styles.resendBold}>Reenviar</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "600", color: "#00375B", marginBottom: 8 },
  subtitle: {
    fontSize: 14,
    color: "#808080",
    textAlign: "center",
    marginBottom: 24,
  },
  email: { color: "#00375B", fontWeight: "bold" },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  otpInput: {
    width: 48,
    height: 60,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#F7FBFE",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: "#00375B",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  continueText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  resendText: {
    textAlign: "center",
    color: "#868686",
    fontSize: 14,
  },
  resendBold: {
    color: "#00375B",
    fontWeight: "bold",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default OtpVerificationScreen;
