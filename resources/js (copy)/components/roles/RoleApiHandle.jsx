import React from "react";

export const RoleApiHandler = () => {
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
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    };

    const createRole = async (roleData) => {
        return await axios.post(
            "http://localhost/api/role",

            roleData,
            {
                headers,
            }
        );
    };

    const readRole = () => {
        return axios.get("http://localhost/api/role", { headers });
    };

    const deleteRole = (roleId) => {
        return axios.delete(`http://localhost/api/role/${roleId}`, roleData, {
            headers,
        });
    };

    const updateRole = (roleId, roleData) => {
        return axios.put(`http://localhost/api/role/${roleId}`, roleData, {
            headers,
        });
    };

    return { createRole, readRole, deleteRole, updateRole };
};
