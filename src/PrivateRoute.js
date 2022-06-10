import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ auth, component }) => {

   if(!auth.isLoggedIn) {
      return <Navigate to='/login' />
    }
    return component;
};

export default PrivateRoute;
