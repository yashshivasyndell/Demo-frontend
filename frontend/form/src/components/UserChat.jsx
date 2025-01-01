import React, { useEffect, useState } from "react";
import { IoCallSharp } from "react-icons/io5";
import { MdVideoCall } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import user from "../assets/user.webp";
import { useDispatch, useSelector } from 'react-redux'
import { handleSendMessage } from "../redux/store/action";
import { io } from "socket.io-client";
import axios from "axios";

const UserChat = () => {
  const dispatch = useDispatch();
  const {role} = useSelector((state)=>(state.auth))
  const [usermessages, setuserMessages] = useState([]);
  const [input, setInput] = useState("");
  const [myId,setMyid] = useState('')
 const [recevmsg,setrecevmsg] = useState([])
 const [receved,setreceved] = useState(false)

  // Initialize socket connection
  const [socket, setSocket] = useState(null);

  // Initialize socket connection once
  useEffect(() => {
    const newSocket = io("http://localhost:3000", { withCredentials: true });
    setSocket(newSocket);

    const load = async ()=>{
          const getId = await axios.get('http://localhost:3000/auth/loadUser',{withCredentials:true})
          const myid = getId.data.userData._id
          console.log("this is ax res",myid);
          setMyid(myid)
          console.log("this is res",myId);
        }
        load()
    newSocket.on("connect", () => {
      console.log("Socket connected successfully new id is:", newSocket.id);
    });

    // Listen for the 'messageSent' event
    newSocket.on("messageSent", (message) => {
      console.log("this is sender id",message.sender);
      if(message.sender !== myId){
        setreceved(true)
        setrecevmsg((prev)=>[...prev,{text:message.message}])
        return
      }
      setuserMessages((prevMessages) => [...prevMessages, { text: message.message }]);
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
        const newMessage = { text: input.trim() };
        
        setInput(""); // Clear input field

        // Payload to send message
        const payload = {
          message: input.trim(),
          receiver: receiverId,
        };

        const SendRes = await dispatch(handleSendMessage(payload));
        console.log("this is sender id: ",SendRes.chat.sender);
        console.log("this is recever id: ",SendRes.chat.receiver);
        
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
          <img src={user} alt="" className="w-10 h-10 rounded" />
          <span>Mr Admin</span>
        </div>
        <div className="flex justify-around gap-5 text-center items-center p-3 text-3xl">
          <IoCallSharp />
          <MdVideoCall />
          <BsThreeDotsVertical />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-[#C4DAD2] h-[70vh] w-[70vw] ml-[40px] flex flex-col relative">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {usermessages.map((msg, index) => (
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

export default UserChat;
