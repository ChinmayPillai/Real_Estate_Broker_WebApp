import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
