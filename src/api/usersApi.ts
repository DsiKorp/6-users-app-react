import axios from "axios";

const usersApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Interceptors
// use (middleware): Function that executes every time this request is processed 
usersApi.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = `application/json`;
    }
    return config;
});
//export default tesloApi;
export { usersApi };