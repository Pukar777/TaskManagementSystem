import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";

import {
    BsFillPersonFill,
    BsClipboardData,
    BsPeopleFill,
    BsGraphUp,
} from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";

import SideBar from "./SideBar";

import ProtectedRoute from "../../ProtectedRoute";

import UserPage from "../users/UserPage";
import TaskPage from "../tasks/TaskPage";
import RolePage from "../roles/RolePage";
import TestPage from "./TestPage";
import Dashboard from "./DashBoard";

const ContentPage = () => {
    const location = useLocation();
    return (
        <>
            <div className="d-flex vh-100 w-100 position-fixed">
                <SideBar />
                <Outlet />

                <Routes>
                    <Route
                        path="/"
                        exact
                        element={
                            <ProtectedRoute requiredPermissions={[]}>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user/*"
                        exact
                        element={
                            <ProtectedRoute requiredPermissions={["read_user"]}>
                                <UserPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/task/*"
                        exact
                        element={
                            <ProtectedRoute requiredPermissions={["read_task"]}>
                                <TaskPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/role/*"
                        exact
                        element={
                            <ProtectedRoute requiredPermissions={["read_role"]}>
                                <RolePage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </>
    );
};

export default ContentPage;
