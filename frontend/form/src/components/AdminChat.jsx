import React, { useEffect, useState } from "react";
import { IoCallSharp } from "react-icons/io5";
import { MdVideoCall } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import user from "../assets/user.avif";
import { useDispatch } from "react-redux";
import { handleSendMessage, loadUser } from "../redux/store/action";
import { io } from "socket.io-client";
import axios from "axios";

const AdminChat = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [myId,setMyid] = useState('')
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [candidate,setCandidate] = useState('')
  const [userid,setUserId] = useState('')
  const [receved,setreceved] = useState(false)
  const [recevmsg,setrecevmsg] = useState([])
  const receiverId = userid;
  // Initialize socket connection
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", { withCredentials: true });
    setSocket(newSocket);
    const load = async ()=>{
      const getId = await axios.get('http://localhost:3000/auth/loadUser',{withCredentials:true})
      const myid = getId.data.userData._id
      setMyid(myid)
    }
    load()
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
      console.log("this is sender id",message.sender);
      if(message.sender !== myId){
        setreceved(true)
        setrecevmsg((prev)=>[...prev,{text:message.message}])
        return
      }else{setMessages((prevMessages) => [...prevMessages, { text: message.message }]);}
      
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
        setInput("");
        const resp = await dispatch(handleSendMessage(payload));
        console.log("this is sender id: ",resp.chat.sender);
        const reciever = resp.chat.receiver;
        socket.emit('registerUser',reciever)
        
      }
    } catch (error) {
      console.log("Error in sending message:", error);
    }
  };
  const handleUser = (e)=>{
    setUserId(e._id)
    setCandidate(e.name)
    setMessages([])
    
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-[#6A9C89] flex justify-between items-center p-3 border-b-[1px] border-black">
        <div className="flex items-center gap-3">
          <img src={user} alt="user" className="w-10 h-10 rounded-full" />
          <span className="text-3xl font-semibold uppercase">{candidate}</span>
        </div>
        <div className="flex items-center gap-5 text-3xl">
          <IoCallSharp />
          <MdVideoCall />
          <BsThreeDotsVertical />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Users List */}
        <div className="w-1/4 bg-green-200 p-4 overflow-y-auto overflow-x-hidden">
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          {users.map((user) => (
            <div key={user._id} onClick={() => handleUser(user)} className="mb-2 p-2 uppercase bg-white rounded-md shadow-md text-center hover:bg-green-100">
              {user.name}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-[#C4DAD2] flex flex-col relative">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="bg-white w-fit rounded-xl text-gray-600 p-2 mb-2 shadow-lg"
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/*receved message*/}
          <div className="flex-1 overflow-y-auto p-4 right-0 absolute">
          {receved && <>
            {recevmsg.map((msg, index) => (
              <div
                key={index}
                className="bg-red-400 w-fit rounded-xl text-gray-600 p-2 mb-2 shadow-lg"
              >
                {msg.text}
              </div>
            ))}
          </>}
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
    </div>
  );
};

export default AdminChat;
