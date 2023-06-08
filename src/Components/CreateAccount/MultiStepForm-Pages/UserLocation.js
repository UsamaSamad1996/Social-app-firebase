import React, { useMemo } from "react";
import FormContainer from "./FormContainer";
import countryList from "react-select-country-list";
import Checked from "../../../Images/checked.svg";

const UserLocation = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const {
    Current_Country: Current_Country_error,
    From_Country: From_Country_error,
    City: City_error,
  } = errors;

  const {
    Current_Country: Current_Country_touched,
    From_Country: From_Country_touched,
  } = touched;

  const options = useMemo(() => countryList().getData(), []);

  return (
    <div>
      <FormContainer>
        <div className="flex gap-7 mb-5">
          <div className="w-full relative">
            <label htmlFor="Current_Country">Country</label>
            <select
              className={`px-5 text-sm h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] appearance-none ${
                Current_Country_touched && Current_Country_error
                  ? "border-red-600"
                  : Current_Country_touched && !Current_Country_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              name="Current_Country"
              id="Current_Country"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Country, Where are you living?</option>
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
            {Current_Country_touched && Current_Country_error ? (
              <p className="text-[12px] text-red-600 absolute right-0">
                {Current_Country_error}
              </p>
            ) : Current_Country_touched && !Current_Country_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
          <div className="w-full relative">
            <label htmlFor="FromCountry">Hometown</label>
            <select
              className={`px-5 text-sm h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] appearance-none ${
                From_Country_touched && From_Country_error
                  ? "border-red-600"
                  : From_Country_touched && !From_Country_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              name="From_Country"
              id="FromCountry"
              onChange={handleChange}
              onBlur={handleBlur}
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
            {From_Country_touched && From_Country_error ? (
              <p className="text-[12px] text-red-600 absolute right-0">
                {From_Country_error}
              </p>
            ) : From_Country_touched && !From_Country_error ? (
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
            <label htmlFor="City">City</label>
            <input
              className={`px-5 text-sm h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                From_Country_touched && City_error
                  ? "border-red-600"
                  : From_Country_touched && !City_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="City"
              id="City"
              value={values.City || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="In which city are you living currently?"
            />
            {From_Country_touched && City_error ? (
              <p className="text-[12px] text-red-600 absolute right-0">
                {City_error}
              </p>
            ) : From_Country_touched && !City_error ? (
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

export default UserLocation;
