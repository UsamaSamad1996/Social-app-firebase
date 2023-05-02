import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../../Images/usama.jpg";
import CheckIcon from "../../Images/check-icon.svg";
import DottedMenu from "../../Images/dotted-menu9.svg";
import DottedMenuBlack from "../../Images/dotted-menu9Black.svg";
import DeleteIcon from "../../Images/delete-icon.svg";
import PencilIcon from "../../Images/edit-pencil-icon.svg";

const PostHeader = ({ post, postUser, handleDelete, setIsDeleting }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { toggleTheme, user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const deletePost = () => {
    setIsDeleting(true);
    if (post?.userId === user?.uid) {
      handleDelete(post?.id);
      setIsDeleting(false);
    } else {
      alert("invalid action occurs");
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex mb-2 flex-auto items-center relative">
      <section className="flex items-center flex-auto p-0 m-0">
        <Link to={`/user-profile/${post?.userId}`}>
          <img
            className="h-[45px] w-[45px] rounded-full object-cover object-center border-[3px] border-purpleBlue bg-algoBlue"
            src={Avatar}
            alt="no poster"
          />
        </Link>
        <p
          className={`text-base font-semibold pl-3 pr-5 mb-1 leading-5 relative
          ${toggleTheme ? "text-algoBlue" : "text-white"}`}
        >
          {postUser?.User_Name}
          <br />
          <span
            className={`text-[12px] font-normal   ${
              toggleTheme ? "text-fbText" : "text-white"
            } `}
          >
            {formatDistanceToNow(new Date(post.created_at), {
              addSuffix: true,
            })}
          </span>
          <img
            src={CheckIcon}
            alt=""
            className="h-[14px] absolute top-[4px] right-0"
          />
        </p>
      </section>
      <section>
        <img
          src={toggleTheme ? DottedMenuBlack : DottedMenu}
          alt=""
          className="h-4 mr-1 hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </section>
      {isOpen && (
        <div
          className={`${
            toggleTheme
              ? "bg-IconGray text-white drop-shadow-2xl"
              : "bg-algoBlueTwo text-white"
          }  absolute text-black top-[28px] right-[17px] p-2 rounded-md rounded-tr-none flex flex-col gap-2`}
        >
          {post?.userId === user?.uid && (
            <>
              <button
                onClick={deletePost}
                className="w-[130px] py-2 bg-transparent hover:text-white font-semibold text-sm tracking-wide  hover:bg-purpleBlue hover:scale-105 rounded-sm flex items-center justify-start pl-3"
              >
                <img src={DeleteIcon} alt="" className="h-4 mr-2" />
                Delete Post
              </button>
              <button className="w-[130px] py-2 bg-transparent hover:text-white font-semibold text-sm tracking-wide  hover:bg-purpleBlue hover:scale-105 rounded-sm flex items-center justify-start pl-3">
                <img src={PencilIcon} alt="" className="h-4 mr-2" />
                Edit Post
              </button>
            </>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="w-[130px] py-2 bg-transparent hover:text-white font-semibold text-sm tracking-wide  hover:bg-purpleBlue hover:scale-105 rounded-sm flex items-center justify-start pl-3"
          >
            <img src={DeleteIcon} alt="" className="h-4 mr-2" />
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default PostHeader;
