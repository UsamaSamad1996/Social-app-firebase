import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { useEffect } from "react";

const TimelinePosts = ({ post, postArray }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { user } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.user);
  const [Likes, setLikes] = useState([]);
  const [isLike, setIsLike] = useState(false);

  const handleLikes = async () => {
    setIsLike(!isLike);

    const likes = doc(db, "likes", post.id);
    if (isLike) {
      await updateDoc(likes, {
        likes: arrayRemove(userData?.User_Name),
      });
    } else {
      await updateDoc(likes, {
        likes: arrayUnion(userData?.User_Name),
      });
    }
  };

  const handleDelete = async (id) => {
    const postToBeDeleted = postArray.find((post) => post?.id === id);
    const posts = doc(db, "posts", user?.uid);
    await updateDoc(posts, {
      posts: arrayRemove(postToBeDeleted),
    });
    await deleteDoc(doc(db, "likes", id));
  };

  useEffect(() => {
    const likes = doc(db, "likes", post.id);
    onSnapshot(likes, (doc) => {
      setLikes(doc.data()?.likes);
      setIsLike(doc.data()?.likes?.includes(userData?.User_Name));
    });
  }, [post?.id, userData?.User_Name]);

  const numberOfLikes = String(Likes?.length);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <p>{post.postContent}</p>
      <p>{post.created_at}</p>
      <p>{post.id}</p>
      {post.userId === user?.uid ? (
        <button
          onClick={() => handleDelete(post.id)}
          className="bg-green-500 px-5 py-2"
        >
          Delete Post
        </button>
      ) : null}
      <button
        className={`${isLike ? "bg-blue-500" : "bg-red-500"} px-5 py-2`}
        onClick={() => handleLikes(post?.id)}
      >
        {isLike ? "Liked" : "Like"}
      </button>
      <p>{numberOfLikes}</p>
    </div>
  );
};

export default TimelinePosts;
