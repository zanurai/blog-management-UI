import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const storeToken = (newToken: string) => {
  localStorage.setItem("Token", newToken);
};

const getTokenFromStorage = () => {
  const token = localStorage.getItem("Token");
  console.log("token", token);
  return token;
};

export const removeTokenFormStorage = () => {
  localStorage.removeItem("Token");
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromStorage();
    console.log("api_token", token);
    if (token) {
      config.headers["authorization"] = `${token}`;
    } else {
      console.log("No token found in storage");
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export { storeToken, getTokenFromStorage };
