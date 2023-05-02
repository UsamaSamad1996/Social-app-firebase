import React, { useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useState } from "react";
import { db } from "../../firebase";
import TimelinePosts from "./TimelinePosts";
import CreateNewPost from "./CreateNewPost";

const Feed = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { user } = useSelector((state) => state.user);
  const [postArray, setPostArray] = useState([]);

  useEffect(() => {
    const allUsersPostCollection = query(collection(db, "posts"));
    try {
      onSnapshot(allUsersPostCollection, (querySnapshot) => {
        const postsArray = [];
        querySnapshot.forEach((post) => {
          postsArray.push(...post.data()?.posts);
        });
        const sortedArray = postsArray.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA;
        });
        setPostArray(sortedArray);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [user?.uid]);

  return (
    <div className="  px-0 mx-0 xl:px-10 md:px-1 md:ml-[25%] md:w-[50%] relative ">
      <CreateNewPost />

      <div>
        {postArray?.map((post) => (
          <div key={post.id}>
            <TimelinePosts post={post} postArray={postArray} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
