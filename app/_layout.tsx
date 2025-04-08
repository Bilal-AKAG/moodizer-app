
import { Stack } from "expo-router";
import { Inter_900Black } from "@expo-google-fonts/inter";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ClerkProvider } from '@clerk/clerk-expo'
import '@/global.css'
export default function RootLayout() {
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

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      </Stack>
    </ClerkProvider>
  );
}
