import React from "react";
import { useState } from "react";
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

const SideBar = () => {
    const location = useLocation();

    return (
        <>
            <div className="d-flex vh-100">
                {/* Sidebar */}
                <Navbar
                    // bg="secondary"
                    variant="dark"
                    className="flex-shrink-1 align-items-start"
                    style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                >
                    <Container fluid>
                        <Navbar.Collapse
                            id="basic-navbar-nav "
                            className="d-flex "
                        >
                            <Nav className="flex-column ">
                                <Nav.Link as={Link} to="/dashboard">
                                    <AiOutlineDashboard />
                                    <span className="ms-2 d-none d-lg-inline">
                                        Dashboard
                                    </span>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/user">
                                    <BsFillPersonFill />
                                    <span className="ms-2 d-none d-lg-inline">
                                        Users
                                    </span>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/task">
                                    <BsClipboardData />
                                    <span className="ms-2 d-none d-lg-inline">
                                        Tasks
                                    </span>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/dashboard/roles">
                                    <BsPeopleFill />
                                    <span className="ms-2 d-none d-lg-inline">
                                        Roles
                                    </span>
                                </Nav.Link>
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

                {/* Main content area */}
                <div
                    className="flex-grow-1 p-3"
                    style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                >
                    <h1>{location.pathname.replace("/dashboard/", "")}</h1>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default SideBar;
