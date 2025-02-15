import React, { useState, useEffect } from 'react';

function Indicator() { 
  // Function to retrieve training data from local storage
  const getStoredData = () => {
    const data = localStorage.getItem('trainingTypes');
    return data ? JSON.parse(data) : [];
  };

  // Initial state with data from local storage
  const [trainingData, setTrainingData] = useState(getStoredData());
  const [form, setForm] = useState({
    id: '',
    designation: '', // Updated to match your structure
    department: '', // New field added
    addedBy: '', // New field added
    createdAt: new Date().toISOString().split('T')[0], // Set current date
    status: '',
  });

  // Update local storage whenever trainingData changes
  useEffect(() => {
    localStorage.setItem('trainingTypes', JSON.stringify(trainingData));
  }, [trainingData]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update Record
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      // Update existing record
      setTrainingData(
        trainingData.map((item) =>
          item.id === parseInt(form.id) ? { ...form, id: parseInt(form.id), createdAt: item.createdAt } : item
        )
      );
    } else {
      // Create with a unique ID
      const newId = trainingData.length ? Math.max(trainingData.map(item => item.id)) + 1 : 1;
      setTrainingData([
        ...trainingData,
        { ...form, id: newId } // Keep createdAt as is
      ]);
    }
    // Reset form
    resetForm();
  };

  // Reset form function
  const resetForm = () => {
    setForm({
      id: '',
      designation: '',
      department: '',
      addedBy: '',
      createdAt: new Date().toISOString().split('T')[0], // Reset to current date
      status: '',
    });
  };

  // Delete Record
  const handleDelete = (id) => {
    setTrainingData(trainingData.filter((item) => item.id !== id));
  };

  // Edit Record
  const handleEdit = (id) => {
    const recordToEdit = trainingData.find((item) => item.id === id);
    setForm(recordToEdit);
  };

  return (
    <div className="bg-gray-200 text-black h-auto p-5">
      <p className="font-bold text-xl mb-1 flex items-center p-2">Trainer Management</p>

      {/* Training Records Table */}
      <table className="table-auto w-full bg-base-100 shadow-md rounded-lg mb-6">
        <thead>
          <tr className="bg-base-200">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Designation</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Added By</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Form Row for Adding New Trainer */}
          <tr>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="Designation"
                className="input input-bordered w-full"
                required
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Department"
                className="input input-bordered w-full"
                required
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="addedBy"
                value={form.addedBy}
                onChange={handleChange}
                placeholder="Added By"
                className="input input-bordered w-full"
                required
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="date"
                name="createdAt"
                value={form.createdAt}
                onChange={handleChange}
                className="input input-bordered w-full"
                disabled // Prevent editing of createdAt
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="status"
                value={form.status}
                onChange={handleChange}
                placeholder="Status"
                className="input input-bordered w-full"
                required
              />
            </td>
            <td className="border px-4 py-2 flex justify-center items-center">
              <button onClick={handleSubmit} className="btn btn-primary mt-1">
                {form.id ? 'Update' : 'Add'}
              </button>
            </td>
          </tr>

          {trainingData.map((training) => (
            <tr key={training.id}>
              <td className="border px-4 py-2">{training.id}</td>
              <td className="border px-4 py-2">{training.designation}</td>
              <td className="border px-4 py-2">{training.department}</td>
              <td className="border px-4 py-2">{training.addedBy}</td>
              <td className="border px-4 py-2">{training.createdAt}</td>
              <td className="border px-4 py-2">{training.status}</td>
              <td className="p-2 flex justify-center items-center">
                <button
                  onClick={() => handleEdit(training.id)}
                  className="btn btn-sm bg-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(training.id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Indicator; 