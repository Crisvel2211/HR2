import { useEffect, useState } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "../services/userService";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "applicant",
  });
  const [editUser, setEditUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const userList = await getAllUsers();
    setUsers([...userList]);
    setLoading(false);
  };

  const handleCreateUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.firstname || !newUser.lastname || !newUser.password) {
      alert("All fields are required!");
      return;
    }
    const success = await createUser(newUser);
    if (success) {
      fetchUsers();
      closeModal();
      alert("User created successfully!");
    } else {
      alert("Failed to create user.");
    }
  };

  const handleUpdateUser = async () => {
    if (!editUser.username || !editUser.email) {
      alert("Username and Email are required!");
      return;
    }
    const success = await updateUser(editUser._id, editUser);
    if (success) {
      fetchUsers();
      closeModal();
      alert("User updated successfully!");
    }
  };

  const handleDeleteUser = async () => {
    if (deleteUserId) {
      const success = await deleteUser(deleteUserId);
      if (success) {
        fetchUsers();
        closeModal();
        alert("User deleted successfully!");
      } else {
        alert("Failed to delete user.");
      }
    }
  };

  const openModal = (type, user = null) => {
    setModalType(type);
    if (type === "edit") setEditUser(user);
    if (type === "delete") setDeleteUserId(user?._id);
  };

  const closeModal = () => {
    setModalType(null);
    setNewUser({ username: "", firstname: "", lastname: "", email: "", password: "", role: "applicant" });
    setEditUser(null);
    setDeleteUserId(null);
  };

  const handleModalClick = (e, modalSetter) => {
    if (e.target.id === "modal-overlay") {
      modalSetter(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <button onClick={() => openModal("create")} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
        Add New User
      </button>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">#</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">No users found.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="border">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.firstname}</td>
                  <td className="p-2">{user.lastname}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2">
                    <button onClick={() => openModal("edit", user)} className="bg-yellow-500 text-white px-2 py-1 mr-2">
                      Edit
                    </button>
                    <button onClick={() => openModal("delete", user)} className="bg-red-500 text-white px-2 py-1">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

       {/* Create User Modal */}
       {modalType === "create" && (
        <div id="modal-overlay"
        className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center"  onClick={(e) => e.target.id === "modal-overlay" && closeModal()}>
          <div className="bg-white p-5 rounded-md w-[50%]">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="First Name"
              value={newUser.firstname}
              onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.lastname}
              onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="border p-2 w-full mb-2"
            >
              <option value="admin">admin</option>
              <option value="applicant">applicant</option>
              <option value="employee">employee</option>
              <option value="superadmin">superadmin</option>
            </select>
            <button onClick={handleCreateUser} className="bg-blue-500 text-white px-4 py-2">
              Save
            </button>
            <button onClick={closeModal} className="ml-2 bg-gray-500 text-white px-4 py-2">
              Cancel
            </button>
          </div>
        </div>
      )}

{modalType === "edit" && (
        <div id="modal-overlay"
        className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center"  onClick={(e) => e.target.id === "modal-overlay" && closeModal()}>
          <div className="bg-white p-5 rounded-md w-96">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <input type="text" placeholder="Username" value={editUser.username} onChange={(e) => setEditUser({...editUser, username: e.target.value })} className="border p-2 w-full mb-2" />
            <input type="text" placeholder="First Name" value={editUser.firstname} onChange={(e) => setEditUser({...editUser, firstname: e.target.value })} className="border p-2 w-full mb-2" />
            <input type="text" placeholder="Last Name" value={editUser.lastname} onChange={(e) => setEditUser({...editUser, lastname: e.target.value })} className="border p-2 w-full mb-2" />
            <input type="email" placeholder="Email" value={editUser.email} onChange={(e) => setEditUser({...editUser, email: e.target.value })} className="border p-2 w-full mb-2" />
            <select value={editUser.role} onChange={(e) => setEditUser({...editUser, role: e.target.value })} className="border p-2 w-full mb-2">
              <option value="applicant">Applicant</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
            <div className="flex justify-around gap-2x">
            <button onClick={handleUpdateUser} className="bg-blue-500 text-white px-4 py-2 ">Update</button>
            <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 ">Cancel</button>
            </div>
           
          </div>
        </div>
      )}

      {modalType === "delete" && (
        <div id="modal-overlay"
        className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center"  onClick={(e) => e.target.id === "modal-overlay" && closeModal()}>
          <div className="bg-white p-5 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-around mt-4">
            <button onClick={handleDeleteUser} className="bg-red-500 text-white px-4 py-2">Delete</button>
            <button onClick={closeModal} className="ml-2 bg-gray-500 text-white px-4 py-2">Cancel</button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
