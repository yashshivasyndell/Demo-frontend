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
import { Layout } from "./Layout";

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
      if (response && response.success) {
        handleSuccess("Logged In")
        setTimeout(() => {
          navigate('/dashboard')
        }, 500);
        console.log("response is true",response.success);
      } else {
        handleError("Oops!Wrong email or password");
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
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#021b79] to-[#0575e6]">
      <div className="bg-[#fff] w-[480px] flex flex-col rounded-md h-[300px] shadow-2xl">
        <h2 className="text-4xl text-black text-center">Login</h2>
        <form action="" autoComplete="on">
          <div className=" text-white text-left grid pl-6 pr-6 ">
            <label className="text-black" htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="outline-none text-stone-500 border-[1px] rounded-lg p-1 border-black"
              autoComplete="on"
            />
          </div>
          <div className=" text-white text-left grid pl-6 pr-6 pt-3 relative">
            <label htmlFor="" className="text-black">Password</label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="outline-none border-[1px] border-black text-stone-500 p-1 rounded-lg 
             "
              autoComplete="on"
            />
            <div className="absolute bottom-[10px] right-[35px] text-black">
              {showPass ? (
                <FaEye onClick={handlePassClick} />
              ) : (
                <FaEyeSlash onClick={handlePassClick} />
              )}
            </div>
          </div>
        </form>
        <div className="flex flex-row justify-between p-5 ">
          <button
            onClick={handleLogin}
            className="text-white p-2 bg-[#175676] rounded-md"
          >
            Login
          </button>
          <button
            onClick={handleSignin}
            className="text-white p-2 bg-[#175676] rounded-md"
          >
            SignUp
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
