import React from "react";
import "./style.css";
import { useSelector } from "react-redux";

const CircularLoader = () => {
  const { toggleTheme } = useSelector((state) => state.user);
  return (
    <>
      <div
        className={`
      ${toggleTheme ? "loader-black" : "loader-white"}`}
      ></div>
    </>
  );
};

export default CircularLoader;
