import React from "react";
import Navbar from "../Components/Navbar";
import Feed from "../Components/Timeline_Components/Feed";

const HomePage = () => {
  return (
    <div>
      <Navbar />

      <div className="mt-[60px] border-4 border-red-600">
        <Feed />
      </div>
    </div>
  );
};

export default HomePage;
