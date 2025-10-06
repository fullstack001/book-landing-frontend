import React from "react";
import { Theme } from "@/lib/themes";
import { clsx } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Props {
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
}

export default function EmailForm({
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
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {errorMessage && (
        <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      {askFirstName && (
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={submitting}
            className={clsx(
              "w-full px-4 py-3 rounded-lg",
              theme.inputBg,
              theme.inputBorder,
              theme.inputFocus,
              theme.text,
              "border-2 outline-none transition-all",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            placeholder="Enter your first name"
          />
        </div>
      )}

      {askLastName && (
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={submitting}
            className={clsx(
              "w-full px-4 py-3 rounded-lg",
              theme.inputBg,
              theme.inputBorder,
              theme.inputFocus,
              theme.text,
              "border-2 outline-none transition-all",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            placeholder="Enter your last name"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={submitting}
          className={clsx(
            "w-full px-4 py-3 rounded-lg",
            theme.inputBg,
            theme.inputBorder,
            theme.inputFocus,
            theme.text,
            "border-2 outline-none transition-all",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          placeholder="Enter your email address"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={clsx(
          "w-full",
          theme.buttonBg,
          theme.buttonText,
          theme.buttonHover,
          "px-8 py-4 md:px-12 md:py-5",
          "rounded-lg font-bold text-lg md:text-xl",
          "transition-all transform hover:scale-105",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          "shadow-2xl flex items-center justify-center gap-3"
        )}
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

      <p className="text-xs text-center opacity-70">
        We respect your privacy. Your information will never be shared.
      </p>
    </form>
  );
}
