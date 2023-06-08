import React, { useState, useEffect } from "react";
import {
  arrayRemove,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../../../firebase";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { notifySuccess } from "../../../../Assets/NotificationsByToastify";
import CircularLoader from "../../../../Assets/CircularLoader";
import LikeUnlikeButton from "./SinglePost/Footer/LikeUnlikeButton";
import AddCommentButton from "./SinglePost/Footer/AddCommentButton";
import SharePostButton from "./SinglePost/Footer/SharePostButton";
import PostHeader from "./SinglePost/Header/PostHeader";
import PostBody from "./SinglePost/Body/PostBody";
import PostStats from "./SinglePost/Stats/PostStats";
import ReactToastifyNotificationsElement from "../../../../Assets/ReactToastifyNotificationsElement";

const TimelinePosts = ({ post, postArray }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { user, toggleTheme } = useSelector((state) => state.user);

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const storage = getStorage();
  const [postUser, setPostUser] = useState({});
  const [likes, setLikes] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState("");

  const handleDelete = async (id) => {
    setIsDeleting(true);

    const postToBeDeleted = postArray.find((post) => post?.id === id);
    const postsCollection = doc(db, "posts", user?.uid);

    const postsWithSameImageName = postArray.filter(
      (post) => post?.postImageName === postToBeDeleted?.postImageName
    );

    const imageToBeDeleted = ref(
      storage,
      `images/${postToBeDeleted?.postImageName}`
    );

    try {
      if (imageToBeDeleted?._location?.path_ !== "images/null") {
        if (postsWithSameImageName?.length < 2) {
          await deleteObject(imageToBeDeleted);
        }
      }

      await updateDoc(postsCollection, {
        posts: arrayRemove(postToBeDeleted),
      });

      await deleteDoc(doc(db, "likes", id));

      notifySuccess("Post Deleted Successfully");
      setIsDeleting(false);
    } catch (error) {
      console.log(error.message);
    }
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
      className={`w-[500px] shareBox group flex flex-col p-3 md:pt-[13px] md:pb-[3px] md:px-[16px] border-2 border-slate-300 rounded-lg md:my-5 my-6 shadow-[8px_7px_6px_0px_#a69999AD] ease-in-out transition-all duration-1000 ${
        toggleTheme ? "bg-white" : "bg-algoBlue"
      }`}
    >
      {isDeleting ? (
        <div className="h-48 flex justify-center items-center bg-black">
          <CircularLoader />
        </div>
      ) : (
        <>
          <PostHeader
            post={post}
            postUser={postUser}
            handleDelete={handleDelete}
          />
          <PostBody post={post} />
          <PostStats numberOfLikes={numberOfLikes} likes={likes} />
          <hr />
          <section className="flex justify-evenly pt-1">
            <LikeUnlikeButton
              likes={likes}
              setLikes={setLikes}
              setNumberOfLikes={setNumberOfLikes}
              post={post}
            />
            <AddCommentButton />
            <SharePostButton />
          </section>
          <ReactToastifyNotificationsElement />
        </>
      )}
    </div>
  );
};

export default TimelinePosts;
