import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HeaderComponent from "./components/header/HeaderComponent";
import React from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedOutlet from "./routes/ProtectedOutlet";
import PrivateComponent from "./components/private/PrivateComponent";
import Login from "./components/auth/login/Login";
import HomePage from "./pages/home/HomePage";
import Logout from "./components/auth/logout/Logout";

function App() {
    return (
        <BrowserRouter>
            <HeaderComponent/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/private" element={
                    <ProtectedRoute children={<PrivateComponent/>
                    }/>}
                />
                {/*<Route path="/private-outlet" element={<ProtectedOutlet />}>*/}
                {/*    <Route path="" element={<PrivateComponent />} />*/}
                {/*</Route>*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
