import mongoose from "mongoose";

const jobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Remove extra spaces around the title
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: Number, // Using Number for salary, could be extended to include range or currency
      required: true,
    },
    workOptions: {
      type: String,
      enum: ["Work from home", "On-site", "Hybrid"],
      default: "On-site", // Default work option is on-site
    },
    urgency: {
      type: Boolean,
      default: false, // If job is urgently hiring
    },
    responseTime: {
      type: String,
      enum: ["Typically responds within 1 day", "Typically responds within 3 days", "No response time stated"],
      default: "Typically responds within 1 day",
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract"],
      required: true, // Required to specify employment type
    },
    lastResponseTime: {
      type: Date,
      default: Date.now, // Date when the job posting was last responded to
    },
    postedAt: {
      type: Date,
      default: Date.now, // Automatically set the time the job is posted
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
const JobPosting = mongoose.model("JobPosting", jobPostingSchema);
export default JobPosting;
