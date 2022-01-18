import React, { useState } from "react";
import { DefaultTheme } from "styled-components";

export interface AvailableThemes {
  light: DefaultTheme;
  dark: DefaultTheme;
};

/**
 * This component provides access to a wrapping context that
 * contains information relative to the current theme (one out
 * of a set list of available themes declared in Available themes
 * and defined in Theme.tsx) as well as a helper method to switch
 * themes dynamically from any child by using the useContext hook
 * from a child component.
 */
interface IThemeContext {
  theme: keyof AvailableThemes;
  switchTheme: (theme: keyof AvailableThemes) => void;
}
const ThemeContext = React.createContext<IThemeContext>({
  theme: 'light',
  switchTheme: () => {},
});

const ThemeStore: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<keyof AvailableThemes>(localStorage.getItem('theme') as keyof AvailableThemes || 'dark');

  const switchTheme = (theme: keyof AvailableThemes) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <ThemeContext.Provider value={{ switchTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeStore, ThemeContext };