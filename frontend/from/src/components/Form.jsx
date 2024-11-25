import React, { useState } from "react";
import 'react-phone-input-2/lib/style.css'
import { Country, State, City } from 'country-state-city';
import axios from "axios";
import * as yup from "yup";
import {toast,ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from "../util";

export const Form = () => {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    country: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [isPhoneDisabled, setIsPhoneDisabled] = useState(false);
  const [selected, setSelected] = useState("");
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const validationSchema = yup.object({
    name: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    phone: yup
      .string()
      .matches(/^\+?[1-9][0-9]{7,14}$/, "Phone number must be a valid phone number")
      .required("Phone number is required"),
    dob: yup.string().required("Date of birth is required"),
    gender: yup.string().required("Gender is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    pincode: yup.number().min(100000, "Pincode must be at least 6 digits").required("Pincode is required"),
  });

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
  };
  
  const handleStateChange = (state) => {
    console.log("Selected State:", state);
    setUser({
      ...user,
      state: state.isoCode, 
    });
  };
  

  const handleRegisterUser = async (e) => {
    
    e.preventDefault();
    try {
      
      await validationSchema.validate(user, { abortEarly: false });
      setErrors({});
  
      
      const response = await axios.post("http://localhost:3000/auth/signup", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("User created:", response.data);
      handleSuccess("user Registered!")
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
        } 
      } else {
        console.error("Unexpected error:", err.message);
        handleError("Unexpected error occurred!");
      }
    }
  };
  
  return (
    <div className="min-h-screen   flex items-center justify-center">
      <form className=" bg-[#DFF2EB] shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">User Registration</h2>
        <div className="space-y-4">
          
          {/* First Name */}
          <div className="grid items-center space-x-4">
            <label className="w-1/3 ml-0 text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="name"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
            {errors.name && <p className="text-red-500 text-xs ">{errors.name}</p>}
          </div>

          {/* Last Name */}
          <div className="grid  items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.lastname}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
          </div>

          {/* Email Address */}
          <div className="grid items-center space-x-4">
            <label className="w-1/3 ml-2 mb-2 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="grid items-center space-x-4">
            <label className="w-1/3 ml-3 mb-2 text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.phone}
              onChange={handleChange}
              disabled={isPhoneDisabled}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="grid items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.dob}
              onChange={handleChange}
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          {/* Gender */}
          <div className="grid items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">Gender</label>
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
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          {/* Password */}
          <div className="grid items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Country and State */}
          <div className="ml-5 flex flex-col space-y-4">
            {/* Country Dropdown */}
            <div className="col flex gap-4">
              <label className="mt-4 text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                className="form-select w-[200px] ml-7 h-11 outline-none border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => handleCountryChange(countries.find((c) => c.isoCode === e.target.value))}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State Dropdown */}
            <div className="col flex gap-4">
              <label className="text-sm mt-3 font-medium text-gray-700">State</label>
              <select
                     onChange={(e) =>
                       handleStateChange(states.find((s) => s.isoCode === e.target.value))
                     }
                     disabled={!selectedCountry}
                     className={`form-select w-[200px] ml-12 h-11 border rounded-md shadow-sm ${
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
          <div className="grid items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="number"
              name="pincode"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.pincode}
              onChange={handleChange}
              placeholder="Enter your pincode"
            />
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleRegisterUser}
            className="w-full bg-teal-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:outline-none"
          >
            Register
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
