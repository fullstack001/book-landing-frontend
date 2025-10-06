"use client";

import React from "react";
import { X, Download, Mail } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  onDownload: (format: string, reader?: string) => void;
  availableFormats?: {
    epub?: boolean;
    pdf?: boolean;
    audio?: boolean;
  };
  showEmailOption?: boolean;
}

export default function ReaderPreferenceModal({
  isOpen,
  onClose,
  bookTitle,
  onDownload,
  availableFormats = { epub: true, pdf: true },
  showEmailOption = true,
}: Props) {
  if (!isOpen) return null;

  const readers = [
    {
      name: "WordToWallet",
      bgColor: "bg-orange-500",
      enabled: true,
      value: "wordtowallet",
    },
    // { name: "Kindle", bgColor: "bg-blue-400", enabled: false, value: "kindle" },
    // { name: "Kobo", bgColor: "bg-red-500", enabled: false, value: "kobo" },
    // { name: "Nook", bgColor: "bg-blue-900", enabled: false, value: "nook" },
    {
      name: "Play Books",
      bgColor: "bg-blue-500",
      enabled: true,
      value: "playbooks",
    },
    {
      name: "Read in Browser",
      bgColor: "bg-orange-600",
      enabled: true,
      value: "browser",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 pr-8">
            Which is your preferred reader?
          </h2>

          {/* Reader Options */}
          <div className="space-y-3 mb-6">
            {readers.map((reader) => (
              <button
                key={reader.value}
                onClick={() => {
                  if (reader.enabled) {
                    onDownload("epub", reader.value);
                  }
                }}
                disabled={!reader.enabled}
                className={`w-full flex items-center space-x-4 p-4 rounded-lg border transition-all relative ${
                  reader.enabled
                    ? "border-gray-300 hover:border-orange-500 hover:shadow-md cursor-pointer bg-white"
                    : "border-gray-200 cursor-not-allowed bg-gray-50"
                }`}
              >
                {/* Icon/Logo placeholder */}
                <div
                  className={`w-12 h-12 ${
                    reader.bgColor
                  } rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                    !reader.enabled ? "opacity-40" : ""
                  }`}
                >
                  {reader.name.substring(0, 2).toUpperCase()}
                </div>

                <span
                  className={`text-lg font-medium flex-1 text-left ${
                    reader.enabled ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {reader.name}
                </span>

                {/* Strike-through for disabled readers */}
                {!reader.enabled && (
                  <div className="absolute inset-0 flex items-center px-4">
                    <div className="h-0.5 w-full bg-red-500"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Download Options */}
          <div className="border-t pt-6">
            <p className="text-sm text-gray-600 mb-4 text-center">
              Or download directly:
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {showEmailOption &&
                (availableFormats.epub || availableFormats.pdf) && (
                  <button
                    onClick={() => onDownload("email")}
                    className="flex flex-col items-center justify-center space-y-2 px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg min-w-[100px]"
                  >
                    <Mail className="w-6 h-6" />
                    <span className="text-sm font-semibold">EMAIL</span>
                  </button>
                )}

              {availableFormats.epub && (
                <button
                  onClick={() => onDownload("epub")}
                  className="flex flex-col items-center justify-center space-y-2 px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg min-w-[100px]"
                >
                  <Download className="w-6 h-6" />
                  <span className="text-sm font-semibold">EPUB</span>
                </button>
              )}

              {availableFormats.pdf && (
                <button
                  onClick={() => onDownload("pdf")}
                  className="flex flex-col items-center justify-center space-y-2 px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg min-w-[100px]"
                >
                  <Download className="w-6 h-6" />
                  <span className="text-sm font-semibold">PDF</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
