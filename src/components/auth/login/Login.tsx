import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import AuthService from "../../../services/authService";
import {message} from "antd";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Login: React.FC = () => {
    const navigate = useNavigate();
    const query = useQuery();

    useEffect(() => {
        const code = query.get("code");

        if (code) {
            AuthService.handleAuthentication(code).then(() => {
                navigate("/");
            }).catch((error) => {
                    console.error(error);
                    message.error("Failed to log in");
                    navigate("/");
                }
            );
        }
    });

    return (
        <div>
            <button onClick={AuthService.login}>Login</button>
        </div>
    );
};

export default Login;