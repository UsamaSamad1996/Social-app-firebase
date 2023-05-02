import React from "react";
import { useSelector } from "react-redux";

const DeletePostButton = ({ post, handleDelete }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { user, toggleTheme } = useSelector((state) => state.user);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const deletePost = () => {
    post?.userId === user?.uid
      ? handleDelete(post?.id)
      : alert("comments will open soon");
  };

  return (
    <div>
      <button
        onClick={deletePost}
        className={`pt-2 px-4  hover:opacity-70 text-[15px] font-semibold rounded-md ${
          toggleTheme ? "text-slate-500" : "text-white"
        }`}
      >
        {post?.userId === user?.uid ? "Delete" : "Comment"}
      </button>
    </div>
  );
};

export default DeletePostButton;
