import axios from "axios";
import { AuthService } from "./service/AuthService";

const axiosInstance = axios.create({
  // baseURL: "https://api.awamupay.co.tz",
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

const UNAUTHORIZED = 401;

axiosInstance.interceptors.request.use((config) => {
  // If url is not public (REQUIRES AUTHENTICATION),
  // We're appending authorization header
  if (
    !/\/auth\/login/.test(config.url) &&
    !/\/auth\/refresh/.test(config.url)
  ) {
    config.headers["Authorization"] = `Bearer ${AuthService.getToken()}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  async (response) => {
    // We're going to intercept the successful login response.
    // First we're going to save the token
    // Then we're going to issue a request to fetch user details
    if (/^\/auth\/login/.test(response.config.url)) {
      // Save the token
      AuthService.saveToken(response.data);
      // Issue the request to get own details
      const response2 = await axiosInstance.get("/auth/me");

      // Return response 2
      return response2;
    }

    // If this is a response to the `/auth/me` request,
    // we're going to save logged in data to the session storage
    if (/\/auth\/me/.test(response.config.url)) {
      // Save user data to the session storage.
      AuthService.saveCurrentUserData(response.data);
    }

    return response;
  },
  async (err) => {
    // console.log("Handling an API error");
    const originalConfig = err.config;
    // console.log(originalConfig);
    // Make sure this error was not protected
    if (!originalConfig.url.startsWith("/auth") && err.response) {
      // console.log("Definately an api error");
      // Case when access token expired
      if (err.response.status === UNAUTHORIZED && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axiosInstance.post(
            "/auth/refresh",
            {},
            {
              headers: {
                Authorization: `Bearer ${AuthService.getToken("refreshToken")}`,
              },
            }
          );
          const token = rs.data;
          AuthService.saveToken(token);
          return axiosInstance(originalConfig);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }
  }
);

export default axiosInstance;
