import React from "react";
import { UserView } from "./UserView";
import { UserCreate } from "./UserCreate";
import { UserEdit } from "./UserEdit";
import { UserProvider } from "./UserContext";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";

import ProtectedRoute from "../../ProtectedRoute";

const UserPage = () => {
    return (
        <UserProvider>
            <div
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                className="flex-grow-1 vh-100 "
            >
                <Navbar className="">
                    <Nav>
                        <Nav.Link as={Link} to="/dashboard/user">
                            <span className="ms-2 d-none d-lg-inline">
                                View
                            </span>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/dashboard/user/create">
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
                            <ProtectedRoute requiredPermissions={["read_user"]}>
                                <UserView />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route
                        path="/create"
                        exact
                        element={
                            <ProtectedRoute
                                requiredPermissions={["create_user"]}
                            >
                                <UserCreate />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route
                        path="/edit"
                        // path="/edit:id"
                        exact
                        element={
                            <ProtectedRoute requiredPermissions={["edit_user"]}>
                                <UserEdit />
                            </ProtectedRoute>
                        }
                    ></Route>
                </Routes>

                {/* <div className="cwrap">
                    <Link to="/user/view">View</Link>
                    <Link to="/user/edit">Edit</Link>
                    <Link to="/user/create">Create</Link>
                </div> */}
                {/* <Routes>
                    <Route exact path="/view" element={<UserView />} />
                    <Route path="/edit" element={<UserEdit />} />
                    <Route path="/create" element={<UserCreate />} />
                </Routes> */}
            </div>
        </UserProvider>
    );
};

export default UserPage;
