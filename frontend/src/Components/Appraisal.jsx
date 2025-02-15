import React, { useState, useEffect } from 'react';

function PerformanceAppraisal() {
  const getStoredData = () => {
    const data = localStorage.getItem('trainingTypes');
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
    picture: null, // New field for uploaded image
  });

  useEffect(() => {
    localStorage.setItem('trainingTypes', JSON.stringify(trainingData));
  }, [trainingData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // Handle file input separately
    if (name === 'picture') {
      setForm({ ...form, picture: files[0] }); // Store the file object
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      ...form,
      id: form.id ? parseInt(form.id) : (trainingData.length ? Math.max(trainingData.map(item => item.id)) + 1 : 1),
    };

    setTrainingData(form.id ? trainingData.map((item) => (item.id === newRecord.id ? newRecord : item)) : [...trainingData, newRecord]);

    setForm({
      id: '',
      trainer: '',
      contactNumber: '',
      email: '',
      description: '',
      status: '',
      picture: null,
    });
  };

  const handleDelete = (id) => {
    setTrainingData(trainingData.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const recordToEdit = trainingData.find((item) => item.id === id);
    setForm(recordToEdit);
  };

  // Function to get a URL for the uploaded image (for preview)
  const getImageURL = (file) => (file ? URL.createObjectURL(file) : null);

  return (
    <div className="bg-gray-200 text-black h-auto p-5">
      <p className="font-bold text-xl mb-1 flex items-center p-2">Trainer Management</p>

      <table className="table-auto w-full bg-base-100 shadow-md rounded-lg mb-6">
        <thead>
          <tr className="bg-base-200">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Picture</th>
            <th className="px-4 py-2">Trainer</th>
            <th className="px-4 py-2">Contact Number</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2">
              <input
                type="file"
                name="picture"
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {form.picture && (
                <img
                  src={getImageURL(form.picture)}
                  alt="Preview"
                  className="w-16 h-16 object-cover mt-2"
                />
              )}
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="trainer"
                value={form.trainer}
                onChange={handleChange}
                placeholder="Trainer"
                className="input input-bordered w-full"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                placeholder="Contact Number"
                className="input input-bordered w-full"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="input input-bordered w-full"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="input input-bordered w-full"
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
              <td className="border px-4 py-2">
                {training.picture && (
                  <img
                    src={getImageURL(training.picture)}
                    alt="Preview"
                    className="w-16 h-16 object-cover"
                  />
                )}
              </td>
              <td className="border px-4 py-2">{training.trainer}</td>
              <td className="border px-4 py-2">{training.contactNumber}</td>
              <td className="border px-4 py-2">{training.email}</td>
              <td className="border px-4 py-2">{training.description}</td>
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

export default PerformanceAppraisal;
