import { useState, useEffect } from "react";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  IoFileTrayOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { RiFilePaper2Line } from "react-icons/ri";
import { FiBox } from "react-icons/fi";
import { FaChalkboard, FaGraduationCap, FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaChalkboardUser, FaChartPie } from "react-icons/fa6";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Recruitment and Applicant dropdown
  const [isPerformanceDropdownOpen, setIsPerformanceDropdownOpen] = useState(false); // Performance management dropdown
  const [isLearningDropdownOpen, setIsLearningDropdownOpen] = useState(false); // Learning and development dropdown

  // Load dropdown states from localStorage on component mount
  useEffect(() => {
    const storedDropdownState = localStorage.getItem("isDropdownOpen");
    const storedPerformanceDropdownState = localStorage.getItem("isPerformanceDropdownOpen");
    const storedLearningDropdownState = localStorage.getItem("isLearningDropdownOpen");

    if (storedDropdownState) setIsDropdownOpen(JSON.parse(storedDropdownState));
    if (storedPerformanceDropdownState) setIsPerformanceDropdownOpen(JSON.parse(storedPerformanceDropdownState));
    if (storedLearningDropdownState) setIsLearningDropdownOpen(JSON.parse(storedLearningDropdownState));
  }, []);

  // Toggle and store the state in localStorage
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => {
      const newState = !prev;
      localStorage.setItem("isDropdownOpen", newState);
      return newState;
    });
  };

  const togglePerformanceDropdown = () => {
    setIsPerformanceDropdownOpen((prev) => {
      const newState = !prev;
      localStorage.setItem("isPerformanceDropdownOpen", newState);
      return newState;
    });
  };

  const toggleLearningDropdown = () => {
    setIsLearningDropdownOpen((prev) => {
      const newState = !prev;
      localStorage.setItem("isLearningDropdownOpen", newState);
      return newState;
    });
  };

  return (
    <div
      className={`flex flex-col h-screen bg-white text-black px-4 py-4 border-r-2 sticky top-0 max-md:hidden transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72 lg:w-80"
      }`}
      aria-label="Sidebar"
    >
      {/* Toggle Button */}
      <div className="flex justify-end">
        <button
          onClick={toggleSidebar}
          className={`mb-4 p-1 text-black border border-gray-300 rounded-md hover:bg-gray-200 transition duration-200 ${
            isCollapsed ? "w-11" : "w-11"
          }`}
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? "▶" : "◀"}
        </button>
      </div>
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer mb-8 justify-center"
        aria-label="Dashboard Logo"
      >
        <NavLink
          to="/dashboard" // Link to the main dashboard page
          className="flex justify-center items-center gap-2"
        >
          <img
              src="/images/Logo.jpg" // Replace with your logo path
              alt="Logo"
              className="h-14 w-14 object-cover"
            />
          {!isCollapsed && <p className="text-xl font-bold">Dashboard</p>}
        </NavLink>
      </div>

      {/* Dashboard Dropdown */}
      <div>
        <NavLink
          to="/" // Update this to the path of your Dashboard page
          className="flex items-center gap-2 hover:bg-gray-300 transition-all duration-300 p-2 rounded-md mb-4 cursor-pointer"
          aria-label="Navigate to Dashboard"
        >
          <MdOutlineScreenshotMonitor className="w-5 h-5" />
          {!isCollapsed &&<p className="text-sm font-semibold">Dashboard</p>}
        </NavLink>
      </div>

      {/* Recruitment and Applicant */}
      <div className="mb-2">
        <p className={`text-gray-500 mb-2 font-semibold text-sm ${isCollapsed ? "hidden" : ""}`}>
          Modules
        </p>
        <div
          className="flex gap-2 items-center cursor-pointer text-sm hover:text-blue-500 transition duration-200"
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-controls="apps-dropdown"
          aria-label="Recruitment and Applicant"
        >
          <FaUserPlus className="w-5 h-5" />
          {!isCollapsed && <span>Recruitment and Applicant</span>}
          {!isCollapsed && (
            <div className="ml-auto">
              {isDropdownOpen ? <IoIosArrowUp size={15} /> : <IoIosArrowDown size={15} />}
            </div>
          )}
        </div>
        <ul
          id="apps-dropdown"
          className={`pl-6 mt-1 space-y-1 overflow-hidden transition-max-height duration-500 ease-in-out ${isDropdownOpen ? "max-h-screen" : "max-h-0"}`}
        >
          {[{
              name: "Job Posting",
              path: "/jobPosting",
            },
            {
              name: "Applicant",
              path: "/Applicant",
            },
          ].map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={`text-sm flex justify-between py-1 cursor-pointer hover:text-blue-500 transition ${isCollapsed ? "hidden" : ""}`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Performance Management */}
      <div className="mb-2">
        <p className={`text-gray-500 mb-2 font-semibold text-sm ${isCollapsed ? "hidden" : ""}`}>
          PERFORMANCE
        </p>
        <div
          className="flex gap-2 items-center cursor-pointer text-sm hover:text-blue-500 transition duration-200"
          onClick={togglePerformanceDropdown}
          aria-expanded={isPerformanceDropdownOpen}
          aria-controls="performance-dropdown"
          aria-label="Performance Management"
        >
          <FaChartPie className="w-5 h-5" />
          {!isCollapsed && <span>Performance Management</span>}
          {!isCollapsed && (
            <div className="ml-auto">
              {isPerformanceDropdownOpen ? <IoIosArrowUp size={15} /> : <IoIosArrowDown size={15} />}
            </div>
          )}
        </div>
        <ul
          id="performance-dropdown"
          className={`pl-6 mt-1 space-y-1 overflow-hidden transition-max-height duration-500 ease-in-out ${isPerformanceDropdownOpen ? "max-h-screen" : "max-h-0"}`}
        >
          {[{
              name: "Performance Indicator",
              path: "/performanceIndicator",
            },
            {
              name: "Performance Review",
              path: "/performanceReview",
            },
            {
              name: "Performance Appraisal",
              path: "/performanceappraisal",
            },
          ].map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={`text-sm flex justify-between py-1 cursor-pointer hover:text-blue-500 transition ${isCollapsed ? "hidden" : ""}`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Learning and Development */}
      <div className="mb-2">
        <p className={`text-gray-500 mb-2 font-semibold text-sm ${isCollapsed ? "hidden" : ""}`}>
          LEARNING
        </p>
        <div
          className="flex gap-2 items-center cursor-pointer text-sm hover:text-blue-500 transition duration-200"
          onClick={toggleLearningDropdown}
          aria-expanded={isLearningDropdownOpen}
          aria-controls="learning-dropdown"
          aria-label="Learning and Development"
        >
          <FaChalkboardUser className="w-5 h-5" />
          {!isCollapsed && <span>Learning and Development</span>}
          {!isCollapsed && (
            <div className="ml-auto">
              {isLearningDropdownOpen ? <IoIosArrowUp size={15} /> : <IoIosArrowDown size={15} />}
            </div>
          )}
        </div>
        <ul
          id="learning-dropdown"
          className={`pl-6 mt-1 space-y-1 overflow-hidden transition-max-height duration-500 ease-in-out ${isLearningDropdownOpen ? "max-h-screen" : "max-h-0"}`}
        >
          {[{
              name: "Training List",
              path: "/trainingList",
            },
            {
              name: "Trainers",
              path: "/trainers",
            },
            {
              name: "Training Type",
              path: "/trainingType",
            },
          ].map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={`text-sm flex justify-between py-1 cursor-pointer hover:text-blue-500 transition ${isCollapsed ? "hidden" : ""}`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Promotion */}
      <p className={`text-gray-500 mb-2 font-semibold text-sm ${isCollapsed ? "hidden" : ""}`}>
        SUCCESSION
      </p>
      <NavLink
        to="/succession" // Update this to the path of your Promotion page
        className="flex gap-2 items-center text-sm cursor-pointer mb-2 hover:text-blue-500 transition"
        aria-label="Navigate to Promotion"
      >
        <FaGraduationCap className="w-5 h-5" />
        {!isCollapsed && <p>Promotion</p>}
      </NavLink>
    </div>
  );
}

export default Sidebar;
