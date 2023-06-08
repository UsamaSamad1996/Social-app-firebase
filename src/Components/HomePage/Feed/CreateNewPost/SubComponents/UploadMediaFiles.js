import React from "react";
import Photo from "../../../../../Images/upload-photo-icon-gray.svg";

const UploadMediaFiles = ({ setFile }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <section className="border-[1px] my-3 border-fbBgGray rounded-md flex items-center px-2 py-1 mx-3 justify-between shadow-[0px_0px_8px_0px_#a69999AD]">
      <p className="pl-3 font-base font-semibold">Add to your post</p>
      <div>
        <label
          htmlFor="video"
          className="h-9 px-5 my-1  bg-transparent text-fbText text-sm font-semibold rounded-md flex items-center justify-center  transition-all hover:bg-slate-200 hover:cursor-pointer "
        >
          <img src={Photo} alt="" className="h-4 mr-2" />
          <p className="pb-[2px] "> Video/Photo</p>
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          id="video"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
    </section>
  );
};

export default UploadMediaFiles;
