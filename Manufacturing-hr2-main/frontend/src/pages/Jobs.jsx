import React from 'react';
import { Link } from 'react-router-dom';

function Jobs() {
  const jobs = [
    { title: 'Software Engineer', company: 'Company A', type: 'Fulltime' },
    { title: 'Project Manager', company: 'Company B', type: 'Part-time' },
    { title: 'UI/UX Designer', company: 'Company C', type: 'Fulltime' },
    { title: 'Data Analyst', company: 'Company D', type: 'Part-time' },
    { title: 'DevOps Engineer', company: 'Company E', type: 'Fulltime' },
    { title: 'Marketing Specialist', company: 'Company F', type: 'Part-time' },
    { title: 'DevOps Engineer', company: 'Company G', type: 'Fulltime' },
    { title: 'Marketing Specialist', company: 'Company H', type: 'Part-time' }
  ];

  // Filter fulltime and part-time jobs
  const fullTimeJobs = jobs.filter((job) => job.type === 'Fulltime');
  const partTimeJobs = jobs.filter((job) => job.type === 'Part-time');

  return (
    <div className="bg-base-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-base-100 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/.jpg" // Replace with your logo path
              alt="Logo"
              className="h-10 w-10 object-cover"
            />
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4">
            <input
              type="text"
              placeholder="Search"
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
          <h2 className="text-2xl font-bold mb-4">Fulltime Jobs</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fullTimeJobs.map((job, index) => (
              <li
                key={index}
                className="bg-base-100 p-8 shadow-lg rounded-lg border border-base-300 flex justify-between items-center h-40"
              >
                <div>
                  <h3 className="text-2xl font-semibold">{job.title}</h3>
                  <p className="text-lg text-base-content">Company: {job.company}</p>
                </div>
                <button className="btn btn-md btn-primary">Fulltime</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Part-time Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Part-time Jobs</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {partTimeJobs.map((job, index) => (
              <li
                key={index}
                className="bg-base-100 p-8 shadow-lg rounded-lg border border-base-300 flex justify-between items-center h-40"
              >
                <div>
                  <h3 className="text-2xl font-semibold">{job.title}</h3>
                  <p className="text-lg text-base-content">Company: {job.company}</p>
                </div>
                <button className="btn btn-md btn-secondary">Part-time</button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Jobs;
