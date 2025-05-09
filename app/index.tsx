import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ChevronRight, UserPlus, LogIn } from "lucide-react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <Image
              source={require("../assets/images/icon.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Moodizer AI</Text>
            <Text style={styles.subtitle}>
              Track and improve your emotional well-being anytime, anywhere 🌿
            </Text>
          </View>

          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require("../assets/images/landing.png")}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          {/* Call to Action */}
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/signup")}
            >
              <UserPlus color="white" size={20} />
              <Text style={styles.primaryButtonText}>Get Started</Text>
              <ChevronRight color="white" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.replace("/(auth)/login")}
            >
              <LogIn color="#06D6A0" size={20} />
              <Text style={styles.secondaryButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <Text style={styles.termsText}>
            By signing up, you agree to our{" "}
            <Text style={styles.linkText}>Terms of Service</Text> and{" "}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#155554",
    fontFamily: "Inter_900Black",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },
  illustrationContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  illustration: {
    width: 300,
    height: 300,
  },
  ctaContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06D6A0",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: "80%",
    marginBottom: 10,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    marginHorizontal: 10,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#06D6A0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: "80%",
  },
  secondaryButtonText: {
    color: "#06D6A0",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    marginHorizontal: 10,
  },
  termsText: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 20,
  },
  linkText: {
    color: "#06D6A0",
    fontFamily: "Poppins_700Bold",
  },
});