import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../../../firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import Liked from "../../../../../Images/like-icon-blue.svg";
import Unlike from "../../../../../Images/like-icon.svg";
import UnlikeGrayIcon from "../../../../../Images/like-icon-fb-gray.svg";

const LikeUnlikeButton = ({ post, likes, setLikes, setNumberOfLikes }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { toggleTheme, userData } = useSelector((state) => state.user);
  const [isLike, setIsLike] = useState(false);

  const handleLikes = async () => {
    setIsLike(!isLike);

    const collectionOfLikes = doc(db, "likes", post?.id);
    if (isLike) {
      await updateDoc(collectionOfLikes, {
        likes: arrayRemove(userData?.User_Name),
      });
    } else {
      await updateDoc(collectionOfLikes, {
        likes: arrayUnion(userData?.User_Name),
      });
    }
  };

  useEffect(() => {
    const collectionOfLikes = doc(db, "likes", post.id);

    onSnapshot(collectionOfLikes, (doc) => {
      setLikes(doc.data()?.likes);
      setIsLike(doc.data()?.likes?.includes(userData?.User_Name));
    });

    const numberOfLikes = Number(likes?.length);
    let LikesTextContent;

    if (numberOfLikes > 1 && isLike === true) {
      LikesTextContent = `You and ${numberOfLikes - 1} Others`;
    } else if (numberOfLikes > 1 && isLike === false) {
      LikesTextContent = `${numberOfLikes} Likes`;
    } else if (numberOfLikes === 1 && isLike === false) {
      LikesTextContent = `${numberOfLikes} Like`;
    } else if (numberOfLikes === 0 && isLike === false) {
      LikesTextContent = `LoL No Likes`;
    } else if (numberOfLikes === 1 && isLike === true) {
      LikesTextContent = `You Like It`;
    }

    setNumberOfLikes(LikesTextContent);
  }, [
    post?.id,
    userData?.User_Name,
    likes?.length,
    isLike,
    setIsLike,
    setLikes,
    setNumberOfLikes,
  ]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <button
      onClick={() => handleLikes(post?.id)}
      className={`pt-2 px-4 ${
        isLike
          ? "text-purpleBlue"
          : toggleTheme
          ? "text-fbText hover:bg-slate-100 "
          : "text-white"
      } w-[120px] py-2 px-4 text-[15px] font-semibold rounded-md hover:opacity-80 flex items-center justify-center`}
    >
      {isLike ? (
        <>
          <img src={Liked} alt=" Liked img" className="h-[18px] " />
          <p className=" pl-1">Liked</p>
        </>
      ) : (
        <>
          <img
            src={toggleTheme ? UnlikeGrayIcon : Unlike}
            alt=" Liked img"
            className="h-[18px] "
          />
          <p className=" pl-1">Like</p>
        </>
      )}
    </button>
  );
};

export default LikeUnlikeButton;
