import { LandingPage, LandingPageSettings } from "@/types";

export function getPageSettings(
  landingPage: LandingPage
): LandingPageSettings | null {
  switch (landingPage.type) {
    case "simple_download":
      return landingPage.downloadPage?.landingPageSettings || null;
    case "email_signup":
      return landingPage.emailSignupPage?.landingPageSettings || null;
    case "restricted":
      return landingPage.restrictedPage?.landingPageSettings || null;
    case "universal_link":
      return landingPage.universalBookLink?.landingPageSettings || null;
    default:
      return null;
  }
}

export function getHeadingText(
  heading:
    | LandingPageSettings["heading1"]
    | LandingPageSettings["heading2"]
    | undefined,
  book: { title: string; tagline?: string }
): string {
  if (!heading) return "";

  switch (heading.type) {
    case "tagline":
      return book.tagline || "";
    case "newsletter":
      return "Join our newsletter for exclusive content";
    case "get_free_copy":
      return `Get your FREE copy of ${book.title}`;
    case "subscribers":
      return "Exclusive for subscribers";
    case "custom":
      return heading.customText || "";
    case "none":
    default:
      return "";
  }
}

export function getPageText(
  pageText: LandingPageSettings["pageText"] | undefined,
  book: { description: string }
): string {
  if (!pageText) return "";

  switch (pageText.type) {
    case "book_description":
      return book.description || "";
    case "custom":
      return pageText.customText || "";
    case "none":
    default:
      return "";
  }
}

export function replacePlaceholders(
  text: string,
  book: { title: string; author: string }
): string {
  return text
    .replace(/\{\{title\}\}/g, book.title)
    .replace(/\{\{author\}\}/g, book.author);
}

export function needsEmailCapture(landingPage: LandingPage): boolean {
  return (
    landingPage.type === "email_signup" || landingPage.type === "restricted"
  );
}

export function shouldAskFirstName(landingPage: LandingPage): boolean {
  if (landingPage.type === "email_signup") {
    return landingPage.emailSignupPage?.askFirstName || false;
  }
  return false;
}

export function shouldAskLastName(landingPage: LandingPage): boolean {
  if (landingPage.type === "email_signup") {
    return landingPage.emailSignupPage?.askLastName || false;
  }
  return false;
}

export function clsx(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
