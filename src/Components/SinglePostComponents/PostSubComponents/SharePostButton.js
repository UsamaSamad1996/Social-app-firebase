import React from "react";
import { useSelector } from "react-redux";

const SharePostButton = () => {
  const { toggleTheme } = useSelector((state) => state.user);

  return (
    <>
      <button
        className={`pt-2 px-4 hover:opacity-70 text-[15px] font-semibold rounded-md ${
          toggleTheme ? "text-slate-500" : "text-white"
        } `}
      >
        Share
      </button>
    </>
  );
};

export default SharePostButton;
