import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Auth/Login";
import Dashboard from "./Auth/Dashboard";
import Register from "./Auth/Register";
import useAuth from "./Auth/Auth";
import CreateUser from "./User/CreateUser";
import ViewUser from "./User/ViewUser";
import EditUser from "./User/EditUser";

const App = () => {
    const { isLogged } = useAuth();

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
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/dashboard-react" element={<Dashboard />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/create-user" element={<CreateUser/>} />
                <Route exact path="/view-user" element={<ViewUser/>} />
                <Route exact path="/update/:id" element={<EditUser/>} />
            </Routes>
            {/* </Router> */}
        </>
    );
};

export default App;
