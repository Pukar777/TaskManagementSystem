import React from "react";
import SideNavBar from "../Auth/SideNavBar";
import { useState, useEffect } from "react";
import roleHandle from "./HandleRole";

function CreateRole() {
    const [name, setName] = useState("");
    const [permission_id, setPermissionId] = useState([]);
    const { handleCreate, error, permissions, fetchPermissons, message, errorAuthorization } = roleHandle();

    const handleSubmit = (event) => {
        event.preventDefault();

        handleCreate(name, permission_id);
    };

    useEffect(() => {
        fetchPermissons();
    }, []);

    const handleOnChange = (e) => {
        if (e.target.checked) {
            setPermissionId((current) => [...current, e.target.value]);
        } else {
            setPermissionId((current) =>
                current.filter((id) => id !== e.target.value)
            );
        }
    };
    return (
        <>
            <SideNavBar />
            <div className="row container justify-content-center">
                <div className="py-5 mt-0 col-md-6 ml-5 mb-5 pb-5">
                    <h1 className="row justify-content-center">Create Role</h1>
                    {message && (
                    <div className="alert alert-danger alert-dismissible">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                        >
                            &times;
                        </button>
                        <strong>{message}</strong> 
                    </div>
                )}
                   {errorAuthorization && (
                        <div className="alert alert-danger alert-dismissible">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="alert"
                            >
                                &times;
                            </button>
                            <strong>{errorAuthorization.message}</strong> Your
                            are not allowed to Create
                        </div>
                    )}
                    {/* {error && <div className="alert alert-danger">{error.name}</div>} */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Role Name:
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
                            <label
                                htmlFor="permission_id"
                                className="form-label"
                            >
                                Permissions:
                            </label>
                            <div>
                                {permissions.map((permission) => (
                                    <div key={permission.id}>
                                        <input
                                            type="checkbox"
                                            id={`permission-${permission.id}`}
                                            value={permission.id}
                                            onChange={handleOnChange}
                                        />
                                        <label
                                            htmlFor={`permission-${permission.id}`}
                                        >
                                            {permission.name}
                                        </label>
                                    </div>
                                ))}
                                {error && (
                                    <div
                                        className="text-danger

"
                                    >
                                        {error.permission_id}
                                    </div>
                                )}
                            </div>
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

export default CreateRole;
