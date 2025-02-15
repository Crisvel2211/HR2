import mongoose from "mongoose";
import JobPosting from "../models/JobPostingModel.js";

// Create a new job posting
export const createJobPosting = async (req, res) => {
  try {
    const job = new JobPosting(req.body);
    await job.save();
    res.status(201).json({ message: "Job posting created successfully", job });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all job postings
export const getJobPostings = async (req, res) => {
  try {
    const jobs = await JobPosting.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Job postings retrieved successfully", jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get a single job posting by ID
export const getJobPostingById = async (req, res) => {
  try {
    const jobId = req.params.id.trim();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID format" });
    }

    const job = await JobPosting.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ message: "Job posting retrieved successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update a job posting by ID
export const updateJobPosting = async (req, res) => {
  try {
    const updatedJob = await JobPosting.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Ensure validation rules apply
    });

    if (!updatedJob) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ message: "Job posting updated successfully", updatedJob });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a job posting by ID
export const deleteJobPosting = async (req, res) => {
  try {
    const deletedJob = await JobPosting.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ message: "Job posting deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
