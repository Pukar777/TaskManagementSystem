import React, { useState, useEffect } from "react";
import SideNavBar from "../Auth/SideNavBar";
import { useParams } from "react-router-dom";
import roleHandle from "./HandleRole";
import {API_URL} from "../Auth/Api";

function EditRole() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [permission_id, setPermissionId] = useState([]);
    const {
        handleUpdate,
        error,
        setError,
        permissions,
        errorAuthorization,
        fetchPermissons,
        message,
    } = roleHandle();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        axios
            .get(`${API_URL}/roles/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            })
            .then((response) => {
                setName(response.data.name);
                setPermissionId(
                    response.data.permission_role.map((pr) => pr.permission_id)
                );
                // console.log(response.data.permission_role)

                // console.log(
                //     response.data.permission_role.map((pr) => pr.permission_id)
                // );
            })
            .catch((error) => console.error(error));
        fetchPermissons();
    }, [id]);

    const handleOnChange = (e) => {
        if (e.target.checked) {
            setPermissionId((current) => [...current, +e.target.value]);
        } else {
            setPermissionId((current) =>
                current.filter((id) => id !== +e.target.value)
            );
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        handleUpdate(id, name, permission_id);
        // console.log(id);
    };
    return (
        <>
            <SideNavBar />
            <div className="row container justify-content-center">
                <div className="py-5 mt-0 col-md-6 ml-5 mb-5 pb-5">
                    <h1 className="row justify-content-center">Update Role</h1>

                    {message && (
                        <div className="alert alert-success alert-dismissible">
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
                    {/* {error && <div className="alert alert-danger">{error}</div>} */}
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
                            are not allowed to Update
                        </div>
                    )}
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
                            <div className="row">
                                {permissions.map((permission) => (
                                    <div key={permission.id} className="col-3 pb-5">
                                        <input
                                            type="checkbox"
                                            id={`permission-${permission.id}`}
                                            value={permission.id}
                                            checked={permission_id.includes(
                                                permission.id
                                            )}
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
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditRole;
