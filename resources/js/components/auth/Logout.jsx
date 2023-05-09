import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Logout = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        setIsAuthenticated(false);

        navigate("/dashboard");
    }, []);

    return null;
    return <></>;
};

export default Logout;
