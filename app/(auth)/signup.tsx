import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Input from "../../componets/custominput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signupaschema = z
  .object({
    Username: z
      .string()
      .min(4, { message: "username must be more than 4 char" })
      .regex(/^[^\d]/, { message: "username can't start with number" }),
    Email: z.string().email(),
    Password: z.string().min(8, { message: "password must be min of 8 char" }),
    RePassword: z
      .string()
      .min(8, { message: "password must be min of 8 char" }),
  })
  .refine((data) => data.Password === data.RePassword, {
    message: "passwords do not match",
    path: ["RePassword"],
  });

type signuptype = z.infer<typeof signupaschema>;
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(signupaschema),
  });

  const handleSignUp = (data: signuptype) => {
    // if (!username || !email || !password || !confirmPassword) {
    //   Alert.alert("Error", "Please fill in all fields.");
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   Alert.alert("Error", "Passwords do not match.");
    //   return;
    // }

    //jsut to check if the inputs are correctly passing
    console.log("Username:", data.Username);
    console.log("Email:", data.Email);
    console.log("Password:", data.Password);

    router.replace("/(dashboard)");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <Input
              name="Username"
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#aaa"
              control={control}
            />

            <Text style={styles.label}>Email</Text>

            <Input
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              control={control}
              name="Email"
            />

            <Text style={styles.label}>Password</Text>
            <Input
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#aaa"
              secureTextEntry
              control={control}
              name="Password"
            />

            <Text style={styles.label}>Confirm Password</Text>
            <Input
              style={styles.input}
              placeholder="Re-enter your password"
              placeholderTextColor="#aaa"
              secureTextEntry
              control={control}
              name="RePassword"
            />
          </View>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSubmit(handleSignUp)}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
            <AntDesign name="arrowright" size={20} color="white" />
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Text
              style={styles.loginLink}
              onPress={() => router.replace("/login")}
            >
              Log In
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
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
  label: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Poppins_500Medium",
    marginBottom: 5,
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
  signUpButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06D6A0",
    width: "100%",
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    marginRight: 10,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Poppins_400Regular",
  },
  loginLink: {
    fontSize: 14,
    color: "#06D6A0",
    fontFamily: "Poppins_700Bold",
  },
});
