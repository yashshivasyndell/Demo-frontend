import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { handleUserData } from "../redux/store/action";

const AdminPanel = () => {
const {user,loading,error}= useSelector((state) => state.getData);
    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleUserData())
    console.log(user);
  }, [dispatch]);

  return (
    <div className="overflow-auto overflow-y-auto h-screen">
      {/*main div that cover whole admin panel*/}
      <div className="flex flex-col w-full text-center ">
        <div className="font-semibold text-2xl">All Users</div>
        {/*blue boxes*/}
        <div className="flex gap-5 justify-center">
          <div className="bg-[#063970] flex flex-col gap-2 w-56 h-28 text-white text-center justify-center rounded-md">
            <div>25</div>
            Total users
          </div>
          <div className="bg-[#063970] flex flex-col gap-2 w-56 h-28 text-white text-center justify-center rounded-md">
            <div>25</div>
            Total users
          </div>
          <div className="bg-[#063970] flex flex-col gap-2 w-56 h-28 text-white text-center justify-center rounded-md">
            <div>25</div>
            Total users
          </div>
          <div className="bg-[#063970] flex flex-col gap-2 w-56 h-28 text-white text-center justify-center rounded-md">
            <div>25</div>
            Total users
          </div>
        </div>
        {/*blue boxes end*/}

        {/*filtering boxes*/}
        <div className="flex flex-col gap-2 mt-5">
            {/*custom box date box and button*/}
            <div className="flex gap-5 justify-center"> 
             <select name="" id="" className="w-[257px] border-2 rounded-lg h-[40px] text-center">
                <option value="">Custom</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
             </select>
             <select name="" id="" className="w-[257px] rounded-lg h-[40px] text-center">
                <option value="">Custom</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
             </select>
             <select name="" id="" className="w-[257px] rounded-lg h-[40px] text-center">
                <option value="">Custom</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
             </select>
             <button className="bg-blue-950 text-white rounded">Apply date filter</button>
            </div>
            {/*search gender education country etc*/}
            <div className="flex gap-4 justify-center">
                <div className="relative">
            <FaSearch className="absolute top-1 left-14"/>
             <input type="text" placeholder="Search" className="h-[35px] text-center w-[200px] rounded-lg outline-none"/>
                </div>
             <select name="" id="" className="w-[230px] rounded-lg h-[35px] text-center outline-none">
                <option value="">Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
             </select>
             <select name="" id="" className="w-[230px] rounded-lg h-[35px] text-center outline-none">
                <option value="">Education</option>
                <option value='male'>School</option>
                <option value='female'>Bachelors</option>
                <option value='other'>Masters</option>
             </select>
             <select name="" id="" className="w-[230px] rounded-lg h-[35px] text-center outline-none">
                <option value="">Country</option>
                <option value='male'>India</option>
                <option value='female'>USA</option>
                <option value='other'>Paksitan</option>
             </select>
            </div>
            {/*search gender education country etc ending*/}
        </div>
        {/*filtering boxes end*/}

        {/*pagination start*/}
        <div className="flex justify-between mt-4">
            <span className="ml-11 text-lg">Users: 25</span>
            <div className="flex mr-10 gap-4 text-lg">
            <span className="mr-8">1-10 of 25</span>
            <span className="text-3xl text-blue-400"><FaArrowAltCircleLeft /></span>
            <span className="text-3xl text-blue-400"><FaArrowAltCircleRight /></span>
            </div>
        </div>
        {/*pagination end*/}

        {/* TABLE START */}
<div className="flex justify-center items-center mt-2 overflow-auto">
  <div className="w-[75vw] max-w-screen-xl">
    {/* Wrapper with a fixed height and scrollbar */}
    <div className="h-[700px] overflow-y-auto border border-gray-300 rounded-md">
      <table className="min-w-full bg-white border-collapse border-gray-300 shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-left sticky top-0 bg-gray-200 z-10">
              S.No
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left sticky top-0 bg-gray-200 z-10">
              Id
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left sticky top-0 bg-gray-200 z-10">
              Phone Number
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left sticky top-0 bg-gray-200 z-10">
              Username
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left sticky top-0 bg-gray-200 z-10">
              Email
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left sticky top-0 bg-gray-200 z-10">
              DOB
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left sticky top-0 bg-gray-200 z-10">
              Gender
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left sticky top-0 bg-gray-200 z-10">
              Education
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left sticky top-0 bg-gray-200 z-10">
              Country
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left sticky top-0 bg-gray-200 z-10">
              Role
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left sticky top-0 bg-gray-200 z-10">
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {user.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="px-2 py-1 border border-gray-300">{index + 1}</td>
              <td className="px-2 py-1 border border-gray-300">{item.id}</td>
              <td className="px-2 py-1 border border-gray-300">{item.phoneNumber}</td>
              <td className="px-2 py-1 border border-gray-300">{item.username}</td>
              <td className="px-2 py-1 border border-gray-300">{item.email}</td>
              <td className="px-2 py-1 border border-gray-300">{item.dob}</td>
              <td className="px-2 py-1 border border-gray-300">{item.gender}</td>
              <td className="px-2 py-1 border border-gray-300">{item.education}</td>
              <td className="px-2 py-1 border border-gray-300">{item.country}</td>
              <td className="px-2 py-1 border border-gray-300">{item.role}</td>
              <td className="px-2 py-1 border border-gray-300">{item.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
{/* TABLE END */}



        {/*Bottom pagination*/}
        <div className="flex mx-96 mt-4">
            <div className="flex gap-4 text-lg">
            <span className="">1-10 of 25</span>
            <span className="text-3xl text-blue-400"><FaArrowAltCircleLeft /></span>
            <span className="text-3xl text-blue-400"><FaArrowAltCircleRight /></span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
