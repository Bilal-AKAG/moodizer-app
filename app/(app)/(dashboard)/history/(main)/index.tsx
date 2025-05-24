import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import {
  BookOpen,
  Star,
  ArrowRight,
  Smile,
  RefreshCw,
  PlusCircle,
  Search,
} from "lucide-react-native";
import { api } from "@/lib/api";

// Colorful mood icon generator
const moodColors = [
  "#FBBF24", // yellow
  "#60A5FA", // blue
  "#34D399", // green
  "#F87171", // red
  "#A78BFA", // purple
  "#F472B6", // pink
  "#F59E42", // orange
  "#06D6A0", // teal
];
const getMoodColor = (index: number) => moodColors[index % moodColors.length];

export default function HistoryScreen() {
  const [entries, setEntries] = useState<
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
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchEntries = async () => {
    try {
      const res = await api.get("/api/entry/history");
      setEntries(res.data.fullEntry);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchEntries();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchEntries();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#06D6A0" />
      </View>
    );
  }

  if (entries.length === 0) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-gray-100">
          <View className="flex-1 justify-center items-center px-8">
            <View className="bg-yellow-100 p-5 rounded-full mb-6">
              <BookOpen color="#FACC15" size={64} />
            </View>
            <Text className="text-gray-900 text-2xl font-bold mb-2 text-center">
              No Journal Entries
            </Text>
            <Text className="text-gray-500 text-base text-center mb-6">
              Start documenting your thoughts and feelings to see them here.
            </Text>
            <TouchableOpacity
              className="flex-row items-center justify-center bg-gray-900 px-6 py-3 rounded-full"
              onPress={() => router.push("/(app)/(dashboard)")}
              activeOpacity={0.9}
            >
              <PlusCircle color="#fff" size={22} />
              <Text className="text-white font-medium ml-2">
                Add Your First Entry
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-50">
        {/* Apple-style header with search and add */}
        <View className="flex-row items-center justify-between px-6 pt-8 pb-4 bg-gray-50">
          <Text className="text-3xl font-semibold text-gray-900 tracking-tight">
            History
          </Text>
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="bg-gray-200 p-2 rounded-full mr-2"
              onPress={() =>router.push('/history/search')}
            >
              <Search color="#6366F1" size={22} />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-900 p-2 rounded-full"
              onPress={() => router.push("/")}
            >
              <PlusCircle color="#fff" size={22} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16, paddingTop: 0 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white shadow-lg rounded-xl p-6 mb-4"
              onPress={() => router.push(`/history/${item.id}`)}
              style={{
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 10,
                elevation: 2,
              }}
              activeOpacity={0.88}
            >
              {/* Title and Score */}
              <View className="flex-row justify-between items-center mb-2">
                <Text
                  className="text-lg font-semibold text-gray-900 flex-1"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <View
                  style={{
                    backgroundColor: "#FACC15",
                    borderRadius: 20,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Star color="#fff" size={14} style={{ marginRight: 2 }} />
                  <Text
                    style={{ fontSize: 13, fontWeight: "bold", color: "#fff" }}
                  >
                    {item.score}
                  </Text>
                </View>
              </View>

              {/* Date */}
              <Text className="text-xs text-gray-400 mb-3">
                {new Date(item.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>

              {/* Content Preview */}
              <Text className="text-gray-700 mb-4" numberOfLines={2}>
                {item.content}
              </Text>

              {/* Moods */}
              <View className="flex-row flex-wrap gap-2 mb-4">
                {item.moods.map((mood, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: 999,
                      paddingHorizontal: 12,
                      paddingVertical: 3,
                      marginRight: 6,
                      marginBottom: 4,
                      borderWidth: 1,
                      borderColor: getMoodColor(index),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: getMoodColor(index),
                        fontWeight: "600",
                      }}
                    >
                      {mood}
                    </Text>
                  </View>
                ))}
              </View>

              {/* View Details Button */}
              <View className="flex-row justify-end">
                <TouchableOpacity
                  className="flex-row items-center bg-gray-900 px-4 py-2 rounded-full shadow-md"
                  onPress={() => router.push(`/history/${item.id}`)}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.12,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <Text className="text-white font-medium mr-2">
                    View Details
                  </Text>
                  <ArrowRight color="#fff" size={16} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
