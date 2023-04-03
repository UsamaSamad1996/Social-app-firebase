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
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateAccount = () => {
  // const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [userAccount, setUserAccount] = useState({});
  const [pageOneValidation, setpageOneValidation] = useState(false);
  const [pageTwoValidation, setPageTwoValidation] = useState(false);
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        First_Name: "",
        Last_Name: "",
        User_Name: "",
        Father_Name: "",
        Email_Address: "",
        Password: "",
        Confirm_Password: "",
        Marital_Status: "",
        Phone_No: "",
        Gender: "",
        Religion: "",
        Date_of_Birth: "",
        Language: "",
        Nick_Name: "",
        From_Country: "",
        Current_Country: "",
        City: "",
        Qualification: "",
        Field_of_Education: "",
        School: "",
        College: "",
        University: "",
        Job: "",
      },
      validationSchema: Yup.object({
        First_Name: Yup.string()
          .min(3, "Minimum 3 Characters")
          .max(10, "Max 10 Characters")
          .required("Required"),
        Last_Name: Yup.string()
          .min(3, "Minimum 3 Characters")
          .max(10, "Max 10 Characters")
          .required("Required"),
        User_Name: Yup.string()
          .min(3, "Minimum 3 Characters")
          .max(25, "Max 25 Characters")
          .required("Required"),
        Father_Name: Yup.string()
          .min(3, "Minimum 3 Characters")
          .max(15, "Max 15 Characters")
          .required("Required"),
        Email_Address: Yup.string()
          .email("Invalid Email")
          .required("Required")
          .min(5, "Minimum 5 Characters"),
        Password: Yup.string()
          .max(20, "Max 20 Characters")
          .min(10, "Minimum 10 Characters")
          // .oneOf([Yup.ref("Confirm_Password"), null], "Password Not Matches")
          .required("Required"),
        Confirm_Password: Yup.string()
          .max(20, "Max 20 Characters")
          .min(10, "Minimum 10 Characters")
          .oneOf([Yup.ref("Password"), null], "Password does not Match")
          .required("Required"),
        Religion: Yup.string()
          .min(3, "Minimum 3 Characters")
          .max(15, "Max 15 Characters"),
        Language: Yup.string()
          .min(3, "Minimum 3 Characters")
          .max(15, "Max 15 Characters")
          .required("Required"),
        Nick_Name: Yup.string()
          .min(3, "Minimum 3 Characters")
          .max(15, "Max 15 Characters"),
        Marital_Status: Yup.string().required("Required"),
        Gender: Yup.string().required("Required"),
        Date_of_Birth: Yup.string().required("Required"),
        Phone_No: Yup.string()
          .min(12, "Minimum 12 Characters")
          .max(15, "Max 15 Characters")
          .required("Required"),
      }),

      onSubmit: (values) => {},
    });

  const {
    First_Name,
    Last_Name,
    User_Name,
    Father_Name,
    Email_Address,
    Password,
    Confirm_Password,

    Language,

    Marital_Status,
    Gender,
    Date_of_Birth,
    Phone_No,
  } = values;

  useEffect(() => {
    if (
      First_Name?.length < 3 ||
      Last_Name?.length < 3 ||
      User_Name?.length < 3 ||
      Father_Name?.length < 3 ||
      (Email_Address?.length < 5 && !Email_Address.includes("@")) ||
      Password?.length < 10 ||
      Confirm_Password?.length < 10 ||
      Password !== Confirm_Password
    ) {
      setpageOneValidation(false);
    } else {
      setpageOneValidation(true);
    }

    if (
      Language?.length < 3 ||
      Marital_Status === "" ||
      Gender === "" ||
      Date_of_Birth === ""
    ) {
      setPageTwoValidation(false);
    } else {
      setPageTwoValidation(true);
    }
  }, [
    First_Name?.length,
    Last_Name?.length,
    User_Name?.length,
    Father_Name?.length,
    Email_Address?.length,
    Password?.length,
    Confirm_Password?.length,
    Language?.length,
    Email_Address,
    Password,
    Confirm_Password,
    Marital_Status,
    Gender,
    Date_of_Birth,
  ]);

  console.log({ values });

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   if (LastPage) {
  //     try {
  //       const response = await createUserWithEmailAndPassword(
  //         auth,
  //         userData.Email,
  //         userData.Password
  //       );
  //       // after creating user, we are storing here user form data in users collection with user uid
  //       await setDoc(doc(db, "users", response.user.uid), userData);
  //       console.log("çreated");
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   } else {
  //     // if (userData.firstname === "" || userData.firstname.length < 3) {
  //     //   setError("error");
  //     // } else {
  //     //   Next();
  //     // }
  //     // Page No. {currentPageIndex + 1} / {formPages.length}

  //     Next();
  //   }
  // };

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
      values={values}
      handleBlur={handleBlur}
      handleChange={handleChange}
      touched={touched}
      errors={errors}
    />,
    <UserPersonal
      values={values}
      handleBlur={handleBlur}
      handleChange={handleChange}
      touched={touched}
      errors={errors}
    />,
    <UserLocation
      values={values}
      handleBlur={handleBlur}
      handleChange={handleChange}
      touched={touched}
      errors={errors}
    />,
    <UserProfessional
      values={values}
      handleBlur={handleBlur}
      handleChange={handleChange}
      touched={touched}
      errors={errors}
    />,
  ]);

  return (
    <div className="ComponentContainer flex justify-center items-center w-full h-screen bg-myblue p-8">
      <div className="Wrapper flex w-full h-full  bg-myblue max-w-[1440px]">
        <div className="LeftContainer h-full w-[28%] bg-contain bg-center bg-no-repeat bg-white ">
          <section className=" h-20 flex justify-center items-center mb-2">
            <h1 className="text-bluelite  text-[2rem] font-bold text-center pt-4 font-alkatra">
              SameBook
            </h1>
          </section>
          <section className="pl-7   h-[26rem] flex justify-center items-end  ">
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
            onSubmit={handleSubmit}
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
                {LastPage ? (
                  <button
                    type="submit"
                    onClick={() => console.log("submit")}
                    className="w-36 py-2 text-base  bg-myblue text-white  tracking-wider rounded-sm ml-3 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:bg-transparent  transition-all flex justify-center items-center disabled:border-[1px] disabled:border-white"
                  >
                    <p className="mr-2">Submit</p>
                    <img src={NextArrow} alt="nextArrow" className="h-4 w-4 " />
                  </button>
                ) : (
                  <button
                    onClick={() => Next()}
                    className="w-36 py-2 text-base  bg-myblue text-white  tracking-wider rounded-sm ml-3 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:bg-transparent  transition-all flex justify-center items-center disabled:border-[1px] disabled:border-white"
                    disabled={
                      pageOneValidation && currentPageIndex === 0
                        ? false
                        : pageTwoValidation && currentPageIndex === 1
                        ? false
                        : true
                    }
                  >
                    <p className="mr-2">Next</p>
                    <img src={NextArrow} alt="nextArrow" className="h-4 w-4 " />
                  </button>
                )}
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
