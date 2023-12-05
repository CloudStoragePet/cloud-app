import {Navigate} from "react-router-dom";
import AuthService from "../services/authService";
import React, {ReactNode} from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = AuthService.isAuthenticated();

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return <Navigate to="/login" />;
};

export default ProtectedRoute;