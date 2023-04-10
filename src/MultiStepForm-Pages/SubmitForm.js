import React from "react";

const SubmitForm = ({ values, setFormIsValid, formIsValid }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const key = Object.keys(values);
  const value = Object.values(values);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className=" h-full overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-algoBlueTwo ">
      <div className="flex w-full text-white text-sm font-light pl-10 py-2">
        <ul>
          {key?.slice(1).map((keys, i) => (
            <li key={i}>{keys}</li>
          ))}
        </ul>
        <ul className="ml-5">
          {value?.slice(1).map((values, i) => (
            <li key={i}>
              <span className="mr-5">:</span> {values}
            </li>
          ))}
        </ul>
      </div>
      <div className="  text-sm text-white  flex items-start mt-10  mb-5">
        <h1 className="whitespace-nowrap text-base font-semibold">Note :</h1>
        <p className="tracking-wide ml-2 pr-28 ">
          Please input valid credentials of yours, your UserName will be
          displayed on your Profile Page, Phone_Number & Email_Address will be
          used to verify your Account via OTP text message & Email, Thank You!
        </p>
      </div>
      <div className="  text-sm text-white  flex items-center mt-8 justify-end mb-10 pr-20">
        <input
          className="ml-5 "
          type="checkbox"
          onClick={() => setFormIsValid(!formIsValid)}
        />

        <p className="tracking-wide ml-3  ">
          I have read and Agree to Terms & Conditions.
        </p>
      </div>
    </div>
  );
};

export default SubmitForm;
