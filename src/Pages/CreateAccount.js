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
import UserLocation from "../MultiStepForm-Pages/UserLocation";

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
    Email_Address: "",
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
    Religion: "",
    Date_of_Birth: "",
    Language: "",
    Nick_Name: "",
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

  const [userLocationValidation, setUserLocationValidation] = useState(false);
  const [userLocation, setUserLocation] = useState({
    From_Country: "",
    Current_Country: "",
    City: "",
  });

  const userLocationOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLocation({
      ...userLocation,
      [name]: value,
    });
  };

  const userLocation_values = Object.values(userLocation);

  useEffect(() => {
    const validation = userLocation_values.every((value) => value.length > 3);
    setUserLocationValidation(validation);
  }, [userLocation_values, userLocation]);

  // console.log(userProfessional);
  // console.log(userAccountValidation);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [userProfessionalValidation, setUserProfessionalValidation] =
    useState(false);
  const [userProfessional, setUserProfessional] = useState({
    Qualification: "",
    Field_of_Education: "",
    Job_Title: "",
  });

  const userProfessionalOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserProfessional({
      ...userProfessional,
      [name]: value,
    });
  };

  const userProfessional_values = Object.values(userProfessional);

  useEffect(() => {
    const validation = userProfessional_values.every(
      (value) => value.length > 3
    );
    setUserProfessionalValidation(validation);
  }, [userProfessional_values, userProfessional]);

  // console.log(userProfessional);
  // console.log(userAccountValidation);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setUserData({
      ...userAccount,
      ...userPersonal,
      ...userLocation,
      Created_at: serverTimestamp(),
    });
  }, [userAccount, userPersonal, userLocation]);

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
    <UserLocation
      userLocationOnChange={userLocationOnChange}
      userLocation={userLocation}
    />,
    <UserProfessional
      userProfessional={userProfessional}
      userProfessionalOnChange={userProfessionalOnChange}
    />,
  ]);

  return (
    <div className="ComponentContainer flex justify-center items-center w-full h-screen bg-myblue p-8">
      <div className="Wrapper flex w-full h-full  bg-myblue max-w-[1440px]">
        <div className="LeftContainer h-full w-[28%] bg-contain bg-center bg-no-repeat bg-white ">
          <section className=" h-20 flex justify-center items-center mb-3">
            <h1 className="text-bluelite  text-3xl font-bold text-center pt-2 font-alkatra">
              SameBook
            </h1>
          </section>
          <section className="pl-7   max-h-[28rem] flex justify-center items-end  ">
            <img src={Avatar} alt="avatar" className="max-h-[25.5rem]" />
          </section>
          <section className="flex justify-center items-center w-full ">
            <button
              onClick={() => navigate("/login-page")}
              className="w-4/5 py-2 bg-myblue rounded-sm text-white text-center hover:scale-110 transition-all font-semibold border-none outline-none"
            >
              Login
            </button>
          </section>
        </div>
        <div className="RightContainer w-[72%]  bg-myblue relative ">
          {/* <Particle /> */}
          <div className="absolute right-10 top-6">
            <h3 className="pl-5 text-sm text-white">
              Step {currentPageIndex + 1} / {formPages.length}
            </h3>
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="w-full h-full text-white px-14 bg-white bg-opacity-5 absolute top-0 pt-10"
          >
            <div className="flex justify-start items-center ">
              <h1 className="text-white text-3xl font-bold  pb-10 tracking-wide">
                Create Account
              </h1>
            </div>
            {currentPage}
            <div className="flex justify-between py-3 px-1 items-center ">
              <div className="pages ">
                <h2 className="text-lg font-alkatra ">
                  {currentPageIndex === 0
                    ? "Let's start with account information"
                    : currentPageIndex === 1
                    ? "Enter your basic & personal information"
                    : currentPageIndex === 2
                    ? "Places you lived"
                    : null}
                </h2>
              </div>
              <div className="flex items-center">
                {!FirstPage && (
                  <button
                    type="button"
                    onClick={Previous}
                    className="w-36 py-2 text-base  bg-myblue text-white  tracking-wider rounded-sm  hover:scale-105 transition-all flex justify-center items-center "
                  >
                    <img
                      src={PreviousArrow}
                      alt="nextArrow"
                      className="h-4 w-4 "
                    />
                    <p className="ml-2">Previous</p>
                  </button>
                )}

                <button
                  type="submit"
                  className="w-36 py-2 text-base  bg-myblue text-white  tracking-wider rounded-sm ml-3 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:bg-transparent  transition-all flex justify-center items-center disabled:border-[1px] disabled:border-white"
                  disabled={
                    currentPageIndex === 0 && userAccountValidation
                      ? false
                      : currentPageIndex === 1 && userPersonalValidation
                      ? false
                      : currentPageIndex === 2 && userLocationValidation
                      ? false
                      : true
                  }
                >
                  {LastPage ? (
                    <p>Submit</p>
                  ) : (
                    <>
                      <p className="mr-2">Next</p>
                      <img
                        src={NextArrow}
                        alt="nextArrow"
                        className="h-4 w-4 "
                      />
                    </>
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
