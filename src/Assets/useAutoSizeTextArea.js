import { useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutoSizeTextArea = (textAreaRef, postContent) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, postContent]);
};

export default useAutoSizeTextArea;
