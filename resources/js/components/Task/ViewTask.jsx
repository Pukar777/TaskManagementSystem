import React, { useState, useEffect } from "react";
import SideNavBar from "../Auth/SideNavBar";
import { getStoredTasks, deleteTask } from "../Auth/Api";
import { Link, useNavigate } from "react-router-dom";

function ViewTask() {
    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const taskData = await getStoredTasks(accessToken);
            setTasks(taskData);
        } catch (error) {
            console.error(error);
        }
    };

    // console.log(tasks);
    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        // console.log(id);
        try {
            const accessToken = localStorage.getItem("accessToken");
            // console.log(accessToken);
            await deleteTask(accessToken, id);
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const UpdateTask = (id) => {
        navigate(`/update-task/${id}`);
    };


    const TaskDetail = (id) => {
        navigate(`/detail-task/${id}`);
    };

    // console.log(tasks);
    return (
        // <div>ViewTask</div>
        <>
            <SideNavBar />
            <div className="container row">
                <h1>All Tasks</h1>
                {/* <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} ({user.email})
                        </li>
                    ))}
                </ul> */}
                <table className="table col-md-4 border-1">
                    <thead className="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th>Created By</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Type</th>
                            {/* <th>Assigned Users</th> */}
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    {/* {console.log(tasks)} */}
                    {tasks && tasks.length > 0 ? (
                        tasks.map((task) => {
                            const createdBy = task.user
                                ? task.user.name
                                : "Unknown";

                            return (
                                <tbody key={task.id}>
                                    <tr>
                                        <td>{task.title}</td>
                                        <td>{createdBy}</td>
                                        <td>{task.priority}</td>
                                        <td>{task.status}</td>
                                        <td>{task.type}</td>
                                        <td>
                                        <button
                                                className="btn btn-success"
                                                onClick={() =>
                                                    TaskDetail(task.id)
                                                }
                                            >
                                                Detail
                                            </button>
                                            <span
                                                style={{ paddingLeft: "20px" }}
                                            ></span>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    UpdateTask(task.id)
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
                                                    handleDelete(task.id)
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

export default ViewTask;
