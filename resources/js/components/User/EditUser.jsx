import React, { useState, useEffect } from "react";
import SideNavBar from "../Auth/SideNavBar";
import { useParams } from "react-router-dom";
import userHandle from "./Handle";

function EditUser() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [role_id, setRoleId] = useState("");
    const { handleUpdate, error, setError, roles, fetchRoles, fetchRolesDropDown } = userHandle();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        axios
            .get(`http://127.0.0.1:8000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            })
            .then((response) => {
                setName(response.data.name);
                setEmail(response.data.email);
                setContact(response.data.contact);
                setAddress(response.data.address);
                setPassword(response.data.password);
                setRoleId(response.data.role_id);
                // console.log(response.data.name);
            })
            .catch((error) => console.error(error));
            // fetchRoles();
            fetchRolesDropDown();
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== passwordConfirmation) {
            setError("Passwords do not match");
            return;
        }
        handleUpdate(id, name, email, contact, address, password, role_id);
        // console.log(id);
    };

    return (
        <>
            <SideNavBar />
            <div className="row container justify-content-center">
                <div className="py-5 mt-0 col-md-6 ml-5 mb-5 pb-5">
                    <h1 className="row justify-content-center">Update User</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contact" className="form-label">
                                Contact:
                            </label>
                            <input
                                type="text"
                                id="contact"
                                className="form-control"
                                value={contact}
                                onChange={(event) =>
                                    setContact(event.target.value)
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Address:
                            </label>
                            <input
                                type="text"
                                id="address"
                                className="form-control"
                                value={address}
                                onChange={(event) =>
                                    setAddress(event.target.value)
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
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
                                className="form-control"
                                value={passwordConfirmation}
                                onChange={(event) =>
                                    setPasswordConfirmation(event.target.value)
                                }
                            />
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
                            >
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditUser;
