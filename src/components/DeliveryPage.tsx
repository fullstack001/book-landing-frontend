"use client";

import React, { useState } from "react";
import BookCover from "./BookCover";
import ReaderPreferenceModal from "./ReaderPreferenceModal";
import EmailBookModal from "./EmailBookModal";
import { Download, BookOpen } from "lucide-react";

interface Props {
  book: {
    _id: string;
    title: string;
    author: string;
    coverImageUrl?: string;
  };
  downloadUrl: string;
  expirationDays?: number;
  userEmail?: string;
  availableFormats?: {
    epub?: boolean;
    pdf?: boolean;
    audio?: boolean;
  };
  confirmationToken?: string;
}

export default function DeliveryPage({
  book,
  downloadUrl,
  expirationDays = 13,
  userEmail = "",
  availableFormats = { epub: true, pdf: true },
  confirmationToken,
}: Props) {
  const [showReaderModal, setShowReaderModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleDownload = (format: string, reader?: string) => {
    console.log(`Downloading ${format} for ${reader || "direct"}`);

    // Handle different download scenarios
    if (format === "email") {
      // Show email modal
      setShowReaderModal(false);
      setShowEmailModal(true);
    } else if (
      format === "browser" ||
      reader === "browser" ||
      reader === "wordtowallet"
    ) {
      // Navigate to reader page
      setShowReaderModal(false);
      const readerUrl =
        process.env.NEXT_PUBLIC_READER_URL || "http://localhost:3002";
      window.location.href = `${readerUrl}/${book._id}`;
      window.open(`${readerUrl}/${book._id}`, "_blank");
    } else if (reader === "playbooks") {
      setShowReaderModal(false);
      window.open("https://play.google.com/books", "_blank");
    } else if (format === "epub" || format === "pdf") {
      // Direct download for EPUB or PDF
      setShowReaderModal(false);
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const downloadLink = `${apiUrl}/landing-pages/download/${confirmationToken}?format=${format}`;

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = downloadLink;
      link.download = `${book.title}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback for other formats
      setShowReaderModal(false);
      window.location.href = downloadUrl;
    }
  };

  const handleSendEmail = async (email: string, format: string) => {
    if (!confirmationToken) {
      alert("Error: Missing confirmation token");
      return;
    }

    try {
      const { api } = await import("@/lib/api");
      await api.sendBookViaEmail(confirmationToken, email, format);
      setShowEmailModal(false);
      alert(
        `${format.toUpperCase()} file has been sent to ${email}! Please check your inbox (and spam folder).`
      );
    } catch (error: any) {
      console.error("Failed to send book:", error);
      alert(
        error.response?.data?.message ||
          "Failed to send book. Please try again."
      );
    }
  };

  const handleBackToReaderModal = () => {
    setShowEmailModal(false);
    setShowReaderModal(true);
  };

  const handleReadInBrowser = () => {
    // Navigate to reader page
    const readerUrl =
      process.env.NEXT_PUBLIC_READER_URL || "http://localhost:3002";
    window.location.href = `${readerUrl}/${book._id}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6" />
              <span className="text-xl font-bold">Word2Wallet</span>
            </div>
            <a
              href="mailto:support@word2wallet.com"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Need Help?
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto min-h-screen px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Book Cover */}
            <div className="flex justify-center">
              <div className="relative">
                <BookCover
                  bookId={book._id}
                  title={book.title}
                  include3D={true}
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Download your copy of {book.title}
              </h1>

              <p className="text-lg text-gray-300">
                This offer will expire in{" "}
                <span className="font-semibold text-white">
                  {expirationDays} days
                </span>
                , so be sure to download your copy before it's gone.
              </p>

              {/* Download Button */}
              <button
                onClick={() => setShowReaderModal(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-lg font-bold text-xl transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
              >
                <Download className="w-6 h-6" />
                GET MY BOOK
              </button>

              {/* Read in Browser Link */}
              <button
                onClick={handleReadInBrowser}
                className="w-full text-center text-blue-400 hover:text-blue-300 underline text-sm py-2"
              >
                Start reading in your browser
              </button>

              {/* Help Text */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <p className="text-sm text-gray-400">
                  Having trouble downloading? Make sure pop-ups are enabled in
                  your browser, or try using a different browser. Still having
                  issues?{" "}
                  <a
                    href="mailto:support@word2wallet.com"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Contact our support team
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Word2Wallet</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white">
                How does this work?
              </a>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Reader Preference Modal */}
      <ReaderPreferenceModal
        isOpen={showReaderModal}
        onClose={() => setShowReaderModal(false)}
        bookTitle={book.title}
        onDownload={handleDownload}
        availableFormats={availableFormats}
      />

      {/* Email Book Modal */}
      <EmailBookModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onBack={handleBackToReaderModal}
        email={userEmail}
        bookTitle={book.title}
        onSendEmail={handleSendEmail}
        availableFormats={availableFormats}
      />
    </div>
  );
}
