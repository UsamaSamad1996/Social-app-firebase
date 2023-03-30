import React, { useEffect, useMemo, useState } from "react";
import FormContainer from "./FormContainer";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// import {
//   getCountries,
//   getCountryCallingCode,
// } from "react-phone-number-input/input";
// import countryNames from "react-phone-number-input/locale/en";

const UserPersonal = ({ userPersonal, userPersonalOnChange }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [value, setValue] = useState("");

  useEffect(() => {
    userPersonal.Phone_No = String(value);
  }, [userPersonal, value]);

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

  const options = useMemo(() => countryList().getData(), []);

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
            <label htmlFor="CurrentCountry" className="font-semibold ">
              Country
            </label>
            <select
              className="px-5 py-2 border-4 border-gray-500 text-black w-full mt-2 rounded-lg focus:outline-none valid:border-green-600"
              name="Current_Country"
              id="CurrentCountry"
              onChange={userPersonalOnChange}
              required
              minLength={3}
            >
              <option value="">Where are you living?</option>
              {options?.map((country, i) => (
                <option
                  key={i}
                  className="bg-gray-200 text-black"
                  value={country.label}
                >
                  {country.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="FromCountry" className="font-semibold ">
              From
            </label>
            <select
              className="px-5 py-2 border-4 border-gray-500 text-black w-full mt-2 rounded-lg focus:outline-none valid:border-green-600"
              name="From_Country"
              id="FromCountry"
              onChange={userPersonalOnChange}
              required
              minLength={3}
            >
              <option value="">Country, Where are you from?</option>
              {options?.map((country, i) => (
                <option
                  key={i}
                  className="bg-gray-200 text-black"
                  value={country.label}
                >
                  {country.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-7 mb-5">
          <div className="w-full">
            <label htmlFor="City" className="font-semibold ">
              City
            </label>
            <input
              className={`px-5 py-2 border-4 border-gray-500 text-black w-full mt-2 rounded-lg focus:outline-none valid:border-green-600`}
              type="text"
              name="City"
              id="City"
              value={userPersonal.City || ""}
              onChange={userPersonalOnChange}
              minLength={3}
              maxLength={15}
              required
              placeholder="Karachi"
            />
          </div>
          <div className="w-full">
            <label htmlFor="Marital_Status" className="font-semibold ">
              Marital Status
            </label>
            <select
              className="px-5 py-2 border-4 border-gray-500 text-black w-full mt-2 rounded-lg focus:outline-none valid:border-green-600"
              name="Marital_Status"
              id="Marital_Status"
              onChange={userPersonalOnChange}
              required
              minLength={3}
            >
              <option value="">Marital Status</option>
              {marital_Status?.map((status, i) => (
                <option
                  key={i}
                  className="bg-gray-200 text-black"
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-7 mb-5">
          <div className="w-full">
            <label htmlFor="City" className="font-semibold ">
              Phone No
            </label>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              value={value}
              onChange={setValue}
              className="px-5 py-2 border-4 border-gray-500 text-black w-full mt-2 rounded-lg focus:outline-none valid:border-green-600 bg-white"
            />
          </div>
          <div className="w-full">
            <label htmlFor="Phone_No" className="font-semibold ">
              Phone No.
            </label>
            <input
              className="px-5 py-2 border-4 border-gray-500 text-black w-full mt-2 rounded-lg focus:outline-none valid:border-green-600"
              type="text"
              name="Phone_No"
              id="Phone_No"
              value={value}
              onChange={userPersonalOnChange}
              minLength={3}
              required
            />
          </div>
        </div>

        <div className=" mb-5">
          <label htmlFor="gender" className="font-semibold ">
            Gender
          </label>
          <div
            id="gender"
            className="w-full border-4 mt-2 bg-white text-myblue border-gray-500 rounded-lg py-2 flex items-center justify-evenly valid:border-green-600"
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
