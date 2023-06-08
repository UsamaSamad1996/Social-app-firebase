import React from "react";
import { useSelector } from "react-redux";

const SharePostButton = () => {
  const { toggleTheme } = useSelector((state) => state.user);

  return (
    <>
      <button
        className={`w-[120px] py-2 px-4 text-[15px] font-semibold rounded-md hover:opacity-80 ${
          toggleTheme ? "text-fbText hover:bg-slate-100 " : "text-white"
        } `}
      >
        Share
      </button>
    </>
  );
};

export default SharePostButton;
