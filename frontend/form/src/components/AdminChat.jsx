import React, { useState } from "react";
import { IoCallSharp } from "react-icons/io5";
import { MdVideoCall } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import user from "../assets/user.avif";

const AdminChat = () => {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Handle sending the message
  const handleSend = () => {
    if (input.trim()) { 
      setMessages([...messages, { text: input }]); 
      setInput(""); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleSend(); 
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-[#6A9C89] border-[1px] border-black flex justify-between mt-[30px] mr-[30px] ml-[40px] rounded-lg">
        <div className="flex justify-around gap-5 text-center items-center p-3 text-3xl font-semibold">
          <img src={user} alt="" className="w-10 h-10 rounded-full" />
          <span>Harish</span>
        </div>
        <div className="flex justify-around gap-5 text-center items-center p-3 text-3xl">
          <IoCallSharp />
          <MdVideoCall />
          <BsThreeDotsVertical />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-[#C4DAD2] mr-10 ml-10 h-[450px] relative overflow-y-auto p-4">
        {/* Render Messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-white w-fit rounded-xl text-gray-600 p-2 mb-2 shadow-lg"
          >
            {msg.text}
          </div>
        ))}

        {/* Input Field */}
        <div className="flex items-center absolute bottom-4 left-10 w-[90%]">
          <input
            name="message"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="Type a message"
            className="w-[800px] p-2 border border-gray-300 rounded-xl outline-none text-gray-600 font-semibold"
          />
          <button
            onClick={handleSend}
            className="ml-2 p-2 bg-[#8FD14F] rounded-xl text-white font-semibold"
          >
            <IoSendSharp className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
