import React from "react";
import { RoleView } from "./RoleView";
import { RoleCreate } from "./RoleCreate";
import { RoleEdit } from "./RoleEdit";
import { RoleProvider } from "./RoleContext";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const RolePage = () => {
    return (
        <>
            <RoleProvider>
                <div className="cwrap">
                    <Link to="/Role/view">View</Link>
                    <Link to="/Role/edit">Edit</Link>
                    <Link to="/Role/create">Create</Link>
                </div>
                <Routes>
                    <Route exact path="/view" element={<RoleView />} />
                    <Route path="/edit" element={<RoleEdit />} />
                    <Route path="/create" element={<RoleCreate />} />
                </Routes>
            </RoleProvider>
        </>
    );
};

export default RolePage;
