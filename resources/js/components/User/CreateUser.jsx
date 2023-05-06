import React from "react";
import SideNavBar from "../Auth/SideNavBar";
import { useState, useEffect } from "react";
import userHandle from "./Handle";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [role_id, setRoleId] = useState("");
    const {
        handleCreate,
        error,
        setError,
        roles,
        fetchRoles,
        fetchRolesDropDown,
    } = userHandle();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== passwordConfirmation) {
            setError("Passwords do not match");
            return;
        }
        handleCreate(name, email, contact, address, password, role_id);
    };

    useEffect(() => {
        // fetchRoles();
        fetchRolesDropDown();
    }, []);

    // console.log(error);
    return (
        <>
            <SideNavBar />
            <div className="row container justify-content-center">
                <div className="py-5 mt-0 col-md-6 ml-5 mb-5 pb-5">
                    <h1 className="row justify-content-center">Create User</h1>
                    {/* {error && <div className="alert alert-danger">{error.name}</div>} */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                className={`form-control ${
                                    error && error.name && "is-invalid"
                                }`}
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                            {error && error.name && (
                                <div className="invalid-feedback">
                                    {error.name[0]}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                className={`form-control ${
                                    error && error.email && "is-invalid"
                                }`}
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                            {error && error.email && (
                                <div className="invalid-feedback">
                                    {error.email[0]}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contact" className="form-label">
                                Contact:
                            </label>
                            <input
                                type="text"
                                id="contact"
                                className={`form-control ${
                                    error && error.contact && "is-invalid"
                                }`}
                                value={contact}
                                onChange={(event) =>
                                    setContact(event.target.value)
                                }
                            />
                            {error && error.contact && (
                                <div className="invalid-feedback">
                                    {error.contact[0]}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Address:
                            </label>
                            <input
                                type="text"
                                id="address"
                                // className="form-control"
                                className={`form-control ${
                                    error && error.address && "is-invalid"
                                }`}
                                value={address}
                                onChange={(event) =>
                                    setAddress(event.target.value)
                                }
                            />
                            {error && error.address && (
                                <div className="invalid-feedback">
                                    {error.address[0]}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                className={`form-control ${
                                    error && error.password && "is-invalid"
                                }`}
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
                            {error && error.password && (
                                <div className="invalid-feedback">
                                    {error.password[0]}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="password-confirmation"
                                className="form-label"
                            >
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                id="password-confirmation"
                                className={`form-control ${
                                    error &&
                                    error.password &&
                                    "is-invalid"
                                }`}
                                value={passwordConfirmation}
                                onChange={(event) =>
                                    setPasswordConfirmation(event.target.value)
                                }
                            />
                            {error && error.password && (
                                <div className="invalid-feedback">
                                    {error.password[0]}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rold_id" className="form-label">
                                Role:
                            </label>
                            {/* <input
                                type="text"
                                id="role_id"
                                className="form-control"
                                value={role_id}
                                onChange={(event) =>
                                    setRoleId(event.target.value)
                                }
                            /> */}

                            <select
                                value={role_id}
                                onChange={(event) =>
                                    setRoleId(event.target.value)
                                }
                                className={`form-control ${
                                    error && error.role_id && "is-invalid"
                                }`}
                            >
                                <option>Select</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            {error && error.role_id && (
                                <div className="invalid-feedback">
                                    {error.role_id[0]}
                                </div>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateUser;
