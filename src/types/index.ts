export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  coverImageUrl?: string;
  tagline?: string;
  ebookFileUrl?: string;
}

export interface LandingPageSettings {
  pageLayout: string;
  include3DEffects: boolean;
  pageTheme: string;
  accentColor: string;
  pageTitle: string;
  buttonText: string;
  modalTitle?: string;
  modalDescription?: string;
  heading1: {
    type: "none" | "tagline" | "newsletter" | "get_free_copy" | "custom";
    customText?: string;
  };
  heading2: {
    type: "none" | "tagline" | "subscribers" | "get_free_copy" | "custom";
    customText?: string;
  };
  popupMessage: {
    type: "none" | "default" | "custom";
    customText?: string;
  };
  pageText: {
    type: "none" | "book_description" | "custom";
    customText?: string;
  };
}

export interface DownloadPageSettings {
  pageName: string;
  expirationDate?: string;
  downloadLimit?: number;
  landingPageSettings: LandingPageSettings;
  advancedSettings?: {
    allowMultipleDownloads?: boolean;
    requireEmailVerification?: boolean;
    customRedirectUrl?: string;
  };
}

export interface EmailSignupPageSettings {
  pageName: string;
  mailingListAction: "none" | "optional" | "required";
  integrationList: string;
  expirationDate?: string;
  claimLimit?: number;
  askFirstName: boolean;
  askLastName: boolean;
  confirmEmail: boolean;
  landingPageSettings: LandingPageSettings;
  thankYouPageSettings?: {
    title: string;
    message: string;
    buttonText: string;
    redirectUrl?: string;
  };
  advancedSettings?: {
    doubleOptIn?: boolean;
    customThankYouMessage?: string;
    autoResponder?: boolean;
  };
}

export interface RestrictedPageSettings {
  pageName: string;
  restrictedList: string;
  redirectUrl?: string;
  expirationDate?: string;
  downloadLimit?: number;
  confirmEmail: boolean;
  landingPageSettings: LandingPageSettings;
  deliveryPageSettings?: {
    title: string;
    message: string;
    downloadButtonText: string;
    showDownloadCount?: boolean;
  };
  advancedSettings?: {
    allowBookmarking?: boolean;
    customRestrictionMessage?: string;
    requireEmailVerification?: boolean;
  };
}

export interface UniversalBookLinkSettings {
  linkName: string;
  selectedBook: string;
  audioSample: string;
  displayEbookLinks: boolean;
  displayAudiobookLinks: boolean;
  displayPaperbackLinks: boolean;
  expirationDate?: string;
  landingPageSettings: LandingPageSettings;
  advancedSettings?: {
    trackClicks?: boolean;
    customDomain?: string;
    analyticsEnabled?: boolean;
  };
}

export type LandingPageType =
  | "simple_download"
  | "email_signup"
  | "restricted"
  | "universal_link";

export interface LandingPage {
  _id: string;
  book: Book;
  userId: string;
  type: LandingPageType;
  slug: string;
  isActive: boolean;
  downloadPage?: DownloadPageSettings;
  emailSignupPage?: EmailSignupPageSettings;
  restrictedPage?: RestrictedPageSettings;
  universalBookLink?: UniversalBookLinkSettings;
  analytics: {
    totalViews: number;
    totalConversions: number;
    uniqueVisitors: number;
    lastAccessed?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ConversionRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface ConversionResponse {
  success: boolean;
  message: string;
  data?: {
    downloadUrl?: string;
    redirectUrl?: string;
    needsConfirmation?: boolean;
    conversionToken?: string;
    conversionType?: string;
  };
}
