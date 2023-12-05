import React, {useEffect} from "react";
import AuthService from "../../services/authService";
const HomePage: React.FC = () => {
    const accessToken = AuthService.getAccessToken();
    useEffect(() => {
        // perform secured get request using fetch
        // AuthService.getUserInfo(accessToken as string);
    });

    return (<div>
        <h1>This is the home page</h1>
    </div>);
}
export default HomePage;