import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import Custumbutton from "@/componets/custombutton";
import { useAuth } from "@/store/useAuthstore"; // zustand store
import { z } from "zod"; // Import Zod
import { User, Mail, Lock } from "lucide-react-native"; // Icons from Lucide

// Zod schema for validation
const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const signUp = useAuth((state) => state.register);

  const handleSignUp = async () => {
    // Clear previous errors
    setErrors({});
    setIsLoading(true); // Start loading

    // Validate input
    const result = signUpSchema.safeParse({ username, email, password });
    if (!result.success) {
      // Map the errors from Zod schema to our error state
      const newErrors: Record<string, string | undefined> = {};
      result.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      setIsLoading(false); // Stop loading
      return;
    }

    try {
      await signUp(username, email, password); // Use store signUp method
      console.log(password);
      router.replace("/(app)/(dashboard)");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Sign Up failed");
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("@/assets/images/icon.png")} style={styles.logo} />
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputWrapper,
            errors.username && { borderColor: "red" },
          ]}
        >
          <User color="#aaa" size={20} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        {errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}

        <View
          style={[styles.inputWrapper, errors.email && { borderColor: "red" }]}
        >
          <Mail color="#aaa" size={20} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <View
          style={[
            styles.inputWrapper,
            errors.password && { borderColor: "red" },
          ]}
        >
          <Lock color="#aaa" size={20} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      {/* Sign Up Button */}
    <Custumbutton
    title="signup"
    loading={isLoading}
    onPress={handleSignUp}
    style={{ width:350 }}
/>

      {/* Already Have an Account */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <Text
          style={styles.signupLink}
          onPress={() => router.replace("/login")}
        >
          Login
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    marginLeft: 10,
    color: "#333",
  },
  signUpButton: {
    backgroundColor: "#06D6A0",
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  signUpButtonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins_700Bold",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
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
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginBottom: 10,
  },
});
