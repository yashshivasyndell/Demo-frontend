import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/store/action";

export const Home = () => {
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    console.log("click");
    e.preventDefault();
    const call = await axios.post("http://localhost:3000/auth/cookies",{}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(call);
    if(call.status === 200){
      dispatch(loadUser())
    }
  };
  return (
    <div className="text-lg grid gap-3 font-serif text-black ">
      Welcome to Home page
      <button onClick={handleLogout}>LogOut</button>
    </div>
  );
};
