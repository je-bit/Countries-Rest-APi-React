import React from "react";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <p className="title">Where in the world?</p>
      <ThemeSwitch />
    </header>
  );
};

export default Header;
