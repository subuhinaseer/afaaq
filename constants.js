import { Platform } from "react-native";

export const API_URL = Platform.OS=='ios'?'http://localhost:8000':'http://10.0.2.2:8000'