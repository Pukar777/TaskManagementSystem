import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
} from "react-router-dom";
import Login from "./Auth/Login";
import Dashboard from "./Auth/Dashboard";
import Register from "./Auth/Register";
import useAuth from "./Auth/Auth";
import CreateUser from "./User/CreateUser";
import ViewUser from "./User/ViewUser";
import EditUser from "./User/EditUser";
import CreateRole from "./Role/CreateRole";
import ViewRole from "./Role/ViewRole";
import EditRole from "./Role/EditRole";
import CreateTask from "./Task/CreateTask";
import ViewTask from "./Task/ViewTask";
import EditTask from "./Task/EditTask";
import ViewTaskDetail from "./Task/ViewTaskDetail";
import { AuthContext } from "./Auth/AuthContext";

const App = () => {
    // const { isLogged } = useAuth();
    const { isLogged } = React.useContext(AuthContext);
    const { user, isLoading, fetchMe } = useAuth();

    React.useEffect(() => {
        fetchMe();
    }, []);

    // console.log(
    //     user.role.permission_role.includes("create-user")
    // );
    // console.log(user.isAuthenticated)
    // console.log(isLogged);

    // console.log(user);
    // console.log(user.isSuper == NULL)

    // if (isLoading) {
    //     return <div className="row justify-content-center">...</div>;
    // }

    const hasPermission = ($permission) => {
        return !(
            // console.log($permission),
            (
                (user && user.isSuper) ||
                (user &&
                    user.role.permission_role.some(
                        (pr) => pr.permission.name == $permission
                    ))
            )
        );
    };

    return (
        <>
            {/* <Router> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {isLogged === false ? (
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            TMS
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarNav"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </nav>

            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/dashboard-react" element={<Dashboard />} />
                {/* <Route exact path="/register" element={<Register />} /> */}

                <Route
                    exact
                    path="/create-user"
                    element={
                        //     // !(
                        //     //    user && user.isSuper ||
                        //     //    user && user.role.permission_role.some(
                        //     //         (pr) => pr.permission.name == "create-user"
                        //     //     )
                        //     // )

                        isLoading === false && hasPermission("create-user") ? (
                            <Navigate to="/dashboard-react" />
                        ) : (
                            <CreateUser />
                        )
                    }

                    // element={(() => {
                    //     const hasPerm = hasPermission("create-user");
                    //     // console.log("loaded");
                    //     return hasPerm ? (
                    //         <Navigate to="/dashboard-react" />
                    //     ) : (
                    //         <CreateUser />
                    //     );
                    // })()}
                />

                <Route
                    exact
                    path="/view-user"
                    element={
                        // !(
                        //     user && user.isSuper ||
                        //     user && user.role.permission_role.some(
                        //         (pr) => pr.permission.name == "read-user"
                        //     )
                        // )

                        isLoading === false && hasPermission("read-user") ? (
                            <Navigate to="/dashboard-react" />
                        ) : (
                            <ViewUser />
                        )
                    }
                />

                {/* <Route exact path="/create-user" element={<CreateUser />} />
                <Route exact path="/view-user" element={<ViewUser />} /> */}

                <Route
                    exact
                    path="/update/:id"
                    element={
                        // <EditUser />
                        isLoading === false && hasPermission("update-user") ? (
                            <Navigate to="/dashboard-react" />
                        ) : (
                            <EditUser />
                        )
                    }
                />

                <Route
                    exact
                    path="/create-role"
                    element={
                        isLoading === false && hasPermission("create-role") ? (
                            <Navigate to="/dashboard-react" />
                        ) : (
                            <CreateRole />
                        )
                    }
                />

                <Route
                    exact
                    path="/view-role"
                    element={
                        isLoading === false && hasPermission("read-role") ? (
                            <Navigate to="/dashboard-react" />
                        ) : (
                            <ViewRole />
                        )
                    }
                />
                {/* <Route exact path="/create-role" element={<CreateRole />} />
                <Route exact path="/view-role" element={<ViewRole />} /> */}
                <Route
                    exact
                    path="/update-role/:id"
                    element={
                        // <EditRole />
                        isLoading === false && hasPermission("update-role") ? (
                            <Navigate to="/dashboard-react" />
                        ) : (
                            <EditRole />
                        )
                    }
                />

                <Route
                    exact
                    path="/create-task"
                    element={
                        isLoading === false && hasPermission("create-task") ? (
                            <Navigate to="/dashboard-react" />
                        ) : (
                            <CreateTask />
                        )
                    }
                />

                <Route
                    exact
                    path="/view-task"
                    element={
                        // !(
                        //     user.isSuper ||
                        //     user.role.permission_role.some(
                        //         (pr) => pr.permission.name == "read-task"
                        //     )
                        // )
                        isLoading === false && hasPermission("read-task") ? (
                            <Navigate to="/dashboard-react" />
                        ) : (
                            <ViewTask />
                        )
                    }
                />

                {/* <Route exact path="/create-task" element={<CreateTask />} />
                <Route exact path="/view-task" element={<ViewTask />} /> */}
                <Route
                    exact
                    path="/update-task/:id"
                    element={
                        // <EditTask />
                        isLoading === false && hasPermission("update-task") ? (
                            <Navigate to="/dashboard-react" />
                        ) : (
                            <EditTask />
                        )
                    }
                />
                <Route
                    exact
                    path="/detail-task/:id"
                    element={<ViewTaskDetail />}
                />
            </Routes>
            {/* </Router> */}
        </>
    );
};

export default App;
