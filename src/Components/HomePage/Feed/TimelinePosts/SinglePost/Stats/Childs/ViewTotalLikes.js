import React from "react";
import { useSelector } from "react-redux";
import LikesImage from "../../../../../../../Images/likes.png";
import Heart from "../../../../../../../Images/hearts.png";
import LOL from "../../../../../../../Images/lol.png";

const ViewTotalLikes = ({ numberOfLikes, likes }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { toggleTheme } = useSelector((state) => state.user);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex ml-2 items-center justify-center">
      {likes?.length > 0 ? (
        <div className="flex ml-2 md:ml-0">
          <img
            className="h-4 w-4 rounded-full object-fill "
            src={LikesImage}
            alt="Likes"
          />
          <img
            className="h-4 w-4 rounded-full object-fill "
            src={Heart}
            alt="Hearts"
          />
        </div>
      ) : (
        <div className="flex ml-2 md:ml-0">
          <img className="h-5 w-5 my-0 object-fill " src={LOL} alt="Hearts" />
        </div>
      )}

      <p
        className={`pl-2 text-[13px] ${
          toggleTheme ? "text-slate-500" : "text-white"
        }`}
      >
        {numberOfLikes}
      </p>
    </div>
  );
};

export default ViewTotalLikes;
