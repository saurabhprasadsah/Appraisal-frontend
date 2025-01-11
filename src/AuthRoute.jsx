import React from "react";
import { Navigate } from "react-router-dom";
import { getAllowedRoutes } from "./RoutePermissions";

const AuthRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    return <Navigate to="/" />;
  }

  const allowedRoutes = getAllowedRoutes(loggedInUser.role);
  const currentPath = window.location.pathname;

  if (!allowedRoutes.includes(currentPath)) {
    return <Navigate to={allowedRoutes[0] || "/"} />;
  }

  return children;
};

export default AuthRoute;
