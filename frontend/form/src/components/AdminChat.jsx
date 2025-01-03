import React, { useEffect, useState } from "react";
import { IoCallSharp } from "react-icons/io5";
import { MdVideoCall } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import userimg from "../assets/formaluser.png";
import { useDispatch, useSelector } from "react-redux";
import { handleSendMessage } from "../redux/store/action";
import { io } from "socket.io-client";
import axios from "axios";

const AdminChat = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [candidate, setCandidate] = useState("");
  const [userid, setUserId] = useState("");
  const receiverId = userid;
 
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", { withCredentials: true });
    setSocket(newSocket);

    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/getUsers");
        setUsers(res.data.allUsers);
      } catch (err) {
        console.log("Error fetching users:", err.message);
      }
    };

    newSocket.on("connect", () => {
      console.log("Socket connected successfully new id is:", newSocket.id);
     
      fetchUsers();
    });

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
    };
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    try {
      if (input.trim()) {
        const payload = { message: input.trim(), receiver: receiverId };
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: input.trim(), sender: user._id },
        ]);
        setInput("");
        const resp = await dispatch(handleSendMessage(payload));
        socket.emit("registerUser",user._id)
        
      }
    } catch (error) {
      console.log("Error in sending message:", error); 
    }
  };
 
  const handleUser = (selectedUser) => {
    setUserId(selectedUser._id);
    console.log(selectedUser);
    setCandidate(selectedUser.name);
    setMessages([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen p-10 ">
      {/* Header */}
      <div className="bg-[#4ba3c3] flex justify-between items-center p-3  border-black rounded-lg">
        <div className="flex items-center gap-3">
          <img src={userimg} alt="user" className="w-10 h-10 rounded-full" />
          <span className="text-3xl font-semibold uppercase">{candidate}</span>
        </div>
        <div className="flex items-center gap-5 text-3xl">
          
          <BsThreeDotsVertical />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Users List */}
        <div className="w-1/4 bg-[#7fbfcd] p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">All Users</h2>

          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUser(user)}
              className="mb-2 p-2 uppercase bg-white text-sm rounded-md shadow-md text-center hover:bg-green-100"
            >
              {user.name}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-[#d1e7f1] flex flex-col relative">
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
                      : "bg-blue-400 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="p-4 bg-[#d1e7f1] border-t-[1px] border-gray-300 flex items-center">
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
              className="ml-2 p-2 bg-[#1aaab7] rounded-xl text-white font-semibold"
            >
              <IoSendSharp className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
