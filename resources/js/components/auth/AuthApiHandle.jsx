import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const handleApiLogin = async (credentials) => {
    const headers = {
        Accept: "application/json",
    };

    return await axios.post(
        "http://localhost/api/auth/login",
        credentials,
        headers
    );
};

export const handleLogout = () => {
    return axios.post("http://localhost/api/auth/logout", headers);
};
