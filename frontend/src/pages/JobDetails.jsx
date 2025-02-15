import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobById } from "../services/jobsService";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true); // Start loading
        const jobData = await getJobById(id);
        console.log("Job fetched:", jobData);
        setJob(jobData);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setJob(null);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading job details...</p>;
  }

  if (!job) {
    return <p className="text-center text-red-500 mt-10">Job not found or an error occurred.</p>;
  }

  return (
    <div className="bg-base-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-base-100 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/Logo.jpg" // Replace with your actual logo path
              alt="Logo"
              className="h-14 w-14 object-cover"
            />
          </div>

          {/* Back Button */}
          <div>
            <Link to="/" className="btn btn-secondary">← Back to Jobs</Link>
          </div>
        </div>
      </div>

      {/* Job Details Section */}
      <main key={job._id} className="flex-1 container mx-auto p-6 sm:p-10">
        <div className="bg-base-100 p-8 shadow-lg rounded-lg border border-base-300">
          <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
          <p className="text-lg text-gray-600 mb-2">{job.workOptions}</p>
          <p className="text-md text-white-800 mb-4">{job.description}</p>
          <p className="text-md text-white-800 mb-4"><strong>Response Time:</strong> {job.responseTime}</p>
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-bold text-primary">${job.salary}</p>
            <span
              className={`badge ${
                job.employmentType === 'Full-time' ? 'badge-primary' : 'badge-secondary'
              }`}
            >
              {job.employmentType}
            </span>
          </div>

          <div className="mt-6">
            <Link to="/apply" className="btn btn-primary w-full">Apply Now</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;
