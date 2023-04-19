import React, { useState } from "react";
import FormContainer from "./FormContainer";
import Checked from "../Images/checked.svg";
import OpenEye from "../Images/open-eye.svg";
import CloseEye from "../Images/close-eye.svg";

const UserAccount = ({ values, handleChange, handleBlur, touched, errors }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [isOpen, setIsOpen] = useState(false);

  const {
    First_Name: First_Name_error,
    Last_Name: Last_Name_error,
    User_Name: User_Name_error,
    Father_Name: Father_Name_error,
    Email_Address: Email_Address_error,
    Password: Password_error,
    Confirm_Password: Confirm_Password_error,
  } = errors;

  const {
    First_Name: First_Name_touched,
    Last_Name: Last_Name_touched,
    User_Name: User_Name_touched,
    Father_Name: Father_Name_touched,
    Email_Address: Email_Address_touched,
    Password: Password_touched,
  } = touched;

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <FormContainer>
        <div className="flex gap-7 mb-5">
          <div className="w-full relative">
            <label htmlFor="First_Name" className="text-sm">
              FirstName
            </label>
            <input
              className={`px-5 text-sm h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                First_Name_touched && First_Name_error
                  ? "border-red-600"
                  : First_Name_touched && !First_Name_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="First_Name"
              id="First_Name"
              value={values.First_Name || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Lionel"
            />
            {First_Name_touched && First_Name_error ? (
              <p className="text-[12px] text-red-600 absolute right-0 w-full text-right">
                {First_Name_error}
              </p>
            ) : First_Name_touched && !First_Name_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
          <div className="w-full relative">
            <label htmlFor="Last_Name" className="text-sm">
              LastName
            </label>
            <input
              className={`px-5 text-sm h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                Last_Name_touched && Last_Name_error
                  ? "border-red-600"
                  : Last_Name_touched && !Last_Name_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="Last_Name"
              id="Last_Name"
              value={values.Last_Name || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Messi"
            />
            {Last_Name_touched && Last_Name_error ? (
              <p className="text-[12px] text-red-600 absolute right-0 w-full text-right">
                {Last_Name_error}
              </p>
            ) : Last_Name_touched && !Last_Name_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
        </div>
        <div className="flex gap-7 mb-5">
          <div className="w-full relative">
            <label htmlFor="User_Name" className="text-sm">
              UserName
            </label>
            <input
              className={`px-5 text-sm h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                User_Name_touched && User_Name_error
                  ? "border-red-600"
                  : User_Name_touched && !User_Name_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="User_Name"
              id="User_Name"
              value={values.User_Name || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Lionel Messi"
            />
            {User_Name_touched && User_Name_error ? (
              <p className="text-[12px] text-red-600 absolute right-0 w-full text-right">
                {User_Name_error}
              </p>
            ) : User_Name_touched && !User_Name_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
          <div className="w-full relative">
            <label htmlFor="Father_Name" className="text-sm">
              Father's Name
            </label>
            <input
              className={`px-5 text-sm h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                Father_Name_touched && Father_Name_error
                  ? "border-red-600"
                  : Father_Name_touched && !Father_Name_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="Father_Name"
              id="Father_Name"
              value={values.Father_Name || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Jorge Messi"
            />
            {Father_Name_touched && Father_Name_error ? (
              <p className="text-[12px] text-red-600 absolute right-0 w-full text-right">
                {Father_Name_error}
              </p>
            ) : Father_Name_touched && !Father_Name_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
        </div>
        <div className="mb-5">
          <div className="w-full relative">
            <label htmlFor="Email_Address" className="text-sm">
              Email Address
            </label>
            <input
              className={`px-5 text-sm h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                Email_Address_touched && Email_Address_error
                  ? "border-red-600"
                  : Email_Address_touched && !Email_Address_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="email"
              name="Email_Address"
              id="Email_Address"
              value={values.Email_Address || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you.name@gmail.com"
            />
            {Email_Address_touched && Email_Address_error ? (
              <p className="text-[12px] text-red-600 absolute right-0 w-full text-right">
                {Email_Address_error}
              </p>
            ) : Email_Address_touched && !Email_Address_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
        </div>
        <div className="flex gap-7 mb-5">
          <div className="w-full relative">
            <label htmlFor="Password" className="text-sm">
              Password
            </label>
            <input
              className={`px-5 text-sm h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                Password_touched && Password_error
                  ? "border-red-600"
                  : Password_touched && !Password_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type={isOpen ? "text" : "password"}
              name="Password"
              id="Password"
              value={values.Password || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="ABCxyz*123/"
            />
            {Password_touched && Password_error ? (
              <p className="text-[12px] text-red-600 absolute right-0 w-full text-right">
                {Password_error}
              </p>
            ) : Password_touched && !Password_error ? (
              <img
                className="absolute w-4 h-4 right-10 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-3 top-[35.3px]  hover:cursor-pointer flex justify-center items-center h-[30px] "
            >
              {isOpen ? (
                <>
                  <img src={OpenEye} alt="eye" className="h-[21px] w-[21px]" />
                </>
              ) : (
                <>
                  <img src={CloseEye} alt="eye" className="h-[19px] w-[19px]" />
                </>
              )}
            </div>
          </div>
          <div className="w-full relative">
            <label htmlFor="Confirm_Password" className="text-sm">
              Confirm Password
            </label>
            <input
              className={`px-5 text-sm h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                Password_touched && Confirm_Password_error
                  ? "border-red-600"
                  : Password_touched && !Confirm_Password_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="password"
              name="Confirm_Password"
              id="Confirm_Password"
              value={values.Confirm_Password || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="ABCxyz*123/"
            />
            {Password_touched && Confirm_Password_error ? (
              <p className="text-[12px] text-red-600 absolute right-0 w-full text-right">
                {Confirm_Password_error}
              </p>
            ) : Password_touched && !Confirm_Password_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
        </div>
      </FormContainer>
    </div>
  );
};

export default UserAccount;
