import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { registerUser } from "../../services/AuthService";

const Signup = () => {
  const [fullName, setFullName] = useState(""); // State for full name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await registerUser(fullName, email, password); // Pass fullName to registerUser
      alert("Signup successful!");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form 
        onSubmit={handleSignup} 
        className="bg-white shadow-md rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            id="fullName"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Signup
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? 
          <a href="/login" className="text-blue-600 hover:underline"> Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
