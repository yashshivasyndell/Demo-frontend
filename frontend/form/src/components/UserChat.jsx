import React, { useEffect, useState } from "react";
import { IoCallSharp } from "react-icons/io5";
import { MdVideoCall } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import userim from "../assets/formaluser.png";
import { useDispatch, useSelector } from "react-redux";
import { handleSendMessage } from "../redux/store/action";
import { io } from "socket.io-client";

const UserChat = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);

  const { user } = useSelector((state) => state.auth);

  // Initialize socket connection once
  useEffect(() => {
    const newSocket = io("http://localhost:3000", { withCredentials: true });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected successfully, new id is:", newSocket.id);
    });

    // Listen for the 'messageSent' event
    newSocket.on("messageSent", (message) => {
      console.log(message);
      if (message.sender !== user._id) {
        // Append received message to the messages array
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message.message, sender: message.sender },
        ]);
      }
    });

    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Handle sending the message
  const handleSend = async () => {
    try {
      if (input.trim()) {
        const payload = {
          message: input.trim(),
          receiver: "6757c1819a7838b46de5e306", // Replace with actual receiver ID
        };
        // Append the sent message locally
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: input.trim(), sender: user._id },
        ]);

        setInput(""); // Clear input field
        const response = await dispatch(handleSendMessage(payload));
        // Register the user in the socket
        socket.emit("registerUser", user._id);
      }
    } catch (error) {
      console.log("Error in sending message:", error);
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-[#6A9C89] border-[1px] border-black flex justify-between mt-[30px] mr-[30px] w-[70vw] ml-[40px] rounded-lg">
        <div className="flex justify-around gap-5 text-center items-center p-3 text-3xl font-semibold">
          <img src={userim} alt="" className="w-10 h-10 rounded" />
          <span>Admin</span>
        </div>
        <div className="flex justify-around gap-5 text-center items-center p-3 text-3xl">
          <IoCallSharp />
          <MdVideoCall />
          <BsThreeDotsVertical />
        </div> 
      </div>

      {/* Chat Area */}
      <div className="flex flex-col bg-[#C4DAD2] h-[70vh] w-[70vw] ml-[40px] rounded-lg shadow-lg">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-2 ${
                msg.sender === user._id ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`w-fit max-w-[70%] rounded-xl p-2 shadow-lg ${
                  msg.sender === user._id
                    ? "bg-white text-gray-600"
                    : "bg-red-400 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-4 bg-[#C4DAD2] border-t-[1px] border-gray-300 flex items-center">
          <input
            name="message"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="Type a message"
            className="flex-1 p-2 border border-gray-300 rounded-xl outline-none text-gray-600 font-semibold"
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

export default UserChat;
