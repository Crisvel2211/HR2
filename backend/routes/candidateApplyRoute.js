import express from "express";
import upload from "../middlewares/upload.js";
import {
  applyForJob,
  getAllApplications,
  getUserApplications,
  updateApplicationStatus,
  deleteApplication, checkingApplication
} from "../controllers/candidateApplyController.js";

const router = express.Router();

router.post("/apply", upload.single("resume"), applyForJob);
router.get("/has-applied/:jobId/:userId", checkingApplication);
router.get("/all", getAllApplications); // Get all applications (Admin/Recruiter)
router.get("/user/:userId", getUserApplications); // Get applications by user ID
router.put("/update/:applicationId", updateApplicationStatus); // Update application status
router.delete("/delete/:applicationId", deleteApplication); // Delete application

export default router;
