import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import { Header } from './components/layout/Header';
import Signup from './components/auth/Signup';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 overflow-hidden">
    <Header />
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {children}
    </div>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
