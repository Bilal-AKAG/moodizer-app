import { Platform } from "react-native";

export const API_URL=Platform.OS==='android'?'http://10.0.2.2:3000/':'http://localhost:3000/'
export const  EXPO_URL="http://192.168.52.187:3000";