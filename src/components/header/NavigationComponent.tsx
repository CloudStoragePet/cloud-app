import {NavLink} from "react-router-dom";
import './css/NavigationComponent.css';
import AuthProvider from "../../services/authService";

const NavigationComponent = () => {
    const isAuthenticated = AuthProvider.isAuthenticated();
    return (
        <nav className={"nav-main"}>
            <NavLink to="/">Home</NavLink>
            {isAuthenticated ?
                <NavLink to="/logout">Logout</NavLink> :
                <NavLink to="/login">Auth</NavLink>
            }

        </nav>
    );
}

export default NavigationComponent;