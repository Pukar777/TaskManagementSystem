import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
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
import ContentPage from "./components/dashboard/ContentPage";
import { AuthContext } from "./components/auth/AuthContext";

const Index = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <>
            <TopBar />
            <Outlet />

            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route
                    path="/login"
                    exact
                    element={
                        isAuthenticated ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <LoginForm />
                        )
                    }
                />
                <Route
                    path="/logout"
                    element={
                        <ProtectedRoute requiredPermissions={[]}>
                            <Logout />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute requiredPermissions={[]}>
                            <ContentPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default Index;
