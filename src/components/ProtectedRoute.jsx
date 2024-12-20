// src/components/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from './LoadingScreen';  // Import the LoadingScreen component

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;  // Show the loading screen while checking auth state
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
