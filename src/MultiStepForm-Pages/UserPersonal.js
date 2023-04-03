import React, { useEffect, useState } from "react";
import FormContainer from "./FormContainer";
import Checked from "../Images/checked.svg";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const UserPersonal = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const {
    Religion: Religion_error,
    Language: Language_error,
    Nick_Name: Nick_Name_error,
    Phone_No: Phone_No_error,
    Marital_Status: Marital_Status_error,
    Gender: Gender_error,
    Date_of_Birth: Date_of_Birth_error,
  } = errors;

  const {
    Religion: Religion_touched,
    Language: Language_touched,
    Nick_Name: Nick_Name_touched,
    Phone_No: Phone_No_touched,
    Marital_Status: Marital_Status_touched,
    Gender: Gender_touched,
    Date_of_Birth: Date_of_Birth_touched,
  } = touched;

  const [phoneNo, setPhoneNo] = useState("");

  console.log(phoneNo, { Phone_No_error });

  useEffect(() => {
    // if (phoneNo?.length > 12) {
    //   setPhoneNumberIsValid(true);
    // } else {
    //   setPhoneNumberIsValid(false);
    // }
    // if (values?.Gender?.length > 3) {
    //   setGenderIsValid(true);
    // } else {
    //   setGenderIsValid(false);
    // }
    values.Phone_No = String(phoneNo);
  }, [phoneNo, values]);

  // console.log(values);

  // const empty = [];
  // const arr = getCountries();

  // arr.forEach((code) => {
  //   const country = countryNames[code];
  //   const codes = getCountryCallingCode(code);
  //   empty.push({ country, codes });
  // });

  // // Outputs: United States
  // console.log("usama", empty);

  // // Outputs: +1
  // console.log("+" + getCountryCallingCode("PK"));

  const marital_Status = [
    "Single",
    "Married",
    "Commited",
    "Engaged",
    "In Relationship",
    "Divorce",
    "Widowed",
  ];

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <FormContainer>
        <div className="flex gap-7 mb-5">
          <div className="w-full relative">
            <label htmlFor="Religion">
              Religion <span className="text-[12px] ml-1">(Optional)</span>
            </label>
            <input
              className={`px-5 h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                Religion_touched && Religion_error
                  ? "border-red-600"
                  : Religion_touched && !Religion_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="Religion"
              id="Religion"
              value={values.Religion || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="What is your Religion?"
            />
            {Religion_touched && Religion_error ? (
              <p className="text-sm text-red-500 absolute right-0">
                {Religion_error}
              </p>
            ) : Religion_touched && !Religion_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
          <div className="w-full relative">
            <label htmlFor="Language">Language</label>
            <input
              className={`px-5 h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                Language_touched && Language_error
                  ? "border-red-600"
                  : Language_touched && !Language_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="Language"
              id="Language"
              value={values.Language || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="What is your basic language?"
              autoComplete="on"
            />
            {Language_touched && Language_error ? (
              <p className="text-sm text-red-500 absolute right-0">
                {Language_error}
              </p>
            ) : Language_touched && !Language_error ? (
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
            <label htmlFor="Nick_Name">
              Nick Name <span className="text-[12px] ml-1">(Optional)</span>
            </label>
            <input
              className={`px-5 h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                Nick_Name_touched && Nick_Name_error
                  ? "border-red-600"
                  : Nick_Name_touched && !Nick_Name_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="Nick_Name"
              id="Nick_Name"
              value={values.Nick_Name || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Add a Nickname, if any? Optional"
            />
            {Nick_Name_touched && Nick_Name_error ? (
              <p className="text-sm text-red-500 absolute right-0">
                {Nick_Name_error}
              </p>
            ) : Nick_Name_touched && !Nick_Name_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
          <div className="w-full relative">
            <label htmlFor="Marital_Status">Marital Status</label>
            <select
              className={`px-5 h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] appearance-none ${
                Marital_Status_touched && Marital_Status_error
                  ? "border-red-600"
                  : Marital_Status_touched && !Marital_Status_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              name="Marital_Status"
              id="Marital_Status"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Relationship Status</option>
              {marital_Status?.map((status, i) => (
                <option key={i} className="bg-white text-black" value={status}>
                  {status}
                </option>
              ))}
            </select>
            {Marital_Status_touched && Marital_Status_error ? (
              <p className="text-sm text-red-500 absolute right-0">
                {Marital_Status_error}
              </p>
            ) : Marital_Status_touched && !Marital_Status_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
        </div>

        <div className="flex gap-7 mb-5">
          <div name="Phone_No" className="w-full relative">
            <label htmlFor="Phone_No">Phone No</label>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              onBlur={handleBlur}
              defaultCountry="PK"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e)}
              className={`px-5 h-9 border-[3px] text-black w-full mt-2 rounded-md focus:outline-none bg-white ${
                Phone_No_touched && Phone_No_error
                  ? "border-red-600"
                  : Phone_No_touched && !Phone_No_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
            />
            {Phone_No_touched && Phone_No_error ? (
              <p className="text-sm text-red-500 absolute right-0">
                {Phone_No_error}
              </p>
            ) : Phone_No_touched && !Phone_No_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>

          <div className="w-full relative">
            <label htmlFor="Date_of_Birth">Date of Birth</label>
            <input
              className={`px-5 h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] appearance-none ${
                Date_of_Birth_touched && Date_of_Birth_error
                  ? "border-red-600"
                  : Date_of_Birth_touched && !Date_of_Birth_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="date"
              name="Date_of_Birth"
              id="Date_of_Birth"
              value={values.Date_of_Birth || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {Date_of_Birth_touched && Date_of_Birth_error ? (
              <p className="text-sm text-red-500 absolute right-0">
                {Date_of_Birth_error}
              </p>
            ) : Date_of_Birth_touched && !Date_of_Birth_error ? (
              <div className="w-6 text-right flex justify-end  bg-white absolute top-[2.65rem] right-4">
                <img className=" w-4 h-4  bg-white " src={Checked} alt="true" />
              </div>
            ) : null}
          </div>
        </div>

        <div className=" mb-5 relative">
          <label htmlFor="gender">Gender</label>
          <div
            id="gender"
            className={`w-full mt-2 bg-white text-myblue border-[3px]  rounded-md h-9 flex items-center justify-evenly nce-none ${
              Gender_touched && Gender_error
                ? "border-red-600"
                : Gender_touched && !Gender_error
                ? "border-green-600"
                : "border-transparent"
            }
            `}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Gender}
            name="Gender"
          >
            <div>
              <input
                id="male"
                type="radio"
                name="Gender"
                value="Male"
                className="p-10"
              />
              <label htmlFor="male" className="font-semibold ml-4">
                Male
              </label>
            </div>
            <div>
              <input id="female" type="radio" name="Gender" value="Female" />
              <label htmlFor="female" className="font-semibold ml-4">
                Female
              </label>
            </div>
            <div>
              <input
                id="others"
                type="radio"
                name="Gender"
                value="Others"
                className="p-10"
              />
              <label htmlFor="others" className="font-semibold ml-4">
                Others
              </label>
            </div>
          </div>
          {Gender_touched && Gender_error ? (
            <p className="text-sm text-red-500 absolute right-0">
              {Gender_error}
            </p>
          ) : Gender_touched && !Gender_error ? (
            <img
              className="absolute w-4 h-4 right-4 top-[2.65rem]"
              src={Checked}
              alt="true"
            />
          ) : null}
        </div>
      </FormContainer>
    </div>
  );
};

export default UserPersonal;
