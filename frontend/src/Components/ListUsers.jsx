import React from "react";

const ListUsers= () => {
  const users = [
    {
      username: "renz",
      firstname: "renz",
      lastname: "legaspi",
      email: "renz1@gmail.com",
      password: "renz123",
      role: "applicant",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Table Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">First Name</th>
              <th className="p-2 border">Last Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.firstname}</td>
                <td className="p-2 border">{user.lastname}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUsers;
