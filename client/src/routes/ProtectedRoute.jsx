import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ tipos, children }) => {
  const { tipoUsuario } = useSelector(({auth}) => auth);

  return tipos.includes(tipoUsuario) ? children : <Navigate to="/inicio" />;
};
