import React from "react";
import SideNavBar from "../Auth/SideNavBar";
import { useState, useEffect } from "react";
import roleHandle from "./HandleRole";

function CreateRole() {
    const [name, setName] = useState("");
    const [permission_id, setPermissionId] = useState([]);
    const { handleCreate, error, permissions, fetchPermissons } = roleHandle();

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
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Role Name:
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
