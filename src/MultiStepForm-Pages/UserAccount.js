import React from "react";
import FormContainer from "./FormContainer";

const UserAccount = ({ userAccount, userAccountOnChange }) => {
  return (
    <div>
      <FormContainer>
        <div className="flex gap-7 mb-5">
          <div className="w-full">
            <label htmlFor="First_Name">FirstName</label>
            <input
              className={`px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600`}
              type="text"
              name="First_Name"
              id="First_Name"
              value={userAccount.First_Name || ""}
              onChange={userAccountOnChange}
              minLength={3}
              maxLength={15}
              required
              placeholder="Lionel"
            />
          </div>
          <div className="w-full">
            <label htmlFor="Last_Name">LastName</label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
              type="text"
              name="Last_Name"
              id="Last_Name"
              value={userAccount.Last_Name || ""}
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
            <label htmlFor="User_Name">UserName</label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
              type="text"
              name="User_Name"
              id="User_Name"
              value={userAccount.User_Name || ""}
              onChange={userAccountOnChange}
              minLength={3}
              maxLength={25}
              required
              placeholder="Lionel Messi"
            />
          </div>
          <div className="w-full">
            <label htmlFor="Father_Name">Father's Name</label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
              type="text"
              name="Father_Name"
              id="Father_Name"
              value={userAccount.Father_Name || ""}
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
            <label htmlFor="Email">Email</label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
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
            <label htmlFor="Password">Password</label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
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
            <label htmlFor="Confirm_Password">Confirm Password</label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
              type="password"
              name="Confirm_Password"
              id="Confirm_Password"
              value={userAccount.Confirm_Password || ""}
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
