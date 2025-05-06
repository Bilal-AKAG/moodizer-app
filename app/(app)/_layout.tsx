import React from "react";
import { router, Stack } from "expo-router";

import { useAuth } from "@/store/useAuthstore";
import { ActivityIndicator, Platform, View } from "react-native";

export default function RootLayout() {

  const token = useAuth((state) => state.token);
  const [isLoading, setLoading] = React.useState(true);
 
  React.useEffect(() => {
    if (!token) {
      router.replace("/(auth)/login");
    }
    setLoading(false);
  }, [token]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <ActivityIndicator size="large" color="#06D6A0" />
      </View>
    );
  }
  return (
    <>
      <Stack>
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
