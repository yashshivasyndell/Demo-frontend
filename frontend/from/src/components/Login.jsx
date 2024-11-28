import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { handleError, handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { handlelogin } from "../redux/store/action";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
  });

  //dispatch and selector
  const dispatch = useDispatch();
  const [showPass, SetShowpass] = useState("password");
  const handlePassClick = () => {
    SetShowpass(!showPass);
  };

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

   //selector hook
  const {isAuthenticated} = useSelector((state)=>state.auth)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(user, { abortEarly: false });
      setErrors({});

      const response = await dispatch(handlelogin(user));

      console.log("User created:", response);
      handleSuccess("Login Success!");


      
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
        console.error("Unexpected error:", err.message);
        handleError("Unexpected error occurred!");
      }
    }
  };

  const handleSignin = () => {
    setTimeout(() => {
      navigate("/register");
    }, 1000);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-[#1F509A] px-10 py-20 flex flex-col rounded-md shadow-2xl">
        <div className="mx-auto mt-[-60px]">
          
        </div>
        <h2 className="text-4xl text-white font-thin m-10">Welcome back</h2>
        <form action="" autoComplete="off">
          <div className="mb-5 text-white text-left grid gap-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="outline-none text-stone-500 bg-teal-200 rounded-lg p-2 border-white"
              autoComplete="off"
            />
          </div>
          <div className="mb-5 text-white text-left grid gap-2 relative">
            <label htmlFor="">Password</label>
            <input
              type={showPass ? "password" : "Number"}
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="outline-none bg-teal-200 text-stone-500 p-2 rounded-lg 
             border-white"
              autoComplete="off"
            />
            <div className="absolute bottom-[14px] right-[12px] text-black">
              {showPass ? (
                <FaEye onClick={handlePassClick} />
              ) : (
                <FaEyeSlash onClick={handlePassClick} />
              )}
            </div>
          </div>
        </form>
        <div className="flex flex-col gap-4 mt-3">
          <button
            onClick={handleLogin}
            className="text-white  p-2 bg-green-500 rounded-sm"
          >
            Login
          </button>
          <button
            onClick={handleSignin}
            className="text-white p-2 bg-purple-500 rounded-sm"
          >
            SignUp
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
