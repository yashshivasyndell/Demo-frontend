import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handlelogout } from "../redux/store/action";
import { useMediaQuery, Drawer, Box, List, Divider, ListItemButton, ListItemIcon, ListItemText, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { MdAdminPanelSettings, MdOutlinePassword } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import zoundslike from "../assets/download.png";
import ListRoundedIcon from '@mui/icons-material/ListRounded';

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
    navigate("/login");
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  // Sidebar content
  const drawerContent = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#87CEEB",
        height: "100vh",
        color: "white",
      }}
    >
      <div className="bg-[#87CEEB] h-[120px] flex items-center justify-center">
        <div className="rounded-full shadow-lg shadow-gray-500">
          <img className="h-14 w-14 rounded-full" src={zoundslike} alt="Logo" />
        </div>
      </div>

      <List>
        <ListItemButton onClick={() => handleNavigation("/dashboard")}>
          <ListItemIcon sx={{ color: "white" }}>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("/home")}>
          <ListItemIcon sx={{ color: "white" }}>
            <Person2OutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("/profile")}>
          <ListItemIcon sx={{ color: "white" }}>
            <MdOutlinePassword />
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("/adminpanel")}>
          <ListItemIcon sx={{ color: "white" }}>
            <MdAdminPanelSettings />
          </ListItemIcon>
          <ListItemText primary={"Admin Panel"} />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("/gallary")}>
          <ListItemIcon sx={{ color: "white" }}>
            <FaImages />
          </ListItemIcon>
          <ListItemText primary={"Gallery"} />
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
