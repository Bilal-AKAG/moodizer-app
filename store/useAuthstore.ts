import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { EXPO_URL } from "@/api/api";
import { Platform } from "react-native";

interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ message: any; success: boolean }>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  getMe: () => Promise<void>;
}

const TOKEN_KEY = "token";


export const saveToken = async (token: string) => {
  if (Platform.OS === "web") {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  }
};

export const getToken = async (): Promise<string | null> => {
  if (Platform.OS === "web") {
    return localStorage.getItem(TOKEN_KEY);
  } else {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  }
};

export const deleteToken = async () => {
  if (Platform.OS === "web") {
    localStorage.removeItem(TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
};


export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: true,
  // Add a loading state to handle async operations
  login: async (email, password) => {
    try {
      const res = await axios.post(`${EXPO_URL}/api/auth/login`, {
        email,
        password,
      });

      // Save token to SecureStore
     // await SecureStore.setItemAsync("token", res.data.token);
      await saveToken(res.data.token);

      // Update token in state
      set({ token: res.data.token });

      // Fetch user data after login
      await get().getMe();
      return { success: true, message: "Login successful." };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle specific error response from the server
        console.log("Login error:", error.response.data.message);
        return { success: false, message: error.response.data.message };
      } else {
        // Handle unexpected errors
        console.log("Unexpected login error:", error);
        return { success: false, message: "An unexpected error occurred." };
      }
    }
  },

  // Register function
  register: async (username, email, password) => {
    try {
      const res = await axios.post(`${EXPO_URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      console.log("Registration successful:", res.data);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  // Logout function
  logout: async () => {
    try {
      // Remove token from SecureStore
      //await SecureStore.deleteItemAsync("token");
      await deleteToken();

      // Clear user and token from state
      set({ token: null, user: null });
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  // Fetch user data
  getMe: async () => {
    try {
      // Retrieve token from SecureStore
     // const token = await SecureStore.getItemAsync("token");
     const token=await getToken();

      if (!token) {
        set({ loading: false }); // Stop loading if no token is found
        return;
      }

      // Fetch user data from the backend
      const res = await axios.get(`${EXPO_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update user and token in state
      set({
        user: {
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          createdAt: res.data.createdAt,
        },
        token,
        loading: false, // Stop loading after fetching user data
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      set({ loading: false }); // Stop loading even if there's an error
    }
  },
}));

