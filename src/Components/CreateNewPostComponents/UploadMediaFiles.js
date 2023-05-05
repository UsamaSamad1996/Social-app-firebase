import React, { useCallback } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";

const UploadMediaFiles = ({ setImgUrl, setProgresspercent, file, setFile }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  console.log({ file });
  const [metaData, setMetaData] = useState({});
  const storage = getStorage();

  const handleSubmit = useCallback(() => {
    console.log("i am running");
    if (!file) return;

    const storageRef = ref(storage, "images/" + file.name);

    getMetadata(storageRef)
      .then((metadata) => {
        setMetaData(metadata);
      })
      .catch((error) => {
        console.log(error.message);
      });

    const uploadTask = uploadBytesResumable(storageRef, file, metaData);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot.totalBytes);
        console.log(snapshot);

        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgresspercent(`Uploading ${progress} %`);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  }, [file, setImgUrl, metaData, setProgresspercent, storage]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        id="video"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
    </>
  );
};

export default UploadMediaFiles;
