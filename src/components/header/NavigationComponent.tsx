import {NavLink} from "react-router-dom";
import './css/NavigationComponent.css';
const NavigationComponent = () => {
    return (
            <nav className={"nav-main"}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/auth">Auth</NavLink>
            </nav>
    );
}

export default NavigationComponent;