import React, { useState, useEffect } from 'react';

function PerformanceAppraisal() {
  // Initial Data (loaded from localStorage or set as empty array)
  const initialData = JSON.parse(localStorage.getItem('appraisals')) || [];

  const [appraisalData, setAppraisalData] = useState(initialData);
  const [form, setForm] = useState({
    id: '',
    picture: '',
    employee: '',
    designation: '',
    department: '',
    appraisalDate: '',
    status: '',
  });

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, picture: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Create or Update Record
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().slice(0, 10);

    if (form.id) {
      // Update
      setAppraisalData(
        appraisalData.map((item) =>
          item.id === parseInt(form.id) ? { ...form } : item
        )
      );
    } else {
      // Create
      setAppraisalData([
        ...appraisalData,
        { ...form, id: appraisalData.length + 1, appraisalDate: currentDate },
      ]);
    }
    resetForm();
  };

  // Delete Record
  const handleDelete = (id) => {
    setAppraisalData(appraisalData.filter((item) => item.id !== id));
  };

  // Edit Record
  const handleEdit = (id) => {
    const recordToEdit = appraisalData.find((item) => item.id === id);
    setForm(recordToEdit);
  };

  // Reset Form
  const resetForm = () => {
    setForm({
      id: '',
      picture: '',
      employee: '',
      designation: '',
      department: '',
      appraisalDate: '',
      status: '',
    });
  };

  // Save data to localStorage whenever appraisalData changes
  useEffect(() => {
    localStorage.setItem('appraisals', JSON.stringify(appraisalData));
  }, [appraisalData]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Performance Appraisal Management</h2>

      {/* Form for Add/Edit */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleImageChange}
            className="input input-bordered"
          />
          <input
            type="text"
            name="employee"
            value={form.employee}
            onChange={handleChange}
            placeholder="Employee Name"
            className="input input-bordered"
            required
          />
          <input
            type="text"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="input input-bordered"
            required
          />
          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
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

      {/* Appraisal Records Table */}
      <table className="table-auto w-full bg-base-100 shadow-md rounded-lg">
        <thead>
          <tr className="bg-base-200">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Picture</th>
            <th className="px-4 py-2">Employee</th>
            <th className="px-4 py-2">Designation</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Appraisal Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appraisalData.map((appraisal) => (
            <tr key={appraisal.id}>
              <td className="border px-4 py-2">{appraisal.id}</td>
              <td className="border px-4 py-2">
                {appraisal.picture ? (
                  <img
                    src={appraisal.picture}
                    alt={appraisal.employee}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td className="border px-4 py-2">{appraisal.employee}</td>
              <td className="border px-4 py-2">{appraisal.designation}</td>
              <td className="border px-4 py-2">{appraisal.department}</td>
              <td className="border px-4 py-2">{appraisal.appraisalDate}</td>
              <td className="border px-4 py-2">{appraisal.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(appraisal.id)}
                  className="btn btn-sm bg-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(appraisal.id)}
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
