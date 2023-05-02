import React, { useEffect, useState } from "react";
import SideNavBar from "../Auth/SideNavBar";
import { deleteRole } from "../Auth/Api";
import { Link, useNavigate } from "react-router-dom";
import userHandle from "../User/Handle";

function ViewRole() {
    const { error, setError, roles, fetchRoles } = userHandle();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleDelete = async (id) => {
        // console.log(id);
        try {
            const accessToken = localStorage.getItem("accessToken");
            // console.log(accessToken);
            await deleteRole(accessToken, id);
            fetchRoles();
        } catch (error) {
            console.error(error);
        }
    };


    const UpdateRole = (id) => {
        navigate(`/update-role/${id}`);
      };
    

    return (
        <>
            <SideNavBar />
            <div className="container row">
                <h1>All Roles</h1>
                <table className="table col-md-4 border-1">
                    <thead className="thead-dark">
                        <tr>
                            <th>Role Name</th>

                            <th>Action</th>
                        </tr>
                    </thead>
               
                    {roles && roles.length > 0 ? (
                        roles.map((role) => {
                            return (
                                <tbody key={role.id}>
                                    <tr>
                                        <td>{role.name}</td>

                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    UpdateRole(role.id)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <span
                                                style={{ paddingLeft: "20px" }}
                                            ></span>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    handleDelete(role.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center" }}>
                                    No data
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
}

export default ViewRole;
