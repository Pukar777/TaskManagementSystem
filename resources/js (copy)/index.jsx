import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import HomePage from "./HomePage";

import UserPage from "./components/users/UserPage";
import RolePage from "./components/roles/RolePage";
import TaskPage from "./components/tasks/TaskPage";

import LoginForm from "./components/auth/LoginForm";
import Logout from "./components/auth/Logout";

import BasePage from "./components/layouts/BasePage";
import Dashboard from "./components/dashboard/DashBoard";
import TopBar from "./components/layouts/TopBar";
import SideBar from "./components/layouts/SideBar";
import ContentPage from "./components/layouts/ContentPage";
import { AuthContext } from "./components/auth/AuthContext";

const Index = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <>
            <TopBar />
            <div className="d-flex vh-100">
                <SideBar />
                <ContentPage />
            </div>

            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/login" exact element={<LoginForm />} />
                <Route
                    path="/logout"
                    element={
                        <ProtectedRoute requiredPermissions={[]}>
                            <Logout />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            {/* <Routes>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute requiredPermissions={[]}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user/*"
                    element={
                        <ProtectedRoute requiredPermissions={["read_user"]}>
                            <UserPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/task"
                    element={
                        <ProtectedRoute requiredPermissions={["read_task"]}>
                            <TaskPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/role"
                    element={
                        <ProtectedRoute requiredPermissions={["read_role"]}>
                            <RolePage />
                        </ProtectedRoute>
                    }
                />
            </Routes> */}
        </>
    );
};

export default Index;
