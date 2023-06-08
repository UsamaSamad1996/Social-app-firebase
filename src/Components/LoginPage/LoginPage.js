import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpLogo from "../../Images/signup-logo.svg";
import LoginFooter from "./Childs/LoginFooter";
import LoginForgotPasswordModal from "./Childs/LoginForgotPasswordModal";
import LoginForm from "./Childs/LoginForm";
import ReactToastifyNotificationsElement from "../../Assets/ReactToastifyNotificationsElement";

const LoginPage = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="ComponentContainer flex justify-center items-center w-full h-screen bg-algoBlueTwo   relative ">
      <div className="Wrapper flex w-full h-full flex-col items-center bg-algoBlue max-w-[1400px]  shadow-[0px_0px_12px_3px_#000000]">
        <section className="top  flex flex-col items-center justify-center w-[95%] md:w-[70%] lg:w-[40%] md:h-[50%] py-10 md:py-0 ">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
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
        <LoginFooter />
      </div>

      {openModal ? (
        <LoginForgotPasswordModal setOpenModal={setOpenModal} email={email} />
      ) : null}

      <ReactToastifyNotificationsElement />
    </div>
  );
};

export default LoginPage;
