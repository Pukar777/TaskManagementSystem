import React from "react";
import { RoleView } from "./RoleView";
import { RoleCreate } from "./RoleCreate";
import { RoleEdit } from "./RoleEdit";
import { RoleProvider } from "./RoleContext";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import ProtectedRoute from "../../ProtectedRoute";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";

const RolePage = () => {
    return (
        <RoleProvider>
            <div
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                className="flex-grow-1 vh-100 "
            >
                <Navbar className="">
                    <Nav>
                        <Nav.Link as={Link} to="/dashboard/role">
                            <span className="ms-2 d-none d-lg-inline">
                                View
                            </span>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/dashboard/role/create">
                            <span className="ms-2 d-none d-lg-inline">
                                Create
                            </span>
                        </Nav.Link>
                    </Nav>
                </Navbar>

                <Outlet />
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={
                            <ProtectedRoute requiredPermissions={["read_role"]}>
                                <RoleView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/create"
                        exact
                        element={
                            <ProtectedRoute
                                requiredPermissions={["create_role"]}
                            >
                                <RoleCreate />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/edit/:id"
                        exact
                        element={
                            <ProtectedRoute
                                requiredPermissions={["update_role"]}
                            >
                                <RoleCreate />
                            </ProtectedRoute>
                        }
                    />
                </Routes>

                {/* <div className="cwrap">
                    <Link to="/dashboard/role/view">View</Link>
                    <Link to="/Role/edit">Edit</Link>
                    <Link to="/Role/create">Create</Link>
                </div>
                <Routes>
                    <Route exact path="/view" element={<RoleView />} />
                    <Route path="/edit" element={<RoleEdit />} />
                    <Route path="/create" element={<RoleCreate />} />
                </Routes> */}
            </div>
        </RoleProvider>
    );
};

export default RolePage;
