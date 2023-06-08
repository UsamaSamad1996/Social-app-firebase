import React from "react";
import FormContainer from "./FormContainer";
import Checked from "../../../Images/checked.svg";

const UserProfessional = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const {
    Qualification: Qualification_error,
    Field_of_Education: Field_of_Education_error,
    School: School_error,
    College: College_error,
    University: University_error,
    Job: Job_error,
    Company: Company_error,
    Working_Details: Working_Details_error,
  } = errors;

  const {
    Qualification: Qualification_touched,
    Field_of_Education: Field_of_Education_touched,
    School: School_touched,
    College: College_touched,
    University: University_touched,
    Company: Company_touched,
    Working_Details: Working_Details_touched,
  } = touched;

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
    "Engineering",
    "Medical",
    "Arts",
    "Commerce",
    "Others",
  ];
  return (
    <div>
      <FormContainer>
        <div className="flex gap-7 mb-5">
          <div className="w-full relative">
            <label htmlFor="Qualification" className="text-sm">
              Qualification
            </label>
            <select
              className={`text-sm px-5 h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] appearance-none ${
                Qualification_touched && Qualification_error
                  ? "border-red-600"
                  : Qualification_touched && !Qualification_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              name="Qualification"
              id="Qualification"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">What is your Qualification?</option>
              {qualifications?.map((degrees, i) => (
                <option key={i} className="bg-white text-black" value={degrees}>
                  {degrees}
                </option>
              ))}
            </select>
            {Qualification_touched && Qualification_error ? (
              <p className="text-[12px] text-red-600 absolute right-0">
                {Qualification_error}
              </p>
            ) : Qualification_touched && !Qualification_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
          <div className="w-full relative">
            <label htmlFor="Field_of_Education" className="text-sm">
              Field of Education
            </label>
            <select
              className={`text-sm px-5 h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] appearance-none ${
                Field_of_Education_touched && Field_of_Education_error
                  ? "border-red-600"
                  : Field_of_Education_touched && !Field_of_Education_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              name="Field_of_Education"
              id="Field_of_Education"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">What is your Field of Education?</option>
              {field_of_Education?.map((courses, i) => (
                <option key={i} className="bg-white text-black" value={courses}>
                  {courses}
                </option>
              ))}
            </select>
            {Field_of_Education_touched && Field_of_Education_error ? (
              <p className="text-[12px] text-red-600 absolute right-0">
                {Field_of_Education_error}
              </p>
            ) : Field_of_Education_touched && !Field_of_Education_error ? (
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
            <label htmlFor="School" className="text-sm">
              School <span className="text-[12px] ml-1">(Optional)</span>
            </label>
            <input
              className={`text-sm px-5 h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                School_touched && School_error
                  ? "border-red-600"
                  : School_touched && !School_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="School"
              id="School"
              value={values.School || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+ Add School Name"
            />
            {School_touched && School_error ? (
              <p className="text-[12px] text-red-600 absolute right-0">
                {School_error}
              </p>
            ) : School_touched && !School_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
          <div className="w-full relative">
            <label htmlFor="College" className="text-sm">
              College <span className="text-[12px] ml-1">(Optional)</span>
            </label>
            <input
              className={`text-sm px-5 h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                College_touched && College_error
                  ? "border-red-600"
                  : College_touched && !College_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="College"
              id="College"
              value={values.College || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+ Add College Name"
            />
            {College_touched && College_error ? (
              <p className="text-[12px] text-red-600 absolute right-0">
                {College_error}
              </p>
            ) : College_touched && !College_error ? (
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
            <label htmlFor="University" className="text-sm">
              University
            </label>
            <input
              className={`text-sm px-5 h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                University_touched && University_error
                  ? "border-red-600"
                  : University_touched && !University_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="University"
              id="University"
              value={values.University || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+ Add University Name"
            />
            {University_touched && University_error ? (
              <p className="text-[12px] text-red-600 absolute right-0">
                {University_error}
              </p>
            ) : University_touched && !University_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
          <div className="w-full relative">
            <label htmlFor="Job" className="text-sm">
              Work
            </label>
            <input
              className={`text-sm px-5 h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                University_touched && Job_error
                  ? "border-red-600"
                  : University_touched && !Job_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="Job"
              id="Job"
              value={values.Job || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="What work you do? Add Job or Business"
            />
            {University_touched && Job_error ? (
              <p className="text-[12px] text-red-600 absolute right-0">
                {Job_error}
              </p>
            ) : University_touched && !Job_error ? (
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
            <label htmlFor="Company" className="text-sm">
              Company Name
              <span className="text-[12px] ml-1">(Optional)</span>
            </label>
            <input
              className={`text-sm px-5 h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                Company_touched && Company_error
                  ? "border-red-600"
                  : Company_touched && !Company_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="Company"
              id="Company"
              value={values.Company || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Add company or organization name you work in ?"
            />
            {Company_touched && Company_error ? (
              <p className="text-[12px] text-red-600 absolute right-0">
                {Company_error}
              </p>
            ) : Company_touched && !Company_error ? (
              <img
                className="absolute w-4 h-4 right-4 top-[2.65rem]"
                src={Checked}
                alt="true"
              />
            ) : null}
          </div>
          <div className="w-full relative">
            <label htmlFor="Working_Details" className="text-sm">
              Work Details
              <span className="text-[12px] ml-1">(Optional)</span>
            </label>
            <input
              className={`text-sm px-5 h-9 text-black w-full mt-2 rounded-md focus:outline-none border-[3px] ${
                Working_Details_touched && Working_Details_error
                  ? "border-red-600"
                  : Working_Details_touched && !Working_Details_error
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              type="text"
              name="Working_Details"
              id="Working_Details"
              value={values.Working_Details || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="If any Detail of your work you want to add ?"
            />
            {Working_Details_touched && Working_Details_error ? (
              <p className="text-[12px] text-red-600 absolute right-0">
                {Working_Details_error}
              </p>
            ) : Working_Details_touched && !Working_Details_error ? (
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

export default UserProfessional;
