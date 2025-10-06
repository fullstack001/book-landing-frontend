"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import { getTheme } from "@/lib/themes";
import {
  getPageSettings,
  getHeadingText,
  getPageText,
  replacePlaceholders,
  needsEmailCapture,
  shouldAskFirstName,
  shouldAskLastName,
  clsx,
} from "@/lib/utils";
import BookCover from "./BookCover";
import EmailForm from "./EmailForm";
import EmailModal from "./EmailModal";
import SuccessMessage from "./SuccessMessage";
import ConfirmationMessage from "./ConfirmationMessage";
import ReaderPreferenceModal from "./ReaderPreferenceModal";
import EmailBookModal from "./EmailBookModal";
import { Download } from "lucide-react";

interface Props {
  landingPage: any;
}

export default function LandingPageView({ landingPage }: Props) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [showReaderModal, setShowReaderModal] = useState(false);
  const [showEmailBookModal, setShowEmailBookModal] = useState(false);
  const [conversionToken, setConversionToken] = useState<string>("");

  const settings = getPageSettings(landingPage.landingPage);
  const theme = getTheme(settings?.pageTheme || "WordToWallet Black & Gray");
  const book = landingPage.book;

  const pageTitle = settings?.pageTitle
    ? replacePlaceholders(settings.pageTitle, book)
    : `Get your FREE copy of ${book.title}`;
  const buttonText = settings?.buttonText || "GET MY BOOK";
  const heading1 = getHeadingText(settings?.heading1, book);
  const heading2 = getHeadingText(settings?.heading2, book);
  const pageText = getPageText(settings?.pageText, book);
  const include3D = settings?.include3DEffects !== false;

  const requiresEmail = needsEmailCapture(landingPage.landingPage);
  const isSimpleDownload = landingPage.landingPage.type === "simple_download";
  console.log(isSimpleDownload);
  const askFirst = shouldAskFirstName(landingPage.landingPage);
  const askLast = shouldAskLastName(landingPage.landingPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const response = await api.handleConversion(landingPage.landingPage._id, {
        email: requiresEmail ? email : undefined,
        firstName: askFirst ? firstName : undefined,
        lastName: askLast ? lastName : undefined,
      });

      setShowModal(false);

      // Check if email confirmation is needed
      if (response.data?.needsConfirmation) {
        setNeedsConfirmation(true);
      } else {
        setSubmitted(true);
        // Handle download or redirect
        if (response.data?.downloadUrl) {
          window.location.href = response.data.downloadUrl;
        } else if (response.data?.redirectUrl) {
          window.location.href = response.data.redirectUrl;
        }
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Failed to submit. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDirectDownload = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/landing-pages/public/${landingPage.landingPage._id}/conversion`;
  };

  const handleSimpleDownloadClick = async () => {
    // For simple_download, we need to get a conversion token first
    try {
      const response = await api.handleConversion(
        landingPage.landingPage._id,
        {}
      );

      if (response.data?.conversionType === "download") {
        setShowReaderModal(true);
      }
      // else if (response.data?.downloadUrl) {
      //   window.location.href = response.data.downloadUrl;
      // } else if (response.data?.redirectUrl) {
      //   window.location.href = response.data.redirectUrl;
      // }
    } catch (err: any) {
      console.error("Failed to initiate download:", err);
      alert(
        err.response?.data?.message ||
          "Failed to initiate download. Please try again."
      );
    }
  };

  const handleDownload = (format: string, reader?: string) => {
    console.log(`Downloading ${format} for ${reader || "direct"}`);

    // Handle different download scenarios
    if (
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
      const downloadLink = `${apiUrl}/landing-pages/simple_download/${landingPage.landingPage._id}?format=${format}`;

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = downloadLink;
      link.download = `${book.title}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={clsx("min-h-screen", theme.bg, theme.text)}>
      <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Book Cover */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-1">
              <BookCover
                bookId={book._id}
                title={book.title}
                include3D={include3D}
              />
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
              {/* Heading 1 */}
              {heading1 && (
                <h2
                  className={clsx(
                    "text-xl md:text-2xl lg:text-3xl font-bold",
                    theme.accent
                  )}
                >
                  {heading1}
                </h2>
              )}

              {/* Main Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                {pageTitle}
              </h1>

              {/* Heading 2 */}
              {heading2 && (
                <h3
                  className={clsx(
                    "text-lg md:text-xl lg:text-2xl font-semibold",
                    theme.accent
                  )}
                >
                  {heading2}
                </h3>
              )}

              {/* Page Text / Description */}
              {pageText && (
                <div
                  className={clsx(
                    "text-base md:text-lg lg:text-xl leading-relaxed prose prose-invert max-w-none",
                    theme.accent
                  )}
                  dangerouslySetInnerHTML={{ __html: pageText }}
                />
              )}

              {/* Form or Button */}
              {needsConfirmation ? (
                <ConfirmationMessage email={email} bookTitle={book.title} />
              ) : submitted ? (
                <SuccessMessage
                  landingPage={landingPage.landingPage}
                  theme={theme}
                />
              ) : requiresEmail ? (
                <button
                  onClick={() => setShowModal(true)}
                  className={clsx(
                    "w-full md:w-auto",
                    theme.buttonBg,
                    theme.buttonText,
                    theme.buttonHover,
                    "px-8 py-4 md:px-12 md:py-5",
                    "rounded-lg font-bold text-lg md:text-xl",
                    "transition-all transform hover:scale-105",
                    "shadow-2xl flex items-center justify-center gap-3"
                  )}
                >
                  <Download className="w-6 h-6" />
                  {buttonText}
                </button>
              ) : isSimpleDownload ? (
                <button
                  onClick={handleSimpleDownloadClick}
                  className={clsx(
                    "w-full md:w-auto",
                    theme.buttonBg,
                    theme.buttonText,
                    theme.buttonHover,
                    "px-8 py-4 md:px-12 md:py-5",
                    "rounded-lg font-bold text-lg md:text-xl",
                    "transition-all transform hover:scale-105",
                    "shadow-2xl flex items-center justify-center gap-3"
                  )}
                >
                  <Download className="w-6 h-6" />
                  {buttonText}
                </button>
              ) : (
                <button
                  onClick={handleDirectDownload}
                  className={clsx(
                    "w-full md:w-auto",
                    theme.buttonBg,
                    theme.buttonText,
                    theme.buttonHover,
                    "px-8 py-4 md:px-12 md:py-5",
                    "rounded-lg font-bold text-lg md:text-xl",
                    "transition-all transform hover:scale-105",
                    "shadow-2xl flex items-center justify-center gap-3"
                  )}
                >
                  <Download className="w-6 h-6" />
                  {buttonText}
                </button>
              )}

              {/* Benefits List */}
              {/* <div
                className={clsx(
                  "text-sm md:text-base",
                  theme.accent,
                  "space-y-2"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Instant access - Download immediately</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Available in multiple formats</span>
                </div>
              </div> */}
            </div>
          </div>

          {/* About the Author Section */}
          <div className="mt-16 lg:mt-24 border-t border-white/10 pt-12 lg:pt-16">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                About the Author
              </h3>
              <p className={clsx("text-lg md:text-xl mb-4", theme.accent)}>
                <span className="font-semibold">{book.author}</span>
              </p>
              {book.description && book.description.length > 300 && (
                <p
                  className={clsx(
                    "text-base md:text-lg leading-relaxed max-w-3xl mx-auto",
                    theme.accent
                  )}
                >
                  {book.author} is a renowned author dedicated to creating
                  compelling stories that captivate readers worldwide. With
                  years of experience in the literary world, their works have
                  touched the hearts of countless readers.
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 lg:mt-16 text-center">
            <div className="flex items-center justify-center gap-6 text-sm">
              <a href="#" className={clsx(theme.accent, "hover:underline")}>
                Privacy Policy
              </a>
              <span className="text-white/20">|</span>
              <a href="#" className={clsx(theme.accent, "hover:underline")}>
                Terms of Service
              </a>
            </div>
            <p className={clsx("mt-4 text-xs", theme.accent)}>
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {requiresEmail && (
        <EmailModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          email={email}
          setEmail={setEmail}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          askFirstName={askFirst}
          askLastName={askLast}
          buttonText={buttonText}
          submitting={submitting}
          errorMessage={errorMessage}
          onSubmit={handleSubmit}
          theme={theme}
          bookTitle={book.title}
          author={book.author}
          modalTitle={settings?.modalTitle}
          modalDescription={settings?.modalDescription}
        />
      )}

      {/* Reader Preference Modal for simple_download */}
      {isSimpleDownload && (
        <ReaderPreferenceModal
          isOpen={showReaderModal}
          onClose={() => setShowReaderModal(false)}
          bookTitle={book.title}
          onDownload={handleDownload}
          availableFormats={{ epub: true, pdf: true }}
          showEmailOption={false}
        />
      )}
    </div>
  );
}
