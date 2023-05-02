import React from "react";
import Avatar from "../../Images/home-icon-copy.svg";
import { useDispatch, useSelector } from "react-redux";
import Usama from "../../Images/usama.jpg";
import { Link } from "react-router-dom";
import { setToggleTheme } from "../../ReduxToolkit/userSlice";

const LeftSideBar = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const { user, userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="hidden md:flex fixed w-[25%] h-[88vh] group">
      <div className="sidebarwrapper group  overflow-y-auto scroll-smooth scrollbar-thin group-hover:scrollbar-track-white group-hover:scrollbar-thumb-[#15314B4D] w-full ">
        <ul className="sideBarList">
          <Link to={`/user-profile/${user?.uid}/${userData?.User_Name}`}>
            <li className="sideBarItem group flex items-center pt-4 pb-2 px-2  hover:bg-algoBlue hover:text-white hover:cursor-pointer transition-all hover:bg-opacity-90">
              <img
                className="h-[41px] w-[40px] rounded-full object-cover border-2 border-algoBlue bg-algoBlue group-hover:border-white"
                src={Usama}
                alt="no poster"
              />
              <span className="pl-4 text-base font-alkatra tracking-wide pt-2">
                {userData?.User_Name}
              </span>
            </li>
          </Link>
          <li
            onClick={() => dispatch(setToggleTheme(true))}
            className="sideBarItem py-3 flex items-center px-4 hover:bg-algoBlue hover:text-white hover:cursor-pointer transition-all hover:bg-opacity-90"
          >
            <img src={Avatar} alt="avatar" className="h-6 w-6" />
            <span className="pl-6 text-base font-alkatra tracking-wide pt-2">
              Light Theme
            </span>
          </li>
          <li
            onClick={() => dispatch(setToggleTheme(false))}
            className="sideBarItem py-3 flex items-center px-4 hover:bg-algoBlue hover:text-white hover:cursor-pointer transition-all hover:bg-opacity-90"
          >
            <img src={Avatar} alt="avatar" className="h-6 w-6" />
            <span className="pl-6 text-base font-alkatra tracking-wide pt-2">
              Dark Theme
            </span>
          </li>
          <li className="sideBarItem py-3 flex items-center px-4 hover:bg-algoBlue hover:text-white hover:cursor-pointer transition-all hover:bg-opacity-90">
            <img src={Avatar} alt="avatar" className="h-6 w-6" />
            <span className="pl-6 text-base font-alkatra tracking-wide pt-2">
              Watch Videos
            </span>
          </li>
          <li className="sideBarItem py-3 flex items-center px-4 hover:bg-algoBlue hover:text-white hover:cursor-pointer transition-all hover:bg-opacity-90">
            <img src={Avatar} alt="avatar" className="h-6 w-6" />
            <span className="pl-6 text-base font-alkatra tracking-wide pt-2">
              Friends
            </span>
          </li>
          <li className="sideBarItem py-3 flex items-center px-4 hover:bg-algoBlue hover:text-white hover:cursor-pointer transition-all hover:bg-opacity-90">
            <img src={Avatar} alt="avatar" className="h-6 w-6" />
            <span className="pl-6 text-base font-alkatra tracking-wide pt-2">
              BookMarks
            </span>
          </li>
          <li className="sideBarItem py-3 flex items-center px-4 hover:bg-algoBlue hover:text-white hover:cursor-pointer transition-all hover:bg-opacity-90">
            <img src={Avatar} alt="avatar" className="h-6 w-6" />
            <span className="pl-6 text-base font-alkatra tracking-wide pt-2">
              Questions
            </span>
          </li>
          <li className="sideBarItem py-3 flex items-center px-4 hover:bg-algoBlue hover:text-white hover:cursor-pointer transition-all hover:bg-opacity-90">
            <img src={Avatar} alt="avatar" className="h-6 w-6" />
            <span className="pl-6 text-base font-alkatra tracking-wide pt-2">
              Jobs
            </span>
          </li>
          <li className="sideBarItem py-3 flex items-center px-4 hover:bg-algoBlue hover:text-white hover:cursor-pointer transition-all hover:bg-opacity-90">
            <img src={Avatar} alt="avatar" className="h-6 w-6" />
            <span className="pl-6 text-base font-alkatra tracking-wide pt-2">
              Events
            </span>
          </li>
          <li className="sideBarItem py-3 flex items-center px-4 hover:bg-algoBlue hover:text-white hover:cursor-pointer transition-all hover:bg-opacity-90">
            <img src={Avatar} alt="avatar" className="h-6 w-6" />
            <span className="pl-6 text-base font-alkatra tracking-wide pt-2">
              Feed
            </span>
          </li>
          <li className="sideBarItem py-3 flex items-center px-4 hover:bg-algoBlue hover:text-white hover:cursor-pointer transition-all hover:bg-opacity-90">
            <img src={Avatar} alt="avatar" className="h-6 w-6" />
            <span className="pl-6 text-base font-alkatra tracking-wide pt-2">
              Market
            </span>
          </li>
          <li className="sideBarItem py-3 flex items-center px-4 hover:bg-algoBlue hover:text-white hover:cursor-pointer transition-all hover:bg-opacity-90">
            <img src={Avatar} alt="avatar" className="h-6 w-6" />
            <span className="pl-6 text-base font-alkatra tracking-wide pt-2">
              Chats
            </span>
          </li>
          <li className="sideBarItem py-3 flex items-center px-4 hover:bg-algoBlue hover:text-white hover:cursor-pointer transition-all hover:bg-opacity-90">
            <img src={Avatar} alt="avatar" className="h-6 w-6" />
            <span className="pl-6 text-base font-alkatra tracking-wide pt-2">
              Play Games
            </span>
          </li>
        </ul>

        <div className="button flex items-center justify-center my-4 ">
          <button className="py-1 px-5  bg-algoBlue text-white text-lg font-alkatra tracking-wide pt-2 rounded-md mb-3">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
