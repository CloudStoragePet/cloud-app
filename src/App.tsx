import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Layout} from "antd";
import HeaderComponent from "./components/header/HeaderComponent";
import React from "react";
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import {PrivateRoute} from "./routes/PrivateRoute";

function App() {
    return (
        <Layout className={"app-layout"}>
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path={"/auth"} Component={AuthPage}/>
                    <Route path={"/"} element={<PrivateRoute component={HomePage}/>}/>
                </Routes>
            </BrowserRouter>
        </Layout>
    );
}

export default App;
