import { router, Tabs } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAuth } from "@/store/useAuthstore";
import {
  BookOpen,
  History,
  UserCircle,
  Settings,
  TrendingUp,
  Star,
} from "lucide-react-native";

const DashLayout = () => {
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
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#111827",
        tabBarInactiveTintColor: "#A1A1AA",
        tabBarButton: (props) => (
          <Pressable
            onPress={props.onPress}
            style={props.style}
            android_ripple={{ color: "transparent" }}
          >
            {props.children}
          </Pressable>
        ),
        tabBarStyle: {
          backgroundColor: "#f8fafc",
          borderTopWidth: 0.5,
          borderTopColor: "#e5e7eb",
          height: 70,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontFamily:'Poppins_700Bold',
          fontSize: 13,
          elevation: 0,
          shadowOpacity: 0,
          fontWeight: "600",
          marginBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
        animation: "none",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Journal",
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={size ?? 28} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <History color={color} size={size ?? 28} />
          ),
        }}
      />
      <Tabs.Screen
        name="trends"
        options={{
          title: "Trends",
          tabBarIcon: ({ color, size }) => (
            <TrendingUp color={color} size={size ?? 28} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Star color={color} size={size ?? 28} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <UserCircle color={color} size={size ?? 28} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size ?? 28} />
          ),
        }}
      />
    </Tabs>
  );
};

export default DashLayout;
