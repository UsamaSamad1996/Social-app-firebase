import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../../Images/userAvatar.svg";

const PostHeader = ({ post, postUser }) => {
  const { toggleTheme } = useSelector((state) => state.user);

  return (
    <div className="shareTop flex px-4 pt-1 md:p-2 mb-2 flex-auto items-center">
      <Link to={`/user-profile/${post?.userId}`}>
        <img
          className="h-[40px] w-[40px] rounded-full object-cover border-2 border-slate-400 bg-algoBlue"
          src={Avatar}
          alt="no poster"
        />
      </Link>

      {/* username, blue tick, post date */}
      <p
        className={`text-base font-semibold pl-3 mb-1 leading-5 pt-2 ${
          toggleTheme ? "text-algoBlue" : "text-white"
        }`}
      >
        {postUser?.User_Name}
        <span>
          {/* {" "}
    <CheckIcon
      style={{ fontSize: "0.9rem" }}
      className="bg-blue-600 text-white rounded-full mb-[5px]"
    /> */}
        </span>
        <br />{" "}
        <span className="text-[12px] font-normal">
          {formatDistanceToNow(new Date(post.created_at), {
            addSuffix: true,
          })}
        </span>
      </p>
      {/* post delete button */}
      {/* {user._id === post.userId ? (
  <div className="deletePost flex flex-auto justify-end relative">
    <Button
      id="basic-button"
      aria-controls={open ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
    >
      <MoreVertIcon
        style={{ fontSize: "2rem" }}
        className="text-black hover:cursor-pointer"
      />
    </Button>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem className="absolute" onClick={deletePost}>
        Delete Post
      </MenuItem>
    </Menu>
  </div>
) : (
  ""
)} */}
    </div>
  );
};

export default PostHeader;
