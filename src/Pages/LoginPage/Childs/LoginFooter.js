import React from "react";
import LoginAvatar from "../../../Images/login-avatar2.jpg";
import Logo from "../../../Images/blue-logo.svg";

const LoginFooter = () => {
  return (
    <section className="svg  flex justify-center md:bg-white w-full md:h-[50%] h-full bg-algoBlue ">
      <div className="md:w-[50%] px-10 lg:px-28  bg-white h-fit">
        <div className=" flex justify-center items-center mt-10 mb-5">
          <img src={Logo} alt="" className="h-14 w-14" />
          <h1 className="text-algoBlue text-[2rem] font-bold text-center font-alkatra pt-2">
            SameBook
          </h1>
        </div>

        <p className="font-alkatra text-algoBlue text-center pb-10 md:pb-0">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          est obcaecati, tempora dolores esse perspiciatis deleniti similique
          repellendus, porro commodi quas molestias repudiandae deserunt harum
          fugiat laudantium dicta ex autem.
        </p>
      </div>
      <div className="w-[50%] hidden lg:block">
        <img src={LoginAvatar} alt="Avatar" className="h-full w-full " />
      </div>
    </section>
  );
};

export default LoginFooter;
