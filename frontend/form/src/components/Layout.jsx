import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import Outlet from "./Outlet";
import { useSelector } from "react-redux";

export const Layout = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

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
      <Sidebar />

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
