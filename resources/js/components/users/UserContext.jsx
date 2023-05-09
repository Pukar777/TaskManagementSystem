import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selection, setSelection] = useState([]);

    const handleSelectionChange = (userId) => {
        if (selection.includes(userId)) {
            setSelection(selection.filter((id) => id !== userId));
        } else {
            setSelection([...selection, userId]);
        }
    };

    const getCookieValue = (cookieName) => {
        var cookies = document.cookie.split("; ");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].split("=");
            if (cookie[0] === cookieName) {
                return cookie[1];
            }
        }
        return null;
    };

    var token = getCookieValue("token");

    const handleGetUsers = async () => {
        try {
            const {
                data: {
                    message,
                    data: [users, roles],
                },
            } = await axios.get("http://localhost/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            setUsers(users);
            setRoles(roles);
            // console.log(users, roles);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <UserContext.Provider
            value={{
                users,
                roles,
                handleGetUsers,
                selection,
                setSelection,
                handleSelectionChange,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
