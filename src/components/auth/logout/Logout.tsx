// Logout.tsx or .jsx
import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from '../../../services/authService'; // Adjust the path to your AuthContext

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        AuthService.logout();
        navigate("/auth");
    });

    return <div>Logging out...</div>;
};

export default Logout;