import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { loginSuccess } from "../../../ReduxToolkit/userSlice";
import { notifyError } from "../../../Assets/NotificationsByToastify";
import CloseEye from "../../../Images/close-eye.svg";
import OpenEye from "../../../Images/open-eye.svg";
import CircularLoader from "../../../Assets/CircularLoader";
import SubmitIcon from "../../../Images/submit.svg";

const LoginForm = ({ email, setEmail, password, setPassword }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  px-3 w-full border-b-[1px] border-slate-600  "
    >
      <section className="  pt-5">
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
      </section>

      <section className="  pt-5 relative">
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
          <img
            src={isEyeOpen ? OpenEye : CloseEye}
            alt="eye"
            className="h-[21px] w-[21px]"
          />
        </div>
      </section>

      <section className="  pt-6 pb-4 flex items-center justify-center relative w-full">
        <p className="absolute top-1 text-[12px] text-red-600">{error}</p>
        <button
          type="submit"
          className="bg-purpleBlue h-9 w-full md:w-[65%] rounded-md text-white font-semibold hover:scale-105 transition-all flex items-center justify-center"
        >
          <p className="mr-2">Login</p>
          {isLoading ? (
            <CircularLoader />
          ) : (
            <img src={SubmitIcon} alt="nextArrow" className="h-4 w-4" />
          )}
        </button>
      </section>
    </form>
  );
};

export default LoginForm;
