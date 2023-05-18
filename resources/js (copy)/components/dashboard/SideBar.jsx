import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

const SideBar = () => {
    return (
        <>
            <div className="sidebar">
                <ul>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/user">User</Link>
                    <Link to="/role">Role</Link>
                    <Link to="/task">Task</Link>
                    <li>Help</li>
                </ul>
            </div>
        </>
    );
};

export default SideBar;
