import React, { PureComponent } from "react";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { RiPassPendingLine } from "react-icons/ri";
import { MdOutlinePeopleAlt, MdRemoveRedEye } from "react-icons/md";
import { GrMoney } from "react-icons/gr";

function Jobposting () {
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
    <div className="bg-white shadow-lg w-full sm:w-1/2 md:w-1/4 p-5 rounded-lg mt-3  min-h-[200px] flex flex-col justify-between">
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
    <div className="bg-white shadow-lg w-full sm:w-1/2 md:w-1/4 p-5 rounded-lg mt-3  min-h-[200px] flex flex-col justify-between">
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
    <div className="bg-white shadow-lg w-full sm:w-1/2 md:w-1/4 p-5 rounded-lg mt-3  min-h-[200px] flex flex-col justify-between">
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
</div>

  );
};

export default Jobposting;
