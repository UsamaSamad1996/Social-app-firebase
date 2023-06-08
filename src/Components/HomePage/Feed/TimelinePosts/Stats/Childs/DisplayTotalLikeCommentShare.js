import React from "react";
import { useSelector } from "react-redux";

const DisplayTotalLikeCommentShare = ({ likes }) => {
  const { toggleTheme } = useSelector((state) => state.user);

  return (
    <div
      className={`counts flex flex-grow justify-end items-center text-[13px] ${
        toggleTheme ? "text-slate-500" : "text-white"
      }`}
    >
      <p>{Math.round(Math.random() * 10)} Comments</p>

      <p className="ml-5 ">
        {likes?.length > 0 ? `${likes?.length} Likes` : "No Like"}
      </p>
      <p className="ml-5 mr-5">{Math.round(Math.random() * 10)} Shares</p>
    </div>
  );
};

export default DisplayTotalLikeCommentShare;
