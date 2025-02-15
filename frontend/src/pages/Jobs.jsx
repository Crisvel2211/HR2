import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllJobs } from '../services/jobsService';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getAllJobs();
        console.log('Jobs fetched:', jobsData);
        setJobs(jobsData); // Set only the array of jobs
      } catch (error) {
        alert(error.message);
        setJobs([]); // Prevent errors if fetch fails
      }
    };
    fetchJobs();
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-base-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-base-100 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/Logo.jpg" // Replace with your logo path
              alt="Logo"
              className="h-14 w-14 object-cover"
            />
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4">
            <input
              type="text"
              placeholder="Search Jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full max-w-md"
            />
          </div>

          {/* Login Button */}
          <div>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 sm:p-10">
        {/* Full-time Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
          
          {filteredJobs.length === 0 ? (
            <p className="text-gray-500 text-center">No jobs found.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Link
                  to={`/jobs/${job._id}`} // Add link to job details page
                  key={job._id}
                  className="bg-base-100 p-6 shadow-lg rounded-lg border border-base-300 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.workOptions}</p>
                    <p className="text-md text-white-800 mt-2">
                      {job.description}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-bold text-primary">${job.salary}</p>
                    <span
                      className={`badge ${
                        job.employmentType === 'Full-time' ? 'badge-primary' : 'badge-secondary'
                      }`}
                    >
                      {job.employmentType}
                    </span>
                  </div>
                </Link>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default Jobs;
