import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const themes = {
  elegant: {
    name: "Elegant Minimalist",
    background: "#f5f5f5",
    card: "bg-white",
    navbar: "bg-gray-100",
    primary: "bg-gray-800",
    text: "#333333",
    subtext: "text-gray-600",
    border: "border-gray-200",
    accent: "text-gray-700",
    button: "bg-gray-800 hover:bg-gray-700 text-white",
    hover: "hover:bg-gray-100",
    shadow: "shadow-md hover:shadow-xl",
    transition: "transition duration-300 ease-in-out",
    outer_border:"#333333"

   
  },
  midnight: {
    name: "Midnight Horizon",
    background: "bg-gray-900",
    card: "bg-gray-800",
    navbar: "bg-gray-850",
    primary: "bg-indigo-600",
    text: "text-gray-100",
    subtext: "text-gray-400",
    border: "border-gray-700",
    accent: "text-cyan-400",
    button: "bg-indigo-700 hover:bg-indigo-600",
    outer_border:"text-gray-100"
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("elegant"); // Default theme

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === "elegant" ? "midnight" : "elegant"
    );
  };

  const theme = themes[currentTheme]; // Get the current theme object dynamically

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, theme }}>
      <div className={currentTheme === "midnight" ? "dark" : ""}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
