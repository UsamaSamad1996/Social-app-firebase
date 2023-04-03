import React from "react";
import FormContainer from "./FormContainer";

const UserProfessional = ({ userProfessional, userProfessionalOnChange }) => {
  const qualifications = [
    "Metric",
    "Intermediate",
    "Diploma",
    "Associate degree",
    "Bachelor’s/Honours degree",
    "Master’s degree",
    "Doctoral degree/PhD",
    "Others",
  ];

  const field_of_Education = [
    "Pre-Engineering",
    "Pre-Medical",
    "Arts",
    "Commerce",
    "Others",
  ];
  return (
    <div>
      <FormContainer>
        <div className="flex gap-7 mb-5">
          <div className="w-full">
            <label htmlFor="Qualification">Qualification</label>
            <select
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
              name="Qualification"
              id="Qualification"
              onChange={userProfessionalOnChange}
              required
              minLength={4}
            >
              <option value="">What is your Qualification?</option>
              {qualifications?.map((degrees, i) => (
                <option key={i} className="bg-white text-black" value={degrees}>
                  {degrees}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="Field_of_Education">Field of Education</label>
            <select
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
              name="Field_of_Education"
              id="Field_of_Education"
              onChange={userProfessionalOnChange}
              required
              minLength={4}
            >
              <option value="">What is your Field of Education?</option>
              {field_of_Education?.map((courses, i) => (
                <option key={i} className="bg-white text-black" value={courses}>
                  {courses}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-7 mb-5">
          <div className="w-full">
            <label htmlFor="School">
              School <span className="text-[12px] ml-1">(Optional)</span>
            </label>
            <input
              className={`px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600`}
              type="text"
              name="School"
              id="School"
              value={userProfessional.School || ""}
              onChange={userProfessionalOnChange}
              minLength={3}
              maxLength={15}
              placeholder="Add School"
            />
          </div>
          <div className="w-full">
            <label htmlFor="College">
              College <span className="text-[12px] ml-1">(Optional)</span>
            </label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
              type="text"
              name="College"
              id="College"
              value={userProfessional.College || ""}
              onChange={userProfessionalOnChange}
              minLength={3}
              maxLength={15}
              placeholder="Add College"
            />
          </div>
        </div>
        <div className="flex gap-7 mb-5">
          <div className="w-full">
            <label htmlFor="University">
              University <span className="text-[12px] ml-1">(Optional)</span>
            </label>
            <input
              className={`px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600`}
              type="text"
              name="University"
              id="University"
              value={userProfessional.University || ""}
              onChange={userProfessionalOnChange}
              minLength={3}
              maxLength={15}
              placeholder="Add University"
            />
          </div>
          <div className="w-full">
            <label htmlFor="Job">Work</label>
            <input
              className="px-5 h-9 border-[3px] border-transparent text-black w-full mt-2 rounded-md focus:outline-none valid:border-green-600"
              type="text"
              name="Job"
              id="Job"
              value={userProfessional.Job || ""}
              onChange={userProfessionalOnChange}
              minLength={3}
              maxLength={15}
              required
              placeholder="What work you do? Job or Business"
            />
          </div>
        </div>
      </FormContainer>
    </div>
  );
};

export default UserProfessional;
