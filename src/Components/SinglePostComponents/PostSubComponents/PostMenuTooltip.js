import React from "react";
import { useSelector } from "react-redux";
import DeleteIconWhite from "../../../Images/delete-icon-white.svg";
import DeleteIconBlack from "../../../Images/delete-icon-black.svg";
import PencilIconWhite from "../../../Images/edit-pencil-icon-white.svg";
import PencilIconBlack from "../../../Images/edit-pencil-icon-black.svg";
import CrossWhite from "../../../Images/cross-icon-white.svg";
import CrossGray from "../../../Images/cross-icon-gray.svg";

const PostMenuTooltip = ({ post, setIsOpen, deletePost }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { toggleTheme, user } = useSelector((state) => state.user);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div
      className={`${
        toggleTheme ? "bg-white text-fbText " : "bg-algoBlueTwo text-white"
      }  absolute text-black top-[28px] right-[17px] p-2 rounded-md rounded-tr-none flex flex-col gap-2 drop-shadow-xl`}
    >
      {post?.userId === user?.uid && (
        <>
          <button
            onClick={deletePost}
            className={`w-[130px] py-2 bg-transparent font-semibold text-sm tracking-wide ${
              !toggleTheme && "hover:bg-purpleBlue"
            }  hover:scale-105 rounded-sm flex items-center justify-start pl-3`}
          >
            <img
              src={toggleTheme ? DeleteIconBlack : DeleteIconWhite}
              alt=""
              className="h-4 mr-2"
            />
            Delete Post
          </button>
          <button
            className={`w-[130px] py-2 bg-transparent font-semibold text-sm tracking-wide ${
              !toggleTheme && "hover:bg-purpleBlue"
            }  hover:scale-105 rounded-sm flex items-center justify-start pl-3`}
          >
            <img
              src={toggleTheme ? PencilIconBlack : PencilIconWhite}
              alt=""
              className="h-4 mr-2"
            />
            Edit Post
          </button>
        </>
      )}
      <button
        onClick={() => setIsOpen(false)}
        className={`w-[130px] py-2 bg-transparent font-semibold text-sm tracking-wide ${
          !toggleTheme && "hover:bg-purpleBlue"
        }  hover:scale-105 rounded-sm flex items-center justify-start pl-3`}
      >
        <img
          src={toggleTheme ? CrossGray : CrossWhite}
          alt=""
          className="h-[14px] mr-2"
        />
        Close
      </button>
    </div>
  );
};

export default PostMenuTooltip;
