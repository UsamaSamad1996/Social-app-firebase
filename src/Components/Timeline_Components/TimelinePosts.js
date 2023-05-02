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
import CircularLoader from "../../Assets/CircularLoader";
import { Link } from "react-router-dom";
import Avatar from "../../Images/userAvatar.svg";
import LikesImage from "../../Images/likes.png";
import Heart from "../../Images/hearts.png";
import LOL from "../../Images/lol.png";
// import BackgroundImg from "../../Images/content-bg.jpg";
import WhiteBackground from "../../Images/white-wall.jpg";
import { formatDistanceToNow } from "date-fns";
import LikeUnlikeButton from "../SinglePostComponents/LikeUnlikeButton";

const TimelinePosts = ({ post, postArray }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { user, userData, toggleTheme } = useSelector((state) => state.user);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [postUser, setPostUser] = useState({});
  const [Likes, setLikes] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState("");

  const handleLikes = async () => {
    setIsLike(!isLike);
    const collectionOfLikes = doc(db, "likes", post.id);
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

  const handleDelete = async (id) => {
    setIsDeleting(true);

    const postToBeDeleted = postArray.find((post) => post?.id === id);
    const postsCollection = doc(db, "posts", user?.uid);
    await updateDoc(postsCollection, {
      posts: arrayRemove(postToBeDeleted),
    });
    await deleteDoc(doc(db, "likes", id));
    setIsDeleting(false);
  };

  useEffect(() => {
    const collectionOfLikes = doc(db, "likes", post.id);
    onSnapshot(collectionOfLikes, (doc) => {
      setLikes(doc.data()?.likes);
      setIsLike(doc.data()?.likes?.includes(userData?.User_Name));
    });

    const numberOfLikes = Number(Likes?.length);
    let LikesTextContent;

    if (numberOfLikes > 1 && isLike === true) {
      LikesTextContent = `You & ${numberOfLikes} Others`;
    } else if (numberOfLikes > 1 && isLike === false) {
      LikesTextContent = `${numberOfLikes} Likes`;
    } else if (numberOfLikes === 1 && isLike === false) {
      LikesTextContent = `${numberOfLikes} Like`;
    } else if (numberOfLikes === 0 && isLike === false) {
      LikesTextContent = `LOL No Likes`;
    } else if (numberOfLikes === 1 && isLike === true) {
      LikesTextContent = `You Like It`;
    }

    setNumberOfLikes(LikesTextContent);
  }, [post?.id, userData?.User_Name, Likes?.length, isLike]);

  useEffect(() => {
    const postUser = doc(db, "users", post?.userId);
    onSnapshot(postUser, (doc) => {
      setPostUser(doc.data());
    });
  }, [post?.userId]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div
      className={`shareBox group flex flex-col p-3 border-2 border-slate-300 rounded-lg md:my-5 my-6 ${
        toggleTheme ? "bg-white" : "bg-algoBlue"
      }  shadow-[8px_7px_6px_0px_#a69999AD]`}
    >
      {isDeleting ? (
        <div className="h-48 flex justify-center items-center">
          <CircularLoader />
        </div>
      ) : (
        <div>
          <div className="shareTop flex px-4 pt-1 md:p-2 mb-2 flex-auto items-center">
            <Link to={`/user-profile/${post?.userId}`}>
              <img
                className="h-[40px] w-[40px] rounded-full object-cover border-2 border-slate-400 bg-algoBlue"
                src={Avatar}
                alt="no poster"
              />
            </Link>

            {/* username, blue tick, post date */}
            <p
              className={`text-base font-semibold pl-3 mb-1 leading-5 pt-2 ${
                toggleTheme ? "text-algoBlue" : "text-white"
              }`}
            >
              {postUser?.User_Name}
              <span>
                {/* {" "}
              <CheckIcon
                style={{ fontSize: "0.9rem" }}
                className="bg-blue-600 text-white rounded-full mb-[5px]"
              /> */}
              </span>
              <br />{" "}
              <span className="text-[12px] font-normal">
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
              </span>
            </p>
            {/* post delete button */}
            {/* {user._id === post.userId ? (
            <div className="deletePost flex flex-auto justify-end relative">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon
                  style={{ fontSize: "2rem" }}
                  className="text-black hover:cursor-pointer"
                />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem className="absolute" onClick={deletePost}>
                  Delete Post
                </MenuItem>
              </Menu>
            </div>
          ) : (
            ""
          )} */}
          </div>
          {/* post description caption & post image */}
          {post.img ? (
            <div>
              <div className="description pl-4 pr-6 mb-2 md:mb-1 mt-5 md:mt-3 md:pl-2 md:pr-5 md:pb-2 text-[16px]  break-words">
                <p>{post?.postContent}</p>
              </div>

              <div className="image ">
                <img
                  className="object-fill bg-black"
                  style={{ height: "70%", width: "100%" }}
                  src={post.img}
                  alt="File Not Supported"
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                backgroundImage: `url(${toggleTheme ? WhiteBackground : ""})`,
              }}
              className={`description pl-4 pr-6 mb-4 md:mb-0 mt-5  md:pl-5 md:pr-5 md:py-4 text-[16px] ${
                toggleTheme ? "text-black" : "text-white"
              }  break-words bg-no-repeat bg-cover min-h-[20rem] h-[20rem] scrollbar-thin group-hover:scrollbar-thumb-gray-400 ${
                toggleTheme ? "" : "shadow-[0px_0px_12px_3px_#000000]"
              }  rounded-md overflow-y-auto`}
            >
              <p>{post?.postContent}</p>
            </div>
          )}
          {/* heart & like images */}
          <div className="likesComment flex py-2 mt-4 mb-1 md:mb-0">
            <div className="likes flex ml-2 items-center justify-center">
              {numberOfLikes > 0 ? (
                <div className="flex ml-2 md:ml-0">
                  <img
                    className="h-4 w-4 rounded-full object-fill "
                    src={LikesImage}
                    alt="Likes"
                  />{" "}
                  <img
                    className="h-4 w-4 rounded-full object-fill "
                    src={Heart}
                    alt="Hearts"
                  />
                </div>
              ) : (
                <div className="flex ml-2 md:ml-0">
                  <img
                    className="h-5 w-5 my-0 object-fill "
                    src={LOL}
                    alt="Hearts"
                  />
                </div>
              )}

              <p
                className={`pl-2 text-[13px] ${
                  toggleTheme ? "text-slate-500" : "text-white"
                }  `}
              >
                {numberOfLikes}
              </p>
            </div>

            <div
              className={`counts flex flex-grow justify-end items-center text-[13px] ${
                toggleTheme ? "text-slate-500" : "text-white"
              }`}
            >
              <p>{Math.round(Math.random() * 10)} Comments</p>

              <p className="ml-5 ">
                {numberOfLikes > 0 ? `${numberOfLikes} Likes` : ""}
              </p>
              <p className="ml-5 mr-5">
                {Math.round(Math.random() * 10)} Shares
              </p>
            </div>
          </div>

          <hr />
          {/* likes comment & share Buttons */}
          <div className="Write flex justify-evenly pt-1 ">
            <LikeUnlikeButton
              handleLikes={handleLikes}
              isLike={isLike}
              post={post}
            />
            {post.userId === user?.uid ? (
              <button
                onClick={() => handleDelete(post?.id)}
                className={`pt-2 px-4  hover:opacity-70 text-[15px] font-semibold rounded-md ${
                  toggleTheme ? "text-slate-500" : "text-white"
                }`}
              >
                Delete
              </button>
            ) : (
              <button
                className={`pt-2 px-4  hover:opacity-70 text-[15px] font-semibold rounded-md ${
                  toggleTheme ? "text-slate-500" : "text-white"
                }`}
              >
                Comment
              </button>
            )}
            <button
              className={`pt-2 px-4 hover:opacity-70 text-[15px] font-semibold rounded-md ${
                toggleTheme ? "text-slate-500" : "text-white"
              } `}
            >
              Share
            </button>
          </div>
        </div>
      )}
    </div>
    // <div>
    //   <p>{postUser?.User_Name}</p>
    //   <p>{post.postContent}</p>
    //   <p>{post.created_at}</p>
    //   <p>{post.id}</p>
    //   {post.userId === user?.uid ? (
    //     <button
    //       onClick={() => handleDelete(post.id)}
    //       className="bg-green-500 px-5 py-2"
    //     >
    //       Delete Post
    //     </button>
    //   ) : null}
    //   <button
    //     className={`${isLike ? "bg-blue-500" : "bg-red-500"} px-5 py-2`}
    //     onClick={() => handleLikes(post?.id)}
    //   >
    //     {isLike ? "Liked" : "Like"}
    //   </button>
    //   <p>{numberOfLikes}</p>
    // </div>
  );
};

export default TimelinePosts;
