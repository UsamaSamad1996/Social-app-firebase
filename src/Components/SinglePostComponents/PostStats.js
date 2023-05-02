import React from "react";
import ViewTotalLikes from "./PostSubComponents/ViewTotalLikes";
import DisplayTotalLikeCommentShare from "./PostSubComponents/DisplayTotalLikeCommentShare";

const PostStats = ({ numberOfLikes, likes }) => {
  return (
    <section className="flex py-2 mt-4 mb-1 md:mb-0">
      <ViewTotalLikes numberOfLikes={numberOfLikes} likes={likes} />
      <DisplayTotalLikeCommentShare likes={likes} />
    </section>
  );
};

export default PostStats;
