import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import { SafeAreaView ,SafeAreaProvider} from 'react-native-safe-area-context';
import React from "react";
import { API_URL } from "@/api/api";
export default function Index() {
  return (
    <SafeAreaProvider> 
    <SafeAreaView style={style.container}>
    <ScrollView>    
    <View  >
      <View style={style.header}>
        <View
          style={{
            padding: 2,
            backgroundColor: "#9CFCE3",
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 60, height: 60 }}
          />
        </View>
      </View>
      <View>
        <Text style={style.text}>
          Welcome to {"\n"}
          <Text style={style.textspan}>Moodizer AI</Text>
        </Text>
      </View>
      <View>
        <Text style={style.description}>
          A smarter way to track and improve your emotional well-being —
          anytime, anywhere 🌿
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          marginTop: 10, 
        }}
      >
        <View>
          <Image
            source={require("../assets/images/landing.png")}
            style={{ width: 300, height: 300 }}
            resizeMode="cover"
          />
        </View>
      </View>
      <View
        style={{
         justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={style.description}>
          By signing up, you agree to our{" "}
          <Text style={{ color: "#06D6A0" }}>Terms of Service</Text> and{" "}
          <Text style={{ color: "#06D6A0" }}>Privacy Policy</Text>
        </Text>
        <View>
          <TouchableOpacity
            style={style.button}
            onPress={() => {
              router.push("/signup");
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: "Poppins_700Bold",
              }}
            >
              Get Started
            </Text>
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 8,marginBlock:8 }}>
          <Text
            style={{
              fontSize: 16,
              color: "#155451",
              fontFamily: "Poppins_400Regular",
            }}
          >
            Already have an account?{" "}
            <Text
              style={{ color: "#06D6A0" }}
              onPress={() => router.replace("/(auth)/login")}
            >
              Sign In 
            </Text>
          </Text>
        </View>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
const style = StyleSheet.create({
  container: {
    paddingBlock: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor:'white'
  },
  moreinfo: {
    marginTop: 20,
    padding: 8,
    gap: 14,
  },
  infotext: {
    fontSize: 20,
    color: "#185855",
    fontFamily: "Poppins_500Medium",
  },

  text: {
    fontSize: 32,
    gap: 8,
    marginTop: 10,
    color: "#155554",
    padding: 4,
    lineHeight: 30,
    fontFamily: "Inter_900Black",
    textAlign: "center",
  },
  textspan: {
    color: "green",
    fontSize: 25,
  },
  mood: {
    fontFamily: "Poppins_700Bold",
    color: "#06D6A0",
    borderColor: "#07D6A0",
    borderWidth: 2,
  },
  description: {
    textAlign: "center",
    padding: 8,
    fontSize: 16,
    color: "#155451",
    fontFamily: "Poppins_400Regular",
    lineHeight: 24,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#06D6A0",
    paddingBlock: 12,
    width: 200,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
