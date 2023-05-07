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
import LikeUnlikeButton from "../SinglePostComponents/PostSubComponents/LikeUnlikeButton";
import AddCommentButton from "../SinglePostComponents/PostSubComponents/AddCommentButton";
import SharePostButton from "../SinglePostComponents/PostSubComponents/SharePostButton";
import PostHeader from "../SinglePostComponents/PostHeader";
import PostBody from "../SinglePostComponents/PostBody";
import PostStats from "../SinglePostComponents/PostStats";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { notifySuccess } from "../../Assets/NotificationsByToastify";
import ReactToastifyNotificationsElement from "../../Assets/ReactToastifyNotificationsElement";

const TimelinePosts = ({ post, postArray }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { user, toggleTheme } = useSelector((state) => state.user);

  // console.log({ post });
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [postUser, setPostUser] = useState({});
  const [likes, setLikes] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState("");
  const storage = getStorage();

  const handleDelete = async (id) => {
    setIsDeleting(true);
    const postToBeDeleted = postArray.find((post) => post?.id === id);
    const postsCollection = doc(db, "posts", user?.uid);

    const postsWithSameImageName = postArray.filter(
      (post) => post.postImageName === postToBeDeleted?.postImageName
    );

    const deleteImage = ref(
      storage,
      `images/${postToBeDeleted?.postImageName}`
    );

    console.log({ deleteImage });

    try {
      if (deleteImage?._location?.path_ !== "images/null") {
        if (postsWithSameImageName?.length < 2) {
          await deleteObject(deleteImage);
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
        <div>
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
          <ReactToastifyNotificationsElement />
        </div>
      )}
    </div>
  );
};

export default TimelinePosts;
