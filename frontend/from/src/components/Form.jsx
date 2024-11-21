import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ReactFlagsSelect from "react-flags-select";
import { Country, State, City }  from 'country-state-city';

import axios from "axios"
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
  const [isPhoneDisabled, setIsPhoneDisabled] = useState(false);
  const [selected, setSelected] = useState("");
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });

    if (name === "phone") {
        
        if (value.includes("-")) {
          alert("Phone number must be +tive")
        } 
      }
  
  };

  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
   console.log(countries);
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setStates(State.getStatesOfCountry(country.isoCode));
    setCities([]);
};

const handleStateChange = (state) => {
    setSelectedState(state);
    setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));
};



  const handleRegisterUser = async (e) => {
    e.preventDefault();
  
    try {
    
      const response = await axios.post("http://localhost:3000/product/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("User created:", response.data); 
  
    } catch (error) {
      console.error("Error while registering user:", error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-300 to-purple-400 flex items-center justify-center">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">
          User Registration
        </h2>
        <div className="space-y-4">
          
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="name"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </div>

          
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.lastname}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </div>

          
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.phone}
              onChange={handleChange}
              disabled={isPhoneDisabled}
              placeholder="Enter your phone number"
            />
          </div>

         
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.dob}
              onChange={handleChange}
            />
          </div>

         
          <div className="flex items-center space-x-4">
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
          </div>

          
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          
          <div className="container">
            <div className="row">
              <div className="col">
                <select
                  className="form-select"
                  onChange={(e) =>
                    handleCountryChange(
                      countries.find((c) => c.isoCode === e.target.value)
                    )
                  }
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div className="col">
                <select
                  disabled={!selectedCountry}
                  className="form-select"
                  onChange={(e) =>
                    handleStateChange(
                      states.find((s) => s.isoCode === e.target.value)
                    )
                  }
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
          </div>

          
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="number"
              name="pincode"
              className="flex-1 p-2 border rounded focus:ring-teal-400 focus:border-teal-400 outline-none"
              value={user.pincode}
              onChange={handleChange}
              placeholder="Enter your pincode"
            />
          </div>

          
          <button
            type="submit"
            onClick={handleRegisterUser}
            className="w-full bg-teal-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:outline-none"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
