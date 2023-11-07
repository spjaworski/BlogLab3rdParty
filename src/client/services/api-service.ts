import { IFetchOptions } from "../../types";
export const TOKEN_KEY = 'TOKEN'

export async function apiService<T = any>(uri: string, method: string = 'GET',
    data?: {}) {
    const TOKEN = localStorage.getItem(TOKEN_KEY);

    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    const fetchOptions: IFetchOptions = {
        method,
        headers,
        body: JSON.stringify(data)
    };

    if (TOKEN) {
        headers['Authorization'] = `Bearer ${TOKEN}`;
    }

    if (method === 'GET') {
        delete headers['Content-Type'];
        delete fetchOptions.body;
    }

    try {
        const res = await fetch(uri, fetchOptions);

        if (res.status === 400) {
            throw new Error('Check fetch options for errors');
        }

        if (res.status === 401) {
            throw new Error('Token check failed');
        }

        if (res.status === 404) {
            throw new Error('Server path not found');
        }

        if (res.status === 500) {
            throw new Error('Internal error, check terminal logs');
        }

        if (res.ok) {
            return <T>await res.json();
        }
    } catch (error) {
        console.error('[error]', error.message);
        throw error;
    }

}

