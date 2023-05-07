import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../../Images/usama.jpg";
import CheckIcon from "../../Images/check-icon.svg";
import DottedMenuWhite from "../../Images/dotted-menu-white.svg";
import DottedMenuBlack from "../../Images/dotted-menu-black.svg";
import PostMenuTooltip from "./PostSubComponents/PostMenuTooltip";

const PostHeader = ({ post, postUser, handleDelete }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { toggleTheme, user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const deletePost = () => {
    if (post?.userId === user?.uid) {
      handleDelete(post?.id);
    } else {
      alert("invalid action occurs");
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex mb-2 flex-auto items-center relative ease-in-out transition-all duration-1000">
      <section className="flex items-center flex-auto p-0 m-0">
        <Link to={`/user-profile/${post?.userId}`}>
          <img
            className={`h-[45px] w-[45px] rounded-full object-cover object-center border-[3px] bg-algoBlue ${
              toggleTheme ? "border-purpleBlue" : "border-white"
            } `}
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
          src={toggleTheme ? DottedMenuBlack : DottedMenuWhite}
          alt=""
          className="h-4 mr-1 hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </section>

      {isOpen && (
        <PostMenuTooltip
          post={post}
          setIsOpen={setIsOpen}
          deletePost={deletePost}
        />
      )}
    </div>
  );
};

export default PostHeader;
