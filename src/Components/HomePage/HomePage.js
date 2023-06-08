import React from "react";
import Navbar from "../Navbar/Navbar";
import Feed from "./Feed/Feed";
import LeftSideBar from "./LeftSideBar/LeftSideBar";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { toggleTheme } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <div
        className={`flex relative top-20  ease-in-out transition-colors duration-1000  ${
          toggleTheme ? "bg-[#F0F2F5]" : "bg-algoBlueTwo text-white"
        }  `}
      >
        <LeftSideBar />
        <Feed />
      </div>
    </div>
  );
};

export default HomePage;
