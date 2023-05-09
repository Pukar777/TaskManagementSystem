import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

const Dashboard = () => {
    return (
        <>
            <div className="cwrap">
                <h1>Dashboard Page</h1>
                {/* <TopBar /> */}
                <SideBar />
                <p>Content Here</p>
            </div>
        </>
    );
};

export default Dashboard;
