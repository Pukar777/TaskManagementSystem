import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Auth/Login";
import Dashboard from "./Auth/Dashboard";
import Register from "./Auth/Register";
import useAuth from "./Auth/Auth";
import CreateUser from "./User/CreateUser";
import ViewUser from "./User/ViewUser";
import EditUser from "./User/EditUser";
import CreateRole from "./Role/CreateRole";
import ViewRole from "./Role/ViewRole";
import EditRole from "./Role/EditRole";
import CreateTask from "./Task/CreateTask";
import ViewTask from "./Task/ViewTask";
import EditTask from "./Task/EditTask";
import ViewTaskDetail from "./Task/ViewTaskDetail";

const App = () => {
    
    const { isLogged } = useAuth();

    // console.log(isLogged);
    return (
        <>
            {/* <Router> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {isLogged === false ? (
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            TMS
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarNav"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </nav>

            <Routes>
               <Route exact path="/" element={<Login />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/dashboard-react" element={<Dashboard />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/create-user" element={<CreateUser/>} />
                <Route exact path="/view-user" element={<ViewUser/>} />
                <Route exact path="/update/:id" element={<EditUser/>} />
                <Route exact path="/create-role" element={<CreateRole/>} />
                <Route exact path="/view-role" element={<ViewRole/>} />
                <Route exact path="/update-role/:id" element={<EditRole/>} />
                <Route exact path="/create-task" element={<CreateTask/>} />
                <Route exact path="/view-task" element={<ViewTask/>} />
                <Route exact path="/update-task/:id" element={<EditTask/>} />
                <Route exact path="/detail-task/:id" element={<ViewTaskDetail/>} />
            </Routes>
            {/* </Router> */}
        </>
    );
};

export default App;
