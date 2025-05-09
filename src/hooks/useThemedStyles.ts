import { useTheme } from "@/hooks/useTheme";

const useThemedStyles = (styles: any) => {
  const theme = useTheme();
  return styles(theme);
};

export default useThemedStyles;
