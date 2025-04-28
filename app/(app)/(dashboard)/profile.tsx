import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/store/useAuthstore"; // Zustand store
import { User, Mail, Calendar, LogOut } from "lucide-react-native"; // Lucide icons
import { useRouter } from "expo-router";

const Profile = () => {
  const user = useAuth((state) => state.user); // Select user state
  const logout = useAuth((state) => state.logout); // Select logout function
  const router = useRouter();
  console.log(user);
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login"); // Redirect to login after logout
        },
      },
    ]);
  };

  // Format the createdAt date
  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <User color="#06D6A0" size={80} />
        <Text style={styles.username}>{user?.username || "Guest User"}</Text>
      </View>

      {/* Profile Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Mail color="#06D6A0" size={20} />
          <Text style={styles.detailText}>{user?.email || "No Email"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Calendar color="#06D6A0" size={20} />
          <Text style={styles.detailText}>
            Account Created: {formattedDate}
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut color="#fff" size={20} />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins_700Bold",
    marginTop: 10,
  },
  detailsContainer: {
    width: "100%",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 10,
    fontFamily: "Poppins_400Regular",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06D6A0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
    fontFamily: "Poppins_700Bold",
  },
});

export default Profile;