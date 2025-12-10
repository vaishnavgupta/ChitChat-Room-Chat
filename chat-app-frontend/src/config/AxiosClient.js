import axios from "axios"

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});