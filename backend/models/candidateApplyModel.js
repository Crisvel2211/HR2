import mongoose from "mongoose";

const candidateApplySchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPosting",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: String, // Store file path or URL
      required: true,
    },
    coverLetter: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Interview Scheduled", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// **Ensure a user can only apply once per job**
candidateApplySchema.index({ jobId: 1, userId: 1 }, { unique: true });

const CandidateApply = mongoose.model("CandidateApply", candidateApplySchema);
export default CandidateApply;
