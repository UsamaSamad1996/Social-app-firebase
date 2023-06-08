import React from "react";
import Avatar from "../../../../Images/userAvatarBlue.svg";
import OpenNewPostModal from "./SubComponents/OpenNewPostModal";
import { useState } from "react";
import { useSelector } from "react-redux";

const CreateNewPost = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { toggleTheme, userData } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div
      className={`w-[500px] flex flex-col md:px-5 md:pt-5 md:pb-3 py-5 border-2 border-slate-300 rounded-lg md:my-5 mb-4 shadow-[8px_7px_6px_0px_#a69999AD] ease-in-out transition-all duration-1000 ${
        toggleTheme ? "bg-white" : "bg-algoBlue"
      }`}
    >
      <section className="shareTop flex mt-2 md:mt-0 mb-4 md:mb-2 flex-auto items-center">
        <img
          className={`h-[45px] w-[45px] rounded-full object-cover object-center border-[3px] bg-algoBlue ${
            toggleTheme ? "border-purpleBlue" : "border-white"
          } `}
          src={Avatar}
          alt="no poster"
        />

        <button className="md:w-full h-full rounded-full px-[12px] py-[8px] ml-3 md:ml-5 bg-slate-100 text-[17px] text-start text-slate-500">
          What's on your mind, {userData?.User_Name}{" "}
        </button>
      </section>

      <div>
        {isModalOpen && <OpenNewPostModal setIsModalOpen={setIsModalOpen} />}
      </div>

      <div>
        <button onClick={() => setIsModalOpen(true)}>Photo</button>
      </div>
    </div>
  );
};

export default CreateNewPost;
