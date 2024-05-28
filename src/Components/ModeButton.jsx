import React from "react";
import { useTheme } from "./ThemeContext";

function ModeButton() {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <div>
      <button className="toogle-buttton" onClick={toggleTheme}>
        {darkMode ? "Light Mode" : "Dark Mode"}<i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
      </button>
    </div>
  );
}
export default ModeButton;