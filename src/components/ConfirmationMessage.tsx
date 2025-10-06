"use client";

import React from "react";
import { clsx } from "@/lib/utils";

interface Props {
  email: string;
  bookTitle: string;
}

export default function ConfirmationMessage({ email, bookTitle }: Props) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-green-900">Almost finished...</h3>

      <p className="text-green-800 text-sm">
        We just need to confirm your email address.
      </p>

      <p className="text-green-800 text-sm">
        Click the link in the email we just sent you to confirm your email
        address and receive your book. If you don't see the email after a minute
        or two, check your SPAM folder, as it may have gone there by mistake.
      </p>

      <p className="text-green-800 text-sm">
        If you're still having problems, email us at{" "}
        <a
          href="mailto:support@word2wallet.com"
          className="text-blue-600 hover:underline"
        >
          support@word2wallet.com
        </a>
        , and someone will help you out.
      </p>

      <div className="pt-4">
        <div className="bg-white border border-green-300 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Email sent to:</p>
          <p className="text-base font-semibold text-gray-900">{email}</p>
        </div>
      </div>

      <div className="text-center pt-2">
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-green-700 hover:text-green-900 underline"
        >
          Didn't receive the email? Click here to try again
        </button>
      </div>
    </div>
  );
}
