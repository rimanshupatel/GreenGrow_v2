const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");
export const apiUrl = (path: string): string =>
  `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_KEY || "";
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
export const APITUBE_API_KEY = import.meta.env.VITE_APITUBE_API_KEY || "";
export const THINGSPEAK_API_KEY = import.meta.env.VITE_THINGSPEAK_API_KEY || "";
