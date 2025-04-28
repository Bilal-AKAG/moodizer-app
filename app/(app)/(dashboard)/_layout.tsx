import { Redirect, router, Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/store/useAuthstore"; // Zustand store
import { BookOpen, History, UserCircle } from "lucide-react-native";

const DashLayout = () => {
  const[isLoading,setLoading]=React.useState(true)
  const token = useAuth((state) => state.token);
 React.useEffect(()=>{
  if(!token){
   router.replace('/(auth)/login')
  }
  setLoading(false)
 },[])

  // Show a loading spinner while checking authentication
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
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "lightgreen",
        tabBarInactiveTintColor: "gray",
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Entry for Diary",
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: "History",
          tabBarIcon: ({ color }) => <History color={color} size={30} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) => <UserCircle color={color} size={30} />,
        }}
      />
    </Tabs>
  );
};

export default DashLayout;