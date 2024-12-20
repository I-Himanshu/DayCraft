import { useState } from 'react';
import { Navigation } from './Navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext'; // Ensure this is the correct path to your AuthContext

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // Access user and logout from AuthContext

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex justify-between items-center">
          {/* Logo/Title */}
          <h1 className="text-lg sm:text-2xl text-primary-600 font-bold">
            Daily Planner
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Navigation />
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User Profile */}
                <div className="flex items-center space-x-2">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"} // Use user photo or placeholder
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.displayName || "User"}
                  </span>
                </div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Login Button if not logged in
              <button
                onClick={() => (window.location.href = '/login')} // Redirect to login page
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-gray-200 mt-4">
            <Navigation mobile onNavClick={() => setIsMenuOpen(false)} />
            <div className="mt-4">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/40"}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {user.displayName || "User"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => (window.location.href = '/login')}
                  className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
