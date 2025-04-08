import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    router.replace("/(dashboard)"); // Navigate to the dashboard after login
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
        <AntDesign name="arrowright" size={20} color="white" />
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>Forgot your password?</Text>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Text
          style={styles.signupLink}
          onPress={() => router.replace("/signup")}
        >
          Sign Up
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    fontFamily: "Poppins_700Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    fontFamily: "Poppins_400Regular",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06D6A0",
    width: "100%",
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    marginRight: 10,
  },
  forgotPassword: {
    fontSize: 14,
    color: "#06D6A0",
    fontFamily: "Poppins_400Regular",
    marginBottom: 30,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Poppins_400Regular",
  },
  signupLink: {
    fontSize: 14,
    color: "#06D6A0",
    fontFamily: "Poppins_700Bold",
  },
});
