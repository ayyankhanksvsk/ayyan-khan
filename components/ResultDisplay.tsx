
import React from 'react';

interface ResultDisplayProps {
  imageBase64: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageBase64 }) => {
  const imageUrl = `data:image/png;base64,${imageBase64}`;

  return (
    <div className="mt-12 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Timeless Reunion</h2>
      <div className="flex justify-center">
        <img
          src={imageUrl}
          alt="Generated reunified"
          className="rounded-lg shadow-md max-w-full h-auto md:max-w-2xl"
        />
      </div>
       <div className="mt-6 text-center">
        <a
          href={imageUrl}
          download="reunify-creation.png"
          className="inline-block px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full shadow-md hover:from-green-500 hover:to-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Download Image
        </a>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
