import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshResponse = await axios.get("/refresh", { withCredentials: true });

        if (refreshResponse.data.success) {
          localStorage.setItem("token", JSON.stringify(refreshResponse.data.token));
          // Retry the original request with the new token
          error.config.headers["Authorization"] = `Bearer ${refreshResponse.data.token}`;
          return axios(error.config); // Retry the request
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : {},
    params: params ? params : {},
  });
};
