export interface Theme {
  bg: string;
  text: string;
  accent: string;
  buttonBg: string;
  buttonText: string;
  buttonHover: string;
  border: string;
  inputBg: string;
  inputBorder: string;
  inputFocus: string;
}

export const themes: Record<string, Theme> = {
  "WordToWallet Black & Gray": {
    bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
    text: "text-white",
    accent: "text-gray-300",
    buttonBg: "bg-blue-600",
    buttonText: "text-white",
    buttonHover: "hover:bg-blue-700",
    border: "border-gray-700",
    inputBg: "bg-gray-800",
    inputBorder: "border-gray-600",
    inputFocus: "focus:ring-blue-500 focus:border-blue-500",
  },
  "Blue Theme": {
    bg: "bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600",
    text: "text-white",
    accent: "text-blue-100",
    buttonBg: "bg-indigo-700",
    buttonText: "text-white",
    buttonHover: "hover:bg-indigo-800",
    border: "border-blue-600",
    inputBg: "bg-blue-800/50",
    inputBorder: "border-blue-500",
    inputFocus: "focus:ring-indigo-500 focus:border-indigo-500",
  },
  "Light Theme": {
    bg: "bg-gradient-to-br from-gray-50 via-white to-gray-100",
    text: "text-gray-900",
    accent: "text-gray-600",
    buttonBg: "bg-blue-600",
    buttonText: "text-white",
    buttonHover: "hover:bg-blue-700",
    border: "border-gray-300",
    inputBg: "bg-white",
    inputBorder: "border-gray-300",
    inputFocus: "focus:ring-blue-500 focus:border-blue-500",
  },
  "Green Theme": {
    bg: "bg-gradient-to-br from-green-900 via-green-700 to-green-600",
    text: "text-white",
    accent: "text-green-100",
    buttonBg: "bg-green-900",
    buttonText: "text-white",
    buttonHover: "hover:bg-green-950",
    border: "border-green-600",
    inputBg: "bg-green-800/50",
    inputBorder: "border-green-500",
    inputFocus: "focus:ring-green-500 focus:border-green-500",
  },
  "Purple Theme": {
    bg: "bg-gradient-to-br from-purple-900 via-purple-700 to-purple-600",
    text: "text-white",
    accent: "text-purple-100",
    buttonBg: "bg-purple-900",
    buttonText: "text-white",
    buttonHover: "hover:bg-purple-950",
    border: "border-purple-600",
    inputBg: "bg-purple-800/50",
    inputBorder: "border-purple-500",
    inputFocus: "focus:ring-purple-500 focus:border-purple-500",
  },
  "Red Theme": {
    bg: "bg-gradient-to-br from-red-900 via-red-700 to-red-600",
    text: "text-white",
    accent: "text-red-100",
    buttonBg: "bg-red-900",
    buttonText: "text-white",
    buttonHover: "hover:bg-red-950",
    border: "border-red-600",
    inputBg: "bg-red-800/50",
    inputBorder: "border-red-500",
    inputFocus: "focus:ring-red-500 focus:border-red-500",
  },
};

export const getTheme = (themeName: string): Theme => {
  return themes[themeName] || themes["WordToWallet Black & Gray"];
};
