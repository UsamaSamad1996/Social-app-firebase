import React, { useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import TimelinePosts from "./TimelinePosts";
// import { collection,  getDocs } from "firebase/firestore";

const Feed = () => {
  const { user } = useSelector((state) => state.user);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
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
      userName,
      fullName,
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

  const handleDelete = async (id) => {
    const postToBeDeleted = postArray.find((post) => post.id === id);

    const posts = doc(db, "posts", user?.uid);
    await updateDoc(posts, {
      posts: arrayRemove(postToBeDeleted),
    });
    await deleteDoc(doc(db, "likes", id));
  };

  return (
    <div>
      <h1 className=" text-black">Test</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="border-2 border-black"
            type="text"
            placeholder="input name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <input
            className="border-2 border-black"
            type="text"
            placeholder="input name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <button className="border-2 border-black" type="submit">
            post
          </button>
        </div>
      </form>

      <div>
        {postArray?.map((post) => (
          <div key={post.id} className="border-2 border-black p-5">
            <TimelinePosts post={post} handleDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
