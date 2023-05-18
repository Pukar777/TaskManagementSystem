import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const TaskApiHandler = () => {
    const getCookieValue = (cookieName) => {
        if (!cookieName) {
            throw new Error("Cookie name is required");
        }
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name, value] = cookie.split("=");
            if (name === cookieName) {
                return value;
            }
        }
        return null;
    };

    var token = getCookieValue("token");

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    const createTask = async (taskData) => {
        return await axios.get("http://localhost/api/task", {
            headers,
        });
    };

    const readTask = () => {
        return axios.get("http://localhost/api/task", { headers });
    };

    const deleteTask = (taskId) => {
        return axios.delete(`http://localhost/api/task/${taskId}`, taskData, {
            headers,
        });
    };

    const updateTask = (taskId, taskData) => {
        return axios.put(`http://localhost/api/task/${taskId}`, taskData, {
            headers,
        });
    };

    return { createTask, readTask, deleteTask, updateTask };
};
