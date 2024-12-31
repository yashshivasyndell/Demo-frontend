import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { io } from 'socket.io-client';
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux';
const Notifications = () => {

    const { isAuthenticated} = useSelector((state) => state.auth);
    const [notifications, setNotifications] = useState([]);
    const [len,setLen] = useState(0)
    
    useEffect(() => {
        if (!isAuthenticated) return; // Exit early if the user is not authenticated

        // Initialize socket connection
        const socket = io('http://localhost:3000', {
            withCredentials: true,
        });

        socket.on('connect', () => {
            console.log('Socket connected successfully!');
        });

        // Listen for the 'newWord' event
        const handleNewWord = (data) => {
            console.log('New notification: ', data.word.word);
            Swal.fire({
                title: 'New word added!',
                text: data.word.word,
                icon: 'success',
            });
            setNotifications((prevNotifications) => [data.message, ...prevNotifications]);
        };

        socket.on('newWord', handleNewWord);

        // Fetch initial notifications
        const fetchNotifications = async () => {
            const jsonconfig = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };
            try {
                const response = await axios.get(
                    'http://localhost:3000/words/getnotif',
                    jsonconfig
                );
                const total = response.data.length;
                const len = response.data.map((data) => data.message);
                const noti = len.slice(-5);
                setNotifications(noti);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();

        // Cleanup socket connection and event listener on unmount
        return () => {
            socket.off('newWord', handleNewWord); // Remove the listener
            socket.disconnect(); // Disconnect the socket
            console.log('Socket disconnected!');
        };
    }, [isAuthenticated]);
    
  return (
    <div className='h-screen justify-center grid gap-4 items-center overflow-auto'>
        {notifications && notifications.map((data,i)=>
    <div className='bg-blue-300 flex justify-center rounded-md w-[60vw] text-white text-lg text-center h-[30vh] items-center shadow-[0px_20px_30px_rgba(0,0,0,0.2)]'>
        <ul key={i}>
              New word added by admin <span className='underline uppercase text-red-500 block'>{data}</span>
        </ul>
    </div>
    )
    }
        
    </div>
  )
}

export default Notifications