
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium">Brewing a moment in time...</p>
    </div>
  );
};
