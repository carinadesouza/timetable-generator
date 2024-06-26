"use client";
import React, { useState } from "react";
import { Modal, Form, Select, message,Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SubmitSubjectData from "../../Database/SubmitSubjectData";

const { Option } = Select;

const SubjectForm: React.FC = () => {
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectCode, setSubjectCode] = useState<string>("");
  const [lecture, setLecture] = useState<string>("");
  const [tutorial, setTutorial] = useState<string>("");
  const [practical, setPractical] = useState<string>("");

  const [semester, setSemester] = useState<string>("");
  const [department, setDepartment] = useState<string | undefined>(undefined);
  const [requireSplit, setRequireSplit] = useState<string | undefined>(
    undefined
  );
  // const [faculty, setFaculty] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({
    subjectName: false,
    subjectCode: false,
    lecture: false,
    tutorial: false,
    practical: false,

    semester: false,
    department: false,
    requireSplit: false,
    // faculty: false,
  });
  const handleFieldTouch = (field: string) => {
    setTouchedFields({
      ...touchedFields,
      [field]: true,
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    // Resetting all state values when canceling the modal
    setSubjectName("");
    setSubjectCode("");
    setLecture("");
    setTutorial("");
    setPractical("");

    setSemester("");
    setDepartment(undefined);
    setRequireSplit(undefined);
    // setFaculty("");
  };
  const handleSubjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectName(e.target.value);
  };

  const handleSubjectCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectCode(e.target.value);
  };

  const handleLectureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10); // Convert the input value to a number
    if (!isNaN(value)) {
      setLecture(value.toString()); // Update the state with the converted value
    }
  };

  const handleTutorialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setTutorial(value.toString());
    }
  };

  const handlePracticalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setPractical(value.toString());
    }
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSemester(e.target.value);
  };

  const handleDepartmentChange = (value: string) => {
    setDepartment(value);
    handleFieldTouch("department");
  };

  const handleRequireSplitChange = (value: string) => {
    setRequireSplit(value);
    handleFieldTouch("requireSplit");
  };

  // const handleFacultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFaculty(e.target.value);
  // };
  const handleSubmit = async () => {
    setIsLoading(true);

    // Validation for required fields
    const emptyFields = {
      subjectName: !subjectName.trim(),
      subjectCode: !subjectCode.trim(),
      lecture: !lecture.trim(),
      tutorial: !tutorial.trim(),
      practical: !practical.trim(),
      semester: !semester.trim(),
      department: !department,
      requireSplit: !requireSplit,
    };
    const anyEmptyField = Object.values(emptyFields).some((field) => field);

    if (anyEmptyField) {
      message.error("Please fill in all required fields.");
      setTouchedFields({
        subjectName: emptyFields.subjectName,
        subjectCode: emptyFields.subjectCode,
        lecture: emptyFields.lecture,
        tutorial: emptyFields.tutorial,
        practical: emptyFields.practical,
        semester: emptyFields.semester,
        department: emptyFields.department,
        requireSplit: emptyFields.requireSplit,
      });
      setIsLoading(false);
      return;
    }

    const formData = {
      subjectName, // Include subjectName as the name field
      subjectCode, // Add the subjectCode as the code field
      lecture: parseInt(lecture, 10),
      tutorial: parseInt(tutorial, 10),
      practical: parseInt(practical, 10),
      semester: parseInt(semester, 10),
      department,
      requireSplit,
    };

    try {
      console.log(formData);
      await SubmitSubjectData(formData);
      setTimeout(() => {
        setSubjectName("");
        setSubjectCode("");
        setLecture("");
        setTutorial("");
        setPractical("");
        setSemester("");
        setDepartment(undefined);
        setRequireSplit(undefined);
        setIsModalOpen(false);
        setIsLoading(false);
        setTouchedFields({
          subjectName: false,
          subjectCode: false,
          lecture: false,
          tutorial: false,
          practical: false,
          semester: false,
          department: false,
          requireSplit: false,
        });
      }, 700); // Simulating a delay before showing the success notification
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative">
      <div className="absolute top-1 right-1 z-50 ">
        <button
          onClick={showModal}
          className="rounded-md px-3.5 py-2 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 hover:text-white"
        >
          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span className="flex items-center relative text-indigo-600 transition duration-300 group-hover:text-white ease">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V6a1 1 0 112 0v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3z"
                clipRule="evenodd"
              />
            </svg>{" "}
            Add Subject
          </span>
        </button>
      </div>

      {isModalOpen && ( // Conditionally render the Modal
        <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
          <Form onFinish={handleSubmit}>
            <div className="grid gap-6 mt-2 mb-6 md:grid-cols-2">
              <Form.Item
              // validateStatus={
              //   touchedFields.subjectName && !subjectName ? "error" : ""
              // }
              // help={
              //   touchedFields.subjectName && !subjectName
              //     ? "Please enter faculty name"
              //     : ""
              // }
              >
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Name
                </label>
                <Input
                  className={`border ${
                    touchedFields.subjectName &&
                    !subjectName &&
                    "border-red-500"
                  } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="Enter the name.."
                  value={subjectName}
                  onChange={handleSubjectNameChange}
                />
              </Form.Item>
              <Form.Item
              // validateStatus={
              //   touchedFields.subjectName && !subjectName ? "error" : ""
              // }
              // help={
              //   touchedFields.subjectName && !subjectName
              //     ? "Please enter faculty name"
              //     : ""
              // }
              >
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Code
                </label>
                <Input
                  className={`border ${
                    touchedFields.subjectCode &&
                    !subjectCode &&
                    "border-red-500"
                  } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="Enter the code.."
                  value={subjectCode}
                  onChange={handleSubjectCodeChange}
                />
              </Form.Item>
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Subject Code
                </label>
                <input
                  type="text"
                  className={`border ${
                    touchedFields.subjectCode &&
                    !subjectCode &&
                    "border-red-500"
                  } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="eg. CE710"
                  value={subjectCode}
                  onChange={(e) => {
                    handleSubjectCodeChange(e);
                    handleFieldTouch("subjectCode");
                  }}
                />
              </div> */}
              <div className="grid gap-3 mb-2 md:grid-cols-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Lecture
                  </label>
                  <input
                    type="number"
                    className={`border ${
                      touchedFields.lecture && !lecture && "border-red-500"
                    } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    value={lecture}
                    onChange={handleLectureChange}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Tutorial
                  </label>
                  <input
                    type="number"
                    className={`border ${
                      touchedFields.tutorial && !tutorial && "border-red-500"
                    } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    value={tutorial}
                    onChange={handleTutorialChange}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Practical
                  </label>
                  <input
                    type="number"
                    className={`border ${
                      touchedFields.practical && !practical && "border-red-500"
                    } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    value={practical}
                    onChange={handlePracticalChange}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Semester
                </label>
                <input
                  type="number"
                  className={`border ${
                    touchedFields.semester && !semester && "border-red-500"
                  } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="Offered in which sem?"
                  value={semester}
                  onChange={(e) => {
                    handleSemesterChange(e);
                    handleFieldTouch("semester");
                  }}
                />
              </div>

              <div style={{ position: "relative", width: "100%" }}>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Department
                </label>
                <Form.Item
                  validateStatus={
                    touchedFields.department &&
                    (!department || department === "undefined")
                      ? "error"
                      : ""
                  }
                  help={
                    touchedFields.department &&
                    (!department || department === "undefined")
                      ? "Please select a department"
                      : ""
                  }
                >
                  <Select
                    placeholder="Select Department"
                    value={department}
                    onChange={(value) => {
                      setDepartment(value);
                      handleFieldTouch("department");
                    }}
                    style={{ height: 42 }}
                  >
                    <Option value="undefined" disabled>
                      Select an option
                    </Option>
                    <Option value="MECH">Mechanical</Option>
                    <Option value="ECOMP">ECOMP</Option>
                    <Option value="COMP">Computer</Option>
                    <Option value="IT">IT</Option>
                    <Option value="HUMANITIES">HUMANITIES</Option>
                  </Select>
                </Form.Item>
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  marginTop: "-0.5rem",
                }}
              >
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Split
                </label>
                <Form.Item
                  validateStatus={
                    touchedFields.requireSplit &&
                    (!requireSplit || requireSplit === "undefined")
                      ? "error"
                      : ""
                  }
                  help={
                    touchedFields.requireSplit &&
                    (!requireSplit || requireSplit === "undefined")
                      ? "Please select an option"
                      : ""
                  }
                >
                  <Select
                    placeholder="Require split?"
                    value={requireSplit}
                    onChange={(value) => {
                      setRequireSplit(value);
                      handleFieldTouch("requireSplit");
                    }}
                    style={{ height: 42, marginTop: 7 }}
                  >
                    <Option value="undefined" disabled>
                      Select an option
                    </Option>
                    <Option value="YES">YES</Option>
                    <Option value="NO">NO</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="flex justify-center items-center mb-8 ">
              {isLoading ? (
                <div className="text-center b gap-2 w-full inline-flex items-center justify-center p-4 px-6 py-3 bg-gray-100 border-2 border-purple-500 rounded-lg shadow-md text-indigo-600 text-base">
                  <LoadingOutlined style={{ fontSize: 24 }} spin /> Loading...
                </div>
              ) : (
                <button
                  type="submit"
                  className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-lg shadow-md group w-full"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                    Submit
                  </span>
                  <span className="relative invisible">Submit</span>
                </button>
              )}
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default SubjectForm;
