import React from "react";
import { useSelector } from "react-redux";
// import WhiteBackground from "../../Images/white-wall.jpg";

const PostBody = ({ post }) => {
  const { toggleTheme } = useSelector((state) => state.user);
  return (
    <div>
      {post.img ? (
        <div>
          <div className="description pl-4 pr-6 mb-2 md:mb-1 mt-5 md:mt-3 md:pl-2 md:pr-5 md:pb-2 text-[16px]  break-words">
            <p>{post?.postContent}</p>
          </div>

          <div className="image ">
            <img
              className="object-fill bg-black"
              style={{ height: "70%", width: "100%" }}
              src={post.img}
              alt="File Not Supported"
            />
          </div>
        </div>
      ) : (
        <div
          className={`pl-4 pr-6 mb-4 md:mb-0 mt-5  md:pl-5 md:pr-5 md:py-4 text-[16px] break-words min-h-[20rem] h-[20rem] scrollbar-thin group-hover:scrollbar-thumb-gray-400 rounded-md overflow-y-auto ease-in-out transition-all duration-1000  ${
            toggleTheme
              ? "shadow-[0px_0px_10px_0px_#a69999AD] text-black"
              : "shadow-[0px_0px_12px_3px_#000000] text-white"
          }`}
        >
          <p>{post?.postContent}</p>
        </div>
      )}
    </div>
  );
};

export default PostBody;
