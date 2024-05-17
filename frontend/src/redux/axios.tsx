import axios from "axios";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:4200/api", // your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Perform actions before request is sent
    // E.g., Inserting auth token in headers
    // const token = localStorage.getItem("authToken");
    // if (token) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    // }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Handle errors
    if (error.response.status === 401) {
      // Example: Unauthorized access - perhaps redirect to login or refresh the token
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
