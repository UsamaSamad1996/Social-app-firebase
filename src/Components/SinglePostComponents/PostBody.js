import React from "react";
import { useSelector } from "react-redux";

const PostBody = ({ post }) => {
  const { toggleTheme } = useSelector((state) => state.user);

  return (
    <div>
      {post?.postImageUrl ? (
        <>
          <p className="description pl-4 pr-6 mb-2 md:mb-1 mt-5 md:mt-3 md:pl-2 md:pr-5 md:pb-2 text-[16px]  break-words">
            {post?.postContent}
          </p>
          <img
            className="object-fill bg-transparent"
            style={{ height: "70%", width: "100%" }}
            src={post?.postImageUrl}
            alt="File Not Supported"
          />
        </>
      ) : (
        <p
          className={`pl-4 pr-6 mb-4 md:mb-0 mt-5  md:pl-5 md:pr-5 md:py-4 text-[16px] break-words min-h-[20rem] h-[20rem] scrollbar-thin group-hover:scrollbar-thumb-gray-400 rounded-md overflow-y-auto ease-in-out transition-all duration-1000  ${
            toggleTheme
              ? "shadow-[0px_0px_10px_0px_#a69999AD] text-black"
              : "shadow-[0px_0px_12px_3px_#000000] text-white"
          }`}
        >
          {post?.postContent}
        </p>
      )}
    </div>
  );
};

export default PostBody;
