import React, { useState, useEffect } from 'react';

function Indicator() {
  // Retrieve data from local storage
  const getStoredData = () => {
    const data = localStorage.getItem('designations');
    return data ? JSON.parse(data) : [];
  };

  const [designationData, setDesignationData] = useState(getStoredData());
  const [form, setForm] = useState({
    id: '',
    designation: '',
    department: '',
    addedBy: '',
    createdAt: '',
    status: '',
  });

  // Update local storage whenever designationData changes
  useEffect(() => {
    localStorage.setItem('designations', JSON.stringify(designationData));
  }, [designationData]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update Record
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      // Update existing record
      setDesignationData(
        designationData.map((item) =>
          item.id === parseInt(form.id) ? { ...form, id: parseInt(form.id) } : item
        )
      );
    } else {
      // Create new record
      setDesignationData([
        ...designationData,
        {
          ...form,
          id: designationData.length + 1,
          createdAt: new Date().toISOString().split('T')[0],
        },
      ]);
    }
    // Reset form
    setForm({
      id: '',
      designation: '',
      department: '',
      addedBy: '',
      createdAt: '',
      status: '',
    });
  };

  // Delete Record
  const handleDelete = (id) => {
    setDesignationData(designationData.filter((item) => item.id !== id));
  };

  // Edit Record
  const handleEdit = (id) => {
    const recordToEdit = designationData.find((item) => item.id === id);
    setForm(recordToEdit);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Designation Management</h2>

      {/* Form for Add/Edit */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            name="addedBy"
            value={form.addedBy}
            onChange={handleChange}
            placeholder="Added By"
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

      {/* Designation Records Table */}
      <table className="table-auto w-full bg-base-100 shadow-md rounded-lg">
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
          {designationData.map((designation) => (
            <tr key={designation.id}>
              <td className="border px-4 py-2">{designation.id}</td>
              <td className="border px-4 py-2">{designation.designation}</td>
              <td className="border px-4 py-2">{designation.department}</td>
              <td className="border px-4 py-2">{designation.addedBy}</td>
              <td className="border px-4 py-2">{designation.createdAt}</td>
              <td className="border px-4 py-2">{designation.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(designation.id)}
                  className="btn btn-sm bg-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(designation.id)}
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
