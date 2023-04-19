import React, { useState } from "react";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import LoginAvatar from "../Images/login-avatar2.jpg";
import SignUpLogo from "../Images/signup-logo.svg";
import CircularLoader from "../Assets/CircularLoader";
import SubmitIcon from "../Images/submit.svg";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../ReduxToolkit/userSlice";
import { ToastContainer, toast } from "react-toastify";
import Cross from "../Images/cross-icon.svg";
import CloseEye from "../Images/close-eye.svg";
import OpenEye from "../Images/open-eye.svg";
import Logo from "../Images/blue-logo.svg";

const LoginPage = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const notifyError = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user?.uid;
          dispatch(loginSuccess({ uid }));
          setEmail("");
          setPassword("");
          setIsLoading(false);
          navigate("/");
        }
      });
    } catch (error) {
      notifyError(error.message);
      setError(error.message);
      setIsLoading(false);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleForgetPassword = () => {
    setIsLoadingEmail(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        notifySuccess("Email Sent Successfully");
        setTimeout(() => {
          setIsLoadingEmail(false);
          setOpenModal(false);
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        notifyError(errorCode, errorMessage);
        setTimeout(() => {
          setIsLoadingEmail(false);
          setOpenModal(false);
        }, 2000);
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="ComponentContainer flex justify-center items-center w-full h-screen bg-algoBlueTwo   relative ">
      <div className="Wrapper flex w-full h-full flex-col items-center bg-algoBlue max-w-[1400px]  shadow-[0px_0px_12px_3px_#000000]">
        <section className="top  flex flex-col items-center justify-center w-[95%] md:w-[70%] lg:w-[40%] md:h-[50%] py-10 md:py-0 ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col  px-3 w-full border-b-[1px] border-slate-600  "
          >
            <div className="  pt-5">
              <label htmlFor="email" className="hidden">
                Email
              </label>
              <input
                className="px-5 text-sm h-9 text-black w-full rounded-md focus:outline-none focus:shadow-[0px_0px_4px_3px_#626EE3]"
                placeholder="Email"
                type="email"
                name="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="  pt-5 relative">
              <label htmlFor="password" className="hidden">
                Password
              </label>
              <input
                className="px-5 text-sm h-9 text-black w-full rounded-md focus:outline-none focus:shadow-[0px_0px_4px_3px_#626EE3]"
                placeholder="Enter Password"
                type={isEyeOpen ? "text" : "password"}
                name="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={() => setIsEyeOpen(!isEyeOpen)}
                className="absolute right-4 top-[20px]  hover:cursor-pointer flex justify-center items-center h-[36px]"
              >
                {isEyeOpen ? (
                  <>
                    <img
                      src={OpenEye}
                      alt="eye"
                      className="h-[21px] w-[21px]"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={CloseEye}
                      alt="eye"
                      className="h-[19px] w-[19px]"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="  pt-6 pb-4 flex items-center justify-center relative w-full">
              <p className="absolute top-1 text-[12px] text-red-600">{error}</p>
              <button
                type="submit"
                className="bg-purpleBlue h-9 w-full md:w-[65%] rounded-md text-white font-semibold hover:scale-105 transition-all flex items-center justify-center"
              >
                <p className="mr-2">Login</p>
                {isLoading ? (
                  <CircularLoader />
                ) : (
                  <img src={SubmitIcon} alt="nextArrow" className="h-4 w-4 " />
                )}
              </button>
            </div>
          </form>
          <div className="SignUp-Button pb-5 pt-3  px-5 w-full flex justify-center items-center flex-col ">
            <button
              onClick={() => setOpenModal(true)}
              className="bg-transparent h-5  mb-3 md:w-[40%] rounded-md text-green-500 font-light hover:scale-105 transition-all flex justify-center items-center text-[12px] px-2 tracking-wide "
            >
              Forgot Password?
            </button>
            <button
              onClick={() => navigate("/create-account")}
              className="bg-purpleBlue h-9 w-[80%] md:w-[40%] rounded-md text-white font-semibold hover:scale-105 transition-all flex justify-center items-center"
            >
              Sign Up <img src={SignUpLogo} alt="sign" className=" ml-1 " />
            </button>
          </div>
        </section>
        <section className="svg  flex justify-center md:bg-white w-full md:h-[50%] h-full bg-algoBlue ">
          <div className="md:w-[50%] px-10 lg:px-28  bg-white h-fit">
            <div className=" flex justify-center items-center mt-10 mb-5">
              <img src={Logo} alt="" className="h-14 w-14" />
              <h1 className="text-algoBlue text-[2rem] font-bold text-center font-alkatra pt-2">
                SameBook
              </h1>
            </div>

            <p className="font-alkatra text-algoBlue text-center pb-10 md:pb-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum est obcaecati, tempora dolores esse perspiciatis
              deleniti similique repellendus, porro commodi quas molestias
              repudiandae deserunt harum fugiat laudantium dicta ex autem.
            </p>
          </div>
          <div className="w-[50%] hidden lg:block">
            <img src={LoginAvatar} alt="Avatar" className="h-full w-full " />
          </div>
        </section>
      </div>

      {openModal ? (
        <div className="modal absolute  w-full h-full bg-algoBlue bg-opacity-50 top-0 flex items-center justify-center">
          <div className="bg-white  lg:w-[50%] relative rounded-md p-10">
            <div className="wrapper ">
              <div className=" px-5">
                <ul className="list-outside list-disc">
                  <li>Don't worry if you forgotten your account password</li>
                  <li>You can reset your password via verification Email</li>
                  <li>
                    A Link will be sent to your Registered Email Address when
                    you click the button given below
                  </li>
                  <li>
                    Check your Email{" "}
                    <span className="text-red-500">inbox OR spam</span> folder,
                    Open Email
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
              </div>
              <div className="buttons flex justify-end items-center mt-5">
                <button
                  disabled={isLoadingEmail ? true : false}
                  onClick={handleForgetPassword}
                  className="h-10 bg-purpleBlue w-[150px]  text-white font-semibold hover:scale-105 transition-all rounded-md flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <p className="mr-2">Send Email</p>
                  {isLoadingEmail ? (
                    <CircularLoader />
                  ) : (
                    <img
                      src={SubmitIcon}
                      alt="nextArrow"
                      className="h-4 w-4 "
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="absolute top-4 right-5 ">
              <button
                onClick={() => setOpenModal(false)}
                className="p-2 bg-gray-300 rounded-full text-white text-sm flex justify-center items-center"
              >
                <img src={Cross} alt="cross" className="h-3" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginPage;
