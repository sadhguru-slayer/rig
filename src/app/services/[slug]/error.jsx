'use client'; // error.jsx must be a client component

import { useEffect } from 'react';

export default function ServiceError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-700 mb-6">
        We encountered an error while loading this service.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Try Again
      </button>
    </div>
  );
}
