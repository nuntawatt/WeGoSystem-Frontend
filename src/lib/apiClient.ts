// Purpose: Axios instance + inject Firebase auth token into headers

import axios, {
  AxiosInstance,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import { auth } from "./firebase";

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  timeout: 10000,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();

      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }

      // ถ้า headers เป็น AxiosHeaders → ใช้ set()
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set("Authorization", `Bearer ${token}`);
        if (!config.headers.has("Content-Type")) {
          config.headers.set("Content-Type", "application/json");
        }
      } else {
        // fallback: headers อาจเป็น object ธรรมดา
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
        if (!(config.headers as any)["Content-Type"]) {
          (config.headers as any)["Content-Type"] = "application/json";
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response (จับ error จาก API ถ้าต้องการ)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // ตัวอย่าง: handle 401 → logout หรือ refresh token
    // if (err.response?.status === 401) { ... }
    return Promise.reject(err);
  }
);