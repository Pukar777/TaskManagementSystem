import React from "react";
import { useState, useEffect } from "react";
import user from "../Api";

const fetchUsers = async () => {
    const [users, setUsers] = useState([]);

    // localStorage.setItem("name", value);
    // localStorage.getItem("name");
    const userData = await user();
};

export const UserTable = () => {
    // useEffect(() => {
    //     setUsers(userData);
    // }, []);

    console.log(users);

    return (
        <>
            <p>Test UserTable</p>
        </>
    );
};
