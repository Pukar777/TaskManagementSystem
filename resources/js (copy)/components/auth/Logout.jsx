import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Logout = () => {
    const navigate = useNavigate();
    const { setUser, setIsAuthenticated, setToken, setCookie } =
        useContext(AuthContext);

    useEffect(() => {
        setUser(null);
        setIsAuthenticated(false);
        setToken(null);
        setCookie("user", null);
        setCookie("token", null);
        navigate("/");
    }, []);

    return <></>;
};

export default Logout;
