import express from "express";
import {
  createJobPosting,
  getJobPostings,
  getJobPostingById,
  updateJobPosting,
  deleteJobPosting,
} from "../controllers/jobPostingController.js";

const router = express.Router();

// Routes for job postings
router.post("/", createJobPosting); // Create a new job posting
router.get("/", getJobPostings); // Get all job postings
router.get("/:id", getJobPostingById); // Get a single job posting by ID
router.put("/:id", updateJobPosting); // Update a job posting
router.delete("/:id", deleteJobPosting); // Delete a job posting

export default router;
