import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Star,
  Edit3,
  Trash2,
  Share2,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react-native";
import { api } from "@/lib/api";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Utility function to generate random colors for mood tags
const getRandomColor = () => {
  const colors = [
    "bg-red-100 text-red-800",
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-orange-100 text-orange-800",
    "bg-teal-100 text-teal-800",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};


export default function HistoryDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [entry, setEntry] = useState<{
    id: number;
    title: string;
    createdAt: string;
    content: string;
    moods: string[];
    score: number;
    favourite: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEntry() {
      try {
        const res = await api.get(`/api/entry/history/${id}`);
        setEntry(res.data.result);
      } catch (err) {
        console.error("Error fetching entry:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchEntry();
  }, [id]);

  // ✅ UPDATED: Optimistic UI for toggling favorite
  const handleFavorite = async () => {
    if (!entry) return;

    const original = { ...entry }; // Keep a copy in case rollback is needed
    const updated = { ...entry, favourite: !entry.favourite };
    setEntry(updated);

    try {
      await api.patch(`/api/entry/${id}/favourite`);
      console.log("Toggled favourite");
    } catch (error) {
      setEntry(original); // Rollback if API fails
      Alert.alert("Error", "Failed to update favorite.");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/entry/${id}`);
      router.navigate('/(app)/(dashboard)/history/');
      console.log('succesfully delete entry');
    } catch (error) {
      Alert.alert("Error", "Failed to delete the entry.");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#06D6A0" />
      </View>
    );
  }

  if (!entry) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500 text-lg">Entry not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-50 p-6">
        <ScrollView>
          {/* Apple-style Navigation */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              className="mr-4 bg-gray-200 p-2 rounded-full"
              onPress={() => router.back()}
              hitSlop={{ top: 100, right: 100, left: 100, bottom: 100 }}
            >
              <ArrowLeft color="#111827" size={22} />
            </TouchableOpacity>
            <Text
              className="text-2xl font-bold text-gray-900 flex-1"
              numberOfLines={1}
            >
              {entry.title}
            </Text>
            <TouchableOpacity
              className={`ml-2 p-2 rounded-full ${
                entry.favourite ? "bg-yellow-100" : "bg-gray-200"
              }`}
              onPress={handleFavorite}
              accessibilityLabel="Favorite"
            >
              <Star
                color={entry.favourite ? "#FACC15" : "#A1A1AA"}
                size={22}
                fill={entry.favourite ? "#FACC15" : "none"}
              />
            </TouchableOpacity>
          </View>

          {/* Date */}
          <Text className="text-sm text-gray-500 mb-6 text-center">
            {new Date(entry.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>

          {/* Content */}
          <Text className="text-black text-base leading-90 mb-8 text-justify">
            {entry.content}
          </Text>

          {/* Moods */}
          <View className="flex-row flex-wrap gap-2 justify-center mb-8">
            {(entry.moods || []).map((mood, index) => (
              <Text
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium ${getRandomColor()}`}
              >
                {mood}
              </Text>
            ))}
          </View>

          {/* Redesigned Score Section */}
          <View className="bg-gray-100 p-6 rounded-2xl mb-8 shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 text-center mb-4">
              Mood Score
            </Text>
            <View className="w-full bg-gray-200 h-4 rounded-full overflow-hidden mb-4">
              <View
                className={`h-full ${
                  entry.score > 6
                    ? entry.score >= 8
                      ? "bg-green-600"
                      : "bg-green-300"
                    : entry.score <= 3
                    ? "bg-red-500"
                    : "bg-yellow-300"
                } `}
                style={{ width: `${entry.score * 10}%` }}
              />
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600 text-sm">1 (Low)</Text>
              <Text className="text-gray-800 text-xl font-bold">
                {entry.score}
              </Text>
              <Text className="text-gray-600 text-sm">10 (High)</Text>
            </View>
            <Text className="text-gray-600 text-sm text-center mt-4">
              Your mood score reflects the positivity of your entry, ranging
              from 1 (low) to 10 (high).
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-center gap-4 mb-8">
            <TouchableOpacity
              className="flex-row items-center bg-gray-200 px-4 py-2 rounded-full"
              // onPress={handleShare}
            >
              <Share2 color="#6366F1" size={18} />
              <Text className="ml-2 text-gray-700 font-medium">Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center bg-blue-100 px-4 py-2 rounded-full"
              onPress={() => Alert.alert("Edit", "Edit feature coming soon!")}
            >
              <Edit3 color="#3B82F6" size={18} />
              <Text className="ml-2 text-blue-700 font-medium">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center bg-red-100 px-4 py-2 rounded-full"
              onPress={() => {
                Alert.alert("delete", "Are you sure to delete This Entry ?",[
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "delete",
                    style: "destructive",
                    onPress: () => handleDelete()
                  },
                ]);
              }}
            >
              <Trash2 color="#EF4444" size={18} />
              <Text className="ml-2 text-red-700 font-medium">Delete</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}