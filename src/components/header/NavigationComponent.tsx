import {NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <div className={"right-side-menu"}>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/auth">Auth</NavLink>
            </nav>
        </div>
    );
}

export default Navigation;