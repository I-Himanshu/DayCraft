// src/components/LoadingScreen.jsx

import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-primary-500 border-gray-200 rounded-full" role="status"></div>
        <p className="text-xl text-gray-600 mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
