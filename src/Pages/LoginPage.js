import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login");
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      console.log("login Success", user);
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("this is error message", error.message);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="ComponentContainer flex justify-center items-center w-full border-2 border-black h-screen">
      <div className="Wrapper border-2 border-gray-300 bg-slate-200 py-5 flex flex-col gap-5 lg:w-[35%] w-[90%] items-center rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border-b-[1px] border-gray-300 p-1 px-3 w-full"
        >
          <div className="  p-2">
            <label htmlFor="email" className="hidden">
              Email
            </label>
            <input
              className="w-full px-5 py-2 rounded-full focus:outline-none "
              placeholder="Email"
              type="email"
              name="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" my-2 p-2">
            <label htmlFor="password" className="hidden">
              Password
            </label>
            <input
              className="w-full px-5 py-2 rounded-full focus:outline-none "
              placeholder="Enter Password"
              type="password"
              name="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="  p-2 flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-400 py-2 px-10 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
        <div className="SignUp-Button   p-1 w-4/5 flex justify-center items-center">
          <button
            onClick={() => navigate("/create-account")}
            className="bg-green-400 py-2 px-10 rounded-md"
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
