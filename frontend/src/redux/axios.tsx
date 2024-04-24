import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJOaWtoaWwiLCJsYXN0TmFtZSI6Imt1bWFyIiwidXNlclBpYyI6bnVsbCwibW9iaWxlTnVtYmVyIjoiNzIwNDc3MDE3MCIsImVtYWlsIjoibmtAbmsuYiIsInN0cmVldCI6bnVsbCwiY2l0eSI6bnVsbCwic3RhdGUiOm51bGwsInppcCI6bnVsbCwiY291bnRyeSI6bnVsbCwiZGF0ZU9mQmlydGgiOm51bGwsImVtZXJnZW5jeUNvbnRhY3ROYW1lIjpudWxsLCJlbWVyZ2VuY3lDb250YWN0UmVsYXRpb25zaGlwIjpudWxsLCJlbWVyZ2VuY3lDb250YWN0UGhvbmUiOm51bGwsImZpcm1JZCI6MSwicm9sZUlkIjoxLCJkZXNpZ25hdGlvbklkIjpudWxsLCJjcmVhdGVkQnkiOm51bGwsInVwZGF0ZWRCeSI6bnVsbCwicmVtb3ZlZEJ5IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTMwVDExOjM2OjI5LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAzLTMwVDExOjM2OjI5LjAwMFoiLCJyZW1vdmVkQXQiOm51bGx9LCJpYXQiOjE3MTI4OTA4ODcsImV4cCI6MTc0NDQyNjg4N30.4JhjEkJtEk3E054_4oMohPEpOnRU1OC7suj5PqXWTxA";

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
    config.headers.Authorization = `Bearer ${token}`;
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
