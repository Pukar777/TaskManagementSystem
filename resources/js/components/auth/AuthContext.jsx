import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState();
    const [message, setMessage] = useState();
    const [error, setError] = useState();

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

    const removeCookieValue = (cookieName) => {
        if (!cookieName) {
            throw new Error("Cookie name is required");
        }
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    const addCookieValue = (cookieName, cookieValue) => {
        if (!cookieName) {
            throw new Error("Cookie name is required");
        }
        document.cookie = `${cookieName}=${cookieValue}; path=/;`;
    };

    const handleUser = (user) => {
        setUser(user);
    };

    const handleToken = (token) => {
        if (token === null || token === undefined) {
            removeCookieValue("token");
            setToken();
            return;
        }
        addCookieValue("token", token);
        setToken(token);
    };

    const handleIsAuthenticated = (boolValue) => {
        setIsAuthenticated(boolValue);
    };

    const handleMessage = (message) => {
        setMessage(message);
        setError("");
    };
    const handleError = (error) => {
        setError(error);
        setMessage("");
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                message,
                error,
                handleIsAuthenticated,
                handleToken,
                handleUser,
                handleMessage,
                handleError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
