import React, { useContext } from "react";
import Footer from "./Footer";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

import { AuthContext } from "../auth/AuthContext";

const BasePage = () => {
    const { isAuthenticated, error, message } = useContext(AuthContext);
    return (
        <>
            <TopBar />

            {isAuthenticated ? <SideBar /> : null}
        </>
    );
};

export default BasePage;
