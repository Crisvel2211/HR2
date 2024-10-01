import React, { useState } from 'react';

function Succession() {
  const [entries, setEntries] = useState(5); // State for showing entries
  const [data, setData] = useState([
    {
      id: 1,
      employeeName: 'John Doe',
      currentPosition: 'Senior Manager',
      potentialRole: 'Director of Operations',
      readinessLevel: 'Ready within 6 months',
      developmentActions: 'Leadership Training, Executive Coaching',
      status: 'In Progress',
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      currentPosition: 'Team Lead',
      potentialRole: 'Senior Manager',
      readinessLevel: 'Ready within 1 year',
      developmentActions: 'Project Management Training, Mentoring Program',
      status: 'On Track',
    },
    {
      id: 3,
      employeeName: 'Robert Johnson',
      currentPosition: 'Analyst',
      potentialRole: 'Team Lead',
      readinessLevel: 'Ready within 2 years',
      developmentActions: 'Cross-functional Exposure, Soft Skills Development',
      status: 'Pending Review',
    },
    // Add more entries as needed
  ]);

  const handleEntriesChange = (e) => {
    setEntries(e.target.value);
  };

  const handleDelete = (id) => {
    const filteredData = data.filter((row) => row.id !== id);
    setData(filteredData);
  };

  return (
    <div className="bg-gray-200 text-black h-auto p-5">
      {/* Header Section */}
      <div className="flex justify-between items-center p-2">
        <div className="font-bold text-xl px-4">Succession Planning</div>
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
              <th className="py-2 px-4 border">Employee Name</th>
              <th className="py-2 px-4 border">Current Position</th>
              <th className="py-2 px-4 border">Potential Role</th>
              <th className="py-2 px-4 border">Readiness Level</th>
              <th className="py-2 px-4 border">Development Actions</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, entries).map((row, index) => (
              <tr key={row.id} className="border-t">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{row.employeeName}</td>
                <td className="py-2 px-4 border">{row.currentPosition}</td>
                <td className="py-2 px-4 border">{row.potentialRole}</td>
                <td className="py-2 px-4 border">{row.readinessLevel}</td>
                <td className="py-2 px-4 border">{row.developmentActions}</td>
                <td className="py-2 px-4 border">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      row.status === 'In Progress'
                        ? 'bg-yellow-200'
                        : row.status === 'On Track'
                        ? 'bg-green-200'
                        : 'bg-gray-200'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-2 px-4 border flex justify-center">
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

export default Succession;
