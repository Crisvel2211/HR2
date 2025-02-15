import React from "react";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { RiPassPendingLine } from "react-icons/ri";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { GrMoney } from "react-icons/gr";

function Jobposting() {
  // Sample data for the applicant list
  const applicants = [
    {
      id: 1,
      name: "John Doe",
      jobTitle: "Software Engineer",
      startDate: "2024-01-15",
      expireDate: "2024-04-15",
      jobType: "Full-Time",
      status: "Active",
      resume: "link_to_resume_1.pdf",
    },
    {
      id: 2,
      name: "Jane Smith",
      jobTitle: "Product Manager",
      startDate: "2024-02-10",
      expireDate: "2024-05-10",
      jobType: "Part-Time",
      status: "Pending",
      resume: "link_to_resume_2.pdf",
    },
    {
      id: 3,
      name: "Sam Johnson",
      jobTitle: "UI/UX Designer",
      startDate: "2024-03-05",
      expireDate: "2024-06-05",
      jobType: "Contract",
      status: "Inactive",
      resume: "link_to_resume_3.pdf",
    },
  ];

  return (
    <div className="bg-gray-200 text-black h-auto p-5">
      <p className="font-bold text-xl mb-1 flex items-center p-2">User Job Dashboard</p>

      {/* Cards */}
      <div className="flex items-stretch justify-center gap-4 p-2 flex-row">
        {/* Revenue Card */}
        <div className="bg-white shadow-lg w-full sm:w-1/2 md:w-1/4 p-5 rounded-lg mt-3 min-h-[200px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 font-semibold text-sm">Offered</p>
            <HiOutlineCurrencyDollar className="text-gray-600 text-xl" />
          </div>
          <div className="flex gap-3 my-3">
            <p className="text-3xl font-bold">100</p>
            <p className="flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
              <IoIosArrowUp className="text-green-700" /> 10.8%
            </p>
          </div>
          <div className="my-3">
            <p className="text-green-700 font-semibold">
              +$128.58 <span className="text-gray-500">than past week</span>
            </p>
          </div>
        </div>

        {/* Sales Card */}
        <div className="bg-white shadow-lg w-full sm:w-1/2 md:w-1/4 p-5 rounded-lg mt-3 min-h-[200px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 font-semibold text-sm">Applied</p>
            <GrMoney className="text-gray-600 text-xl" />
          </div>
          <div className="flex gap-3 my-3">
            <p className="text-3xl font-bold">40</p>
            <p className="flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
              <IoIosArrowUp className="text-green-700" /> 18.2%
            </p>
          </div>
          <div className="my-3">
            <p className="text-green-700 font-semibold">
              +47 <span className="text-gray-500">than past week</span>
            </p>
          </div>
        </div>

        {/* Customer Card */}
        <div className="bg-white shadow-lg w-full sm:w-1/2 md:w-1/4 p-5 rounded-lg mt-3 min-h-[200px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 font-semibold text-sm">Visited</p>
            <MdOutlinePeopleAlt className="text-gray-600 text-xl" />
          </div>
          <div className="flex gap-3 my-3">
            <p className="text-3xl font-bold">374</p>
            <p className="flex items-center gap-1 bg-red-100 text-red-700 rounded-full px-3 py-1 text-sm font-semibold">
              <IoIosArrowDown className="text-red-700" /> 12.4%
            </p>
          </div>
          <div className="my-3">
            <p className="text-red-700 font-semibold">
              -215 <span className="text-gray-500">than past week</span>
            </p>
          </div>
        </div>

        {/* Spending Card */}
        <div className="bg-white shadow-lg w-full sm:w-1/2 md:w-1/4 p-5 rounded-lg mt-3 min-h-[200px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 font-semibold text-sm">Saved</p>
            <RiPassPendingLine className="text-gray-600 text-xl" />
          </div>
          <div className="flex gap-3 my-3">
            <p className="text-3xl font-bold">220</p>
            <p className="flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
              <IoIosArrowUp className="text-green-700" /> 9.1%
            </p>
          </div>
          <div className="my-3">
            <p className="text-green-700 font-semibold">
              +$88.67 <span className="text-gray-500">than past week</span>
            </p>
          </div>
        </div>
      </div>

      {/* Applicants List */}
      <div className="mt-6">
        <p className="font-bold text-xl mb-4">Applicant List</p>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-300">
            <tr>
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Job Title</th>
              <th className="py-2 px-4 border">Start Date</th>
              <th className="py-2 px-4 border">Expire Date</th>
              <th className="py-2 px-4 border">Job Type</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Resume</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.id}>
                <td className="py-2 px-4 border">{applicant.id}</td>
                <td className="py-2 px-4 border">{applicant.name}</td>
                <td className="py-2 px-4 border">{applicant.jobTitle}</td>
                <td className="py-2 px-4 border">{applicant.startDate}</td>
                <td className="py-2 px-4 border">{applicant.expireDate}</td>
                <td className="py-2 px-4 border">{applicant.jobType}</td>
                <td className="py-2 px-4 border">{applicant.status}</td>
                <td className="py-2 px-4 border">
                  <a href={applicant.resume} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                </td>
                <td className="py-2 px-4 border">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Jobposting;
