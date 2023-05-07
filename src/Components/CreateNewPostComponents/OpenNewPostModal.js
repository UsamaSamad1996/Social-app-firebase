import React, { useEffect, useState, useCallback } from "react";
import CrossIconBlack from "../../Images/cross-icon-black.svg";
import UploadMediaFiles from "./UploadMediaFiles";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  notifySuccess,
  provideNewDate,
} from "../../Assets/NotificationsByToastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import PostContentInput from "./PostContentInput";
import SharePostButton from "./SharePostButton";
import ShowUploadFile from "./ShowUploadFile";
import ReactToastifyNotificationsElement from "../../Assets/ReactToastifyNotificationsElement";

const OpenNewPostModal = ({ setIsModalOpen }) => {
  const { user } = useSelector((state) => state.user);
  const storage = getStorage();
  const [metaData, setMetaData] = useState({});
  const [file, setFile] = useState(null);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [postContent, setPostContent] = useState("");
  const [postImageName, setPostImageName] = useState(null);
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isSharing, setIsSharing] = useState(false);

  const handleFileUpload = useCallback(() => {
    console.log("i am running");

    if (!file) return;

    setPostImageName(file?.name);

    const storageRef = ref(storage, `images/${file?.name}`);

    getMetadata(storageRef)
      .then((metadata) => {
        setMetaData(metadata);
      })
      .catch((error) => {
        console.log(error.message);
      });

    const uploadTask = uploadBytesResumable(storageRef, file, metaData);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressPercent(Number(progress));
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPostImageUrl(downloadURL);
          setFile(null);
        });
      }
    );
  }, [file, setPostImageUrl, metaData, setProgressPercent, storage, setFile]);

  useEffect(() => {
    handleFileUpload();
  }, [handleFileUpload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSharing(true);

    const myPost = {
      postContent,
      postImageUrl,
      id: nanoid(),
      postImageName,
      created_at: provideNewDate,
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
      setIsModalOpen(false);
      notifySuccess("Post Shared Successfully");
    } catch (error) {
      console.log("create post error", error.message);
    }
  };

  return (
    <div className="modal w-screen h-screen bg-white bg-opacity-70 top-0 left-0 right-0  flex items-center justify-center z-20 fixed">
      <div className="Container bg-white  md:w-[500px] md:h-[475px] rounded-lg  drop-shadow-2xl flex flex-col">
        <header className="h-[60px] w-full border-b-[1px] border-fbBgGray flex relative justify-center items-center">
          <h1 className="text-xl font-semibold">Create New Post</h1>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="p-2 bg-fbBgGray bg-opacity-60 hover:bg-fbBgGray rounded-full text-white text-sm flex justify-center items-center h-8 w-8 absolute top-[15px] right-5"
          >
            <img src={CrossIconBlack} alt="cross" className="h-3" />
          </button>
        </header>

        <main className="overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 p-3 flex flex-col justify-between h-[18rem]">
          <PostContentInput
            postContent={postContent}
            setPostContent={setPostContent}
          />
          <ShowUploadFile
            file={file}
            postImageUrl={postImageUrl}
            progressPercent={progressPercent}
          />
        </main>

        <UploadMediaFiles setFile={setFile} />

        <SharePostButton handleSubmit={handleSubmit} isSharing={isSharing} />
      </div>
      <ReactToastifyNotificationsElement />
    </div>
  );
};

export default OpenNewPostModal;
