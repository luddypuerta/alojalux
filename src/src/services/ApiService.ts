const API_URL = `${import.meta.env.VITE_URL_BACKEND}`;

export const ApiService = {
    apiFetch: ( endpoint: string, data: any, method: string = "GET" ): Promise<Response> => {
        if( method === "GET" ) {
            console.log(`${API_URL}/${endpoint}`, data, method)
            return fetch(`${API_URL}/${endpoint}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        } else {
            console.log(`${API_URL}/${endpoint}`, data, method)
            return fetch(`${API_URL}/${endpoint}`, {
                method,
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            })
        }
    }
}