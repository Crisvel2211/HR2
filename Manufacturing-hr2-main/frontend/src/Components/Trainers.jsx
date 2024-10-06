import React, { useState, useEffect } from 'react';

function Trainers() {
  // Retrieve data from local storage
  const getStoredData = () => {
    const data = localStorage.getItem('trainers');
    return data ? JSON.parse(data) : [];
  };

  const [trainingData, setTrainingData] = useState(getStoredData());
  const [form, setForm] = useState({
    id: '',
    trainer: '',
    contactNumber: '',
    email: '',
    description: '',
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
      // Create
      setTrainingData([
        ...trainingData,
        { ...form, id: trainingData.length + 1 },
      ]);
    }
    // Reset form
    setForm({
      id: '',
      trainer: '',
      contactNumber: '',
      email: '',
      description: '',
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
      <h2 className="text-2xl font-bold mb-4">Trainer Management</h2>

      {/* Form for Add/Edit */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="trainer"
            value={form.trainer}
            onChange={handleChange}
            placeholder="Trainer"
            className="input input-bordered"
            required
          />
          <input
            type="text"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            className="input input-bordered"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered"
            required
          />
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="input input-bordered"
            required
          />
          <input
            type="text"
            name="status"
            value={form.status}
            onChange={handleChange}
            placeholder="Status"
            className="input input-bordered"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          {form.id ? 'Update' : 'Add'}
        </button>
      </form>

      {/* Training Records Table */}
      <table className="table-auto w-full bg-base-100 shadow-md rounded-lg">
        <thead>
          <tr className="bg-base-200">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Trainer</th>
            <th className="px-4 py-2">Contact Number</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainingData.map((training) => (
            <tr key={training.id}>
              <td className="border px-4 py-2">{training.id}</td>
              <td className="border px-4 py-2">{training.trainer}</td>
              <td className="border px-4 py-2">{training.contactNumber}</td>
              <td className="border px-4 py-2">{training.email}</td>
              <td className="border px-4 py-2">{training.description}</td>
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

export default Trainers;
