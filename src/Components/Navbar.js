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
    <div className="BodyofTopBar flex items-center bg-algoBlue px-4 py-4 fixed top-0 left-0 right-0 z-10">
      {/* TopBar Divided Into 3 Divisions - this is the 1st div of App LOGO */}
      <div className=" pl-7 md:pl-0 text-3xl tracking-wide font-bold font-alkatra flex-auto md:ml-10 text-purpleBlue">
        <Link to="/">SameBook</Link>
      </div>

      {/* TopBar Divided Into 3 Divisions - this is the 2nd div of Search Bar on TOpbar*/}
      <div className="hidden md:flex md:items-center md:flex-grow ">
        <input
          className="w-4/5 rounded-full h-9 px-5 placeholder-slate-500"
          type="search"
          placeholder="Search friends & posts"
        />
        <img src={SearchIcon} alt="" className="ml-[-40px] " />
      </div>

      {/* TopBar Divided Into 3 Divisions - This is The 3rd Div & Last also */}
      <div className=" flex justify-between md:justify-evenly items-center flex-auto">
        {/* this is the div of HomeIcon On TopBar */}
        <Link to="/">
          <div className="homeIcon hidden md:flex md:items-center  ">
            <img src={HomeIcon} alt="" />
            <p className="text-white text-center  bg-red-500 rounded-full h-4 w-4 text-[10px] ml-[-10px] mt-[-25px] z-10">
              2
            </p>
          </div>
        </Link>
        {/* this is the div of Notification Icon On TopBar */}
        <div className="notificationIcon hidden md:flex md:items-center">
          <img src={HomeIcon} alt="" />

          <p className="text-white text-center  bg-red-500 rounded-full h-4 w-4 text-[10px] ml-[-10px] mt-[-25px] z-10">
            1
          </p>
        </div>
        {/* this is the div of Chat Icon on TopBar */}
        <div className="chatIcon hidden md:flex md:items-center">
          <img
            src={DottedMenu}
            alt=""
            onClick={logOut}
            className="hover:cursor-pointer"
          />

          {/* <p className="text-white text-center  bg-red-500 rounded-full h-4 w-4 text-[10px] ml-[-10px] mt-[px] z-10">
            3
          </p> */}
        </div>
        {/* this is the div of Profile Icon Link To User Profile Page on Topbar*/}
        <Link to="">
          <div className="accountIcon pl-20 md:pl-0">
            <img
              className="h-[40px] w-[40px] rounded-full border-2 bg-algoBlue "
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
  );
};

export default Navbar;
