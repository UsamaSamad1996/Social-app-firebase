import React from "react";
import CircularLoader from "../../../../../Assets/CircularLoader";

const ShowUploadFile = ({ file, postImageUrl, progressPercent }) => {
  return (
    <section className=" border-[1px] border-fbBgGray p-1 rounded-md flex flex-col">
      <div>
        {file || postImageUrl ? (
          <p className="text-[11px]">
            {progressPercent === 100
              ? "Picture Upload Successfully"
              : "Uploading...."}
          </p>
        ) : null}
      </div>

      <div>
        {!file && postImageUrl ? (
          <img src={postImageUrl} alt="uploaded file" height={200} />
        ) : file && !postImageUrl ? (
          <div className="w-full bg-fbBgGray rounded-md flex flex-col items-center justify-center py-20 flex-auto text-black font-semibold text-lg">
            <CircularLoader />
          </div>
        ) : (
          <div className="w-full bg-fbBgGray rounded-md flex flex-col items-center justify-center py-14 flex-auto text-black font-semibold text-lg">
            <p className="h-10 w-10 bg-white text-black flex justify-center items-center rounded-full text-4xl font-bold pb-1">
              +
            </p>
            <p> Add Photos/Videos</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowUploadFile;
