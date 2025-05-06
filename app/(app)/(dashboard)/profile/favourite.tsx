import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Star, Search } from "lucide-react-native";
import { useRouter } from "expo-router";
import { api } from "@/lib/api";

export default function FavoritesPage() {
  const [favoriteEntry, setFavoritesEntry] = useState<
    {
      id: number;
      title: string;
      createdAt: string;
      content: string;
      moods: string[];
      score: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await api.get("/api/entry/favourites");
        console.log(res);
        setFavoritesEntry(res.data.allresult);
      } catch (error) {
        Alert.alert("Error", "Failed to load favorites.");
      } finally {
        setLoading(false);
      }
    }
    fetchFavorites();
  }, []);

  //   const handleUnfavorite = async (id) => {
  //     try {
  //       await api.post(`/api/favorites/${id}/unfavorite`);
  //       setFavorites((prev) => prev.filter((item) => item.id !== id));
  //     } catch (error) {
  //       Alert.alert("Error", "Failed to remove from favorites.");
  //     }
  //   };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#06D6A0" />
      </View>
    );
  }

  if (favoriteEntry.length === 0) {
    return (
      <SafeAreaProvider>
        {/* Header */}
        <View className="mt-4 flex-row items-center justify-between px-6 pt-8 pb-4 bg-gray-50">
          <Pressable
            className="bg-gray-200 p-2 rounded-full"
            onPress={() => router.back()}
            hitSlop={{ top: 10, right: 10, bottom: 10 }}
          >
            <ArrowLeft color="#111827" size={22} />
          </Pressable>
          <Text className="text-3xl font-semibold text-gray-900">
            Favorites
          </Text>
          <TouchableOpacity
            className="bg-gray-200 p-2 rounded-full"
            onPress={() => Alert.alert("Search", "Search coming soon!")}
          >
            <Search color="#6366F1" size={22} />
          </TouchableOpacity>
        </View>

        <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6">
          <View className="bg-yellow-100 p-6 rounded-full mb-6">
            <Star color="#FACC15" size={64} />
          </View>
          <Text className="text-gray-900 text-2xl font-bold mb-2 text-center">
            No Favorites Yet
          </Text>
          <Text className="text-gray-500 text-base text-center mb-6">
            Start adding your favorite entries to see them here.
          </Text>
          <TouchableOpacity
            className="flex-row items-center justify-center bg-gray-900 px-6 py-3 rounded-full"
            onPress={() => router.push("/(app)/(dashboard)/history")}
            activeOpacity={0.9}
          >
            <Text className="text-white font-medium">Explore Entries</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-8 pb-4 bg-gray-50">
          <TouchableOpacity
            className="bg-gray-200 p-2 rounded-full"
            onPress={() => router.back()}
          >
            <ArrowLeft color="#111827" size={22} />
          </TouchableOpacity>
          <Text className="text-3xl font-semibold text-gray-900">
            Favorites
          </Text>
          <TouchableOpacity
            className="bg-gray-200 p-2 rounded-full"
            onPress={() => Alert.alert("Search", "Search coming soon!")}
          >
            <Search color="#6366F1" size={22} />
          </TouchableOpacity>
        </View>

        {/* Favorites List */}
        <FlatList
          data={favoriteEntry}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View
              className="bg-white rounded-2xl shadow-md p-4 mb-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center">
                <View className="flex-1">
                  <Text
                    className="text-lg font-semibold text-gray-900"
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-sm text-gray-500" numberOfLines={2}>
                    {item.content}
                  </Text>
                </View>
                <TouchableOpacity
                  className="bg-red-100 p-2 rounded-full"
                  // onPress={() => handleUnfavorite(item.id)}
                >
                  <Star color="#EF4444" size={20} fill="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
