import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.origin ? `${window.location.origin}/api` : 'http://localhost:5000/api'),
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;