import { Inter_900Black } from "@expo-google-fonts/inter";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "@/global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Redirect, Slot } from "expo-router";
import {getToken, useAuth } from "@/store/useAuthstore";
import { userThemeStore } from "@/store/themestore";

export default function RootLayout() {
  const loadtheme=userThemeStore((state)=>state.loadtheme);
  
  const [loaded, error] = useFonts({
    Inter_900Black,
    Poppins_400Regular, // Regular weight
    Poppins_700Bold,
    Poppins_500Medium,
    // Bold weight
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await getToken();
      if (token) {
        useAuth.setState({ token });
        <Redirect href='/(app)/(dashboard)'/>
      } else {
        useAuth.setState({ loading: false });
      }
    };
    initializeAuth();
    loadtheme();
 
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="inverted" />
      <Slot />
    </>
  );
}
