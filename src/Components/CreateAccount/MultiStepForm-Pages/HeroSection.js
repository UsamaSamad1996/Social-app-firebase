import React from "react";
import Logo from "../../../Images/blue-logo.svg";
import Avatar from "../../../Images/login-avatar.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="LeftContainer h-full w-[28%] bg-contain bg-center bg-no-repeat bg-white  flex flex-col">
      <section className=" h-[25%] flex justify-center items-center ">
        <img src={Logo} alt="" className="h-14 w-14" />
        <h1 className="text-algoBlue pt-2  text-[2rem] font-semibold   font-alkatra">
          SameBook
        </h1>
      </section>
      <section className="pl-7 flex justify-center items-end w-full">
        <img src={Avatar} alt="avatar" className="max-h-[25rem] " />
      </section>
      <section className="flex justify-center items-start w-full h-[15%] ">
        <button
          onClick={() => navigate("/login-page")}
          className="w-4/5 py-2 bg-algoBlue rounded-sm text-white text-center hover:scale-110 transition-all font-semibold border-none outline-none"
        >
          Login
        </button>
      </section>
    </div>
  );
};

export default HeroSection;
