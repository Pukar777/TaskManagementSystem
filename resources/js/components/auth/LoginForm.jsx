import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
    //VARIABLES

    //outside varaibles (AuthContext, useNavigate)
    const { isAuthenticated } = useContext(AuthContext); //boolean variables
    const { message, error } = useContext(AuthContext);
    const { handleIsAuthenticated, handleToken } = useContext(AuthContext); //functions
    const { handleMessage, handleError } = useContext(AuthContext);

    //local variables
    //---------------
    // 1. hook variables
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        // remember: false,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    //other variables

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {
                data: { user, message, token },
            } = await axios.post(
                "http://localhost/api/auth/login",
                credentials
            );
            handleToken(token);
            handleIsAuthenticated(true);
            handleMessage(message);
            handleError("");
            navigate("/dashboard");
        } catch (error) {
            handleMessage("");
            handleError(error.response.data.message);
        }
    };

    return (
        <>
            <div className="container-fluid bg-dark text-white py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <h1 className="text-center mb-4">Login</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={(e) =>
                                            setCredentials({
                                                ...credentials,
                                                email: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={(e) =>
                                            setCredentials({
                                                ...credentials,
                                                password: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary my-3 custom-bg-color"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                            <div className="mt-3 d-flex justify-content-center">
                                <p>
                                    Don't have an account?{" "}
                                    <a href="/register" className=" my-link">
                                        Register
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {error && <p className="text-danger">{error}</p>}
            {message && <p className="text-success">{message}</p>}
        </>
    );
};
export default LoginForm;
