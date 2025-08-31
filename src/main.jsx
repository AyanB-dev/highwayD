import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { AuthProvider } from './context/AuthContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const AppWrapper = () => {
  if (!googleClientId) {
    console.warn('VITE_GOOGLE_CLIENT_ID is not set. Google OAuth will not work.');
    return (
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />);