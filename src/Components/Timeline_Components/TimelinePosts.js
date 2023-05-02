import {
  arrayRemove,
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
import CircularLoader from "../../Assets/CircularLoader";
// import BackgroundImg from "../../Images/content-bg.jpg";
import LikeUnlikeButton from "../SinglePostComponents/PostSubComponents/LikeUnlikeButton";
import AddCommentButton from "../SinglePostComponents/PostSubComponents/AddCommentButton";
import SharePostButton from "../SinglePostComponents/PostSubComponents/SharePostButton";
import PostHeader from "../SinglePostComponents/PostHeader";
import PostBody from "../SinglePostComponents/PostBody";
import PostStats from "../SinglePostComponents/PostStats";

const TimelinePosts = ({ post, postArray }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { user, toggleTheme } = useSelector((state) => state.user);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [postUser, setPostUser] = useState({});
  const [likes, setLikes] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState("");

  const handleDelete = async (id) => {
    const postToBeDeleted = postArray.find((post) => post?.id === id);
    const postsCollection = doc(db, "posts", user?.uid);
    await updateDoc(postsCollection, {
      posts: arrayRemove(postToBeDeleted),
    });
    await deleteDoc(doc(db, "likes", id));
  };

  useEffect(() => {
    const postUser = doc(db, "users", post?.userId);
    onSnapshot(postUser, (doc) => {
      setPostUser(doc.data());
    });
  }, [post?.userId]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div
      className={`w-[500px] shareBox group flex flex-col p-3 md:pt-[13px] md:pb-[3px] md:px-[16px] border-2 border-slate-300 rounded-lg md:my-5 my-6 ${
        toggleTheme ? "bg-white" : "bg-algoBlue"
      }  shadow-[8px_7px_6px_0px_#a69999AD]`}
    >
      {isDeleting ? (
        <div className="h-48 flex justify-center items-center">
          <CircularLoader />
        </div>
      ) : (
        <div>
          <PostHeader
            post={post}
            postUser={postUser}
            handleDelete={handleDelete}
            setIsDeleting={setIsDeleting}
          />

          <PostBody post={post} />

          <PostStats numberOfLikes={numberOfLikes} likes={likes} />

          <hr />

          <section className="flex justify-evenly pt-1">
            <LikeUnlikeButton
              isLike={isLike}
              setIsLike={setIsLike}
              likes={likes}
              setLikes={setLikes}
              setNumberOfLikes={setNumberOfLikes}
              post={post}
            />
            <AddCommentButton />
            <SharePostButton />
          </section>
        </div>
      )}
    </div>
  );
};

export default TimelinePosts;
