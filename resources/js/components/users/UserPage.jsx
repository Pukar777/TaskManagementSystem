import React from "react";
import { UserView } from "./UserView";
import { UserCreate } from "./UserCreate";
import { UserEdit } from "./UserEdit";
import { UserProvider } from "./UserContext";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const UserPage = () => {
    return (
        <>
            <UserProvider>
                <div className="cwrap">
                    <Link to="/user/view">View</Link>
                    <Link to="/user/edit">Edit</Link>
                    <Link to="/user/create">Create</Link>
                </div>
                <Routes>
                    <Route exact path="/view" element={<UserView />} />
                    <Route path="/edit" element={<UserEdit />} />
                    <Route path="/create" element={<UserCreate />} />
                </Routes>
            </UserProvider>
        </>
    );
};

export default UserPage;
