import instance from "../repository";

const authApi = {
    refreshToken: (refresh_token) =>
        instance.post("/auth/refresh-token", { refresh_token }),
};

export default authApi;
