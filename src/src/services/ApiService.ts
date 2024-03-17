const API_URL = `${import.meta.env.VITE_URL_BACKEND}`;

export const ApiService = {
    apiFetch: async (endpoint: string, data: any, method: string = "GET"): Promise<Response> => {
        const url = `${API_URL}/${endpoint}`;
        const requestOptions: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            ...(method !== "GET" && { body: JSON.stringify(data) })
        };

        try {
            const response = await fetch(url, requestOptions);
            return response;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
}