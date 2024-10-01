import React from "react";
import { Link } from "react-router-dom";

function Login () {
  
    return (
<div className="Bg hero bg-base-200 min-h-screen text-white relative">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">HUMAN RESOURCES 2 </h1>
      <p className="py-6">
        Sign in to access your account and manage your prefences.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
        <button className=" bg-blue-700 p-1 rounded flex justify-center items-center w-32 text-black absolute top-10 right-10"> <Link to='/'>Apply Job</Link> </button>
  </div>
</div>

    );
};

export default Login;