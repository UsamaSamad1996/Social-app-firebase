import React, { useState } from "react";
import Avatar from "../../Images/userAvatarBlue.svg";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Photo from "../../Images/photo.svg";
import SharePost from "../../Images/share.svg";
import CircularLoader from "../../Assets/CircularLoader";
import UploadMediaFiles from "../CreateNewPostComponents/UploadMediaFiles";

const CreateNewPost = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { user, toggleTheme, userData } = useSelector((state) => state.user);
  const [postContent, setPostContent] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [file, setFile] = useState(null);

  // console.log({ imgUrl });

  const date = new Date()
    .toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (AM|PM)/, "$1-$2-$3 $4:$5 $6");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSharing(true);
    const myPost = {
      postContent,
      imgUrl,
      id: nanoid(),
      created_at: date,
      userId: user?.uid,
    };

    const posts = doc(db, "posts", user?.uid);
    try {
      await updateDoc(posts, {
        posts: arrayUnion(myPost),
      });
      setPostContent("");
      setIsSharing(false);
      setFile(null);
      setImgUrl(null);
      await setDoc(doc(db, "likes", myPost?.id), {
        likes: [],
      });
    } catch (error) {
      console.log("create post error", error.message);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <div
        className={`w-[500px] flex flex-col md:px-5 md:pt-5 md:pb-3 py-5 border-2 border-slate-300 rounded-lg md:my-5 mb-4 shadow-[8px_7px_6px_0px_#a69999AD] ease-in-out transition-all duration-1000 ${
          toggleTheme ? "bg-white" : "bg-algoBlue"
        }`}
      >
        <form onSubmit={handleSubmit}>
          <div className="shareTop flex px-4 md:p-2 mt-2 md:mt-0 mb-4 md:mb-2 flex-auto items-start">
            <img
              className="h-[39px] w-[40px] rounded-full object-cover border-2  "
              src={Avatar}
              alt="no poster"
            />

            <textarea
              className="md:w-full h-full rounded-md p-3 ml-3 md:ml-5 bg-slate-100 placeholder-slate-600 focus:h-40 hover:outline-none  outline-none resize-none hover:resize text-sm placeholder:text-sm "
              name="post"
              type="text"
              placeholder={`Whats on your mind ${userData.User_Name}? Post Here!`}
              value={postContent || ""}
              onChange={(e) => setPostContent(e.target.value)}
              rows={1}
              cols={50}
              maxLength={2000}
              required
            />
          </div>

          <hr />

          <div className="sharebottom flex pt-3 flex-wrap flex-auto items-center justify-evenly">
            <div className="h-8 w-24 my-1  bg-algoBlue text-white text-sm font-semibold rounded-md flex items-center justify-center hover:scale-105 transition-all hover:opacity-70 ">
              <img src={Photo} alt="" className="h-4" />
              <label
                htmlFor="photo"
                className="cursor-pointer pl-2 pb-[2px] tracking-wide"
              >
                Photo
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="photo"
                accept=".mp4"
                // onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className="h-8 w-24 my-1  bg-algoBlue text-white text-sm font-semibold rounded-md flex items-center justify-center hover:scale-105 transition-all hover:opacity-70 ">
              <img src={Photo} alt="" className="h-4" />
              <label
                htmlFor="video"
                className="cursor-pointer pl-2 pb-[2px] tracking-wide"
              >
                Video
              </label>
              <UploadMediaFiles
                setImgUrl={setImgUrl}
                imgUrl={imgUrl}
                setProgresspercent={setProgresspercent}
                file={file}
                setFile={setFile}
              />
            </div>

            <div className="h-8 w-24 my-1  bg-algoBlue text-white text-sm font-semibold rounded-md flex items-center justify-center hover:scale-105 transition-all hover:opacity-70 ">
              <img src={Photo} alt="" className="h-4" />
              <label
                htmlFor="song"
                className="cursor-pointer pl-2 pb-[2px] tracking-wide"
              >
                Song
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="song"
                accept=".mp4"
                // onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <button
              disabled={isSharing}
              type="submit"
              className="h-8 w-24 my-1  bg-purpleBlue text-white text-sm font-semibold rounded-md flex items-center justify-center hover:scale-105 transition-all  disabled:bg-opacity-80 disabled:cursor-not-allowed"
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
                    Share
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

        <div>
          {!imgUrl && (
            <div className="outerbar bg-black p-2 w-full">
              <div
                className="innerbar bg-red-600 p-2 text-white"
                style={{ width: `${progresspercent}%` }}
              >
                {progresspercent}
              </div>
            </div>
          )}
          {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
        </div>
      </div>
    </div>
  );
};

export default CreateNewPost;
