import axios from "axios";

const fetcher = async (url: string, token: string, params?: object) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.get(`${baseUrl}${url}`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        params, // クエリパラメータを追加
    });
    return response.data;
};

export default fetcher;
