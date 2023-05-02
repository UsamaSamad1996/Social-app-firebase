import React from "react";
import { useSelector } from "react-redux";

const LikeUnlikeButton = ({ handleLikes, post, isLike }) => {
  const { toggleTheme } = useSelector((state) => state.user);

  return (
    <div>
      <button
        onClick={() => handleLikes(post?.id)}
        className={`pt-2 px-4 ${
          isLike
            ? "text-purpleBlue"
            : toggleTheme
            ? "text-slate-500"
            : "text-white"
        } text-[15px] font-semibold rounded-md hover:opacity-70`}
      >
        {isLike ? "Liked" : "Like"}
      </button>
    </div>
  );
};

export default LikeUnlikeButton;
