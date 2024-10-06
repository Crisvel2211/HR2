import React, { useState } from 'react';

function TrainingType() {
  const [entries, setEntries] = useState(5); // Number of entries to display
  const [data, setData] = useState([
    {
      id: 1,
      trainingType: 'Leadership Skills',
      description: 'Develop leadership qualities and improve decision-making.',
      status: 'Active',
    },
    {
      id: 2,
      trainingType: 'Time Management',
      description: 'Techniques to improve time utilization and productivity.',
      status: 'Active',
    },
    {
      id: 3,
      trainingType: 'Communication Skills',
      description: 'Improve both verbal and non-verbal communication.',
      status: 'Inactive',
    },
    {
      id: 4,
      trainingType: 'Project Management',
      description: 'Skills to efficiently manage and lead projects.',
      status: 'Active',
    },
  ]);

  const handleEntriesChange = (e) => {
    setEntries(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <div className="bg-gray-200 text-black h-auto p-5">
      {/* Header Section */}
      <div className="flex justify-between items-center p-2">
        <div className="font-bold text-xl px-4">Training Types</div>
        <div className="px-4 flex justify-center items-center">
          <button className="bg-blue-500 text-white rounded hover:bg-blue-600 px-4 py-2">
            + Add New
          </button>
        </div>
      </div>

      {/* Show Entries Dropdown */}
      <div className="flex items-center mt-4 px-6">
        <p className="mr-2">Show</p>
        <select
          value={entries}
          onChange={handleEntriesChange}
          className="bg-white border border-gray-300 rounded px-2"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <p className="ml-2">entries</p>
      </div>

      {/* Table Content */}
      <div className="p-5">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-300">
            <tr>
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Training Type</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, entries).map((row, index) => (
              <tr key={row.id} className="border-t">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{row.trainingType}</td>
                <td className="py-2 px-4 border">{row.description}</td>
                <td className="py-2 px-4 border">
                  <span
                    className={`px-2 py-1 rounded-full text-sm flex justify-center items-center space-x-2 ${
                      row.status === 'Active' ? 'bg-green-200' : 'bg-red-200'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-2 px-4 flex justify-center items-center space-x-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mx-1">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Placeholder for number of entries */}
      <div className="px-6">
        <p>
          Showing 1 to {Math.min(entries, data.length)} of {data.length} entries.
        </p>
      </div>
    </div>
  );
}

export default TrainingType;
