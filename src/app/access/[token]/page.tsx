"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/lib/api";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import Image from "next/image";

interface BookData {
  _id: string;
  title: string;
  author: string;
  description?: string;
  coverImageUrl?: string;
  fileType: string;
  pageCount?: number;
  wordCount?: number;
}

interface TransactionData {
  _id: string;
  customerEmail: string;
  customerName?: string;
  amount: number;
  currency: string;
  downloadCount: number;
  maxDownloads: number;
  expiresAt: string;
}

interface AccessData {
  transaction: TransactionData;
  book: BookData;
  deliveryLink: {
    title: string;
    description?: string;
  };
}

export default function AccessPage() {
  const params = useParams();
  const token = params.token as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessData, setAccessData] = useState<AccessData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await apiClient.get(
          `/payment-transactions/verify/${token}`
        );
        if (response.data.success) {
          setAccessData(response.data.data);
        } else {
          setError(response.data.message || "Invalid access token");
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "Failed to verify access. The link may have expired."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await apiClient.get(
        `/payment-transactions/download/${token}`
      );
      if (response.data.success) {
        const downloadUrl = response.data.data.downloadUrl;

        // Open download URL in new tab
        window.open(downloadUrl, "_blank");

        // Update download count
        if (accessData) {
          setAccessData({
            ...accessData,
            transaction: {
              ...accessData.transaction,
              downloadCount: response.data.data.downloadCount,
            },
          });
        }
      } else {
        alert(response.data.message || "Failed to generate download link");
      }
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Failed to download book. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error || !accessData) {
    return <ErrorPage error={error || "Invalid access token"} />;
  }

  const { book, transaction, deliveryLink } = accessData;
  const remainingDownloads =
    transaction.maxDownloads - transaction.downloadCount;
  const expiryDate = new Date(transaction.expiresAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900">📚 Book Store</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Success Banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 text-center">
            <div className="text-4xl mb-2">✅</div>
            <h1 className="text-2xl font-bold">Your Book is Ready!</h1>
          </div>

          <div className="md:flex">
            {/* Book Cover */}
            {book.coverImageUrl && (
              <div className="md:w-2/5 bg-gradient-to-br from-gray-100 to-gray-200 p-12 flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  <div className="aspect-[2/3] relative shadow-2xl rounded-lg overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/books/${book._id}/cover`}
                      alt={book.title}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      width={128}
                      height={0}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Book Details & Download */}
            <div
              className={`${
                book.coverImageUrl ? "md:w-3/5" : "w-full"
              } p-8 md:p-12`}
            >
              <div className="space-y-6">
                {/* Title & Author */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {book.title}
                  </h2>
                  <p className="text-xl text-gray-600">by {book.author}</p>
                </div>

                {/* Description */}
                {book.description && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                )}

                {/* Purchase Info */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Purchase Information
                  </h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <strong>Email:</strong> {transaction.customerEmail}
                    </p>
                    {transaction.customerName && (
                      <p>
                        <strong>Name:</strong> {transaction.customerName}
                      </p>
                    )}
                    <p>
                      <strong>Amount Paid:</strong> {transaction.currency}{" "}
                      {transaction.amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Download Info */}
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Download Information
                  </h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <strong>Downloads Used:</strong>{" "}
                      {transaction.downloadCount} of {transaction.maxDownloads}
                    </p>
                    <p>
                      <strong>Remaining Downloads:</strong> {remainingDownloads}
                    </p>
                    <p>
                      <strong>Access Expires:</strong> {expiryDate}
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <div className="pt-4">
                  {remainingDownloads > 0 ? (
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isDownloading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Generating Download Link...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                          </svg>
                          Download Book Now
                        </span>
                      )}
                    </button>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                      <p className="text-red-800 font-semibold">
                        Download Limit Reached
                      </p>
                      <p className="text-sm text-red-600 mt-1">
                        You've used all available downloads. Please contact
                        support if you need assistance.
                      </p>
                    </div>
                  )}
                </div>

                {/* Important Notes */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    📌 Important Notes
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>
                        Your download link is valid until{" "}
                        <strong>{expiryDate}</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>
                        You can download the book up to{" "}
                        <strong>{transaction.maxDownloads} times</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>
                        A confirmation email with this link has been sent to{" "}
                        <strong>{transaction.customerEmail}</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>
                        Please save this page URL for future access to your book
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              If you have any questions or issues with your download, we're here
              to help!
            </p>
            <a
              href="mailto:support@word2wallet.com"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              support@word2wallet.com
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 py-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Word2Wallet. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
