import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { handleError, handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { handlelogin } from "../redux/store/action";
import { RiAdminFill } from "react-icons/ri";
export const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [focusedInput, setFocusedInput] = useState("email");
  const [focusedInputPass, setFocusedInputPass] = useState("password");
  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
     
  const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await validationSchema.validate(user, { abortEarly: false });
        setErrors({});
        const response =await dispatch(handlelogin(user));
        if (response && response.success) {
          handleSuccess(`Logged in as ${response.role}`);
          const {role} = response
          setTimeout(() => {
            if(role==="admin"){
              navigate('/adminpanel')
            }else if(role==='user'){
              navigate('/user')
            }else{
              navigate('/')
            }
          }, 1000);
        } else {
          handleError("Oops! Wrong email or password");
        }
      } catch (err) {
        const errorMessages = {};
        setErrors(errorMessages);
        if (err.response) {
          const { status, data } = err.response;
  
          if (status === 403) {
            handleError(data.message);
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        } else {
          console.log(err);
          handleError("Unexpected error");
        }
      }
    };

  const handleSignin = () => {
    setTimeout(() => {
      navigate("/register");
    }, 1000);
  };

  const handlePassClick = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#021b79] to-[#0575e6]">
  <div className="bg-[#fff] w-[40%] h-[40vh] lg:h-[272px] flex flex-col rounded-lg shadow-2xl">
    <h2 className="text-3xl font-semibold text-gray-700 text-center mt-8 relative"><RiAdminFill className="absolute md:left-[80px] lg:left-[142px] top-2 text-2xl" /> Admin Login</h2>
    <form action="" autoComplete="on" className="p-6">
      {/* Email Field */}
      <div className="relative mb-6">
        <FaUser
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
            focusedInput === "email" ? "text-black" : "text-gray-300"
          }`}
        />
        <label
        style={{
          color: focusedInput === "email" || user.email ? "black" : "gray",
        }}
          className={`absolute left-9 top-[2px] text-gray-200 pointer-events-none transition-all duration-200 ${
            focusedInput === "email" || user.email
              ? "top-[-25px] left-[0px] text-sm text-black px-1"
              : "top-2 text-gray-500"
          }`}
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput("")}
          className="w-full pl-10 pr-3 border h-[30px] border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="on"
        />
      </div>
      {/* Password Field */}
      <div className="relative mb-0 mt-9">
        <IoLockClosed
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
            focusedInputPass === "password" ? "text-black" : "text-gray-300"
          }`}
        />
        <label
  className={`absolute left-9 top-[3px] pointer-events-none transition-all duration-200 ${
    focusedInputPass === "password" || user.password
      ? "top-[-25px] left-[0px] text-sm text-black px-1"
      : "top-2 text-gray-500"
  }`}
>
  Password
</label>
        <input 
          type={showPass ? "text" : "password"}
          name="password"
          value={user.password}
          onChange={handleChange}
          onFocus={() => setFocusedInputPass("password")}
          onBlur={() => setFocusedInputPass("")}
          className="w-full pl-10 pr-10 h-[30px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="on"
        />
        <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 cursor-pointer"
          onClick={handlePassClick}
        >
          {showPass ? <FaEye /> : <FaEyeSlash />} 
        </div> 
      </div>
    </form>

    <div className="grid gap-1 lg:flex justify-between px-7 ">
      <button
        onClick={handleLogin}
        className="bg-[#175676] sm:w-[80px] text-white h-[35px]  rounded-md"
      >
        Login
      </button>
      <button
        onClick={handleSignin}
        className="bg-[#175676] text-white py-1 px-4 rounded-md"
      >
        Sign Up
      </button>
    </div>
  </div>
  <ToastContainer />
</div>

  );
};
