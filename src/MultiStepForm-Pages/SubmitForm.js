import React from "react";

const SubmitForm = ({ values, setFormIsValid, formIsValid }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const key = Object.keys(values);
  const value = Object.values(values);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className=" h-full overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-myblue ">
      <div className="flex w-full text-white text-sm font-light pl-10 ">
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
          Please input valid credentials of yours, Phone_Number & Email_Address
          will be used to verify the User Account via OTP, Thank You!
        </p>
      </div>
      <div className="  text-sm text-white  flex items-center mt-10  mb-5">
        <div className="py-2 px-3">
          <input type="checkbox" onClick={() => setFormIsValid(!formIsValid)} />
        </div>

        <p className="tracking-wide ml-3 pr-28 ">
          Please input valid credentials of yours, Phone_Number & Email_Address
          will be used to verify the User Account via OTP, Thank You!
        </p>
      </div>
    </div>
  );
};

export default SubmitForm;
