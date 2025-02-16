

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getAllJobs, updateJob, deleteJob, createJob } from "../services/jobsService";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    workOptions: "On-site",
    urgency: "Urgent",
    responseTime: "",
    employmentType: "Full-time",
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

  const handleCreate = async () => {
    const success = await createJob(formData);
    if (success) {
      setFormData({
        title: "",
        description: "",
        salary: "",
        workOptions: "",
        urgency: "",
        responseTime: "", 
        employmentType: "",
      });
      setShowCreateModal(false);
      fetchJobs();
    }
  };

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setFormData({
      title: job.title,
      description: job.description, // Added missing description
      salary: job.salary,
      workOptions: job.workOptions,
      urgency: job.urgency,
      responseTime: job.responseTime, // Added missing response time
      employmentType: job.employmentType,
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
      <button className="btn btn-primary mb-4" onClick={() => setShowCreateModal(true)}>Add New Job</button>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
  <table className="table-auto w-full border border-gray-300">
    <thead className="bg-gray-100 text-gray-700">
      <tr className="text-left">
        <th className="p-3 w-10">#</th>
        <th className="p-3 w-48">Title</th>
        <th className="p-3 w-96">Description</th>
        <th className="p-3 w-24 text-right">Salary</th>
        <th className="p-3 w-32">Work Options</th>
        <th className="p-3 w-20">Urgency</th>
        <th className="p-3 w-32">Response Time</th>
        <th className="p-3 w-24">Employment Type</th>
        <th className="p-3 w-20 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <tr key={job._id} className="border-t hover:bg-gray-50 transition">
            <td className="p-3">{index + 1}</td>
            <td className="p-3 font-semibold">{job.title}</td>
            <td className="p-3 truncate">{job.description}</td>
            <td className="p-3 text-right">₱{job.salary.toLocaleString()}</td>
            <td className="p-3">{job.workOptions}</td>
            <td className="p-3">{job.urgency}</td>
            <td className="p-3">{job.responseTime}</td>
            <td className="p-3">{job.employmentType}</td>
            <td className="p-3 text-center">
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => handleEditClick(job)}
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteClick(job)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </td>

          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="9" className="text-center text-gray-500 p-4">
            No job postings available.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      {showCreateModal && (
        <div  id="modal-overlay"
        className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center"
        onClick={(e) => handleModalClick(e, setShowEditModal)}>
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Create New Job</h2>
            <input type="text" className="input input-bordered w-full mb-3" placeholder="Job Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            <textarea className="input input-bordered w-full mb-3" placeholder="Job Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <input type="number" className="input input-bordered w-full mb-3" placeholder="Salary" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} />
    
            <select className="input input-bordered w-full mb-3" value={formData.employmentType} onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>

            <select className="input input-bordered w-full mb-3" value={formData.urgency} onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}>
              <option value="Urgent">Urgent</option>
              <option value="Normal">Normal</option>
              
            </select>

            <select
              className="select select-bordered w-full mb-3"
              value={formData.responseTime}
              onChange={(e) => setFormData({ ...formData, responseTime: e.target.value })}
            >
             
              <option value="Typically responds within 1 day">Typically responds within 1 day</option>
              <option value="Typically responds within 3 days">Typically responds within 3 days</option>
              <option value="No response time stated">No response time stated</option>
            </select>

            <div className="flex justify-around space-x-2">
              <button className="btn btn-success" onClick={handleCreate}>Create</button>
              <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
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
            <textarea
              className="input input-bordered w-full mb-3"
              placeholder="Job Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input
              type="number"
              className="input input-bordered w-full mb-3"
              placeholder="Salary"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
            

            
            {/* Work Options Dropdown */}
            <select
              className="select select-bordered w-full mb-3"
              value={formData.workOptions || ""}
              onChange={(e) => setFormData({ ...formData, workOptions: e.target.value })}
            >
              <option value="Work from home">Work from home</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            {/* Work Options Dropdown */}
            <select
              className="select select-bordered w-full mb-3"
              value={formData.urgency || ""}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
            >
              <option value="Urgent">Urgent</option>
              <option value="Normal">Normal</option>
              
            </select>

            {/* respone time Dropdown */}
            <select
              className="select select-bordered w-full mb-3"
              value={formData.responseTime || ""}
              onChange={(e) => setFormData({ ...formData, responseTime: e.target.value })}
            >
              <option value="Typically responds within 1 day">Typically responds within 1 day</option>
              <option value="Typically responds within 3 days">Typically responds within 3 days</option>
              <option value="No response time stated">No response time stated</option>
            </select>

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
