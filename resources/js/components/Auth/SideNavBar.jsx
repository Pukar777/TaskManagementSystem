import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import useAuth from "./Auth";
// import { FaBars, FaTimes } from 'react-icons/fa';

const SideNavBar = () => {
    const {user, isLoading, fetchMe} = useAuth();

    useEffect(() => {
        fetchMe();
    }, []);

    // console.log(user);

    // if (isLoading) {
    //     return <div className="row justify-content-center"></div>;
    // }

    // console.log(
    //     user.isSuper
    //         ? " "
    //         : user.role.permission_role.map(
    //               (pr) => pr.permission.name === "read-role"
    //           )
    // );
    // console.log(isLoading);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard-react">
                    Dashboard {isLoading == false && user && user.name}
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

                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* ------------------------------------------User--------------------------------------------------------------------- */}
                    <ul className="navbar-nav">
                        {((isLoading == false && user && user.isSuper) ||
                            (isLoading == false && user &&
                                user.role.permission_role.some(
                                    (pr) =>
                                        pr.permission.name === "create-user" ||
                                        pr.permission.name === "read-user"
                                ))) && (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    User
                                </a>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    {isLoading == false && user && user.isSuper && (
                                        <>
                                            <Link
                                                className="dropdown-item"
                                                to="/create-user"
                                            >
                                                Create
                                            </Link>
                                            <div className="dropdown-divider"></div>
                                        </>
                                    )}
                                    {isLoading == false && user && user.isSuper
                                        ? " "
                                        : isLoading == false && user &&
                                        user.role.permission_role.some(
                                            (pr) =>
                                                pr.permission.name ===
                                                "create-user"
                                        ) && (
                                            <>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/create-user"
                                                >
                                                    Create
                                                </Link>
                                                <div className="dropdown-divider"></div>
                                            </>
                                        )}
                                    {isLoading == false && user && user.isSuper ? (
                                        <Link
                                            className="dropdown-item"
                                            to="/view-user"
                                        >
                                            View
                                        </Link>
                                    ) : (
                                        isLoading == false && user &&
                                        user.role.permission_role.some(
                                            (pr) =>
                                                pr.permission.name ===
                                                "read-user"
                                        ) && (
                                            <Link
                                                className="dropdown-item"
                                                to="/view-user"
                                            >
                                                View
                                            </Link>
                                        )
                                    )}
                                </div>
                            </li>
                        )}
                    </ul>
                    {/* ---------------------------------------------------------Role------------------------------------------------------------------------------------ */}
                    <ul className="navbar-nav">
                        {((isLoading == false && user && user.isSuper) ||
                            (isLoading == false && user &&
                                user.role.permission_role.some(
                                    (pr) =>
                                        pr.permission.name === "create-role" ||
                                        pr.permission.name === "read-role"
                                ))) && (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Role
                                </a>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    {isLoading == false && user && user.isSuper && (
                                        <>
                                            <Link
                                                className="dropdown-item"
                                                to="/create-role"
                                            >
                                                Create
                                            </Link>
                                            <div className="dropdown-divider"></div>
                                        </>
                                    )}
                                    {isLoading == false && user && user.isSuper
                                        ? " "
                                        : isLoading == false && user &&
                                        user.role.permission_role.some(
                                            (pr) =>
                                                pr.permission.name ===
                                                "create-role"
                                        ) && (
                                            <>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/create-role"
                                                >
                                                    Create
                                                </Link>
                                                <div className="dropdown-divider"></div>
                                            </>
                                        )}
                                    {isLoading == false && user && user.isSuper ? (
                                        <Link
                                            className="dropdown-item"
                                            to="/view-role"
                                        >
                                            View
                                        </Link>
                                    ) : (
                                        isLoading == false && user &&
                                        user.role.permission_role.some(
                                            (pr) =>
                                                pr.permission.name ===
                                                "read-role"
                                        ) && (
                                            <Link
                                                className="dropdown-item"
                                                to="/view-role"
                                            >
                                                View
                                            </Link>
                                        )
                                    )}
                                </div>
                            </li>
                        )}
                    </ul>

                    {/*----------------------------------Task----------------------------------------------------------------------------------  */}
                    <ul className="navbar-nav">
                        {((isLoading == false && user && user.isSuper) ||
                            (isLoading == false && user &&
                                user.role.permission_role.some(
                                    (pr) =>
                                        pr.permission.name === "create-task" ||
                                        pr.permission.name === "read-task"
                                ))) && (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Task
                                </a>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    {isLoading == false && user && user.isSuper && (
                                        <>
                                            <Link
                                                className="dropdown-item"
                                                to="/create-task"
                                            >
                                                Create
                                            </Link>
                                            <div className="dropdown-divider"></div>
                                        </>
                                    )}
                                    {isLoading == false && user && user.isSuper
                                        ? " "
                                        : isLoading == false && user &&
                                        user.role.permission_role.some(
                                            (pr) =>
                                                pr.permission.name ===
                                                "create-task"
                                        ) && (
                                            <>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/create-task"
                                                >
                                                    Create
                                                </Link>
                                                <div className="dropdown-divider"></div>
                                            </>
                                        )}
                                    {isLoading == false && user && user.isSuper ? (
                                        <Link
                                            className="dropdown-item"
                                            to="/view-task"
                                        >
                                            View
                                        </Link>
                                    ) : (
                                        isLoading == false && user &&
                                        user.role.permission_role.some(
                                            (pr) =>
                                                pr.permission.name ===
                                                "read-task"
                                        ) && (
                                            <Link
                                                className="dropdown-item"
                                                to="/view-task"
                                            >
                                                View
                                            </Link>
                                        )
                                    )}
                                </div>
                            </li>
                        )}
                    </ul>


                    {/*----------------------------------Report----------------------------------------------------------------------------------  */}
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Report
                            </a>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <>
                                    <Link
                                        className="dropdown-item"
                                        to="/view-taskReport"
                                    >
                                        Task Report
                                    </Link>
                                    {/*<div className="dropdown-divider"></div>*/}
                                </>


                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SideNavBar;
