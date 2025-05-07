import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/store/useAuthstore";
import { z } from "zod";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react-native";

// Zod schema for validation
const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email").min(1, "Email is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const signUp = useAuth((state) => state.register);

  const handleSignUp = async () => {
    setErrors({});
    setIsLoading(true);

    // Validate input
    const result = signUpSchema.safeParse({ username, email, password });
    if (!result.success) {
      const newErrors: Record<string, string | undefined> = {};
      result.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await signUp(username, email, password);
      router.replace("/(app)/(dashboard)");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Sign Up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 items-center justify-center px-6">
        {/* Logo */}
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-24 h-24 mb-8 rounded-2xl shadow-lg"
          style={{
            shadowColor: "#06D6A0",
            shadowOpacity: 0.15,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 6 },
          }}
        />

        {/* Title */}
        <Text className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Create Account</Text>
        <Text className="text-lg text-gray-500 mb-10 text-center">
          Sign up to get started
        </Text>

        {/* Input Fields */}
        <View className="w-full mb-6">
          <View className={`flex-row items-center bg-white rounded-2xl px-4 border ${errors.username ? "border-red-400" : "border-gray-200"} h-14 mb-4`}>
            <User color="#06D6A0" size={22} />
            <TextInput
              className="flex-1 ml-3 text-lg text-gray-900"
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>
          {errors.username && <Text className="text-sm text-red-500 mb-2 ml-1">{errors.username}</Text>}

          <View className={`flex-row items-center bg-white rounded-2xl px-4 border ${errors.email ? "border-red-400" : "border-gray-200"} h-14 mb-4`}>
            <Mail color="#06D6A0" size={22} />
            <TextInput
              className="flex-1 ml-3 text-lg text-gray-900"
              placeholder="Email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>
          {errors.email && <Text className="text-sm text-red-500 mb-2 ml-1">{errors.email}</Text>}

          <View className={`flex-row items-center bg-white rounded-2xl px-4 border ${errors.password ? "border-red-400" : "border-gray-200"} h-14`}>
            <Lock color="#06D6A0" size={22} />
            <TextInput
              className="flex-1 ml-3 text-lg text-gray-900"
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={() => setShowPassword((v) => !v)}
              className="p-1"
              accessibilityLabel={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff color="#aaa" size={20} />
              ) : (
                <Eye color="#aaa" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className="text-sm text-red-500 mb-2 ml-1">{errors.password}</Text>
          )}
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          className="w-full flex-row items-center gap-1 justify-center bg-[black] rounded-2xl h-14 mb-4"
          onPress={handleSignUp}
          activeOpacity={0.85}
          disabled={isLoading}
          style={{
            shadowColor: "#06D6A0",
            shadowOpacity: 0.08,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text className="text-white text-xl font-semibold">Sign Up</Text>
              <ArrowRight color="#fff" size={24} className="ml-2" />
            </>
          )}
        </TouchableOpacity>

        {/* Already Have an Account */}
        <View className="flex-row items-center mt-2">
          <Text className="text-lg text-gray-500">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text className="text-lg font-bold text-[#06D6A0]">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}