import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-2xl">
        <BookOpen className="w-20 h-20 mx-auto mb-6 text-blue-400" />
        <h1 className="text-5xl font-bold mb-4">Book Landing Pages</h1>
        <p className="text-xl text-gray-300 mb-8">
          Beautiful, conversion-optimized landing pages for your books
        </p>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">
            How to Access Your Landing Page
          </h2>
          <p className="text-gray-300 mb-4">
            Landing pages are accessible via their unique ID:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-left mb-4">
            <span className="text-gray-500">http://localhost:3000/</span>
            <span className="text-blue-400">[landing-page-id]</span>
          </div>
          <p className="text-sm text-gray-400">
            Create and manage landing pages through the word2wallet-backend
            dashboard
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white/5 backdrop-blur rounded-lg p-6 border border-white/10">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-semibold mb-2">Multiple Themes</h3>
            <p className="text-sm text-gray-400">
              Choose from various color schemes and layouts
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-lg p-6 border border-white/10">
            <div className="text-3xl mb-2">📧</div>
            <h3 className="font-semibold mb-2">Email Capture</h3>
            <p className="text-sm text-gray-400">
              Build your mailing list automatically
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-lg p-6 border border-white/10">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold mb-2">Analytics</h3>
            <p className="text-sm text-gray-400">
              Track views and conversions in real-time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
