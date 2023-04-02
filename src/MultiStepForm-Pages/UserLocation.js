import React, { useMemo } from "react";
import FormContainer from "./FormContainer";
import countryList from "react-select-country-list";

const UserLocation = ({ userLocationOnChange, userLocation }) => {
  const options = useMemo(() => countryList().getData(), []);

  console.log(userLocation);

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
              onChange={userLocationOnChange}
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
            <label htmlFor="FromCountry">Hometown</label>
            <select
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
              name="From_Country"
              id="FromCountry"
              onChange={userLocationOnChange}
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
              value={userLocation.City || ""}
              onChange={userLocationOnChange}
              minLength={4}
              maxLength={15}
              required
              placeholder="In Which city are you living currently?"
            />
          </div>
          <div className="w-full">
            <label htmlFor="City">City</label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600 "
              type="text"
              name="City"
              id="City"
              value={userLocation.City || ""}
              onChange={userLocationOnChange}
              minLength={4}
              maxLength={15}
              required
              placeholder="What is your basic City?"
            />
          </div>
        </div>
      </FormContainer>
    </div>
  );
};

export default UserLocation;
