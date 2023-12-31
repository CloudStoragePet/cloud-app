import React from 'react';
import './css/HeaderComponent.css';
import NavigationComponent from "./NavigationComponent";

const HeaderComponent = () => {
    return (
        <div className="header">
            <div className="left-side-menu">
                Cloud-app
            </div>
            <div className="right-side-menu">
                <NavigationComponent/>
            </div>
        </div>
    );
}

export default HeaderComponent;