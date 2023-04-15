import React from "react";
import Navbar from "../Components/Navbar";
import Feed from "../Components/Timeline_Components/Feed";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />

      <div className="mt-20">
        <h1 className="text-3xl p-5">Welcome {userData?.User_Name}</h1>
      </div>
      <div className="mt-20">
        <Feed />
      </div>
    </div>
  );
};

export default HomePage;
