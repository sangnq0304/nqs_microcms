import axios from "axios";
import TokenService from "@/utils/tokenServices";
import authApi from "./auth/authApi";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken() || "test-token";
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        } else {
            TokenService.clearTokens();
            window.dispatchEvent(new Event("force-login"));
            return Promise.reject(new Error("No access token"));
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

// Xử lý hàng đợi (failedQueue) của các yêu cầu API bị tạm hoãn do access token hết hạn.
const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error); // Báo lỗi cho tất cả request trong hàng đợi
        } else {
            prom.resolve(token); // Cung cấp token mới để retry request
        }
    });
    failedQueue = []; // Xóa hàng đợi sau khi xử lý
};

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi xảy ra trong khi refresh token thì logout luôn
        if (
            error.response?.status === 401 &&
            originalRequest.url.includes("/auth/refresh-token")
        ) {
            TokenService.clearTokens();
            window.dispatchEvent(new Event("force-login"));
            return Promise.reject(error);
        }

        // Nếu bị 401 và chưa retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers[
                            "Authorization"
                        ] = `Bearer ${token}`;
                        return instance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = TokenService.getLocalRefreshToken();
                const res = await authApi.refreshToken(refreshToken);
                const newAccessToken = res.data.access_token;

                TokenService.setLocalAccessToken(newAccessToken);
                instance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;
                processQueue(null, newAccessToken);

                return instance(originalRequest);
            } catch (err) {
                processQueue(err, null);
                TokenService.clearTokens();
                window.dispatchEvent(new Event("force-login"));
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
