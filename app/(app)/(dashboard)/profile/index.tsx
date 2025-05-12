import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Switch,
  ScrollView,
} from "react-native";
import { useAuth } from "@/store/useAuthstore";
import { useRouter } from "expo-router";
import {
  User,
  Shield,
  HelpCircle,
  Settings,
  Trash2,
  LogOut,
  Edit3,
  Moon,
  Activity,
  Star,
} from "lucide-react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);
  const router = useRouter();
  const [darkMode, setDarkMode] = React.useState(false);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1">
            {/* Header Section */}
            <View className=" py-10 px-6 mx-5 mt-2 items-center rounded-3xl ">
              <View className="w-28 h-28 rounded-full items-center justify-center mb-4 bg-gray-200">
                <User color="gray" size={56} />
              </View>
              <Text className="text-gray-900 text-2xl font-bold">
                {user?.username || "Guest User"}
              </Text>
              <Text className="text-gray-500 text-sm">
                {user?.email || "No Email"}
              </Text>
              <Text className="text-gray-400 text-xs mt-2">
                Member since {formattedDate}
              </Text>
              {/* Edit Profile Button */}
              <TouchableOpacity
                className="flex-row items-center bg-gray-900 px-5 py-3 rounded-full mt-4 shadow-md"
                onPress={() =>
                  Alert.alert(
                    "Edit Profile",
                    "Edit profile feature coming soon!"
                  )
                }
                activeOpacity={0.85}
              >
                <Edit3 color="#fff" size={20} />
                <Text className="text-white text-base font-medium ml-2">
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>

            {/* Card Section */}
            <View className="px-7">
              <Text className="text-base font-semibold text-[#a4a0a0] mb-4">
                Preferences
              </Text>
            </View>
            <View className="px-6 ">
              {/* Preferences Card */}
              <View className="bg-[#f3f3f3] rounded-2xl shadow-lg px-4 py-1 border border-[#dadada]">
                <TouchableOpacity
                  className="py-2 border-b border-[#dadada]"
                  activeOpacity={0.8}
                  onPress={() => setDarkMode((v) => !v)}
                >
                  <View className="flex-row justify-between">
                    <View className="bg-gray-100 p-2 rounded-full items-center flex-row gap-2">
                      <View className="p-2 bg-white rounded-lg shadow">
                        <Moon color="#06D6A0" size={22} />
                      </View>
                      <View>
                        <Text className="text-base">Dark Mode</Text>
                      </View>
                    </View>

                    <View>
                      <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        thumbColor={darkMode ? "#06D6A0" : "#f4f3f4"}
                        trackColor={{ false: "#d1d5db", true: "#81b0ff" }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="py-2 border-b border-[#dadada]"
                  activeOpacity={0.8}
                  onPress={() =>
                    Alert.alert("Settings", "App settings coming soon!")
                  }
                >
                  <View className="flex-row justify-between">
                    <View className="bg-gray-100 p-2 rounded-full items-center flex-row gap-2">
                      <View className="p-2 bg-white rounded-lg shadow">
                        <Settings color="#6366F1" size={22} />
                      </View>
                      <View>
                        <Text className="text-base">App settings</Text>
                      </View>
                    </View>

                    <View></View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className=" py-2 border-b border-[#dadada]"
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push("/(app)/(dashboard)/profile/favourite")
                  }
                >
                  <View className="flex-row justify-between">
                    <View className="bg-gray-100 p-2 rounded-full items-center flex-row gap-2">
                      <View className="p-2 bg-white rounded-lg shadow">
                        <Star color="#FACC15" size={22} />
                      </View>
                      <View>
                        <Text className="text-base">favorites</Text>
                      </View>
                    </View>

                    <View></View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="py-2"
                  activeOpacity={0.8}
                  onPress={() =>
                    Alert.alert("Activity", "Account activity coming soon!")
                  }
                >
                  <View className="flex-row justify-between">
                    <View className="bg-gray-100 p-2 rounded-full items-center flex-row gap-2">
                      <View className="p-2 bg-white rounded-lg shadow">
                        <Activity color="#06D6A0" size={22} />
                      </View>
                      <View>
                        <Text className="text-base">Account Activity</Text>
                      </View>
                    </View>

                    <View></View>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Support & Security Card */}
              <View className="mt-4">
                <Text className="text-base font-semibold text-gray-400 mb-4 mt-2 px-">
                  Support & Security
                </Text>
              </View>
              <View className="bg-[#f3f3f3] rounded-3xl shadow-lg px-4 py-3 border border-[#dadada]">
                <TouchableOpacity
                  className=" py-2 border-b border-[#dadada]"
                  activeOpacity={0.8}
                  onPress={() =>
                    Alert.alert("Privacy", "Privacy settings coming soon!")
                  }
                >
                  <View className="flex-row justify-between">
                    <View className="bg-gray-100 p-2 rounded-full items-center flex-row gap-2">
                      <View className="p-2 bg-white rounded-lg shadow">
                        <Shield color="#06D6A0" size={22} />
                      </View>
                      <View>
                        <Text className="text-base">Privacy Settings</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className=" border-b border-[#dadada] py-2"
                  activeOpacity={0.8}
                  onPress={() =>
                    Alert.alert("Support", "Help & support coming soon!")
                  }
                >
                  <View className="flex-row justify-between">
                    <View className="bg-gray-100 p-2 rounded-full items-center flex-row gap-2">
                      <View className="p-2 bg-white rounded-lg shadow">
                        <HelpCircle color="#6366F1" size={22} />
                      </View>
                      <View>
                        <Text className="text-base">Help & Supports</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                {/*clear all Entries from the user and db */}
                <TouchableOpacity
                  className="py-2"
                  activeOpacity={0.8}
                  onPress={() =>
                    Alert.alert("Clear Data", "Clear data feature coming soon!")
                  }
                >
                  <View className="flex-row justify-between">
                    <View className="bg-gray-100 p-2 rounded-full items-center flex-row gap-2">
                      <View className="p-2 bg-white rounded-lg shadow">
                        <Trash2 color="#EF4444" size={22} />
                      </View>
                      <View>
                        <Text className="text-base">Clear All Data</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Logout Button */}
              <TouchableOpacity
                className="flex-row items-center justify-center bg-red-500 p-4 rounded-2xl shadow-lg mt-4 mb-10"
                onPress={handleLogout}
                activeOpacity={0.9}
              >
                <LogOut color="#fff" size={22} />
                <Text className="ml-3 text-white text-base font-semibold">
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Profile;
