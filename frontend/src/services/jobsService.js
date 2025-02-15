import axios from 'axios';


export const createJob = async (jobData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/jobs', jobData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error creating job');
  }
};

export const getAllJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs'); // Adjust URL if necessary
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch jobs');
      }
  
      return data.jobs || []; // Extract jobs array
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return []; // Return an empty array on error
    }
  };
  

  export const getJobById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`); // Ensure this endpoint is correct
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch job");
      }
  
      if (!data.job) {
        throw new Error("Job not found");
      }
  
      return data.job; // Return the single job object
    } catch (error) {
      console.error("Error fetching job:", error);
      return null; // Return null if there's an error
    }
  };
  export const updateJob = async (jobId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update job");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error updating job:", error);
      return null;
    }
  };
  
  export const deleteJob = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
  
      return true;
    } catch (error) {
      console.error("Error deleting job:", error);
      return false;
    }
  };
  
  