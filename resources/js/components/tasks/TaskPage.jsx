import React, { useEffect, useContext } from "react";
import { TaskView } from "./TaskView";
import { TaskEdit } from "./TaskEdit";
import { TaskCreate } from "./TaskCreate";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { TaskProvider } from "./TaskContext";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import ProtectedRoute from "../../ProtectedRoute";
const TaskPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("create/");
    }, []);
    return (
        <TaskProvider>
            <>
                <Navbar className="">
                    <Nav>
                        <Nav.Link as={Link} to="/dashboard/task">
                            <span className="ms-2 d-none d-lg-inline">
                                View
                            </span>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/dashboard/task/create">
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
                            <ProtectedRoute requiredPermissions={["read_task"]}>
                                <TaskView />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route
                        path="/create"
                        exact
                        element={
                            <ProtectedRoute
                                requiredPermissions={["create_task"]}
                            >
                                <TaskCreate />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route
                        path="/edit"
                        // path="/edit:id"
                        exact
                        element={
                            <ProtectedRoute requiredPermissions={["edit_task"]}>
                                <TaskEdit />
                            </ProtectedRoute>
                        }
                    ></Route>
                </Routes>
                {/* <div className="cwrap">
                    <Link to="/task/view">View</Link>
                    <Link to="/task/edit">Edit</Link>
                    <Link to="/task/create">Create</Link>
                </div>
                <Routes>
                    <Route exact path="/view" element={<TaskView />} />
                    <Route path="/edit" element={<TaskEdit />} />
                    <Route path="/create" element={<TaskCreate />} />
                </Routes> */}
            </>
        </TaskProvider>
    );
};

export default TaskPage;
