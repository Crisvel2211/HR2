import { useState } from "react"
import { Link,  useNavigate} from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const [showPassword,setShowPassword] = useState(false)
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.username || !formData.password){
      return dispatch(signInFailure('Invalid login, please try again'));
    }
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSuccess(data));   
          navigate("/dashboard");
        
      }
    }catch(error){
      dispatch(signInFailure(error.message));
    }
  }

  const Handler = () => {
    setShowPassword(!showPassword)
  }
  return(
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
          {
          errorMessage && 
          <div className="bg-[#fdeded] text-[#855856] rounded-md w-full p-3 mt-5">
          <p className="font-[600] text-[15px] ">{errorMessage}</p>
        </div>
        }
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered" 
                required 
                id="username" onChange={handleChange}
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
                id="password" onChange={handleChange}
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
        
      </div>
    </div>
  )
}
export default Login