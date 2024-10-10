import React from "react";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import "./Header.scss";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <p className="title">Where in the world?</p>
      <ThemeSwitch />
    </header>
  );
};
