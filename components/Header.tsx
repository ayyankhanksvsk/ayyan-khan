
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        Reunify
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Ever wondered what it would be like to meet your younger self? Upload two photos and let AI create a timeless reunion.
      </p>
    </header>
  );
};
