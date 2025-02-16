import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobById } from "../services/jobsService";
import { candidateApply, checkIfApplied } from "../services/candidateApplyService";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false); // Check if applied
  const userId = "67b11d4d111917d7e6942544"; // Replace with actual logged-in user ID

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const jobData = await getJobById(id);
        setJob(jobData);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    const checkApplicationStatus = async () => {
      const applied = await checkIfApplied(id, userId);
      setHasApplied(applied);
    };

    fetchJob();
    checkApplicationStatus();
  }, [id, userId]);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);

    try {
      const applicationData = new FormData();
      applicationData.append("jobId", id);
      applicationData.append("userId", userId);
      applicationData.append("resume", resume);
      applicationData.append("coverLetter", coverLetter);

      await candidateApply(applicationData);
      alert("Application submitted successfully!");
      setHasApplied(true); // Mark as applied
      setIsModalOpen(false);
    } catch (error) {
      alert("Failed to submit application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading job details...</p>;
  }

  if (!job) {
    return <p className="text-center text-red-500 mt-10">Job not found or an error occurred.</p>;
  }

  return (
    <div className="bg-base-100 min-h-screen flex flex-col">
      <div className="bg-base-100 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img src="/images/Logo.jpg" alt="Logo" className="h-14 w-14 object-cover" />
            </Link>
          </div>
          <div>
            <Link to="/" className="btn btn-secondary">← Back to Jobs</Link>
          </div>
        </div>
      </div>

      <main key={job._id} className="flex-1 container mx-auto p-6 sm:p-10">
        <div className="grid grid-cols-5 justify-center gap-4 items-center w-full">
          <div className="bg-base-100 p-8 shadow-lg rounded-lg border border-base-300 col-span-3">
            <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
            <p className="text-lg text-gray-600 mb-2">{job.workOptions}</p>
            <p className="text-md text-white-800 mb-4">{job.description}</p>
            <p className="text-md text-white-800 mb-4"><strong>Response Time:</strong> {job.responseTime}</p>
            
            <div className="flex justify-between items-center mt-4">
              <p className="text-xl font-bold text-primary">₱{job.salary.toLocaleString()}</p>
              <span className={`badge ${job.employmentType === 'Full-time' ? 'badge-primary' : 'badge-secondary'}`}>
                {job.employmentType}
              </span>
            </div>
          </div>

          <div className="col-span-2 bg-base-100 p-8 shadow-lg rounded-lg border border-base-300">
            {hasApplied ? (
              <button className="btn btn-success w-full" disabled>Applied</button>
            ) : (
              <button className="btn btn-primary w-full" onClick={() => setIsModalOpen(true)}>Apply Now</button>
            )}
          </div>
        </div>
      </main>

      {/* Apply Now Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Apply for {job.title}</h2>
            <form onSubmit={handleApply}>
              <label className="block mb-2">Resume (PDF or DOCX):</label>
              <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="file-input file-input-bordered w-full mb-4" required />

              <label className="block mb-2">Cover Letter:</label>
              <textarea 
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="textarea textarea-bordered w-full mb-4"
                placeholder="Write a short cover letter..."
              />

              <div className="flex justify-between mt-4">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
