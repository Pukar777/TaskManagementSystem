import React from "react";
import { useState, useEffect } from "react";

export const TaskView = () => {
    const [tasks, setTasks] = useState("");
    const [isSelect, setIsSelect] = useState("false");
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectToggle = () => {
        setIsSelect(!isSelect);
    };

    const handleRowSelection = (e, i) => {
        const checked = e.target.checked;
        if (checked) {
            setSelectedRows([...selectedRows, index]);
        } else {
            selectedRows(selectedRows.filter((rowIndex) => rowIndex !== i));
        }
    };

    // useEffect(() => {
    //     setTasks("tasks");
    //     console.log("yap");
    // }, []);

    // const query = () => {
    //     return fetch("your-api-endpoint")
    //         .then((response) => response.json())
    //         .then((data) => data.tasks);
    // };

    // useEffect(() => {
    //     query()
    //         .then((data) => setTasks(data))
    //         .catch((error) => console.log(error));
    // }, []);

    return (
        <>
            <div className="cwrap">
                {isSelecting ? (
                    <div className="mb-3">
                        <button
                            className="btn btn-primary"
                            onClick={handleSelectionToggle}
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <div className="mb-3"></div>
                )}
                <h2 className="text-center text-muted mb-4">List of Tasks</h2>

                <table className="table table-dark text-light text-center">
                    {/* <caption>List of Tasks</caption> */}
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>DueDate</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                    {/* <tbody>
                        {Tasks.map((task, i) => (
                            <tr id={i} key={i}>
                                <td>
                                    <input
                                        type="checkbox"
                                        value={task.id}
                                        onChange={handleCheckboxChange}
                                        checked={selectedRows.includes(task.id)}
                                    />
                                    </td>
                                <td>{task.title}</td>
                                <td>{task.Description}</td>
                                <td>{task.DueDate}</td>
                                <td>{task.Priority}</td>
                                <td>{task.Status}</td>
                                <td>{task.Type}</td>
                                <td>Delete</td>
                            </tr>
                        ))}
                    </tbody> */}
                    <tfoot></tfoot>
                </table>
            </div>
        </>
    );
};

// alternative

{
    /*
                function handleSelectRowsClick() {
                    setIsSelectingRows(true);
                }
                function handleCheckboxChange(event) {
                    const rowId = event.target.value;
                    const isSelected = event.target.checked;
                    if (isSelected) {
                    setSelectedRows([...selectedRows, rowId]);
                    } else {
                    setSelectedRows(selectedRows.filter(id => id !== rowId));
                    }
                }
                <button
                    className="btn btn-secondary mb-3"
                    onClick={handleSelectRowsClick}
                >
                    Select Rows
                </button>
                {isSelectingRows && (
                    <div>
                        <button
                        className="btn btn-primary"
                        onClick={() => {
                            // Handle select row action here
                            console.log(selectedRows);
                            setSelectedRows([]);
                        }}
                        >
                        Select
                        </button>*/
}

// import './bootstrap';

import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, useNavigate, Navigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

import DashBoard from "../components/dashboard/DashBoard";
import UserPage from "../components/users/UserPage";
// import TaskPage from "./components/tasks/TaskPage";
import TaskPage from "../components/tasks/TaskPage";
import AuthPage from "../components/auth/AuthPage";
import LoginForm from "../components/auth/LoginForm";
import { AuthContext } from "../components/auth/AuthContext";
import "./styles.css";

// import Users from "./components/users/Users";

const Index = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated);
    // const navigate = useNavigate();

    return (
        <div className="cwrap h-100 bg-dark text-light">
            {/* <BrowserRouter> */}
            <div className="cwrap bg-dark text-light">
                <div className="topbar bg-dark text-light d-flex align-items-center justify-content-between">
                    <div className="logo">
                        <Link to="/">
                            <img
                                src="logo.png"
                                alt="Logo"
                                width="50"
                                height="50"
                            />{" "}
                            TMS
                        </Link>
                    </div>
                    <div className="d-flex align-items-center">
                        {isAuthenticated ? (
                            <div className="mr-3">
                                <span className="mr-2">Hi, Username</span>
                                <img
                                    src="profile-image.jpg"
                                    alt="Profile"
                                    width="40"
                                    height="40"
                                    className="rounded-circle"
                                />
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="btn btn-outline-light mr-3"
                            >
                                Login
                            </Link>
                        )}
                        {isAuthenticated && (
                            <Link
                                to="/logout"
                                className="btn btn-outline-light"
                            >
                                Logout
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* <h1>Hello World!</h1> */}
            {/* <Link to="/dashboard"> Dashboard </Link>
                <Link to="/user"> User </Link> */}
            <Routes>
                <Route exact path="/dashboard" element={<DashBoard />} />
                <Route exact path="/" element={<DashBoard />} />
                <Route exact path="/users" element={<UserPage />} />
                <Route exact path="/tasks" element={<TaskPage />} />
                <Route exact path="/roles" element={<></>} />
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/logout" element={<LoginForm />} />
            </Routes>
            {/* </BrowserRouter> */}
        </div>
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
