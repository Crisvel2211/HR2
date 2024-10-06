import React, { useState } from 'react';

function Training() {
  const [entries, setEntries] = useState(10); // State to store the selected number of entries

  const handleEntriesChange = (e) => {
    setEntries(e.target.value); // Update the state when the dropdown value changes
  };

  const data = [
    {
      id: 1,
      trainingType: 'Leadership',
      trainer: 'John Doe',
      employee: 'Jane Smith',
      duration: '3 hours',
      description: 'Leadership skills training',
      status: 'Completed',
    },
    {
      id: 2,
      trainingType: 'Time Management',
      trainer: 'Alice Brown',
      employee: 'Mark Lee',
      duration: '2 hours',
      description: 'Time management techniques',
      status: 'Pending',
    },
    {
      id: 3,
      trainingType: 'Time Management',
      trainer: 'Alice Brown',
      employee: 'Mark Lee',
      duration: '2 hours',
      description: 'Time management techniques',
      status: 'Pending',
    },
    {
      id: 4,
      trainingType: 'Time Management',
      trainer: 'Alice Brown',
      employee: 'Mark Lee',
      duration: '2 hours',
      description: 'Time management techniques',
      status: 'Pending',
    },
    {
      id: 5,
      trainingType: 'Time Management',
      trainer: 'Alice Brown',
      employee: 'Mark Lee',
      duration: '2 hours',
      description: 'Time management techniques',
      status: 'Pending',
    },
    // Add more entries here...
  ];

  return (
    <div className="bg-gray-200 text-black h-auto p-5">
      
      {/* Header Section */}
      <div className="flex justify-center items-center p-2 ">
        <div className="w-5/6 font-bold text-xl">Training List</div>
        <div className="w-1/6">
          <button className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
          className="bg-white border border-gray-300 rounded px-2 flex"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <p className="ml-2">entries</p>
      </div>

      <div className="p-5 ">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-300">
          <tr>
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Training Type</th>
            <th className="py-2 px-4 border">Trainer</th>
            <th className="py-2 px-4 border">Employee</th>
            <th className="py-2 px-4 border">Time Duration</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id} className="border-t">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{row.trainingType}</td>
              <td className="py-2 px-4 border">{row.trainer}</td>
              <td className="py-2 px-4 border">{row.employee}</td>
              <td className="py-2 px-4 border">{row.duration}</td>
              <td className="py-2 px-4 border">{row.description}</td>
              <td className="py-2 px-4 border">
                <span
                  className={`px-2 py-1 rounded-full text-sm flex justify-center items-center space-x-2 ${
                    row.status === 'Completed' ? 'bg-green-200' : 'bg-yellow-200'
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="py-2 px-4 flex justify-center items-center space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {/* Placeholder for entries */}
      <div className="px-6 ">
        <p>Showing 1 to 5 of {entries} entries.</p>
      </div>

    </div>
  );
}

export default Training;
