import axios from "axios";

const usersApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export { usersApi };