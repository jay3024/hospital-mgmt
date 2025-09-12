import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    onPrimary: string;
  };
}

const lightColors = {
  primary: '#059669', // Healthcare green - professional and trustworthy
  secondary: '#ffffff',
  accent: '#f0fdf4', // Very light green tint for subtle accents
  background: '#ffffff',
  surface: '#ffffff',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  onPrimary: '#ffffff',
};

const darkColors = {
  primary: '#34D399', // Lighter green for dark mode visibility
  secondary: '#1F2937',
  accent: '#064e3b', // Dark green accent
  background: '#111827',
  surface: '#1F2937',
  text: '#F9FAFB', // Keeping white text for readability
  textSecondary: '#D1D5DB', // Slightly whiter secondary text
  border: '#374151',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  onPrimary: '#ffffff', // White text on green buttons
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>('system');

  const isDark = theme === 'system' 
    ? systemColorScheme === 'dark' 
    : theme === 'dark';

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}