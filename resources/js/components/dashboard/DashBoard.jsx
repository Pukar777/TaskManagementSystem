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

const Dashboard = () => {
    return (
        <>
            <div
                style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                className="d-inline flex-grow-1"
            >
                This contains dashboard content.
            </div>
        </>
    );
};

export default Dashboard;
