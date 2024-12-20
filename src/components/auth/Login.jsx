import React, { useState } from "react";
import { loginUser } from "../../services/AuthService";
import { UserIcon } from "@heroicons/react/20/solid";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Start loading state

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      await loginUser(email, password);
      alert("Login successful!");
      // Optionally redirect or do something after successful login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form 
        onSubmit={handleLogin} 
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-10 p-2"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-10 p-2"
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white py-2 rounded-md hover:bg-blue-700 transition duration-200`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Optional: Add a link to signup or reset password */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? 
          <a href="/signup" className="text-blue-600 hover:underline"> Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
