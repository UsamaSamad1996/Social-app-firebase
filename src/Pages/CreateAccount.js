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

const CreateAccount = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [userData, setUserData] = useState({});
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const [userAccountValidation, setUserAccountValidation] = useState(false);
  const [userAccount, setUserAccount] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    fatherName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
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
    CNIC: "",
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
    const validation = userPersonal_values.every((value) => value.length > 2);
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
    <div className="ComponentContainer flex justify-center items-center w-full h-screen bg-myblue">
      <div className="Wrapper flex w-full items-center h-full pl-5 bg-white">
        <div
          style={{
            backgroundImage: `url(${Avatar})`,
          }}
          className="LeftContainer h-full w-[28%] bg-contain bg-bottom bg-no-repeat bg-white"
        >
          <div>
            <section className="mb-6 mt-3">
              <h1 className="text-bluelite text-5xl font-bold text-center py-5">
                React App
              </h1>
            </section>
          </div>
        </div>
        <div className="RightContainer h-full w-[72%] relative bg-myblue ">
          <Particle />
          <form
            onSubmit={handleFormSubmit}
            className="w-full h-full absolute top-0 right-0 text-white px-14"
          >
            <div className="flex justify-center items-center  mt-5 mb-8">
              <h1 className="text-white text-5xl font-bold text-center py-5">
                Create Account
              </h1>
            </div>
            {currentPage}
            <div className="flex justify-between py-3 px-1 items-center">
              <div className="pages">
                <h2 className="text-xl font-semibold ">
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
                    className="w-28 py-1 text-lg border-4 border-green-600 bg-white text-myblue font-bold rounded-md ml-3 hover:scale-105 "
                  >
                    Previous
                  </button>
                )}

                <button
                  type="submit"
                  className="w-28 py-1 text-lg border-4 border-green-600 bg-white text-myblue font-bold rounded-md ml-3 hover:scale-105 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:hover:scale-95  disabled:font-normal disabled:border-gray-500 transition-all"
                  disabled={
                    currentPageIndex === 0 && userAccountValidation
                      ? false
                      : currentPageIndex === 1 && userPersonalValidation
                      ? false
                      : true
                  }
                >
                  {LastPage ? "Submit" : "Next"}
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
