// import './bootstrap';

import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

import DashBoard from "./components/dashboard/DashBoard";
import UserPage from "./components/users/UserPage";
// import TaskPage from "./components/tasks/TaskPage";
import TaskPage from "./components/tasks/TaskPage";
import AuthPage from "./components/auth/AuthPage";
import LoginForm from "./components/auth/LoginForm";
import Logout from "./components/auth/Logout";
import { AuthContext } from "./components/auth/AuthContext";

import TopBar from "./TopBar";
import "./styles.css";

// import Users from "./components/users/Users";

const Index = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    // if (isAuthenticated == true) {
    //     console.log("loading now");
    //     return <Navigate to="/dashboard" replace={true} />;
    // }

    return (
        <>
            <div className="cwrap h-100 bg-dark text-light">
                {/* <TopBar /> */}

                {/* <h1>Hello World!</h1> */}
                {/* <Link to="/dashboard"> Dashboard </Link>
                <Link to="/user"> User </Link> */}
                <Routes>
                    <Route exact path="/dashboard" element={<DashBoard />} />
                    <Route exact path="/" element={<DashBoard />} />
                    <Route exact path="/user/*" element={<UserPage />} />
                    <Route exact path="/task/*" element={<TaskPage />} />
                    <Route exact path="/role/*" element={<></>} />
                    <Route exact path="/login" element={<LoginForm />} />
                    <Route exact path="/logout" element={<Logout />} />
                </Routes>
            </div>
        </>
    );
};

export default Index;

// index.js
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// ReactDOM.render(
//     <AuthProvider>
//         <App />
//     </AuthProvider>,
//     document.getElementById("root")
// );
