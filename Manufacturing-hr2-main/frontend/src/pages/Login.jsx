import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { users } from "./users"; // Import the mock data

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Check credentials against mock data
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      // Simulate successful authentication
      setSuccessMessage(`Login successful! Welcome, ${user.name}`);
      setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="Bg hero bg-base-200 min-h-screen relative">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-white">HUMAN RESOURCES 2</h1>
          <p className="py-6 text-white">
            Sign in to access your account and manage your preferences.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary font-bold">
                Login
              </button>
            </div>
          </form>
        </div>
        <Link to='/jobs' className="bg-blue-700 p-1 rounded flex justify-center items-center w-32 text-white absolute top-10 right-10">
          Apply Job
        </Link>
      </div>
    </div>
  );
}

export default Login;
