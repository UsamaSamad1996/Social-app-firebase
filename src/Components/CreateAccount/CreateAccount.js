import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import useMultiStepFormHook from "../../CustomHooks/useMultiStepFormHook";
import UserAccount from "./MultiStepForm-Pages/UserAccount";
import UserPersonal from "./MultiStepForm-Pages/UserPersonal";
import UserProfessional from "./MultiStepForm-Pages/UserProfessional";
import NextArrow from "../../Images/next-arrow.svg";
import PreviousArrow from "../../Images/left-arrow.svg";
import { useNavigate } from "react-router-dom";
import UserLocation from "./MultiStepForm-Pages/UserLocation";
import { useFormik } from "formik";
import * as Yup from "yup";
import SubmitForm from "./MultiStepForm-Pages/SubmitForm";
import SubmitIcon from "../../Images/submit.svg";
import CircularLoader from "../../Assets/CircularLoader";
import "react-toastify/dist/ReactToastify.css";
import {
  notifyError,
  notifySuccess,
} from "../../Assets/NotificationsByToastify";
import ReactToastifyNotificationsElement from "../../Assets/ReactToastifyNotificationsElement";
import HeroSection from "./MultiStepForm-Pages/HeroSection";

const CreateAccount = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [pageOneValidation, setpageOneValidation] = useState(false);
  const [pageTwoValidation, setPageTwoValidation] = useState(false);
  const [pageThreeValidation, setPageThreeValidation] = useState(false);
  const [pageFourValidation, setPageFourValidation] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

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
          .matches(
            /^[a-zA-Z _-]+$/,
            "Firstname can only contain letters, spaces, hyphens, and underscores"
          )
          .min(3, "Minimum 3 Characters")
          .max(15, "Max 15 Characters")
          .required("Required*"),
        Last_Name: Yup.string()
          .matches(
            /^[a-zA-Z _-]+$/,
            "Lastname can only contain letters, spaces, hyphens, and underscores"
          )
          .min(3, "Minimum 3 Characters")
          .max(15, "Max 15 Characters")
          .required("Required*"),
        User_Name: Yup.string()
          .matches(
            /^[a-zA-Z _-]+$/,
            "Username can only contain letters, spaces, hyphens, and underscores"
          )
          .min(3, "Minimum 3 Characters")
          .max(25, "Max 25 Characters")
          .required("Required*"),
        Father_Name: Yup.string()
          .matches(
            /^[a-zA-Z _-]+$/,
            "Fathername can only contain letters, spaces, hyphens, and underscores"
          )
          .min(3, "Minimum 3 Characters")
          .max(15, "Max 15 Characters")
          .required("Required*"),
        Email_Address: Yup.string()
          .email("Invalid Email")
          .required("Required*")
          .matches(
            /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
            "Please enter a valid email address, uppercase letters are not allowed"
          )
          .min(5, "Minimum 5 Characters"),
        Password: Yup.string()
          .max(20, "Max 20 Characters")
          .min(8, "Minimum 8 Characters")
          .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/,
            "Password must contain at least 1 uppercase letter, 1 symbol, and 1 number"
          )
          .required("Required*"),
        Confirm_Password: Yup.string()
          .max(20, "Max 20 Characters")
          .min(8, "Minimum 8 Characters")
          .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/,
            "Password must contain at least 1 uppercase letter, 1 symbol, and 1 number"
          )
          .oneOf([Yup.ref("Password"), null], "Password does not Match")
          .required("Required*"),
        Religion: Yup.string()
          .matches(
            /^[a-zA-Z _-]+$/,
            "Religion can only contain letters, spaces, hyphens, and underscores"
          )
          .min(3, "Minimum 3 Characters")
          .max(15, "Max 15 Characters"),
        Language: Yup.string()
          .matches(
            /^[a-zA-Z _-]+$/,
            "Language can only contain letters, spaces, hyphens, and underscores"
          )
          .min(3, "Minimum 3 Characters")
          .max(15, "Max 15 Characters")
          .required("Required*"),
        Nick_Name: Yup.string()
          .matches(
            /^[a-zA-Z _-]+$/,
            "Nickname can only contain letters, spaces, hyphens, and underscores"
          )
          .min(3, "Minimum 3 Characters")
          .max(15, "Max 15 Characters"),
        Marital_Status: Yup.string().required("Required*"),
        Gender: Yup.string().required("Required*"),
        Date_of_Birth: Yup.string().required("Required*"),
        Phone_No: Yup.string()
          .min(13, "Minimum 13 Characters")
          .max(20, "Max 20 Characters")
          .required("Required*"),
        Current_Country: Yup.string().required("Required*"),
        From_Country: Yup.string().required("Required*"),
        City: Yup.string()
          .matches(
            /^[a-zA-Z _,-]+$/,
            "City can only contain letters, spaces, hyphens, underscores and comma"
          )
          .min(4, "Minimum 4 Characters")
          .max(20, "Max 20 Characters")
          .required("Required*"),
        Qualification: Yup.string().required("Required*"),
        Field_of_Education: Yup.string().required("Required*"),
        School: Yup.string()
          .matches(
            /^[a-zA-Z _-]+$/,
            "School can only contain letters, spaces, hyphens, and underscores"
          )
          .min(5, "Minimum 5 Characters")
          .max(35, "Max 35 Characters"),
        College: Yup.string()
          .matches(
            /^[a-zA-Z _-]+$/,
            "College can only contain letters, spaces, hyphens, and underscores"
          )
          .min(5, "Minimum 5 Characters")
          .max(35, "Max 35 Characters"),
        University: Yup.string()
          .matches(
            /^[a-zA-Z _-]+$/,
            "University can only contain letters, spaces, hyphens, and underscores"
          )
          .min(5, "Minimum 5 Characters")
          .max(35, "Max 35 Characters")
          .required("Required*"),
        Job: Yup.string()
          .matches(
            /^[a-zA-Z _-]+$/,
            "University can only contain letters, spaces, hyphens, and underscores"
          )
          .min(5, "Minimum 5 Characters")
          .max(35, "Max 35 Characters")
          .required("Required*"),
        Company: Yup.string()
          .matches(
            /^[a-zA-Z _-]+$/,
            "Company can only contain letters, spaces, hyphens, and underscores"
          )
          .min(5, "Minimum 5 Characters")
          .max(35, "Max 35 Characters"),
        Working_Details: Yup.string()
          .matches(
            /^[a-zA-Z _-]+$/,
            "Details can only contain letters, spaces, hyphens, and underscores"
          )
          .min(5, "Minimum 5 Characters")
          .max(35, "Max 35 Characters"),
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
          if (response) {
            await setDoc(doc(db, "users", response?.user.uid), values);
            await setDoc(doc(db, "posts", response?.user.uid), {
              posts: [],
            });
            await sendEmailVerification(auth.currentUser);
          }
          notifySuccess("Account Registered Successfully");
          setTimeout(() => {
            setIsLoading(false);
            navigate("/login-page");
          }, 4500);
        } catch (error) {
          notifyError(error.message);
          setTimeout(() => {
            setIsLoading(false);
            window.location.reload(false);
            setCurrentPageIndex(0);
          }, 4500);
        }
      },
    });

  const { First_Name, Current_Country, Marital_Status, Qualification } = values;

  const {
    First_Name: First_Name_error,
    Last_Name: Last_Name_error,
    User_Name: User_Name_error,
    Father_Name: Father_Name_error,
    Email_Address: Email_Address_error,
    Password: Password_error,
    Confirm_Password: Confirm_Password_error,
    Religion: Religion_error,
    Language: Language_error,
    Nick_Name: Nick_Name_error,
    Phone_No: Phone_No_error,
    Marital_Status: Marital_Status_error,
    Gender: Gender_error,
    Date_of_Birth: Date_of_Birth_error,
    Current_Country: Current_Country_error,
    From_Country: From_Country_error,
    City: City_error,
    Qualification: Qualification_error,
    Field_of_Education: Field_of_Education_error,
    School: School_error,
    College: College_error,
    University: University_error,
    Job: Job_error,
    Company: Company_error,
    Working_Details: Working_Details_error,
  } = errors;

  useEffect(() => {
    if (
      First_Name === "" ||
      First_Name_error ||
      Last_Name_error ||
      User_Name_error ||
      Father_Name_error ||
      Email_Address_error ||
      Password_error ||
      Confirm_Password_error
    ) {
      setpageOneValidation(false);
    } else {
      setpageOneValidation(true);
    }

    if (
      Marital_Status === "" ||
      Religion_error ||
      Language_error ||
      Nick_Name_error ||
      Phone_No_error ||
      Marital_Status_error ||
      Gender_error ||
      Date_of_Birth_error
    ) {
      setPageTwoValidation(false);
    } else {
      setPageTwoValidation(true);
    }

    if (
      Current_Country === "" ||
      Current_Country_error ||
      From_Country_error ||
      City_error
    ) {
      setPageThreeValidation(false);
    } else {
      setPageThreeValidation(true);
    }

    if (
      Qualification === "" ||
      Qualification_error ||
      Field_of_Education_error ||
      School_error ||
      College_error ||
      University_error ||
      Job_error ||
      Company_error ||
      Working_Details_error
    ) {
      setPageFourValidation(false);
    } else {
      setPageFourValidation(true);
    }
  }, [
    First_Name_error,
    Last_Name_error,
    User_Name_error,
    Father_Name_error,
    Email_Address_error,
    Password_error,
    Confirm_Password_error,
    Marital_Status_error,
    Religion_error,
    Language_error,
    Nick_Name_error,
    Phone_No_error,
    Date_of_Birth_error,
    Gender_error,
    Current_Country_error,
    From_Country_error,
    City_error,
    Qualification_error,
    Field_of_Education_error,
    School_error,
    College_error,
    University_error,
    Job_error,
    Company_error,
    Working_Details_error,
    First_Name,
    Current_Country,
    Marital_Status,
    Qualification,
  ]);

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
    <SubmitForm
      values={values}
      setFormIsValid={setFormIsValid}
      formIsValid={formIsValid}
    />,
  ]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="ComponentContainer flex justify-center items-center w-full h-screen bg-algoBlueTwo p-8">
      <div
        className="Wrapper flex w-full h-full  bg-algoBlue max-w-[1440px] "
        style={{ boxShadow: "0px 0px 12px 3px black" }}
      >
        <HeroSection />
        <div className="RightContainer w-[72%]  bg-algoBlue relative ">
          {/* <Particle /> */}
          <div className="absolute right-10 top-6 z-10">
            <h3 className="pl-5 text-sm text-white">
              Step {currentPageIndex + 1} / {formPages.length}
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full h-full text-white px-14 bg-algoBlue absolute top-0  flex flex-col items-center"
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
                {!FirstPage && !LastPage ? (
                  <button
                    type="button"
                    onClick={Previous}
                    className="w-32 py-2 text-sm font-semibold  bg-purpleBlue text-white  tracking-wider rounded-sm  hover:scale-105 transition-all flex justify-center items-center "
                  >
                    <img
                      src={PreviousArrow}
                      alt="nextArrow"
                      className="h-4 w-4 "
                    />
                    <p className="ml-2">Previous</p>
                  </button>
                ) : LastPage ? (
                  <button
                    type="button"
                    onClick={() => {
                      window.location.reload(false);
                      setCurrentPageIndex(0);
                    }}
                    className="w-32 py-2 text-sm font-semibold  bg-purpleBlue text-white  tracking-wider rounded-sm  hover:scale-105 transition-all flex justify-center items-center "
                  >
                    <p className="ml-2">Reset</p>
                  </button>
                ) : null}
                {LastPage ? (
                  <button
                    onClick={() => console.log("yes")}
                    type="submit"
                    className="w-32 py-2 text-sm font-semibold  bg-purpleBlue text-white  tracking-wider rounded-sm ml-3 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:bg-transparent  transition-all flex justify-center items-center disabled:border-[1px] disabled:border-white"
                    disabled={
                      formIsValid && !isLoading
                        ? false
                        : formIsValid && isLoading
                        ? true
                        : true
                    }
                  >
                    <p className="mr-2">Sign Up</p>
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
                    type="button"
                    onClick={Next}
                    className="w-32 py-2 text-sm font-semibold  bg-purpleBlue text-white  tracking-wider rounded-sm ml-3 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:bg-transparent  transition-all flex justify-center items-center disabled:border-[1px] disabled:border-white"
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
          <ReactToastifyNotificationsElement />
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
