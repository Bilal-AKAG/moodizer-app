import React from "react";
import { Stack } from "expo-router";

export default function HistoryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(main)"
        options={{ title: "History", headerShown: false }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: "History detail", headerShown: false }}
      />
    </Stack>
  );
}
