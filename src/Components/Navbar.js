import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../Images/home-icon.svg";
import Avatar from "../Images/usama.jpg";
import SearchIcon from "../Images/search-icon.svg";
import DottedMenuWhite from "../Images/dotted-menu-white.svg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { logout, setToggleTheme } from "../ReduxToolkit/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../Images/purpleblue-logo.svg";
import NotificationIcon from "../Images/notification.svg";
import ToggleSwitch from "../Assets/ToggleSwitch";

const Navbar = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { user } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const logOut = () => {
    signOut(auth)
      .then((user) => {
        dispatch(logout(user));
        localStorage.removeItem("user");
      })
      .catch((error) => {});
  };
  return (
    <div className="BodyofTopBar flex items-center justify-center bg-algoBlue pl-10 h-[80px] fixed top-0 left-0 right-0 z-10 ease-in-out transition-all duration-1000">
      <div className="wrapper h-full w-full flex items-center">
        <div className=" ml-6 px-1  text-3xl tracking-wide font-semibold font-alkatra  text-purpleBlue  flex items-center h-full  w-[25%] ">
          <img src={Logo} alt="logo" />
          <Link to="/">
            <h1 className="pt-2 text-white">SameBook</h1>
          </Link>
        </div>

        <section className="flex items-center   h-full px-5  flex-auto w-[45%] ">
          <input
            className="w-full rounded-full px-5 py-[5px] placeholder-slate-500"
            type="search"
            placeholder="Search friends & posts"
          />
          <img src={SearchIcon} alt="" className="ml-[-40px] " />
        </section>

        <section className=" flex justify-between md:justify-evenly items-center flex-auto h-full w-[30%]">
          <div className="homeIcon hidden md:flex md:items-center relative bg-purpleBlue rounded-full ease-in-out transition-all duration-1000 md:justify-center hover:cursor-pointer">
            <ToggleSwitch />
          </div>

          <Link to="/">
            <div className="homeIcon hidden md:flex md:items-center relative bg-purpleBlue rounded-full h-[40px] w-[40px] md:justify-center hover:cursor-pointer">
              <img src={HomeIcon} alt="" className="h-[25px]" />
              <p className="text-white text-center bg-red-500 rounded-full h-[13px] w-[13px] text-[10px] flex items-center justify-center absolute top-[-2px] right-[-2px] z-10">
                2
              </p>
            </div>
          </Link>

          <div
            onClick={() => dispatch(setToggleTheme())}
            className="homeIcon hidden md:flex md:items-center relative bg-purpleBlue rounded-full h-[40px] w-[40px] md:justify-center hover:cursor-pointer"
          >
            <img src={NotificationIcon} alt="" className="h-[28px]" />
            <p className="text-white text-center  bg-red-500 rounded-full h-[13px] w-[13px] text-[10px] flex items-center justify-center absolute top-[-2px] right-[-2px] z-10">
              6
            </p>
          </div>

          <div
            onClick={logOut}
            className="homeIcon hidden md:flex md:items-center relative bg-purpleBlue rounded-full h-[40px] w-[40px] md:justify-center hover:cursor-pointer"
          >
            <img src={DottedMenuWhite} alt="" className="h-[22px]" />
          </div>

          <Link to={`/user-profile/${user?.uid}/${userData?.User_Name}`}>
            <div className="pl-20 md:pl-0">
              <img
                className="h-[45px] w-[45px] rounded-full object-cover object-center border-[3px] bg-algoBlue border-white"
                src={Avatar}
                alt="no poster"
              />
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
