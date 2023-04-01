import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import useMultiStepFormHook from "../CustomHooks/useMultiStepFormHook";
import UserAccount from "../MultiStepForm-Pages/UserAccount";
import UserPersonal from "../MultiStepForm-Pages/UserPersonal";
import UserProfessional from "../MultiStepForm-Pages/UserProfessional";
import Particle from "../MultiStepForm-Pages/Particle";
import Avatar from "../Images/login-avatar.jpg";
import NextArrow from "../Images/next-arrow.svg";
import PreviousArrow from "../Images/left-arrow.svg";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const [userAccountValidation, setUserAccountValidation] = useState(false);
  const [userAccount, setUserAccount] = useState({
    First_Name: "",
    Last_Name: "",
    User_Name: "",
    Father_Name: "",
    Email: "",
    Password: "",
    Confirm_Password: "",
  });

  const userAccountOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserAccount({
      ...userAccount,
      [name]: value,
    });
  };

  const userAccount_values = Object.values(userAccount);

  useEffect(() => {
    const validation = userAccount_values.every((value) => value.length > 2);
    setUserAccountValidation(validation);
  }, [userAccount_values, userAccount]);

  // console.log(userAccount);
  // console.log(userAccountValidation);

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const [userPersonalValidation, setUserPersonalValidation] = useState(false);
  const [userPersonal, setUserPersonal] = useState({
    Marital_Status: "",
    Phone_No: "",
    Gender: "",
    From_Country: "",
    Current_Country: "",
    City: "",
    Date_of_Birth: "",
  });

  const userPersonalOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserPersonal({
      ...userPersonal,
      [name]: value,
    });
  };

  const userPersonal_values = Object.values(userPersonal);

  useEffect(() => {
    const validation = userPersonal_values.every((value) => value.length > 3);
    setUserPersonalValidation(validation);
  }, [userPersonal_values, userPersonal]);

  // console.log(userAccount);
  // console.log(userAccountValidation);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setUserData({ ...userAccount, ...userPersonal });
  }, [userAccount, userPersonal]);

  console.log(userData);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (LastPage) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          userData.Email,
          userData.Password
        );
        // after creating user, we are storing here user form data in users collection with user uid
        await setDoc(doc(db, "users", response.user.uid), userData);
        console.log("çreated");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      // if (userData.firstname === "" || userData.firstname.length < 3) {
      //   setError("error");
      // } else {
      //   Next();
      // }
      // Page No. {currentPageIndex + 1} / {formPages.length}

      Next();
    }
  };

  const {
    formPages,
    currentPage,
    currentPageIndex,
    Next,
    Previous,
    FirstPage,
    LastPage,
    setCurrentPageIndex,
  } = useMultiStepFormHook([
    <UserAccount
      userAccount={userAccount}
      userAccountOnChange={userAccountOnChange}
    />,
    <UserPersonal
      userPersonal={userPersonal}
      userPersonalOnChange={userPersonalOnChange}
    />,
    <UserProfessional />,
  ]);

  return (
    <div className="ComponentContainer flex justify-center items-center w-full h-screen bg-myblue p-5">
      <div className="Wrapper flex w-full items-center h-full  bg-white max-w-[1440px]">
        <div className="LeftContainer h-full w-[28%] bg-contain bg-center bg-no-repeat bg-white py-2">
          <section className=" h-20 flex justify-center items-center mb-2">
            <h1 className="text-bluelite text-4xl font-bold text-center ">
              React App
            </h1>
          </section>
          <section className="pl-7   h-[28rem] flex justify-center items-end ">
            <img src={Avatar} alt="avatar" className="max-h-[27rem]" />
          </section>
          <section className="flex justify-center items-center w-full  h-16">
            <button
              onClick={() => navigate("/login-page")}
              className="w-4/5 py-2 bg-myblue rounded-sm text-white text-center hover:scale-105 transition-all font-semibold"
            >
              Login
            </button>
          </section>
        </div>
        <div className="RightContainer h-full w-[72%] relative bg-myblue ">
          <Particle />
          <form
            onSubmit={handleFormSubmit}
            className="w-full h-full absolute top-0 right-0 text-white px-14 bg-white bg-opacity-5"
          >
            <div className="flex justify-center items-center  mt-5 mb-8">
              <h1 className="text-white text-4xl font-bold text-center py-5 tracking-wide">
                Create Account
              </h1>
            </div>
            {currentPage}
            <div className="flex justify-between py-3 px-1 items-baseline ">
              <div className="pages">
                <h2 className="text-2xl font-semibold underline">
                  {currentPageIndex === 0
                    ? "User Account"
                    : currentPageIndex === 1
                    ? "User Personal"
                    : currentPageIndex === 2
                    ? "User Professional"
                    : null}
                </h2>
              </div>
              <div className="flex items-center">
                {!FirstPage && (
                  <button
                    type="button"
                    onClick={Previous}
                    className="w-28 py-2 text-base border-[1px] border-white bg-myblue text-white  tracking-wider rounded-md ml-3 hover:scale-105 transition-all "
                  >
                    <div className="flex items-center justify-end ">
                      <img
                        src={PreviousArrow}
                        alt="nextArrow"
                        className="h-4 w-4 "
                      />
                      <p className="ml-2  flex justify-start items-center w-16">
                        Prev
                      </p>
                    </div>
                  </button>
                )}

                <button
                  type="submit"
                  className="w-28 py-2 text-base border-[1px] border-white bg-myblue text-white  tracking-wider rounded-md ml-3 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:bg-transparent  transition-all"
                  disabled={
                    currentPageIndex === 0 && userAccountValidation
                      ? false
                      : currentPageIndex === 1 && userPersonalValidation
                      ? false
                      : true
                  }
                >
                  {LastPage ? (
                    "Submit"
                  ) : (
                    <div className="flex items-center ">
                      <p className="mr-2  flex justify-end items-center w-16">
                        Next
                      </p>

                      <img
                        src={NextArrow}
                        alt="nextArrow"
                        className="h-4 w-4 "
                      />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

// const user = doc(db, "users", "X6PwAP8awGhDpk5xjwhWxKY10yi1");

// // Set the "capital" field of the city 'DC'
// await updateDoc(user, {
//   Username: "mohsin",
// });
