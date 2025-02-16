export const candidateApply = async (applicationData) => {
  try {
    const response = await fetch("http://localhost:5000/api/candidates/apply", {
      method: "POST",
      body: applicationData, // FormData for file upload
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error submitting application");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
};

export const checkIfApplied = async (jobId, userId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/candidates/has-applied/${jobId}/${userId}`);
    if (!response.ok) throw new Error("Error checking application status");
    
    const data = await response.json();
    return data.hasApplied;
  } catch (error) {
    console.error("Error checking application status:", error);
    return false;
  }
};

