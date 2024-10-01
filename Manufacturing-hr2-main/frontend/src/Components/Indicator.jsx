import React, { useState } from 'react';


function Indicator() {
  const [entries, setEntries] = useState(10); // State to store the selected number of entries

  const handleEntriesChange = (e) => {
    setEntries(e.target.value); // Update the state when the dropdown value changes
  };

    const performanceIndicators = [
        {
          id: 1,
          designation: 'Sales Manager',
          department: 'Sales',
          addedBy: 'John Doe',
          createdAt: '2024-09-16',
          status: 'Active',
        },
        {
          id: 2,
          designation: 'HR Specialist',
          department: 'Human Resources',
          addedBy: 'Jane Smith',
          createdAt: '2024-08-20',
          status: 'Inactive',
        },
        {
          id: 3,
          designation: 'Software Engineer',
          department: 'Engineering',
          addedBy: 'Mike Johnson',
          createdAt: '2024-07-30',
          status: 'Active',
        },
      ];

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-xl font-bold mb-4">Performance Indicator Table</h2>
      <div className="flex items-center mt-4 px-2">
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
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-300">
          <tr>
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Designation</th>
            <th className="py-2 px-4 border">Department</th>
            <th className="py-2 px-4 border">Added By</th>
            <th className="py-2 px-4 border">Created At</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {performanceIndicators.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{item.designation}</td>
              <td className="py-2 px-4 border">{item.department}</td>
              <td className="py-2 px-4 border">{item.addedBy}</td>
              <td className="py-2 px-4 border">{item.createdAt}</td>
              <td className="py-2 px-4 border">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    item.status === 'Active' ? 'bg-green-200' : 'bg-red-200'
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-2 px-4 border">
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
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

      <div className="px-2 ">
        <p>Showing 1 to 5 of {entries} entries.</p>
      </div>
    </div>
  );
}

export default Indicator;
