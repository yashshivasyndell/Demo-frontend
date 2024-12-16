import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "../Route/route";
const Outlet = () => {
  return (
    <Routes>
      {routes.map((item, index) => {
         return <Route key={index} path={item.path} element={<item.component />} />
      })}
    </Routes>
  );
};

export default Outlet;
