import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

import { handleApiLogin } from "./AuthApiHandle";

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        message,
        setMessage,
        error,
        setError,
        handleUser,
        handleToken,
        handleIsAuthenticated,
        handleMessage,
        handleError,
    } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {
                data: { user, message, token },
            } = await handleApiLogin(credentials);
            console.log(user);
            setUser(user);
            setToken(token);
            setIsAuthenticated(true);
            setMessage(message);
            setError("");
            console.log("test");
            navigate("/dashboard");
        } catch (error) {
            setMessage("");
            setError(error.response.data.message);
        }
    };

    return (
        <>
            <div className="d-flex bg-secondary text-white justify-content-center align-items-center vh-100">
                <Container fluid className="py-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={6} lg={4}>
                                <h1 className="text-center mb-4">Login</h1>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={credentials.email}
                                            onChange={(e) =>
                                                setCredentials({
                                                    ...credentials,
                                                    email: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={credentials.password}
                                            onChange={(e) =>
                                                setCredentials({
                                                    ...credentials,
                                                    password: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </Form.Group>

                                    <div className="d-flex justify-content-center">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="my-3 custom-bg-color"
                                        >
                                            Login
                                        </Button>
                                    </div>
                                </Form>

                                <div className="mt-3 d-flex justify-content-center">
                                    <p>
                                        Don't have an account?{" "}
                                        <a href="/register" className="my-link">
                                            Register
                                        </a>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
        </>
    );
};
export default LoginForm;
