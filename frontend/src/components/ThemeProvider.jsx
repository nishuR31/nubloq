import React from "react";
import { useSelector } from "react-redux";
import "../index.css";

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      {/* <div> */}
      <div className="bg-theme text-theme  min-h-screen transition-all ease-in-out bg-fixed object-fill bg-center bg-no-repeat delay-[3s] ">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
