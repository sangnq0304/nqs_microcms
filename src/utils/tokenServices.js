const TokenService = {
    getLocalAccessToken: () => localStorage.getItem('access_token'),

    getLocalRefreshToken: () => localStorage.getItem('refresh_token'),

    setLocalAccessToken: (token) => localStorage.setItem('access_token', token),

    setLocalRefreshToken: (token) => localStorage.setItem('refresh_token', token),

    clearTokens: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
};

export default TokenService;