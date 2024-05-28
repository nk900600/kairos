import axios from "axios";

const DEV_URL = "https://localhost:4200/api";
const TEST_URL = "https://api.theshopbusiness.com/api";
// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: TEST_URL, // your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Perform actions before request is sent
    // E.g., Inserting auth token in headers
    // const token = localStorage.getItem("authToken");
    // if (token) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    config.headers["x-refresh-token"] = `${localStorage.getItem(
      "refreshtoken"
    )}`;
    // }
    return config;
  },
  (error) => {
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
    // return;
    const originalRequest = error?.config;

    if (error?.response?.status === 401 && !originalRequest?._retry) {
      if (originalRequest.url === "/auth/token") {
        localStorage.clear();
        // @ts-ignore
        window.location = "/login"; // Set the flag to redirect
      }
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            originalRequest.headers[
              "x-refresh-token"
            ] = `${localStorage.getItem("refreshtoken")}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshtoken");
      return new Promise(function (resolve, reject) {
        axiosInstance
          .get("/auth/token")
          .then(({ data }) => {
            console.log(data.token);
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("refreshtoken", data.refreshToken);
            axiosInstance.defaults.headers.common["Authorization"] =
              "Bearer " + data.refreshToken;
            originalRequest.headers["Authorization"] =
              "Bearer " + data.accessToken;
            originalRequest.headers["x-refresh-token"] =
              "Bearer " + data.refreshToken;
            processQueue(null, data.accessToken);
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            localStorage.clear();
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
