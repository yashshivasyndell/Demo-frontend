import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import UserSidebar from "./UserSidebar"
import Outlet from "./Outlet";
import { useSelector } from "react-redux";

export const Layout = () => {

  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        display: "flex",
        height: "auto",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
     <Sidebar/> 
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: "hidden",
          marginLeft: isMobile ? 0 : "250px", 
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
