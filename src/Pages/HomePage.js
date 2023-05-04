import React from "react";
import Navbar from "../Components/Navbar";
import Feed from "../Components/Timeline_Components/Feed";
import LeftSideBar from "../Components/Timeline_Components/LeftSideBar";
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
