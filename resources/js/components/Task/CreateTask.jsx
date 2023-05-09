import React from "react";
import SideNavBar from "../Auth/SideNavBar";
import { useState, useEffect } from "react";
import taskHandle from "./HandleTask";

function CreateTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    let [created_by, setCreatedBy] = useState("");
    const [user_id, setUser] = useState([]);
    const {
        handleCreate,
        error,
        users,
        fetchUsers,
        user,
        loadUser,
        isLoading,
        message,
        errorAuthorization
    } = taskHandle();

    // console.log(created_by);
    const handleSubmit = (event) => {
        event.preventDefault();
        setCreatedBy(user.id);

        handleCreate(
            title,
            description,
            dueDate,
            priority,
            status,
            type,
            (created_by = user.id),
            // created_by,
            user_id
        );
    };

    useEffect(() => {
        fetchUsers();
        loadUser();
    }, []);

    const handleOnChange = (e) => {
        if (e.target.checked) {
            setUser((current) => [...current, e.target.value]);
        } else {
            setUser((current) => current.filter((id) => id !== e.target.value));
        }
    };

    if (isLoading) {
        return <div className="row justify-content-center">Loading...</div>;
    }

    return (
        <>
            <SideNavBar />

            <div className="row container justify-content-center">
                <div className="py-5 mt-0 col-md-6 ml-5 mb-5 pb-5">
                    <h1 className="row justify-content-center">Create Task</h1>
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
                    {/* {error && <div className="alert alert-danger">{error}</div>} */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Title:
                            </label>
                            <input
                                type="text"
                                id="name"
                                className={`form-control ${
                                    error && error.title && "is-invalid"
                                }`}
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                            />
                            {error && error.title && (
                                <div className="invalid-feedback">
                                    {error.title[0]}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Description:
                            </label>
                            <textarea
                                type="text"
                                id="name"
                                className={`form-control ${
                                    error && error.description && "is-invalid"
                                }`}
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                            {error && error.description && (
                                <div className="invalid-feedback">
                                    {error.description[0]}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Due Date:
                            </label>
                            <input
                                type="date"
                                id="name"
                                className={`form-control ${
                                    error && error.dueDate && "is-invalid"
                                }`}
                                value={dueDate}
                                onChange={(event) =>
                                    setDueDate(event.target.value)
                                }
                            />
                            {error && error.dueDate && (
                                <div className="invalid-feedback">
                                    {error.dueDate[0]}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="priority" className="form-label">
                                Priority:
                            </label>
                            <select
                                id="priority"
                                className={`form-control ${
                                    error && error.priority && "is-invalid"
                                }`}
                                value={priority}
                                onChange={(event) =>
                                    setPriority(event.target.value)
                                }
                            >
                                <option value="">Select Priority</option>
                                <option value="critical">Critical</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            {error && error.priority && (
                                <div className="invalid-feedback">
                                    {error.priority[0]}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                                Status:
                            </label>
                            <select
                                id="status"
                                className={`form-control ${
                                    error && error.status && "is-invalid"
                                }`}
                                value={status}
                                onChange={(event) =>
                                    setStatus(event.target.value)
                                }
                            >
                                <option value="">Select Status</option>
                                <option value="ready to start">
                                    Ready to Start
                                </option>
                                <option value="waiting to review">
                                    Waiting to Review
                                </option>
                                <option value="done">Done</option>
                                <option value="stuck">Stuck</option>
                            </select>
                            {error && error.status && (
                                <div className="invalid-feedback">
                                    {error.status[0]}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                                Type:
                            </label>
                            <select
                                id="type"
                                className={`form-control ${
                                    error && error.type && "is-invalid"
                                }`}
                                value={type}
                                onChange={(event) =>
                                    setType(event.target.value)
                                }
                            >
                                <option value="">Select Type</option>
                                <option value="feature">Feature</option>
                                <option value="bug">Bug</option>
                            </select>
                            {error && error.type && (
                                <div className="invalid-feedback">
                                    {error.type[0]}
                                </div>
                            )}
                            
                        </div>
                        {/* <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Created By:
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={created_by}
                                onChange={(event) =>
                                    setCreatedBy(event.target.value)
                                }
                            />
                        </div> */}
                        <div className="mb-3">
                            <label htmlFor="user_id" className="form-label">
                                Users:
                            </label>
                            <div>
                                {users.map((user) => {
                                    const role = user.role; // Assuming that the `user` property is loaded with the `role` relationship
                                    // console.log(role);
                                    const roleName = user.isSuper
                                        ? "Yes"
                                        : role
                                        ? role.name
                                        : "No Role"; // handle case where role not found
                                    return (
                                        <div key={user.id}>
                                            <input
                                                type="checkbox"
                                                id={`user-${user.id}`}
                                                value={user.id}
                                                onChange={handleOnChange}
                                            />
                                            <label htmlFor={`user-${user.id}`}>
                                                {user.name}{" "}
                                                {user.isSuper
                                                    ? "Super"
                                                    : "Role"}{" "}
                                                : {roleName}
                                            </label>
                                        </div>
                                    );
                                })}
                                 {error && (
                                    <div
                                        className="text-danger"
                                    >
                                        {error.user_id}
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

export default CreateTask;
