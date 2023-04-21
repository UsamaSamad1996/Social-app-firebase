import React from "react";
import Navbar from "../Components/Navbar";
import Feed from "../Components/Timeline_Components/Feed";
import LeftSideBar from "../Components/Timeline_Components/LeftSideBar";
import { useState } from "react";

const HomePage = () => {
  const [toggleTheme, setToggleTheme] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="flex relative top-20 md:bg-white">
        <LeftSideBar setToggleTheme={setToggleTheme} />
        <Feed toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};

export default HomePage;
