import React from "react";
import FormContainer from "./FormContainer";

const UserAccount = ({ userAccount, userAccountOnChange }) => {
  return (
    <div>
      <FormContainer>
        <div className="flex gap-7 mb-5">
          <div className="w-full">
            <label htmlFor="firstname" className="font-semibold ">
              FirstName
            </label>
            <input
              className={`px-5 py-2 border-4 border-gray-500 text-black w-full mt-2 rounded-lg focus:outline-none valid:border-green-600`}
              type="text"
              name="firstName"
              id="firstname"
              value={userAccount.firstName || ""}
              onChange={userAccountOnChange}
              minLength={3}
              maxLength={15}
              required
              placeholder="Lionel"
            />
          </div>
          <div className="w-full">
            <label htmlFor="lastName" className="font-semibold ">
              LastName
            </label>
            <input
              className="px-5 py-2 border-4 border-gray-500 text-black w-full mt-2 rounded-lg focus:outline-none valid:border-green-600"
              type="text"
              name="lastName"
              id="lastName"
              value={userAccount.lastName || ""}
              onChange={userAccountOnChange}
              minLength={3}
              maxLength={15}
              required
              placeholder="Messi"
            />
          </div>
        </div>
        <div className="flex gap-7 mb-5">
          <div className="w-full">
            <label htmlFor="username" className="font-semibold ">
              UserName
            </label>
            <input
              className="px-5 py-2 border-4 border-gray-500 text-black w-full mt-2 rounded-lg focus:outline-none valid:border-green-600"
              type="text"
              name="userName"
              id="username"
              value={userAccount.userName || ""}
              onChange={userAccountOnChange}
              minLength={3}
              maxLength={25}
              required
              placeholder="Lionel Messi"
            />
          </div>
          <div className="w-full">
            <label htmlFor="fatherName" className="font-semibold ">
              Father's Name
            </label>
            <input
              className="px-5 py-2 border-4 border-gray-500 text-black w-full mt-2 rounded-lg focus:outline-none valid:border-green-600"
              type="text"
              name="fatherName"
              id="fatherName"
              value={userAccount.fatherName || ""}
              onChange={userAccountOnChange}
              minLength={3}
              maxLength={12}
              required
              placeholder="Jorge Messi"
            />
          </div>
        </div>
        <div className="mb-5">
          <div className="w-full">
            <label htmlFor="Email" className="font-semibold ">
              Email
            </label>
            <input
              className="px-5 py-2 border-4 border-gray-500 text-black w-full mt-2 rounded-lg focus:outline-none valid:border-green-600"
              type="email"
              name="Email"
              id="Email"
              value={userAccount.Email || ""}
              onChange={userAccountOnChange}
              minLength={5}
              maxLength={30}
              required
              placeholder="you.name@gmail.com"
            />
          </div>
        </div>
        <div className="flex gap-7 mb-5">
          <div className="w-full">
            <label htmlFor="Password" className="font-semibold ">
              Password
            </label>
            <input
              className="px-5 py-2 border-4 border-gray-500 text-black w-full mt-2 rounded-lg focus:outline-none valid:border-green-600"
              type="password"
              name="Password"
              id="Password"
              value={userAccount.Password || ""}
              onChange={userAccountOnChange}
              minLength={8}
              maxLength={25}
              required
              placeholder="ABCxyz*123/"
            />
          </div>
          <div className="w-full">
            <label htmlFor="ConfirmPassword" className="font-semibold ">
              Confirm Password
            </label>
            <input
              className="px-5 py-2 border-4 border-gray-500 text-black w-full mt-2 rounded-lg focus:outline-none valid:border-green-600"
              type="password"
              name="ConfirmPassword"
              id="ConfirmPassword"
              value={userAccount.ConfirmPassword || ""}
              onChange={userAccountOnChange}
              minLength={8}
              maxLength={25}
              required
              placeholder="ABCxyz*123/"
            />
          </div>
        </div>
      </FormContainer>
    </div>
  );
};

export default UserAccount;
