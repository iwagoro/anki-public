import axios from "axios";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const modifier = {
    post: async (url: string, token: string, params?: object, data?: any, contentType = "application/json") => {
        try {
            const response = await axios.post(`${baseUrl}${url}`, data, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": contentType,
                },
                params,
            });
            return response.data;
        } catch (e: any) {
            toast.error(e.response?.data?.detail || "An error occurred");
            throw new Error(e.response?.data?.detail || "An error occurred");
        }
    },
    put: async (url: string, token: string, params?: object, data?: any) => {
        try {
            const response = await axios.put(`${baseUrl}${url}`, data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                params,
            });
            return response.data;
        } catch (e: any) {
            toast.error(e.response?.data?.detail || "An error occurred");
            throw new Error(e.response?.data?.detail || "An error occurred");
        }
    },
    delete: async (url: string, token: string, params?: object, data?: any) => {
        try {
            const response = await axios.delete(`${baseUrl}${url}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                data,
                params,
            });
            return response.data;
        } catch (e: any) {
            toast.error(e.response?.data?.detail || "An error occurred");
            throw new Error(e.response?.data?.detail || "An error occurred");
        }
    },
};

export default modifier;
