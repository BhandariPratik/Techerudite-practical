import axios from "axios";
import { useState } from "react";
import useAuthStore from "../store/authStore";

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {authToken} = useAuthStore()

    const apiCall = async (method, url, data = {}, params = {}, headers = {}) => {
        setLoading(true);
        setError(null);

        try {
            const API_URL = `${import.meta.env.VITE_APP_BASEURL}${url}`;
            const response = await axios({
                method,
                url: API_URL,
                data,
                params,
                headers: {
                    ...headers,
                    authorization: `Bearer ${authToken}`,
                },
            });

            return {
                success: true,
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            console.error("API Error:", error);
            setError(error.response?.data?.message || error.message);
            return {
                success: false,
                message: error.response?.data?.message || error.message,
                status: error.response?.status || 500,
            };
        } finally {
            setLoading(false);
        }
    };

    return { apiCall, loading, error };
};

export default useApi;
