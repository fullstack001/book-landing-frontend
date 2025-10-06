"use client";

import React from "react";
import { Theme } from "@/lib/themes";
import { clsx } from "@/lib/utils";
import { Loader2, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  setEmail: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  askFirstName: boolean;
  askLastName: boolean;
  buttonText: string;
  submitting: boolean;
  errorMessage: string;
  onSubmit: (e: React.FormEvent) => void;
  theme: Theme;
  bookTitle: string;
  modalTitle?: string;
  modalDescription?: string;
  author: string;
}

export default function EmailModal({
  isOpen,
  onClose,
  email,
  setEmail,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  askFirstName,
  askLastName,
  buttonText,
  submitting,
  errorMessage,
  onSubmit,
  theme,
  bookTitle,
  modalTitle,
  modalDescription,
  author,
}: Props) {
  if (!isOpen) return null;

  const defaultTitle = modalTitle || "Let's stay in touch!";
  const defaultDescription =
    modalDescription ||
    `Enter your email address to join my newsletter. You'll receive exclusive deals and special offers, and be the first to know about new releases. You will also receive a copy of ${bookTitle} as a welcome gift! You can unsubscribe at any time.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={submitting}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {defaultTitle}
          </h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            {defaultDescription}
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            {askFirstName && (
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your first name"
                />
              </div>
            )}

            {askLastName && (
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your last name"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitting}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email address"
              />
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="consent"
                required
                disabled={submitting}
                className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <label
                htmlFor="consent"
                className="text-xs text-gray-700 leading-relaxed"
              >
                I understand that I'm signing up for {author}'s email
                newsletter, and I'm free to unsubscribe at any time.
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center gap-3"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                buttonText
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
