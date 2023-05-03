import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { auth } from "../../../firebase";
import CircularLoader from "../../../Assets/CircularLoader";
import CrossIconBlack from "../../../Images/cross-icon-black.svg";
import SubmitIcon from "../../../Images/submit.svg";
import {
  notifyError,
  notifySuccess,
} from "../../../Assets/NotificationsByToastify";

const LoginForgotPasswordModal = ({ setOpenModal, email }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [checkIsOpen, setCheckIsOpen] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  const handleForgetPassword = () => {
    setIsLoadingEmail(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        notifySuccess("Email Sent Successfully");
        setTimeout(() => {
          setIsLoadingEmail(false);
          setOpenModal(false);
          setCheckIsOpen(false);
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        notifyError(` ${errorCode} Enter Email`);
        setTimeout(() => {
          setIsLoadingEmail(false);
          setOpenModal(false);
          setCheckIsOpen(false);
        }, 2000);
      });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="modal absolute  w-full h-full bg-algoBlue bg-opacity-50 top-0 flex items-center justify-center">
      <div className="Container bg-white  lg:w-[500px] lg:h-[430px] relative rounded-lg  drop-shadow-2xl flex flex-col">
        <header className="h-[60px] w-full border-b-[1px] border-fbText flex relative justify-center items-center">
          <h1 className="text-xl font-semibold">Forgot Password</h1>
          <button
            onClick={() => {
              setOpenModal(false);
              setCheckIsOpen(false);
            }}
            className="p-2 bg-fbBgGray bg-opacity-60 hover:bg-fbBgGray rounded-full text-white text-sm flex justify-center items-center h-8 w-8 absolute top-[15px] right-5"
          >
            <img src={CrossIconBlack} alt="cross" className="h-3" />
          </button>
        </header>
        <main className="wrapper p-5 flex-auto flex flex-col justify-between ">
          <section className=" ">
            <ul className="list-outside list-disc px-5">
              <li>Don't worry if you forgotten your account password</li>
              <li>You can reset your password via verification Email</li>
              <li>
                A Link will be sent to your Registered Email Address when you
                click the button given below
              </li>
              <li>
                Check your Email{" "}
                <span className="text-red-500">inbox OR spam</span> folder, Open
                Email
              </li>
              <li>Open the Link and Create your New Password</li>
              <li>Try to login with your New Password</li>
              <li>
                Make sure you entered your{" "}
                <span className="text-red-500">
                  registered and active Email Address
                </span>
              </li>
            </ul>
            <div className="py-1 mt-4 flex items-center px-3">
              <input
                type="checkbox"
                id="checkUser"
                name="checkUser"
                onClick={() => setCheckIsOpen(!checkIsOpen)}
              />
              <label
                htmlFor="checkUser"
                className="ml-2 text-base font font-semibold"
              >
                I read and understand!
              </label>
            </div>
          </section>
          <section className="buttons flex justify-end items-center">
            <button
              disabled={isLoadingEmail || !checkIsOpen ? true : false}
              onClick={handleForgetPassword}
              className="h-9 bg-purpleBlue w-full  text-white font-semibold hover:scale-105 transition-all rounded-md flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-50"
            >
              <p className="mr-2">Send Email</p>
              {isLoadingEmail ? (
                <CircularLoader />
              ) : (
                <img src={SubmitIcon} alt="nextArrow" className="h-4 w-4 " />
              )}
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default LoginForgotPasswordModal;
