import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
// import { useAuth } from "@clerk/clerk-expo";

const Authlayout = () => {
  // const { isSignedIn } = useAuth();

  // if (isSignedIn) {
  //   return <Redirect href={"/(dashboard)"} />;
  // }
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Authlayout;
