import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import Cookies from "js-cookie";

export const UserApiHandler = () => {
    const { token } = useContext(AuthContext);

    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    };

    const createUser = async (userData) => {
        return await axios.post(
            "http://localhost/api/user",

            userData,
            {
                headers,
            }
        );
    };

    const readUser = () => {
        return axios.get("http://localhost/api/user", { headers });
    };

    const deleteUser = (userId) => {
        return axios.delete(`http://localhost/api/user/${userId}`, userData, {
            headers,
        });
    };

    const updateUser = (userId, userData) => {
        return axios.put(`http://localhost/api/user/${userId}`, userData, {
            headers,
        });
    };

    return { createUser, readUser, deleteUser, updateUser };
};
