import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../Images/home-icon.svg";
import Avatar from "../Images/userAvatar.svg";
import SearchIcon from "../Images/search-icon.svg";
import DottedMenu from "../Images/dotted-menu9.svg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { logout } from "../ReduxToolkit/userSlice";
import { useDispatch } from "react-redux";
import Logo from "../Images/purpleblue-logo.svg";
import NotificationIcon from "../Images/notification.svg";

const Navbar = () => {
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
    <div className="BodyofTopBar flex items-center justify-center bg-algoBlue px-10 h-[80px] fixed top-0 left-0 right-0 z-10">
      <div className="wrapper h-full w-full flex items-center">
        <div className=" ml-6 px-1  text-3xl tracking-wide font-semibold font-alkatra  text-purpleBlue  flex items-center h-full">
          <img src={Logo} alt="logo" />
          <Link to="/">
            <h1 className="pt-2">SameBook</h1>
          </Link>
        </div>

        <div className="flex items-center  flex-auto  h-full ml-10 px-5 ">
          <input
            className="w-full rounded-full px-5 py-1 placeholder-slate-500"
            type="search"
            placeholder="Search friends & posts"
          />
          <img src={SearchIcon} alt="" className="ml-[-40px] " />
        </div>

        <div className=" flex justify-between md:justify-evenly items-center flex-auto  h-full">
          <div className="homeIcon hidden md:flex md:items-center relative  h-full px-2">
            <img
              src={HomeIcon}
              alt=""
              className="h-[35px] hover:cursor-pointer"
            />
            <p className="text-white text-center  bg-red-500 rounded-full h-[15px] w-[15px] text-[10px] flex items-center justify-center absolute top-5 right-1 z-10">
              2
            </p>
          </div>

          <div className="homeIcon hidden md:flex md:items-center relative  h-full px-2">
            <img
              src={NotificationIcon}
              alt=""
              className="h-[40px] hover:cursor-pointer"
            />
            <p className="text-white text-center  bg-red-500 rounded-full h-[15px] w-[15px] text-[10px] flex items-center justify-center absolute top-5 right-2 z-10">
              6
            </p>
          </div>
          <div className="homeIcon hidden md:flex md:items-center relative  h-full px-2">
            <img
              src={DottedMenu}
              alt=""
              className="h-[30px] hover:cursor-pointer"
              onClick={logOut}
            />
          </div>
          <Link to="">
            <div className="accountIcon pl-20 md:pl-0">
              <img
                className="h-[40px]  rounded-full  bg-algoBlue "
                src={Avatar}
                alt="no poster"
              />
            </div>
          </Link>
          {/* this is the div of options Contain Logout PopOver on TopBar End*/}
          {/* <div className="logout  md:flex md:ml-[-20px] md:mr-[-20px]">
          {match ? (
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon
                  style={{
                    fontSize: "2.5rem",
                  }}
                  className="text-white text-2xl "
                />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={popover}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={logOut}>LogOut</MenuItem>
              </Menu>
            </div>
          ) : (
            ""
          )}
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
