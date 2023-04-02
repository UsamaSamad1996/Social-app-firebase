import React, { useEffect, useState } from "react";
import FormContainer from "./FormContainer";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const UserPersonal = ({ userPersonal, userPersonalOnChange }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [phoneNo, setPhoneNo] = useState("");
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);
  const [genderIsValid, setGenderIsValid] = useState(false);

  useEffect(() => {
    if (phoneNo?.length > 12) {
      setPhoneNumberIsValid(true);
    } else {
      setPhoneNumberIsValid(false);
    }
    if (userPersonal?.Gender?.length > 3) {
      setGenderIsValid(true);
    } else {
      setGenderIsValid(false);
    }
    userPersonal.Phone_No = String(phoneNo);
  }, [phoneNo?.length, userPersonal, phoneNo]);

  console.log(userPersonal);

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
  ];

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <FormContainer>
        <div className="flex gap-7 mb-5">
          <div className="w-full">
            <label htmlFor="Religion">Religion</label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600 "
              type="text"
              name="Religion"
              id="Religion"
              value={userPersonal.Religion || ""}
              onChange={userPersonalOnChange}
              minLength={4}
              maxLength={15}
              required
              placeholder="What is your Religion?"
            />
          </div>
          <div className="w-full">
            <label htmlFor="Language">Language</label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600 "
              type="text"
              name="Language"
              id="Language"
              value={userPersonal.Language || ""}
              onChange={userPersonalOnChange}
              minLength={4}
              maxLength={15}
              required
              placeholder="What is your basic language?"
            />
          </div>
        </div>
        <div className="flex gap-7 mb-5">
          <div className="w-full">
            <label htmlFor="Nick_Name">Nick Name</label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none "
              type="text"
              name="Nick_Name"
              id="Nick_Name"
              value={userPersonal.Nick_Name || ""}
              onChange={userPersonalOnChange}
              placeholder="Add a Nickname, if any? Optional"
            />
          </div>
          <div className="w-full">
            <label htmlFor="Marital_Status">Marital Status</label>
            <select
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
              name="Marital_Status"
              id="Marital_Status"
              onChange={userPersonalOnChange}
              required
              minLength={4}
            >
              <option value="">Relationship Status</option>
              {marital_Status?.map((status, i) => (
                <option key={i} className="bg-white text-black" value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-7 mb-5">
          <div className="w-full">
            <label htmlFor="Phone_No">Phone No</label>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              value={phoneNo}
              onChange={(e) => setPhoneNo(e)}
              required
              defaultCountry="PK"
              className={`px-5 h-9 border-[3px] ${
                phoneNumberIsValid ? "border-green-600" : "border-transparent"
              }  text-black w-full mt-2 rounded-md focus:outline-none  bg-white`}
            />
          </div>
          <div className="w-full">
            <label htmlFor="Date_of_Birth">Date of Birth</label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
              type="date"
              name="Date_of_Birth"
              id="Date_of_Birth"
              value={userPersonal.Date_of_Birth || ""}
              onChange={userPersonalOnChange}
              minLength={4}
              required
            />
          </div>
        </div>

        <div className=" mb-5">
          <label htmlFor="gender">Gender</label>
          <div
            id="gender"
            className={`w-full mt-2 bg-white text-myblue border-[3px]  rounded-md h-9 flex items-center justify-evenly ${
              genderIsValid ? "border-green-600" : "border-transparent"
            }`}
            onChange={userPersonalOnChange}
          >
            <div>
              <input
                id="male"
                type="radio"
                name="Gender"
                value="Male"
                required
                className="p-10"
              />
              <label htmlFor="male" className="font-semibold ml-4">
                Male
              </label>
            </div>
            <div>
              <input
                id="female"
                type="radio"
                name="Gender"
                value="Female"
                required
              />
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
                required
                className="p-10"
              />
              <label htmlFor="others" className="font-semibold ml-4">
                Others
              </label>
            </div>
          </div>
        </div>
      </FormContainer>
    </div>
  );
};

export default UserPersonal;
