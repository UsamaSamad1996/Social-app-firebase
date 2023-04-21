import React, { useState } from "react";
import Avatar from "../../Images/userAvatarBlue.svg";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Photo from "../../Images/photo.svg";
import SharePost from "../../Images/share.svg";
import CircularLoader from "../../Assets/CircularLoader";

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
    setIsSharing(true);
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
      setPostContent("");
      setIsSharing(false);
    } catch (error) {
      console.log("create post error", error.message);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <div className="shareBox flex flex-col md:px-5 md:pt-5 md:pb-3 py-5 border-2 border-slate-300 rounded-lg md:my-5 mb-4  bg-algoBlue shadow-[8px_7px_6px_0px_#a69999AD]">
        <form onSubmit={handleSubmit}>
          <div className="shareTop flex px-4 md:p-2 mt-2 md:mt-0 mb-4 md:mb-2 flex-auto items-start">
            {/* <Link to={`/Profile/${user._id}`}> */}{" "}
            <img
              className="h-[39px] w-[40px] rounded-full object-cover border-2  "
              src={Avatar}
              alt="no poster"
            />
            {/* </Link> */}
            {/* Create Post Text Input Field */}
            <textarea
              className="md:w-full h-full rounded-md p-3 ml-3 md:ml-5 bg-slate-100 placeholder-slate-600 focus:h-40 hover:outline-none  outline-none resize-none hover:resize "
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

          {/*  Buttons Div  */}

          <div className="sharebottom flex pt-3 flex-wrap flex-auto items-center justify-evenly">
            <div className="h-8 w-24 my-1  bg-algoBlue text-white text-sm font-semibold rounded-md flex items-center justify-center hover:scale-105 transition-all hover:opacity-70 ">
              <img src={Photo} alt="" className="h-4" />
              <label
                htmlFor="file"
                className="cursor-pointer pl-2 pb-[2px] tracking-wide"
              >
                Photo
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".mp4"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="h-8 w-24 my-1  bg-algoBlue text-white text-sm font-semibold rounded-md flex items-center justify-center hover:scale-105 transition-all hover:opacity-70 ">
              <img src={Photo} alt="" className="h-4" />
              <label
                htmlFor="file"
                className="cursor-pointer pl-2 pb-[2px] tracking-wide"
              >
                Video
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".mp4"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="h-8 w-24 my-1  bg-algoBlue text-white text-sm font-semibold rounded-md flex items-center justify-center hover:scale-105 transition-all hover:opacity-70 ">
              <img src={Photo} alt="" className="h-4" />
              <label
                htmlFor="file"
                className="cursor-pointer pl-2 pb-[2px] tracking-wide"
              >
                Song
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".mp4"
                onChange={(e) => setFile(e.target.files[0])}
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
      </div>
    </div>
  );
};

export default CreateNewPost;