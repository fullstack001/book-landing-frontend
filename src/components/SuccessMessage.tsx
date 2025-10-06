import React from "react";
import { CheckCircle } from "lucide-react";
import { LandingPage } from "@/types";
import { Theme } from "@/lib/themes";
import { clsx } from "@/lib/utils";

interface Props {
  landingPage: LandingPage;
  theme: Theme;
}

export default function SuccessMessage({ landingPage, theme }: Props) {
  const getMessage = () => {
    switch (landingPage.type) {
      case "email_signup":
        return {
          title: "Check Your Email!",
          message:
            "We've sent you a download link. Please check your inbox (and spam folder).",
        };
      case "restricted":
        return {
          title: "Access Granted!",
          message:
            "Your download should start automatically. If not, please check your email.",
        };
      case "simple_download":
        return {
          title: "Download Starting!",
          message: "Your book download should begin automatically.",
        };
      default:
        return {
          title: "Success!",
          message: "Thank you for your interest.",
        };
    }
  };

  const { title, message } = getMessage();

  return (
    <div className="bg-green-600/20 border-2 border-green-500 text-white p-6 md:p-8 rounded-lg">
      <div className="flex items-start gap-4">
        <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
          <p className="text-base md:text-lg opacity-90">{message}</p>

          {landingPage.emailSignupPage?.thankYouPageSettings && (
            <div className="mt-4">
              <p className="text-sm opacity-75">
                {landingPage.emailSignupPage.thankYouPageSettings.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
