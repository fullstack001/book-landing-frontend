import React from "react";
import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";

interface Props {
  error: string;
}

export default function ErrorPage({ error }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Oops!</h1>
        <p className="text-xl text-gray-300 mb-8">{error}</p>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 mb-8">
          <p className="text-gray-400 text-sm mb-4">
            This landing page may have been removed, is not active, or the URL
            is incorrect.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Home className="w-5 h-5" />
          Go to Home
        </Link>
      </div>
    </div>
  );
}
