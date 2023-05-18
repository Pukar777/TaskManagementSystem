import React from "react";
import { useState, useContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";

import {
    BsFillPersonFill,
    BsClipboardData,
    BsPeopleFill,
    BsGraphUp,
} from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";

import { AuthContext } from "../auth/AuthContext";

const SideBar = () => {
    const location = useLocation();
    const { user } = useContext(AuthContext);

    return (
        <>
            {/* Sidebar */}
            <Navbar
                // bg="secondary"
                variant="dark"
                className="flex-shrink-1 align-items-start"
                style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            >
                <Container fluid>
                    <Navbar.Collapse id="basic-navbar-nav " className="d-flex ">
                        <Nav className="flex-column ">
                            <Nav.Link as={Link} to="/dashboard">
                                <AiOutlineDashboard />
                                <span className="ms-2 d-none d-lg-inline">
                                    Dashboard
                                </span>
                            </Nav.Link>

                            {user.permissions.includes("read_user") && (
                                <Nav.Link as={Link} to="/dashboard/user">
                                    <BsFillPersonFill />
                                    <span className="ms-2 d-none d-lg-inline">
                                        User
                                    </span>
                                </Nav.Link>
                            )}
                            {/* <Nav.Link as={Link} to="/dashboard/user">
                                <BsFillPersonFill />
                                <span className="ms-2 d-none d-lg-inline">
                                    Users
                                </span>
                            </Nav.Link> */}
                            {user.permissions.includes("read_task") && (
                                <Nav.Link as={Link} to="/dashboard/task">
                                    <BsClipboardData />
                                    <span className="ms-2 d-none d-lg-inline">
                                        Tasks
                                    </span>
                                </Nav.Link>
                            )}
                            {user.permissions.includes("read_role") && (
                                <Nav.Link as={Link} to="/dashboard/role">
                                    <BsPeopleFill />
                                    <span className="ms-2 d-none d-lg-inline">
                                        Roles
                                    </span>
                                </Nav.Link>
                            )}

                            <Nav.Link as={Link} to="/dashboard/reports">
                                <BsGraphUp />
                                <span className="ms-2 d-none d-lg-inline">
                                    Reports
                                </span>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default SideBar;
