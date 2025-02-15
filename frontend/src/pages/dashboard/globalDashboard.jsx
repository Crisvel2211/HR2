import React from 'react'
import { useSelector } from "react-redux";
import HrDashboard from '../HrDashboard';
const globalDashboard = () => {
    const { currentUser } = useSelector((state) => state.user);
  return (
    <>
  {currentUser.role === "admin" ? (
    <HrDashboard/>
  ) : currentUser.role === "employee" ? (
    <p>Welcome to the Employee Dashboard</p>
  ) : currentUser.role === "applicant" ? (
    <p>Welcome to the Applicant Dashboard</p>
  ) : currentUser.role === "superadmin" ? (
    <p>Welcome to the Super Admin Dashboard</p>
  ) : (
    <p>Unauthorized Access</p>
  )}
</>

  
  )
}

export default globalDashboard
