import React from "react";
import { useSelector } from "react-redux";

const AddCommentButton = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const { toggleTheme } = useSelector((state) => state.user);
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <button
        onClick={() => alert("comment section will be open soon")}
        className={`w-[120px] py-2 px-4 text-[15px] font-semibold rounded-md hover:opacity-80 ${
          toggleTheme ? "text-fbText  hover:bg-slate-100 " : "text-white"
        }`}
      >
        Comment
      </button>
    </div>
  );
};

export default AddCommentButton;
