import React, { useState } from "react";
import Avatar from "../../Images/userAvatar.svg";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const CreateNewPost = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { user } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.user);
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState(null);
  const [isSharing, setIsSharing] = useState(false);

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

    const myPost = {
      postContent,
      file,
      id: nanoid(),
      created_at: date,
      userId: user?.uid,
    };

    const posts = doc(db, "posts", user?.uid);
    try {
      await updateDoc(posts, {
        posts: arrayUnion(myPost),
      });
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
      <div className="shareBox flex flex-col md:p-5 py-5 border-2 border-slate-300 rounded-lg md:my-5 mb-4  bg-white shadow-[8px_7px_6px_0px_#a69999AD]">
        <form onSubmit={handleSubmit}>
          <div className="shareTop flex px-4 md:p-2 mt-2 md:mt-0 mb-4 md:mb-2 flex-auto items-center">
            {/* <Link to={`/Profile/${user._id}`}> */}{" "}
            <img
              className="h-[41px] w-[40px] rounded-full object-cover border-2 border-algoBlue  bg-algoBlue"
              src={Avatar}
              alt="no poster"
            />
            {/* </Link> */}
            {/* Create Post Text Input Field */}
            <textarea
              className="md:w-full rounded-3xl p-3 ml-3 md:ml-5 bg-slate-200 placeholder-slate-600 focus:h-40 hover:outline-none  outline-none"
              name="post"
              type="text"
              placeholder={`Whats on your mind ${userData.User_Name}? Post Here!`}
              value={postContent || ""}
              onChange={(e) => setPostContent(e.target.value)}
              rows={1}
              cols={50}
              maxLength={1000}
              required
            />
          </div>

          <hr />

          {/*  Buttons Div  */}

          <div className="sharebottom flex pt-3 flex-wrap flex-auto items-center justify-evenly">
            {/* pictures uploading button  */}
            <div className="py-1 px-2 my-1  bg-blue-500 text-white text-lg font-semibold rounded-md flex items-center cursor-pointer">
              <label htmlFor="file" className="cursor-pointer">
                {/* <WallpaperIcon /> */}
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png, .jpeg, .jpg, .mp3"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <span className="pl-2 ">Photo</span>
              </label>
            </div>
            {/* Videos uploading Button */}
            <div className="py-1 px-2 my-1  bg-blue-500 text-white text-lg font-semibold rounded-md flex items-center">
              <label htmlFor="file" className="cursor-pointer">
                {/* <PermMediaIcon /> */}
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".mp4"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <span className="pl-2 ">Video</span>
              </label>
            </div>
            {/* Songs uploading Button */}
            <div className="py-1 px-2 my-1  bg-blue-500 text-white text-lg font-semibold rounded-md flex items-center">
              {/* <MusicNoteIcon /> */}
              <label htmlFor="file" className="cursor-pointer">
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".mp3"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <span className="pl-2 ">Songs</span>
              </label>
            </div>
            {/* Post Share Button */}
            <button
              type="submit"
              className="py-1 px-2 my-1  bg-green-400 text-white text-lg font-semibold rounded-md flex items-center"
            >
              {isSharing ? (
                <div className="flex items-center justify-center">
                  {/* <CircularProgress color="success" size="25px" /> */}
                  <p className="pl-2 ">Sharing</p>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {/* <SendIcon /> */}
                  <p className="pl-2 ">Share</p>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPost;
