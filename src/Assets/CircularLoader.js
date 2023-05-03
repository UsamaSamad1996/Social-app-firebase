import React from "react";
import "./style.css";

const CircularLoader = () => {
  // const { toggleTheme } = useSelector((state) => state.user);
  // ${toggleTheme ? "loader-black" : "loader-white"}
  return (
    <>
      <div className={`loader-white`}></div>
    </>
  );
};

export default CircularLoader;
