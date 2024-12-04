import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/store/action";
import zoundslike from "../assets/download.png"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Outlet } from "react-router-dom";
import { handlelogout } from "../redux/store/action";
function Sidebar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    }
  
   const navigate = useNavigate()
  
    const dispatch = useDispatch();


    const handleLogout = async (e) => {
      const logOut = dispatch(handlelogout())
      e.preventDefault();
      if(logOut){
        console.log("Logout Success");
        navigate("/login")
      }else{
        console.log("Error in logging out");
      }
    };
  
    {/*register*/}
    const handleRegister = ()=>{
      navigate('/dashboard')
    }
    {/*Home*/}
    const handleHome = ()=>{
        navigate('/home')
    }
    {/*Profile*/}
    const handleProfile = ()=>{
      navigate('/profile')
    }
    const handleGallary = ()=>{
        navigate('/gallary')
    }

    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {/*dashboard or home*/}
          <ListItemButton 
            onClick={handleRegister}
            selected={location.pathname === '/dashboard'}
            sx={{ backgroundColor: location.pathname === '/dashboard' ? '#B1F0F7' : 'transparent','&:hover': { backgroundColor: '#A1D5DB' },'$hover':{backgroundColor: '#A1D5DB'  }, '&.Mui-selected': { backgroundColor: '#B1F0F7' } }}
          >
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
          
          {/*users or register*/}
          <ListItemButton onClick={handleHome} 
          selected={location.pathname === '/home'}
          sx={{ backgroundColor: location.pathname === '/home' ? 'blue' : 'transparent', '&.Mui-selected': { backgroundColor: '#B1F0F7' } }}
           className="flex items-center">
          <ListItemIcon>
              <Person2OutlinedIcon />
            </ListItemIcon>
              <ListItemText primary={"Home"}/>
          </ListItemButton>

          {/*Profile or password reset*/}
          <ListItemButton onClick={handleProfile}
          selected={location.pathname === '/profile'}
          sx={{ backgroundColor: location.pathname === '/profile' ? 'blue' : 'transparent', '&.Mui-selected': { backgroundColor: '#B1F0F7' } }}
           className="flex items-center">
          <ListItemIcon>
              <Person2OutlinedIcon />
            </ListItemIcon>
              <ListItemText primary={"Profile"}/>
          </ListItemButton>

          {/*login*/}
          <ListItemButton onClick={handleGallary}
          selected={location.pathname === '/gallary'}
          sx={{  '&.Mui-selected': { backgroundColor: '#B1F0F7' } }}
          className="flex items-center">
          <ListItemIcon >
              <LockOpenOutlinedIcon />
            </ListItemIcon>
              <ListItemText primary={"Gallary"}/>
          </ListItemButton>
        </List>
        <Divider/>
        <List>
        <ListItemButton onClick={handleLogout} className="flex items-center">
          <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
              <ListItemText primary={"Log Out"}/>
          </ListItemButton>
        </List>
      </Box>
    );
  
    return (
      <div>
        <Drawer className="" variant="permanent" >
          <div className="">
          <img className="h-14 w-14 mx-auto mt-3" src={zoundslike} alt="" />
          </div>
          {DrawerList}
        </Drawer>
      </div>
    );
  };
  

export default Sidebar