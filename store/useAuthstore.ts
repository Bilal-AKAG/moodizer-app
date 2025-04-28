import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { EXPO_URL } from "@/api/api";

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
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getMe: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: true, // Add a loading state to handle async operations

  // Login function
  login: async (email, password) => {
    try {
      const res = await axios.post(`${EXPO_URL}/api/auth/login`, {
        email,
        password,
      });

      // Save token to SecureStore
      await SecureStore.setItemAsync("token", res.data.token);

      // Update token in state
      set({ token: res.data.token });

      // Fetch user data after login
      await get().getMe();
    } catch (error) {
      console.error("Login error:", error);
      throw error;
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
      await SecureStore.deleteItemAsync("token");

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
      const token = await SecureStore.getItemAsync("token");

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