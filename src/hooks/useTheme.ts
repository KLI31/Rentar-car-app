import { themeContext } from "@/context/ThemeContext";
import { useContext } from "react";

export const useTheme = () => {
  const theme = useContext(themeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};
