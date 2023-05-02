import React from "react";
import Navbar from "../Components/Navbar";
import Feed from "../Components/Timeline_Components/Feed";
import LeftSideBar from "../Components/Timeline_Components/LeftSideBar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex relative top-20 md:bg-slate-100">
        <LeftSideBar />
        <Feed />
      </div>
    </div>
  );
};

export default HomePage;
