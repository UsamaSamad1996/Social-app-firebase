import { useState } from "react";

const useMultiStepFormHook = (formPages = []) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const Next = () => {
    setCurrentPageIndex((i) => {
      if (i >= formPages.length - 1) {
        return i;
      } else {
        return i + 1;
      }
    });
  };

  const Previous = () => {
    setCurrentPageIndex((i) => {
      if (i <= 0) {
        return i;
      } else {
        return i - 1;
      }
    });
  };

  return {
    formPages,
    currentPage: formPages[currentPageIndex],
    currentPageIndex,
    Next,
    Previous,
    FirstPage: currentPageIndex === 0,
    LastPage: currentPageIndex === formPages.length - 1,
    setCurrentPageIndex,
  };
};

export default useMultiStepFormHook;
