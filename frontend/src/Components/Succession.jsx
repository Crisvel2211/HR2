import React, { useState, useEffect } from 'react';

function Succession() {
  // Retrieve data from local storage
  const getStoredData = () => {
    const data = localStorage.getItem('trainers');
    return data ? JSON.parse(data) : [];
  };

  const [trainingData, setTrainingData] = useState(getStoredData());
  const [form, setForm] = useState({
    id: '',
    employeeName: '',
    currentPosition: '',
    potentialRole: '',
    status: '',
  });

  // Update local storage whenever trainingData changes
  useEffect(() => {
    localStorage.setItem('trainers', JSON.stringify(trainingData));
  }, [trainingData]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update Record
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      // Update
      setTrainingData(
        trainingData.map((item) =>
          item.id === parseInt(form.id) ? { ...form, id: parseInt(form.id) } : item
        )
      );
    } else {
      // Create with unique ID
      const newId = trainingData.length ? Math.max(trainingData.map(item => item.id)) + 1 : 1;
      setTrainingData([...trainingData, { ...form, id: newId }]);
    }
    // Reset form
    setForm({
      id: '',
      employeeName: '',
      currentPosition: '',
      potentialRole: '',
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Employee Development Management</h2>

      {/* Training Records Table */}
      <table className="table-auto w-full bg-base-100 shadow-md rounded-lg">
        <thead>
          <tr className="bg-base-200">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Employee Name</th>
            <th className="px-4 py-2">Current Position</th>
            <th className="px-4 py-2">Potential Role</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Row for Add/Edit */}
          <tr>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="employeeName"
                value={form.employeeName}
                onChange={handleChange}
                placeholder="Employee Name"
                className="input input-bordered"
                required
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="currentPosition"
                value={form.currentPosition}
                onChange={handleChange}
                placeholder="Current Position"
                className="input input-bordered"
                required
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="potentialRole"
                value={form.potentialRole}
                onChange={handleChange}
                placeholder="Potential Role"
                className="input input-bordered"
                required
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="status"
                value={form.status}
                onChange={handleChange}
                placeholder="Status"
                className="input input-bordered"
                required
              />
            </td>
            <td className="border px-4 py-2">
              <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                {form.id ? 'Update' : 'Add'}
              </button>
            </td>
          </tr>

          {trainingData.map((training) => (
            <tr key={training.id}>
              <td className="border px-4 py-2">{training.id}</td>
              <td className="border px-4 py-2">{training.employeeName}</td>
              <td className="border px-4 py-2">{training.currentPosition}</td>
              <td className="border px-4 py-2">{training.potentialRole}</td>
              <td className="border px-4 py-2">{training.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(training.id)}
                  className="btn btn-sm bg-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(training.id)}
                  className="btn btn-sm bg-red-500"
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

export default Succession;
