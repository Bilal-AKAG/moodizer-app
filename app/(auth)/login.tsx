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
import Input from "../../componets/custominput";
import { useForm } from "react-hook-form";
import Custumbutton from "../../componets/custombutton";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//validation for inputs
const signinshcema = z.object({
  Email: z.string().email(),
  Password: z.string().min(8, { message: "password must be min of 8 char" }),
});
type signintype = z.infer<typeof signinshcema>;

export default function Login() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(signinshcema),
  });
  const handleLogin = (data: signintype) => {
    // Add your login logic here
    console.log("Email:", data.Email);
    console.log("Password:", data.Password);
    router.replace("/(dashboard)"); // Navigate to the dashboard after login
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/icon.png")} style={styles.logo} />
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>

      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          name={"Email"}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          control={control}
        />
        <Input
          style={styles.input}
          name={"Password"}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          control={control}
        />
      </View>
      <Custumbutton
        title="Login"
        style={styles.loginButton}
        onPress={handleSubmit(handleLogin)}
      />
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
