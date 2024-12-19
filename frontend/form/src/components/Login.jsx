import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { handleError, handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { handlelogin } from "../redux/store/action";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [focusedInput, setFocusedInput] = useState("");
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
      const response =  dispatch(handlelogin(user));
      if (response && response.success) {
        handleSuccess("Logged In");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
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
      <div className="bg-[#fff] w-[480px] flex flex-col rounded-md shadow-2xl">
        <h2 className="text-3xl text-gray-600 text-center mt-8">Login</h2>
        <form action="" autoComplete="on" className="p-6">
          {/* Email Field */}
          <div className="relative mb-6">
            <FaUser
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                focusedInput === "email" ? "text-black" : "text-gray-500"
              }`}
            />
            <label
              className={`absolute left-10 top-2 transition-all text-gray-600 pointer-events-none ${
                focusedInput === "email" || user.email
                  ? "top-[-30px] left-[-1px] text-sm text-black"
                  : ""
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
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="on"
            />
          </div>

          {/* Password Field */}
          <div className="relative mb-6 mt-10">
            <IoLockClosed
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                focusedInput === "password" ? "text-black" : "text-gray-500"
              }`}
            />
            <label
              className={`absolute left-10 top-2 transition-all text-gray-600 pointer-events-none ${
                focusedInput === "password" || user.password
                  ? "top-[-30px] left-[-1px] text-sm text-black"
                  : ""
              }`}
            >
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput("")}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="on"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={handlePassClick}
            >
              {showPass ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </form>

        <div className="flex justify-between px-6 pb-6">
          <button
            onClick={handleLogin}
            className="bg-[#175676] text-white py-2 px-4 rounded-md"
          >
            Login
          </button>
          <button
            onClick={handleSignin}
            className="bg-[#175676] text-white py-2 px-4 rounded-md"
          >
            Sign Up
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
