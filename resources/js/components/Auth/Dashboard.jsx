import { useEffect, useState } from "react";
import useAuth from "./Auth";
import { getUser } from "./Api";
// import { Link, BrowserRouter } from "react-router-dom";
import SideNavBar from "./SideNavBar";

const Dashboard = () => {
    const { user, setUser, error, handleLogout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    // const [showOptions, setShowOptions] = useState(false);

    // const handleClick = () => {
    //     setShowOptions(!showOptions);
    // };

    useEffect(() => {
        const loadUser = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                // console.log(accessToken);
                const userDetails = await getUser(accessToken);
                // console.log(userDetails);
                setUser(userDetails);
            } catch (error) {
                handleLogout();
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    if (isLoading) {
        return <div className="row justify-content-center">Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        // <div>
        //   <h1>Welcome, {user.name}</h1>
        //   <p>{user.email}</p>
        //   <button onClick={handleLogout}>Logout</button>
        // </div>
        <>
        <SideNavBar/>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Welcome, {user.name}</h1>
                    </div>
                    <div className="card-body">
                        <p>Email: {user.email}</p>
                        <p>Contact: {user.contact}</p>
                        <p>Address: {user.address}</p>
                        <button
                            onClick={handleLogout}
                            className="btn btn-danger"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
