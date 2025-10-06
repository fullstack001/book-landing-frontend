"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, Mail } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  email: string;
  bookTitle: string;
  onSendEmail: (email: string, format: string) => void;
  availableFormats?: {
    epub?: boolean;
    pdf?: boolean;
    audio?: boolean;
  };
}

export default function EmailBookModal({
  isOpen,
  onClose,
  onBack,
  email: initialEmail,
  bookTitle,
  onSendEmail,
  availableFormats = { epub: true, pdf: true },
}: Props) {
  // Set default format to the first available one
  const getDefaultFormat = () => {
    if (availableFormats.epub) return "epub";
    if (availableFormats.pdf) return "pdf";
    return "epub";
  };

  const [selectedFormat, setSelectedFormat] = useState(getDefaultFormat());
  const [email, setEmail] = useState(initialEmail);

  // Update email when modal opens or initialEmail changes
  useEffect(() => {
    if (isOpen && initialEmail) {
      setEmail(initialEmail);
    }
  }, [isOpen, initialEmail]);

  // Reset format when modal opens
  useEffect(() => {
    if (isOpen) {
      const defaultFormat = availableFormats.epub
        ? "epub"
        : availableFormats.pdf
        ? "pdf"
        : "epub";
      setSelectedFormat(defaultFormat);
    }
  }, [isOpen, availableFormats]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (email) {
      onSendEmail(email, selectedFormat);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-lg w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center px-12">
            Email Your Book
          </h2>

          {/* Format Selection */}
          <div className="space-y-3 mb-6">
            {availableFormats.epub && (
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="epub"
                  checked={selectedFormat === "epub"}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-900">
                  Generic EPUB{" "}
                  <span className="text-blue-600">(all other apps)</span>
                </span>
              </label>
            )}

            {availableFormats.pdf && (
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  checked={selectedFormat === "pdf"}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-900">PDF</span>
              </label>
            )}

            {!availableFormats.epub && !availableFormats.pdf && (
              <p className="text-gray-500 text-center py-4">
                No downloadable formats available for this book.
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!email}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Send Book
          </button>
        </div>
      </div>
    </div>
  );
}
