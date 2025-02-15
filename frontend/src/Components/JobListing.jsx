import React, { useState, useEffect } from "react";
import { getAllJobs, updateJob, deleteJob } from "../services/jobsService";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    employmentType: "",
    salary: "",
    workOptions: "On-site",
    urgency: false,
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const jobList = await getAllJobs();
    setJobs(jobList);
    setLoading(false);
  };

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setFormData({
      title: job.title,
      employmentType: job.employmentType,
      salary: job.salary,
      workOptions: job.workOptions,
      urgency: job.urgency,
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (job) => {
    setSelectedJob(job);
    setShowDeleteModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedJob) return;

    const updatedData = { ...formData };
    const success = await updateJob(selectedJob._id, updatedData);

    if (success) {
      setShowEditModal(false);
      fetchJobs(); // Refresh list
    }
  };

  const handleDelete = async () => {
    if (!selectedJob) return;

    const success = await deleteJob(selectedJob._id);
    if (success) {
      setShowDeleteModal(false);
      fetchJobs(); // Refresh list
    }
  };

  const handleModalClick = (e, modalSetter) => {
    if (e.target.id === "modal-overlay") {
      modalSetter(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading job postings...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Job Postings Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">#</th>
              <th className="p-2">Title</th>
              <th className="p-2">Employment Type</th>
              <th className="p-2">Salary</th>
              <th className="p-2">Work Options</th>
              <th className="p-2">Urgency</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <tr key={job._id} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 font-semibold">{job.title}</td>
                  <td className="p-2">{job.employmentType}</td>
                  <td className="p-2">${job.salary.toLocaleString()}</td>
                  <td className="p-2">{job.workOptions}</td>
                  <td className="p-2">
                    {job.urgency ? <span className="badge badge-error">Urgent</span> : <span className="badge badge-success">Normal</span>}
                  </td>
                  <td className="p-2 flex space-x-2">
                    <button className="btn btn-sm btn-warning" onClick={() => handleEditClick(job)}>Edit</button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDeleteClick(job)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 p-4">No job postings available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Job Modal */}
      {showEditModal && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center"
          onClick={(e) => handleModalClick(e, setShowEditModal)}
        >
          <div className="bg-white p-6 rounded-lg w-1/3" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Edit Job</h2>
            <input
              type="text"
              className="input input-bordered w-full mb-3"
              placeholder="Job Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <select
              className="input input-bordered w-full mb-3"
              value={formData.employmentType}
              onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
            <input
              type="number"
              className="input input-bordered w-full mb-3"
              placeholder="Salary"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
            <div className="flex justify-around space-x-2">
              <button className="btn btn-success" onClick={handleUpdate}>Save</button>
              <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center"
          onClick={(e) => handleModalClick(e, setShowDeleteModal)}
        >
          <div className="bg-white p-6 rounded-lg w-1/3" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Delete Job</h2>
            <p>Are you sure you want to delete this job?</p>
            <div className="flex justify-around space-x-2 mt-4">
              <button className="btn btn-error" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListing;
