import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for token in localStorage only on client side
        const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (storedToken) {
            setToken(storedToken);
            // Add token to axios default headers
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            setIsAuthenticated(true);
            // You can also add a function here to fetch user data if the page reloads
        } else {
            setIsAuthenticated(false);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (token) {
            // Add token to axios default headers
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);

    const login = (userData, token) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
        setToken(token);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        delete api.defaults.headers.common['Authorization'];
    };

    const value = { isAuthenticated, user, token, login, logout, isLoading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};