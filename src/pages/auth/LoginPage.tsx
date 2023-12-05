import React from "react";
import AuthService from "../../services/authService";

const SignIn: React.FC = () => {
    const handleSignIn = async () => {
        // Call authService.signIn here, which should be a function handling the OAuth sign-in process
        await AuthService.login();
    };

    return (
        <div>
            <h1>Sign In</h1>
            {/* Render the "Sign in" button and attach the handleSignIn function to its onClick event */}
            <button onClick={handleSignIn}>Sign In With OAuth</button>
        </div>
    );
};

export default SignIn;