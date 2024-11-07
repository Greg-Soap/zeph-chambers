import { getToken } from "@/lib/cookies";
import axios from "axios";

export const multipartHeaders = {
  headers: { "Content-Type": "multipart/form-data" },
};

const apiUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV
    : process.env.NEXT_PUBLIC_API_PROD;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "X-Device-Type": "web",
    "Access-Control-Allow-Origin": "*",
    tokenId: process.env.TOKEN_ID,
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (req) => {
    if (req.url?.includes("login")) return req;

    const token = getToken();

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err) => {
    Promise.reject(err);
  }
);

export default api;
