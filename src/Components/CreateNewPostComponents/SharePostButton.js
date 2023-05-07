import React from "react";
import CircularLoader from "../../Assets/CircularLoader";
import SharePost from "../../Images/share.svg";

const SharePostButton = ({ isSharing, handleSubmit }) => {
  return (
    <button
      disabled={isSharing}
      onClick={handleSubmit}
      className="h-[38px] mx-3 bg-purpleBlue text-white text-base font-semibold rounded-md flex items-center justify-center hover:-translate-y-[2px] transition-all  disabled:bg-opacity-80 disabled:cursor-not-allowed "
    >
      {isSharing ? (
        <>
          <CircularLoader />{" "}
          <span className=" pb-[2px] pl-2 tracking-wide">Sharing</span>
        </>
      ) : (
        <>
          <img src={SharePost} alt="" className="h-4 pr-2" />
          <span className="cursor-pointer pb-[2px] tracking-wide">
            Share Post
          </span>
        </>
      )}
    </button>
  );
};

export default SharePostButton;
