import axios from "axios";

const DEFAULT_API_BASE_URL = "https://e-commerce-api-3wara.vercel.app";

let authToken = null;

/**
 * Central Axios client for the Koda Store API.
 *
 * Cookie credentials support the documented httpOnly token cookie. The optional
 * in-memory bearer token supports the alternative bearerAuth scheme.
 */
export const api = axios.create({
  baseURL: (
    import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
  ).replace(/\/+$/, ""),
  timeout: 15000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.set("Authorization", `Bearer ${authToken}`);
  } else {
    config.headers.delete("Authorization");
  }

  return config;
});

/**
 * Sets or clears the in-memory JWT used for documented bearer authentication.
 * The API's httpOnly cookie authentication works independently of this helper.
 *
 * @param {string|null} token JWT returned by the documented login operation, or null to clear it.
 * @returns {void}
 */
export function setAuthToken(token) {
  if (token !== null && typeof token !== "string") {
    throw new TypeError("The authentication token must be a string or null.");
  }

  authToken = token?.trim() || null;
}
