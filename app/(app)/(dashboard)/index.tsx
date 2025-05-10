import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Send,
  FileText,
  TrendingUp,
  Settings,
  Star,
  Smile,
  BookOpen,
  RefreshCw,
} from "lucide-react-native";
import { api } from "@/lib/api";
import { useRouter } from "expo-router";

const EntryPage = () => {
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!entry.trim()) {
      Alert.alert(
        "Entry Required",
        "Please write something before submitting."
      );
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/api/entry/new", { prompt: entry });
      if (response.status === 201) {
        const { id } = response.data.result;
       // Alert.alert("Submitted!", "Your entry has been sent for analysis.");
        setEntry("");
        setDraft("");
        router.navigate(`/history/${id}`);
      } else {
        Alert.alert("Error", "Failed to submit your entry. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    setDraft(entry);
    Alert.alert("Draft Saved", "You can continue editing your draft later.");
  };

  const handleLoadDraft = () => {
    setEntry(draft);
    Alert.alert("Draft Loaded", "Continue where you left off.");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <ScrollView
            className="flex-1 px-6 pt-8"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 32 }}
          >
            {/* Apple-style Header */}
            <View className="mb-8 flex-row items-center justify-between">
              <Text className="text-4xl font-semibold text-gray-900 tracking-tight">
                Journal
              </Text>
              <TouchableOpacity accessibilityLabel="Settings">
                <Settings color="#111827" size={28} />
              </TouchableOpacity>
            </View>
            {/* Mood Quick Select */}
            <View className="flex-row justify-between mb-6">
              <TouchableOpacity className="items-center">
                <Smile color="#FBBF24" size={28} />
                <Text className="text-xs text-gray-500 mt-1">Happy</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center">
                <Star color="#60A5FA" size={28} />
                <Text className="text-xs text-gray-500 mt-1">Inspired</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center">
                <BookOpen color="#34D399" size={28} />
                <Text className="text-xs text-gray-500 mt-1">Reflective</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center">
                <RefreshCw color="#F87171" size={28} />
                <Text className="text-xs text-gray-500 mt-1">Stressed</Text>
              </TouchableOpacity>
            </View>
            {/* Entry Input */}
            <View className="bg-gray-100 p-5 rounded-2xl shadow mb-6">
              <TextInput
                className="text-gray-900 text-base font-medium"
                placeholder="How are you feeling today?"
                placeholderTextColor="#A1A1AA"
                multiline
                numberOfLines={8}
                value={entry}
                onChangeText={setEntry}
                style={{ textAlignVertical: "top", minHeight: 120 }}
                editable={!loading}
                accessibilityLabel="Journal Entry Input"
              />
            </View>
           
            {/* Action Buttons */}
            <View className="mb-8">
              <View className="flex-row justify-between mb-3">
                <TouchableOpacity
                  className="flex-1 flex-row items-center px-4 py-3 bg-gray-200 rounded-xl mr-2"
                  onPress={handleSaveDraft}
                  disabled={loading || !entry}
                  accessibilityLabel="Save Draft"
                >
                  <FileText color="#6366F1" size={22} />
                  <Text className="ml-2 text-gray-700 font-medium">
                    Save Draft
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 flex-row items-center px-4 py-3 bg-gray-200 rounded-xl ml-2"
                  onPress={handleLoadDraft}
                  disabled={loading || !draft}
                  accessibilityLabel="Load Draft"
                >
                  <BookOpen color="#10B981" size={22} />
                  <Text className="ml-2 text-gray-700 font-medium">
                    Load Draft
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className={`flex-row items-center justify-center px-4 py-3 rounded-xl ${
                  loading ? "bg-gray-300" : "bg-green-400"
                }`}
                onPress={handleSubmit}
                disabled={loading}
                accessibilityLabel="Submit Entry"
                style={{ marginTop: 8 }}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Send color="#fff" size={22} />
                )}
                <Text className="ml-2 text-white font-semibold">
                  {loading ? "Submitting..." : "Submit"}
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* Features Section */}
            <View className="bg-gray-50 p-6 rounded-2xl shadow-sm">
              <Text className="text-lg font-semibold text-gray-800 mb-4">
                What’s New & Coming Soon
              </Text>
              <View className="flex-row items-center mb-3">
                <TrendingUp color="#6366F1" size={20} />
                <Text className="text-gray-700 text-sm ml-3">
                  Mood trends & insights over time
                </Text>
              </View>
              <View className="flex-row items-center mb-3">
                <FileText color="#10B981" size={20} />
                <Text className="text-gray-700 text-sm ml-3">
                  Save and revisit drafts
                </Text>
              </View>
              <View className="flex-row items-center mb-3">
                <Settings color="#F59E42" size={20} />
                <Text className="text-gray-700 text-sm ml-3">
                  Personalize your journaling experience
                </Text>
              </View>
              <View className="flex-row items-center">
                <Star color="#FBBF24" size={20} />
                <Text className="text-gray-700 text-sm ml-3">
                  Favorite your best entries
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default EntryPage;