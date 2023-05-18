import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const cookieNames = {
    user: "user",
    token: "token",
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = getCookie(cookieNames.user);
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(!!user);
    const [token, setToken] = useState(() => {
        const storedToken = getCookie(cookieNames.token);
        return storedToken || null;
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const setCookie = (cookieName, cookieValue) => {
        if (!cookieName) {
            throw new Error("Cookie name is required");
        }
        if (cookieValue === null || cookieValue === undefined) {
            removeCookieValue(cookieName);
            return;
        }
        addCookieValue(cookieName, cookieValue);
    };

    const handleUser = (user) => {
        console.log("TEst in handleUser");
        setUser(user);
        setCookie(cookieNames.user, JSON.stringify(user));
        setIsAuthenticated(!!user);
    };

    const handleToken = (token) => {
        setToken(token);
        setCookie(cookieNames.token, token);
    };

    const handleIsAuthenticated = (boolValue) => {
        setIsAuthenticated(boolValue);
        console.log("test", isAuthenticated);
    };

    const removeCookieValue = (cookieName) => {
        if (!cookieName) {
            throw new Error("Cookie name is required");
        }
        Cookies.remove(cookieName);
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    const addCookieValue = (cookieName, cookieValue) => {
        if (!cookieName) {
            throw new Error("Cookie name is required");
        }
        document.cookie = `${cookieName}=${cookieValue}; path=/;`;
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
                user,
                setUser: handleUser,
                isAuthenticated,
                setIsAuthenticated: handleIsAuthenticated,
                token,
                setToken: handleToken,
                setCookie,
                getCookie,
                message,
                setMessage: handleMessage,
                error,
                setError: handleError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function getCookie(cookieName) {
    const cookieValue = Cookies.get(cookieName);
    return cookieValue || null;
}
