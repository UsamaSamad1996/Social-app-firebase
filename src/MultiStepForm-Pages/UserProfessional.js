import React from "react";
import FormContainer from "./FormContainer";

const UserProfessional = ({ userProfessional, userProfessionalOnChange }) => {
  return (
    <div>
      {/* <FormContainer>
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
      </FormContainer> */}
    </div>
  );
};

export default UserProfessional;
