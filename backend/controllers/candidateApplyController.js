import CandidateApply from "../models/candidateApplyModel.js";
import JobPosting from "../models/JobPostingModel.js";
import User from "../models/userModel.js";

// Apply for a job
export const applyForJob = async (req, res) => {
    try {
      const { jobId, userId, coverLetter } = req.body;
  
      if (!req.file) {
        return res.status(400).json({ error: "Resume file is required!" });
      }
  
      // Check if job and user exist
      const job = await JobPosting.findById(jobId);
      const user = await User.findById(userId);
      if (!job || !user) {
        return res.status(404).json({ error: "Job or user not found!" });
      }
  
      const newApplication = new CandidateApply({
        jobId,
        userId,
        resume: `/uploads/resumes/${req.file.filename}`, // Store file path
        coverLetter,
      });
  
      await newApplication.save();
  
      res.status(201).json({ message: "Application submitted successfully", application: newApplication });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
export const checkingApplication = async (req, res) => {
  try {
    const { jobId, userId } = req.params;
    const application = await CandidateApply.findOne({ jobId, userId });

    if (application) {
      return res.json({ hasApplied: true });
    } else {
      return res.json({ hasApplied: false });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Get all applications (for admin/recruiter)
export const getAllApplications = async (req, res) => {
  try {
    const applications = await CandidateApply.find()
      .populate("jobId", "title") // Populate job details
      .populate("userId", "firstname lastname email"); // Populate applicant details

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get applications by userId (for applicants)
export const getUserApplications = async (req, res) => {
  try {
    const { userId } = req.params;
    const applications = await CandidateApply.find({ userId })
      .populate("jobId", "title") // Populate job details
      .populate("userId", "firstname lastname email");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update application status (for recruiters)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await CandidateApply.findById(applicationId);
    if (!application) return res.status(404).json({ message: "Application not found" });

    application.status = status;
    await application.save();

    res.status(200).json({ message: "Application status updated", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete an application (for applicants/admins)
export const deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await CandidateApply.findById(applicationId);
    if (!application) return res.status(404).json({ message: "Application not found" });

    await application.deleteOne();
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
