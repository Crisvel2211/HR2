import React from "react";
import {Routes, Route} from "react-router-dom";

import HrDashboard from "./pages/HrDashboard";
import Login from "./pages/Login";
import HrApplicant from "./pages/RECRUITMENT & APPLICANT/HrApplicant";
import HrJobposting from "./pages/RECRUITMENT & APPLICANT/HrJobposting";
import HrIndicator from "./pages/Performance/HrIndicator";
import HrReview from "./pages/Performance/HrReview";
import HrTraining from "./pages/Learning/HrTraining";
import HrSuccession from "./pages/HrSuccession";
import HrTrainers from "./pages/Learning/HrTrainers";
import HrTrainingType from "./pages/Learning/HrTrainingType";
import Jobs from "./pages/Jobs";
import HrAppraisal from "./pages/Performance/HrAppraisal";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HrDashboard/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/jobs" element={<Jobs/>} />
      <Route path="/jobPosting" element={<HrJobposting/>} />
      <Route path="/Applicant" element={<HrApplicant/>} />
      <Route path="/performanceIndicator" element={<HrIndicator/>} />
      <Route path="/performanceappraisal" element={<HrAppraisal/>} />
      <Route path="/performanceReview" element={<HrReview/>} />
      <Route path="/performanceIndicator" element={<HrIndicator/>} />
      <Route path="/trainingList" element={<HrTraining/>} />
      <Route path="/trainers" element={<HrTrainers/>} />
      <Route path="/trainingType" element={<HrTrainingType/>} />
      <Route path="/succession" element={<HrSuccession/>} />
    </Routes>
  );
};

export default App;
