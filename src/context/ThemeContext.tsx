import { createContext, useState, ReactNode } from "react";
import { common, neutral } from "@/theme/colors";

type ThemeType = "blue" | "green";

interface ThemeContextType {
  colors: typeof common;
  setTheme: (theme: ThemeType) => void;
  currentTheme: ThemeType;
}

const DEFAULT_THEME: ThemeType = "blue";

const themeContext = createContext<ThemeContextType | undefined>(undefined);

const { Provider } = themeContext;

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(DEFAULT_THEME);

  const themeValue = {
    colors: common,
    setTheme: (theme: ThemeType) => setCurrentTheme(theme),
    currentTheme,
  };

  return <Provider value={themeValue}>{children}</Provider>;
};

export { themeContext, ThemeProvider };
