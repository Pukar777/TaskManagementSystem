import React, { useState, useEffect } from "react";
import SideNavBar from "../Auth/SideNavBar";
import { useParams } from "react-router-dom";
import taskHandle from "./HandleTask";

function EditTask() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    let [created_by, setCreatedBy] = useState("");
    const [user_id, setUser] = useState([]);
    const {
        handleUpdate,
        error,
        users,
        fetchUsers,
        user,
        loadUser,
        isLoading,
    } = taskHandle();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        axios
            .get(`http://127.0.0.1:8000/api/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            })
            .then((response) => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setDueDate(response.data.dueDate);
                setPriority(response.data.priority);
                setStatus(response.data.status);
                setType(response.data.type);
                // setCreatedBy(response.data.created_by);   //check the created_by delay
                setUser(response.data.task_user.map((ur) => ur.user_id));

                //console.log(response.data);
                // console.log(
                //     response.data.task_user.map((ur) => ur.user_id)
                // );
            })
            .catch((error) => console.error(error));
        fetchUsers();
        loadUser();
    }, [id]);

    const handleOnChange = (e) => {
        if (e.target.checked) {
            setUser((current) => [...current, +e.target.value]);
        } else {
            setUser((current) =>
                current.filter((id) => id !== +e.target.value)
            );
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setCreatedBy(user.id);
        // console.log(setCreatedBy(user.id));
        handleUpdate(
            id,
            title,
            description,
            dueDate,
            priority,
            status,
            type,
            (created_by = user.id),
            user_id
        );
        // console.log(id);
    };

    // console.log(user);

    if (isLoading) {
        return <div className="row justify-content-center">Loading...</div>;
    }

    return (
        // <div>EditTask</div>
        <>
            <SideNavBar />
            <div className="row container justify-content-center">
                <div className="py-5 mt-0 col-md-6 ml-5 mb-5 pb-5">
                    <h1 className="row justify-content-center">Update Task</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Title:
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Description:
                            </label>
                            <textarea
                                type="text"
                                id="name"
                                className="form-control"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Due Date:
                            </label>
                            <input
                                type="date"
                                id="name"
                                className="form-control"
                                value={dueDate}
                                onChange={(event) =>
                                    setDueDate(event.target.value)
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="priority" className="form-label">
                                Priority:
                            </label>
                            <select
                                id="priority"
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
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                                Status:
                            </label>
                            <select
                                id="status"
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
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                                Type:
                            </label>
                            <select
                                id="type"
                                value={type}
                                onChange={(event) =>
                                    setType(event.target.value)
                                }
                            >
                                <option value="">Select Type</option>
                                <option value="feature">Feature</option>
                                <option value="bug">Bug</option>
                            </select>
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
                            <label
                                htmlFor="permission_id"
                                className="form-label"
                            >
                                Users:
                            </label>
                            <div>
                                {users.map((user) => {
                                    const role = user.role; // Assuming that the `user` property is loaded with the `role` relationship
                                    // console.log(role);
                                    const roleName = user.isSuper
                                        ? "Super"
                                        : role
                                        ? role.name
                                        : "No Role"; // handle case where role not found
                                    return (
                                        <div key={user.id}>
                                            <input
                                                type="checkbox"
                                                id={`user-${user.id}`}
                                                value={user.id}
                                                checked={user_id.includes(
                                                    user.id
                                                )}
                                                onChange={handleOnChange}
                                            />
                                            <label htmlFor={`user-${user.id}`}>
                                                {user.name}  {user.isSuper ? "Super" : "Role"} : {roleName}
                                            </label>
                                        </div>
                                    );
                                })}
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

export default EditTask;
