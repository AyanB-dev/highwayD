import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {

    const { isAuthenticated, isLoading } = useAuth();

    // Show loading state while checking authentication
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If the user is NOT authenticated, redirect them to the sign-in page
    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    // If they are authenticated, show them the page they requested
    return children;
}