import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handlelogout } from "../redux/store/action";
import { useMediaQuery, Drawer, Box, List, Divider, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import zoundslike from "../assets/download.png";
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import { LuPencil } from "react-icons/lu";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { TfiLightBulb } from "react-icons/tfi";
import { CiUser } from "react-icons/ci";
import { SiSimpleanalytics } from "react-icons/si";
function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("/home");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check screen size (responsive)
  const isMobile = useMediaQuery("(max-width:900px)");

  // Toggle sidebar for mobile screens
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(handlelogout());
    navigate("/adminlogin");
  };

  const handleNavigation = (route) => {
    setSelectedRoute(route)
    navigate(route);
  };

  // Sidebar content
  const drawerContent = (
    <Box
      sx={{
        width:249,
        backgroundColor: "#4ba3c3",
        height: "100vh",
        color: "white",
        overflowY:"hidden"
      }}
    >
      <div className="bg-[#4ba3c3] h-[120px] flex items-center justify-center">
        <div className="rounded-full shadow-xl shadow-gray-500">
          <img className="h-[70px] w-[70px] rounded-full" src={zoundslike} alt="Logo" />
        </div>
      </div>
      <List>
        <ListItemButton sx={{backgroundColor:selectedRoute === '/dashboard'?'white':'transparent',
          color:selectedRoute==='/dashboard'?'black':'white',
          "&:hover":{
            backgroundColor:"rgba(255, 255, 255, 0.1)"
          },margin:"0 7px 0 0px",borderRadius:"10px"}}
          onClick={() => handleNavigation("/dashboard")}>
          <ListItemIcon sx={{color:selectedRoute==='/dashboard'?'black':"white",minWidth:"0px" }}>
            <HomeOutlinedIcon sx={{fontSize:"30px"}}/>
          </ListItemIcon>
          <ListItemText sx={{marginLeft:"10px"}} primary={"Dashboard"}/>
        </ListItemButton>

        <ListItemButton
        sx={{backgroundColor:selectedRoute === '/home'?'white':'transparent',
          color:selectedRoute==='/home'?'black':'white',
          "&:hover":{
            backgroundColor:"rgba(255, 255, 255, 0.1)"
          },margin:"0 7px 0 5px",borderRadius:"10px"}}
        onClick={() => handleNavigation("/home")}>
          <ListItemIcon sx={{color:selectedRoute==='/home'?'black':"white",minWidth:"5px" }}>
            <SiSimpleanalytics />
          </ListItemIcon>
          <ListItemText sx={{marginLeft:"16px"}} primary={"Analytics"} />
        </ListItemButton>

         
        <ListItemButton sx={{backgroundColor:selectedRoute === '/adminpanel'?'white':'transparent',
          color:selectedRoute==='/adminpanel'?'black':'white',
          "&:hover":{
            backgroundColor:"rgba(255, 255, 255, 0.1)"
          },margin:"0 7px 0 5px",borderRadius:"10px"}}
           onClick={() => handleNavigation("/adminpanel")}>
          <ListItemIcon sx={{color:selectedRoute==='/adminpanel'?'black':"white",minWidth:"5px" }}>
            <CiUser />
          </ListItemIcon>
          <ListItemText sx={{marginLeft:"16px"}} primary={"Users"} />
        </ListItemButton>

        <ListItemButton sx={{backgroundColor:selectedRoute === '/profile'?'white':'transparent',
          color:selectedRoute==='/profile'?'black':'white',
          "&:hover":{
            backgroundColor:"rgba(255, 255, 255, 0.1)"
          },margin:"0 7px 0 5px",borderRadius:"10px"}}
           onClick={() => handleNavigation("/profile")}>
          <ListItemIcon sx={{color:selectedRoute==='/profile'?'black':"white",minWidth:"5px" }}>
            <LuPencil />
          </ListItemIcon>
          <ListItemText sx={{marginLeft:"16px"}} primary={"Profile"} />
        </ListItemButton>


        <ListItemButton sx={{backgroundColor:selectedRoute === '/addword'?'white':'transparent',
          color:selectedRoute==='/addword'?'black':'white',
          "&:hover":{
            backgroundColor:"rgba(255, 255, 255, 0.1)"
          },margin:"0 7px 0 5px",borderRadius:"10px"}} onClick={() => handleNavigation("/addword")}>
          <ListItemIcon sx={{color:selectedRoute==='/addword'?'black':"white",minWidth:"5px" }}>
            <MdOutlineSpeakerNotes />
          </ListItemIcon>
          <ListItemText sx={{marginLeft:"16px"}} primary={"Add Words"} />
        </ListItemButton>

        <ListItemButton sx={{backgroundColor:selectedRoute === '/game'?'white':'transparent',
          color:selectedRoute==='/game'?'black':'white',
          "&:hover":{
            backgroundColor:"rgba(255, 255, 255, 0.1)"
          },margin:"0 7px 0 5px",borderRadius:"10px"}} onClick={() => handleNavigation("/game")}>
          <ListItemIcon sx={{color:selectedRoute==='/game'?'black':"white",minWidth:"5px" }}>
            <IoGameControllerOutline />
          </ListItemIcon>
          <ListItemText sx={{marginLeft:"16px"}} primary={"Games"} />
        </ListItemButton>

        <ListItemButton sx={{backgroundColor:selectedRoute === '/custom'?'white':'transparent',
          color:selectedRoute==='/custom'?'black':'white',
          "&:hover":{
            backgroundColor:"rgba(255, 255, 255, 0.1)"
          },margin:"0 7px 0 5px",borderRadius:"10px"}} onClick={() => handleNavigation("/custom")}>
          <ListItemIcon sx={{color:selectedRoute==='/custom'?'black':"white",minWidth:"5px" }}>
            <TfiLightBulb />
          </ListItemIcon>
          <ListItemText sx={{marginLeft:"16px"}} primary={"Custom AI"} />
        </ListItemButton>
      </List>

      <Divider />

      <List>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon sx={{ color: "white" }}>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Log Out"} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      {/* Menu Button for Mobile Screens */}
      {isMobile && (
        <ListRoundedIcon
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed", 
            top: 10, 
            left: 10, 
            zIndex: 1000, 
            color: "black", 
          }}
        >
          <MenuIcon />
        </ListRoundedIcon>
      )}

      {/* Sidebar (for Mobile and Desktop) */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Improve performance on mobile
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Sidebar;
