import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authtoken');
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
