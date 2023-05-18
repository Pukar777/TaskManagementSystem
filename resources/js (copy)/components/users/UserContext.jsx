import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApiHandler } from "./UserApiHandle";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selection, setSelection] = useState([]);
    const [message, setMessage] = useState();
    const [error, setError] = useState();

    const { createUser, readUser, deleteUser, updateUser } = UserApiHandler();

    useEffect(() => {
        handleReadUser();
    }, []);

    const handleReadUser = async () => {
        try {
            const {
                data: {
                    message,
                    data: [users, roles],
                },
            } = await readUser();
            setUsers(users);
            setRoles(roles);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateUser = async (userData) => {
        try {
            const response = await createUser(userData);
            const { message, data: newUserData } = response.data;
            const newArray = [...users, ...newUserData];
            console.log(newArray, "helo");
            setUsers(newArray);
            setMessage(message);
            setError("");
        } catch (error) {
            console.log(error);
            setMessage("");
            setError(error);
        }
    };

    const handleSelectionChange = (userId) => {
        if (selection.includes(userId)) {
            setSelection(selection.filter((id) => id !== userId));
        } else {
            setSelection([...selection, userId]);
        }
        console.log(selection, "test");
    };

    const handleEdit = (userId) => {
        setSelection([userId]);
        console.log(selection);
        navigate(`/user/edit`);
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

    return (
        <UserContext.Provider
            value={{
                users,
                setUsers,
                roles,
                selection,
                setSelection,
                handleSelectionChange,
                handleCreateUser,
                handleEdit,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
