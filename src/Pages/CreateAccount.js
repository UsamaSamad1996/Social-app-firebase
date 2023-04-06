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
import SubmitForm from "../MultiStepForm-Pages/SubmitForm";
import SubmitIcon from "../Images/submit.svg";
import CircularLoader from "../Assets/CircularLoader";

const CreateAccount = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [pageOneValidation, setpageOneValidation] = useState(false);
  const [pageTwoValidation, setPageTwoValidation] = useState(false);
  const [pageThreeValidation, setPageThreeValidation] = useState(false);
  const [pageFourValidation, setPageFourValidation] = useState(false);
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        Created_At: serverTimestamp(),
        First_Name: "",
        Last_Name: "",
        User_Name: "",
        Father_Name: "",
        Email_Address: "",
        Password: "",
        Confirm_Password: "",
        Religion: "",
        Language: "",
        Nick_Name: "",
        Marital_Status: "",
        Phone_No: "",
        Date_of_Birth: "",
        Gender: "",
        Current_Country: "",
        From_Country: "",
        City: "",
        Qualification: "",
        Field_of_Education: "",
        School: "",
        College: "",
        University: "",
        Job: "",
        Company: "",
        Working_Details: "",
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
          .min(8, "Minimum 8 Characters")
          .matches(/[0-9]/, "Requires a Number")
          .matches(/[a-z]/, "Requires a lowercase letter")
          .matches(/[A-Z]/, "Requires an uppercase letter")
          .matches(/[^\w]/, "Requires a symbol")
          .required("Required"),
        Confirm_Password: Yup.string()
          .max(20, "Max 20 Characters")
          .min(8, "Minimum 8 Characters")
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
        Current_Country: Yup.string().required("Required"),
        From_Country: Yup.string().required("Required"),
        City: Yup.string()
          .min(4, "Minimum 4 Characters")
          .max(20, "Max 20 Characters")
          .required("Required"),
        Qualification: Yup.string().required("Required"),
        Field_of_Education: Yup.string().required("Required"),
        School: Yup.string().min(5, "Minimum 5 Characters"),
        College: Yup.string().min(5, "Minimum 5 Characters"),
        University: Yup.string()
          .min(8, "Minimum 8 Characters")
          .max(35, "Max 35 Characters")
          .required("Required"),
        Job: Yup.string()
          .min(8, "Minimum 8 Characters")
          .max(35, "Max 35 Characters")
          .required("Required"),
        Company: Yup.string()
          .min(6, "Minimum 6 Characters")
          .max(35, "Max 35 Characters"),
        Working_Details: Yup.string()
          .min(6, "Minimum 6 Characters")
          .max(40, "Max 40 Characters"),
      }),
      onSubmit: async (values) => {
        setIsLoading(true);
        try {
          const response = await createUserWithEmailAndPassword(
            auth,
            values.Email_Address,
            values.Password
          );
          // after creating user, we are storing here user form data in users collection with user uid
          await setDoc(doc(db, "users", response.user.uid), values);
          alert("form submitted successfully");
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      },
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
    Current_Country,
    From_Country,
    City,
    Qualification,
    Field_of_Education,
    University,
    Job,
    Company,
    Working_Details,
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
      Date_of_Birth === "" ||
      Phone_No?.length < 13
    ) {
      setPageTwoValidation(false);
    } else {
      setPageTwoValidation(true);
    }

    if (City?.length < 4 || Current_Country === "" || From_Country === "") {
      setPageThreeValidation(false);
    } else {
      setPageThreeValidation(true);
    }

    if (
      Qualification === "" ||
      Field_of_Education === "" ||
      University?.length < 8 ||
      Job?.length < 8
    ) {
      setPageFourValidation(false);
    } else {
      setPageFourValidation(true);
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
    From_Country,
    Current_Country,
    Phone_No?.length,
    Phone_No,
    City?.length,
    Qualification,
    Field_of_Education,
    University?.length,
    Job?.length,
    Company,
    Working_Details,
  ]);

  // console.log({ values });

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
    <SubmitForm values={values} />,
  ]);

  return (
    <div className="ComponentContainer flex justify-center items-center w-full h-screen bg-myblue p-8">
      <div className="Wrapper flex w-full h-full  bg-myblue max-w-[1440px]">
        <div className="LeftContainer h-full w-[28%] bg-contain bg-center bg-no-repeat bg-white  flex flex-col">
          <section className=" h-[18%] flex justify-center items-center  ">
            <h1 className="text-bluelite  text-[2rem] font-bold text-center  font-alkatra  w-full">
              SameBook
            </h1>
          </section>
          <section className="pl-7  flex-auto flex justify-center items-end w-full">
            <img src={Avatar} alt="avatar" className="max-h-[26rem] " />
          </section>
          <section className="flex justify-center items-start w-full h-[10%]">
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
            className="w-full h-full text-white px-14 bg-white bg-opacity-5 absolute top-0  flex flex-col items-center"
          >
            <div className="flex justify-start items-center  w-full h-[20%]">
              <h1 className="text-white text-3xl font-bold  tracking-wide ">
                Create Account
              </h1>
            </div>
            <div className="  w-full  h-[62%] xl:px-8">{currentPage}</div>

            <div className="flex justify-between py-3 px-1 items-center   w-full h-[18%] ">
              <div className="pages ">
                <h2 className="text-lg font-alkatra ">
                  {currentPageIndex === 0
                    ? "Let's start with account information"
                    : currentPageIndex === 1
                    ? "Enter your basic & personal information"
                    : currentPageIndex === 2
                    ? "Add Places you lived"
                    : currentPageIndex === 3
                    ? "Add Your Qualification & Working Detail"
                    : currentPageIndex === 4
                    ? "Please check & then submit the Form!"
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
                    disabled={isLoading ? true : false}
                  >
                    <p className="mr-2">Submit</p>
                    {isLoading ? (
                      <CircularLoader />
                    ) : (
                      <img
                        src={SubmitIcon}
                        alt="nextArrow"
                        className="h-4 w-4 "
                      />
                    )}
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
                        : pageThreeValidation && currentPageIndex === 2
                        ? false
                        : pageFourValidation && currentPageIndex === 3
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
