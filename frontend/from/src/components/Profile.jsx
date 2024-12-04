import * as React from 'react';
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as yup from "yup";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../util';

const Profile = () => {

  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState({});
  const [passvisible,setpassvisible] = useState(false)
  const [Newpassvisible,setNewpassvisible] = useState(false)
  const [Confpassvisible,setConfpassvisible] = useState(false)

  // handle PassIcon click
  const handlePass = () => {
    setpassvisible(!passvisible);
  };
  const handleNewPass = () => {
    setNewpassvisible(!Newpassvisible);
  };
  const handleConfPass = () => {
    setConfpassvisible(!Confpassvisible);
  };
  const handleSubmit = (e) => {
    console.log("pass changed");
    e.preventDefault();
  };

  const handleChange =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(value);
  }

  const [user,setUser] = useState({
    Password : "",
    NewPassword : "",
    ConformPassword:""
  });

  const handleResetPasword =async ()=>{
    try{
        const resp =await axios.post('http://localhost:3000/auth/resetPassword',user,
            {
                headers:{"Content-type":"application/json"},
                withCredentials:true
            }
        )
        if(resp.status === 200){
            handleSuccess("Password reseted succrssfully")
        }
        
        console.log(resp.status);
    }catch(error){
        if(error.status === 400){
            handleError("Password didnt matached")
        }else if(error.status === 403){
            handleError("Current password in incorrect!")
        }else if(error.status === 404){
            handleError("Current password in incorrect!")
        }else if(error.status === 401){
            handleError("All Fields are mandatory")
        }
    }
    
  }
  const validationSchema = yup.object({
    Password:yup.string().required("Password Can't be empty!"),
    NewPassword:yup.string().required("New Password Can't be empty!"),
    ConformPassword:yup.string().oneOf([yup.ref("NewPassword"), null], "Passwords must match")
    .required("Password Can't be empty!")
  });

  return (
    <div>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '300px',
          margin: 'auto',
          padding: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          bgcolor:'#DFF2EB'
        }}
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" align="center">
          Change Password
        </Typography>

        {/* Current Password Field */}
        <div className='relative'>
          <TextField
            label="Current Password"
            variant="outlined"
            name='Password'
            type={passvisible ? "text" : "password"}
            value={user.Password}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(error.Password)}
            helperText={error.Password}  
          />
          <div className='absolute top-1/2 right-3 transform -translate-y-1/2 text-black cursor-pointer'>
            {passvisible ? <VisibilityIcon onClick={handlePass} /> : <VisibilityOffIcon onClick={handlePass} />}
          </div>
        </div>

        {/* New Password Field */}
        <div className='relative'>
          <TextField
            label="New Password"
            variant="outlined"
            type={Newpassvisible ? "text" : "password"}
            name='NewPassword'
            value={user.NewPassword}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(error.NewPassword)}
            helperText={error.NewPassword}  
          />
          <div className='absolute top-1/2 right-3 transform -translate-y-1/2 text-black cursor-pointer'>
            {Newpassvisible ? <VisibilityIcon onClick={handleNewPass} /> : <VisibilityOffIcon onClick={handleNewPass} />}
          </div>
        </div>

        {/* Confirm New Password Field */}
        <div className='relative'>
          <TextField
            label="Confirm New Password"
            variant="outlined"
            type={Confpassvisible ? "text" : "password"}
            value={user.ConformPassword}
            name='ConformPassword'
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(error.ConfirmPassword)}
            helperText={error.ConfirmPassword}  
          />
          <div className='absolute top-1/2 right-3 transform -translate-y-1/2 text-black cursor-pointer'>
            {Confpassvisible ? <VisibilityIcon onClick={handleConfPass} /> : <VisibilityOffIcon onClick={handleConfPass} />}
          </div>
        </div>

        {/* Submit Button */}
        <Button
        onClick={handleResetPasword} variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default Profile;
