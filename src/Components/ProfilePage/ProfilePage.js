import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const ProfilePage = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { id, name } = useParams();
  console.log({ id });
  console.log({ name });

  return (
    <div>
      <Navbar />

      <h1 className="mt-[80px] ">Profile</h1>
    </div>
  );
};

export default ProfilePage;
