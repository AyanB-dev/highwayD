import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    const value = { isAuthenticated, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// This is the updated part
export const useAuth = () => {
    const context = useContext(AuthContext);
    // This check provides a clear error if the hook is used outside of the provider
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};