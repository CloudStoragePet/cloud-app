import {Navigate, Outlet} from "react-router-dom";
import AuthService from "../services/authService";
import React from "react";


const ProtectedRoute: React.FC = () => {
    const isAuthenticated = AuthService.isAuthenticated();

    if (isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to="/login" />;
};

export default ProtectedRoute;