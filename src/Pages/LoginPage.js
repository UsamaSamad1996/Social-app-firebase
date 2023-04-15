import React, { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import LoginAvatar from "../Images/login-avatar2.jpg";
import SignUpLogo from "../Images/signup-logo.svg";
import Fade from "react-reveal/Fade";
import CircularLoader from "../Assets/CircularLoader";
import SubmitIcon from "../Images/submit.svg";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../ReduxToolkit/userSlice";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

          // ...
        }
      });

      setEmail("");
      setPassword("");
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      notifyError(error.message);
      setError(error.message);
      setIsLoading(false);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="ComponentContainer flex justify-center items-center w-full h-screen bg-algoBlueTwo p-8 ">
      <div className="Wrapper flex w-full h-full flex-col items-center bg-algoBlue max-w-[1300px]  shadow-[0px_0px_12px_3px_#000000]">
        <section className="top  flex flex-col items-center justify-between w-[40%] h-[50%]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col  px-3 w-full border-b-[1px] border-white  "
          >
            <div className="  pt-5">
              <label htmlFor="email" className="hidden">
                Email
              </label>
              <input
                className="px-5 text-sm h-9 text-black w-full rounded-md focus:outline-none"
                placeholder="Email"
                type="email"
                name="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="  pt-5">
              <label htmlFor="password" className="hidden">
                Password
              </label>
              <input
                className="px-5 text-sm h-9 text-black w-full rounded-md focus:outline-none"
                placeholder="Enter Password"
                type="password"
                name="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="  pb-5 pt-7 flex items-center justify-center relative">
              <div className="absolute top-1 text-sm text-red-600">{error}</div>
              <button
                type="submit"
                className="bg-purpleBlue h-9 w-[65%] rounded-md text-white font-semibold hover:scale-105 transition-all flex items-center justify-center"
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
          <div className="SignUp-Button pb-6 pt-4  px-5 w-full flex justify-center items-center">
            <button
              onClick={() => navigate("/create-account")}
              className="bg-purpleBlue h-9 w-[40%] rounded-md text-white font-semibold hover:scale-105 transition-all flex justify-center items-center"
            >
              Sign Up <img src={SignUpLogo} alt="sign" className=" ml-1 " />
            </button>
          </div>
        </section>
        <section className="svg  flex  justify-end bg-white w-full h-[50%] ">
          <div className="w-[50%] px-20">
            <h1 className="text-algoBlue text-[2rem] font-bold text-center font-alkatra mt-10 mb-5">
              SameBook
            </h1>
            <p className="font-alkatra text-algoBlue text-center">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum est obcaecati, tempora dolores esse perspiciatis
              deleniti similique repellendus, porro commodi quas molestias
              repudiandae deserunt harum fugiat laudantium dicta ex autem.
            </p>
          </div>
          <div className="w-[50%]">
            <Fade right>
              <img src={LoginAvatar} alt="Avatar" className="h-full w-full " />
            </Fade>
          </div>
        </section>
      </div>
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
