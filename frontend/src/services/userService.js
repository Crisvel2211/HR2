const API_URL = "http://localhost:5000/api/auth";

export const getAllUsers = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("API Response:", data); // Debugging

    // Ensure the response contains an array of users
    if (Array.isArray(data)) return data;
    return data.users || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const createUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    console.log("Create User Response:", response);
    return response.ok;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

export const updateUser = async (userId, updates) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return response.ok;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, { method: "DELETE" });
    return response.ok;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};
