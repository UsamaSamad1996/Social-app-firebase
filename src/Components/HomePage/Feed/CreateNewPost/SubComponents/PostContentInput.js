import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useAutoSizeTextArea from "../../../../../Assets/useAutoSizeTextArea";

const PostContentInput = ({ postContent, setPostContent }) => {
  ///

  const { userData } = useSelector((state) => state.user);
  const textAreaRef = useRef(null);

  ///

  useAutoSizeTextArea(textAreaRef.current, postContent);

  ///

  return (
    <div>
      <textarea
        className="p-1 text-sm w-full overflow-hidden focus:outline-none resize-none rounded-md"
        type="text"
        required
        value={postContent || ""}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder={`What's on your mind ${userData?.User_Name} ?`}
        ref={textAreaRef}
      />
    </div>
  );
};

export default PostContentInput;
