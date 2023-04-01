import React, { useEffect, useMemo, useState } from "react";
import FormContainer from "./FormContainer";
import countryList from "react-select-country-list";
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
            <label htmlFor="CurrentCountry">Country</label>
            <select
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
              name="Current_Country"
              id="CurrentCountry"
              onChange={userPersonalOnChange}
              required
              minLength={4}
            >
              <option value="">Where are you living?</option>
              {options?.map((country, i) => (
                <option
                  key={i}
                  className="bg-white text-black"
                  value={country.label}
                >
                  {country.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="FromCountry">From</label>
            <select
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
              name="From_Country"
              id="FromCountry"
              onChange={userPersonalOnChange}
              required
              minLength={4}
            >
              <option value="">Country, Where are you from?</option>
              {options?.map((country, i) => (
                <option
                  key={i}
                  className="bg-white text-black"
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
            <label htmlFor="City">City</label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600 "
              type="text"
              name="City"
              id="City"
              value={userPersonal.City || ""}
              onChange={userPersonalOnChange}
              minLength={4}
              maxLength={15}
              required
              placeholder="Karachi"
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
              <option value="">Marital Status</option>
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
