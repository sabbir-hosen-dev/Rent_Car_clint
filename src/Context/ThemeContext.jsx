import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
const ThemeContextProvider = ({ children }) => {

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "true" || storedTheme === null; 
  });


  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme ? "dark" : "light");
    localStorage.setItem("theme", theme.toString()); 
  }, [theme]);


  const value = {
    theme,
    setTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeContextProvider };