import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Notifications = () => {
    const [notifications, setNotifications] = useState('');

    useEffect(() => {
        const fetchNotifications = async () => {
            const jsonconfig = {
                withCredentials:true
            }
            try {
                const response = await axios.get('http://localhost:3000/words/getnotif',
                jsonconfig);
                const len = response.data.length-500
                setNotifications(response.data[len].message);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);
  return (
    <div className='flex h-screen justify-center items-center'>
        <div className='bg-blue-300 rounded-md w-[60vw] text-white text-lg text-center h-[30vh] grid items-center shadow-[0px_20px_30px_rgba(0,0,0,0.2)]'>
        <ul>
              {notifications}
            </ul>
        </div>
    </div>
  )
}

export default Notifications