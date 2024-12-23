import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import * as yup from "yup";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Form = () => {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    ConfPassword: "",
    country: "",
    state: "",
    pincode: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [isPhoneDisabled, setIsPhoneDisabled] = useState(false);
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showPass, SetShowpass] = useState("password");

  const handlePassClick = () => {
    SetShowpass(!showPass);
  };

  const validationSchema = yup.object({
    name: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(
        /^\+?[1-9][0-9]{7,14}$/,
        "Phone number must be a valid phone number"
      )
      .required("Phone number is required"),
    dob: yup.string().required("Date of birth is required"),
    gender: yup.string().required("Gender is required"),
    country: yup.string().required("Country cant be idle"),
    state: yup.string().notRequired(),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    ConfPassword: yup
      .string()
      .nullable()
      .oneOf([yup.ref("password"), null], "Passwords must match") 
      .required("Confirm password is required"),
    pincode: yup
      .string()
      .min(6, "Pincode must be at least six digits")
      .required("Pincode is required"),
  });

  const handleConfChange = (a) => {
    const name = a.target.name;
    const value = a.target.value;
    setUser({ ...user, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    console.log("changing");
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    if (name === "phone" && /[^0-9]/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone number must contain only numbers",
      }));
    }
  };

  const handleCountryChange = (country) => {
    console.log("Selected Country:", country);
    setSelectedCountry(country);
    setStates(State.getStatesOfCountry(country.isoCode));

    setUser({
      ...user,
      country: country.isoCode,
      state: "",
    });

    setErrors({
      ...errors,
      country: "",
    });
  };

  const handleStateChange = (state) => {
    console.log("Selected State:", state);
    setUser({
      ...user,
      state: state.isoCode,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(user, { abortEarly: false });
      setErrors({});

      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User created:", response.data);
       console.log("This is user.emial ",user.email);
      const email = await axios.post("http://localhost:3000/auth/sender", {
        email: user.email,
      },{
        headers: {
          "Content-Type": "application/json",
        }
      });
         console.log("this is email ",email);
      handleSuccess("user Registered!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      const errorMessages = {};

      if (err.inner && Array.isArray(err.inner)) {
        err.inner.forEach((validationError) => {
          errorMessages[validationError.path] = validationError.message;
        });
      } else {
        console.error("Unexpected error structure:", err);
      }

      setErrors(errorMessages);
      if (err.response) {
        const { status, data } = err.response;

        if (status === 409) {
          handleError(data.message);
          setTimeout(() => {
            navigate("/Login");
          }, 1000);
        }
      } else {
        console.error("Unexpected error:", err.message);
        handleError("Unexpected error occurred!");
      }
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <form className=" bg-[#1F509A] shadow-xl rounded-lg px-10 py-5 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-white mt-4">
          User Registration
        </h2>
        <div className="space-y-4">
          {/* First Name */}
          <div className="grid gap-2">
            <div className="grid items-center text-white">
              <label className="text-left text-sm font-medium mb-2 text-white">
                First Name
              </label>
              <input
                type="text"
                name="name"
                className="flex-1 p-2 text-black border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
              {errors.name && (
                <p className="text-red-500 text-left text-xs ">{errors.name}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="grid  items-center">
              <label className="text-left text-sm font-medium mb-1 text-white">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
                value={user.lastname}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
              {errors.lastname && (
                <p className="text-red-500 text-left text-xs ">
                  {errors.lastname}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="grid items-center">
              <label className="text-left mb-2 text-sm font-medium text-white">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-left text-xs ">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="grid items-center">
              <label className="text-left mb-2 text-sm font-medium  text-white">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
                value={user.phone}
                onChange={handleChange}
                disabled={isPhoneDisabled}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-left text-xs ">
                  {errors.phone}
                </p>
              )}
            </div>
            {/*dob*/}
            <div className="grid items-center">
              <label className="text-left text-sm font-medium ml-1 mb-2 text-white">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
                value={user.dob}
                onChange={handleChange}
              />
              {errors.dob && (
                <p className="text-red-500 text-left text-xs ">{errors.dob}</p>
              )}
            </div>
          </div>
          {/* Gender */}
          <div>
            <div className="grid items-center mt-[-10px]">
              <label className="text-left text-sm mb-2 font-medium text-white">
                Gender
              </label>
              <select
                name="gender"
                className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
                value={user.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-left text-xs ">
                  {errors.gender}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-3">
              <div className="grid items-center">
                <label className="text-left text-sm font-medium mb-2 mt-2 text-white">
                  Password
                </label>
                {/*input and icon wrapper*/}
                <div className="relative">
                <input
                autoComplete="none"
                  type={showPass ? "text" : "password"}
                  name="password"
                  className="flex-1 p-2 w-full border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black cursor-pointer">
                  {showPass ? (
                    <FaEye onClick={handlePassClick} />
                  ) : (
                    <FaEyeSlash onClick={handlePassClick} />
                  )}
                </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-left text-xs ">
                    {errors.password}
                  </p>
                )}
              </div>
              {/*Confirm Password */}
              <div className="grid items-center">
                <label className="text-left text-sm font-medium mb-2 text-white">
                  Conform Password
                </label>
                {/*input and icon wrapper*/}
                <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="ConfPassword"
                  className="flex-1 p-2 border w-full relative rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
                  value={user.ConfPassword}
                  onChange={handleConfChange}
                  placeholder="Enter your password"
                />
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black cursor-pointer">
                  {showPass ? (
                    <FaEye onClick={handlePassClick}/>
                  ) : (
                    <FaEyeSlash onClick={handlePassClick}/>
                  )}
                </div>
                </div>
                {errors.ConfPassword && (
                  <p className="text-red-500 text-left text-xs ">
                    {errors.ConfPassword}
                  </p>
                )}
              </div>

              {/* Country and State */}
              <div className="flex flex-col w-full">
                {/* Country Dropdown */}
                <div className=" flex flex-col">
                  <label className="text-sm font-medium mb-1 text-left text-white">
                    Country
                  </label>
                  <select
                    className="form-select w-full h-11 outline-none border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={(e) =>
                      handleCountryChange(
                        countries.find((c) => c.isoCode === e.target.value)
                      )
                    }
                  >
                    <option value="" className="text-left">
                      Select Country
                    </option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="text-red-500 mt-1 text-left text-xs ">
                      {errors.country}
                    </p>
                  )}
                </div>

                {/* State Dropdown */}
                <div className="col flex flex-col text-left">
                  <label className="text-sm mt-3 font-medium text-left mb-1 text-white">
                    State
                  </label>
                  <select
                    onChange={(e) =>
                      handleStateChange(
                        states.find((s) => s.isoCode === e.target.value)
                      )
                    }
                    disabled={!selectedCountry}
                    className={`form-select w-full h-11 border rounded-md shadow-sm ${
                      !selectedCountry
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pincode */}
              <div className="grid items-center ">
                <label className="text-left text-sm text-white font-medium mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
                  value={user.pincode}
                  onChange={handleChange}
                  placeholder="Enter your pincode"
                />
                {errors.pincode && (
                  <p className="text-red-500 text-left text-sm">
                    {errors.pincode}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex flex-col gap-1 w-[270px] mx-auto">
            <button
              type="submit"
              onClick={handleRegisterUser}
              className="w-[full] mb-3 bg-teal-500 text-black font-light p-2 rounded shadow hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:outline-none"
            >
              Register
            </button>
            <button
              type="submit"
              onClick={handleLogin}
              className="w-[full] mb-3 bg-yellow-300 text-black font-light p-2 rounded shadow hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:outline-none"
            >
              Existing user Login
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
