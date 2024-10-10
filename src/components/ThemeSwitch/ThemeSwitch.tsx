import React, { useEffect, useState } from "react";
import iconSunny from "../../assets/icon-sunny.svg";
import iconMoon from "../../assets/icon-moon.svg";

export const ThemeSwitch: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setIsDarkMode(storedTheme === "dark");
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button className="switch" onClick={toggleTheme}>
      <img
        src={isDarkMode ? iconSunny : iconMoon}
        alt="icon"
        className="icon"
      />
      <p className="dark-mode">{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
    </button>
  );
};
