import React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    FormSelect,
    Button,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TaskContext } from "./TaskContext";

export const TaskView = () => {
    const { tasks, setTasks, isTasks, getTasks } = useContext(TaskContext);
    const { selection, setSelection, handleSelectionChange } =
        useContext(TaskContext);

    const [multiSelect, setMultiSelect] = useState(false);
    const [renderData, setRenderData] = useState();
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        // console.log(tasks);
        // console.log(selection);
    }, [selection]);

    useEffect(() => {
        setRenderData(tasks);
    }, [tasks]);

    useEffect(() => {}, [renderData]);

    const handleSelectionDelete = () => {
        setTasks(tasks.filter((task) => !selection.includes(task.id)));
    };
    const handleDelete = (taskId) => {
        console.log(taskId);
        setTasks(tasks.filter((task) => task.id !== taskId));
    };
    const handleMultiSelectionEdit = () => {
        // console.log(
        //     "edit, data: ",
        //     selection,
        //     " typeof",
        //     typeof selection,
        //     typeof []
        // );
        if (!selection.length) {
            console.log("selection is null");
            setEditMode(true);
            setMultiSelect(false);
            setSelection([]);
            console.log(tasks);
            setRenderData(tasks);
            handleSelectionChange;
        }
        const selectedTasks = tasks.filter((task) =>
            selection.includes(task.id)
        );
        setRenderData(selectedTasks);
        setEditMode(true);
        setMultiSelect(false);
        setSelection([]);
        console.log(selectedTasks);
    };

    const handleEditCancel = () => {
        setEditMode(false);
        setRenderData(tasks);
        console.log("handleEditCancel");
    };
    const handleEditSave = () => {
        console.log("handleEditSave");
    };

    const handleSelectionEdit = (taskId) => {
        const selectedTask = tasks.find((task) => task.id === taskId);
        console.log(selectedTask);
    };

    const getCookieValue = (cookieName) => {
        var cookies = document.cookie.split("; ");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].split("=");
            if (cookie[0] === cookieName) {
                return cookie[1];
            }
        }
        return null;
    };

    const toggleMultiSelect = () => {
        setMultiSelect(!multiSelect);
        setSelection([]);
    };

    console.log(editMode, "happy", renderData);

    return (
        <>
            <div className="cwrap">
                <div className="btn-toolbar mb-3">
                    <div className="btn-group mr-2">
                        <button
                            type="button"
                            className={
                                "btn btn-secondary ml-1 mr-1" +
                                (editMode ? " d-none" : "")
                            }
                            onClick={toggleMultiSelect}
                        >
                            {multiSelect ? "Cancel" : "MultiSelect"}
                        </button>

                        <button
                            type="button"
                            className={
                                "btn btn-primary ml-1 mr-1" +
                                (editMode ? null : " d-none")
                            }
                            onClick={handleEditSave}
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary ml-1 mr-1"
                            onClick={
                                editMode
                                    ? handleEditCancel
                                    : handleMultiSelectionEdit
                            }
                        >
                            {editMode ? "Cancel" : "Edit"}
                        </button>
                        <button
                            type="button"
                            className={
                                "btn btn-danger ml-1 mr-1" +
                                (editMode ? " d-none" : "")
                            }
                            onClick={handleSelectionDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <h2 className="text-center">List of Tasks</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-dark text-light text-center">
                        <thead>
                            <tr>
                                {multiSelect && (
                                    <th className="align-middle">Select</th>
                                )}
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Assigned By</th>
                                <th scope="col">Due Date</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Status</th>
                                <th scope="col">Type</th>
                                {editMode ? null : <th scope="col">Actions</th>}
                            </tr>
                        </thead>
                        {renderData ? (
                            <tbody>
                                {renderData.map((task, i) => {
                                    return (
                                        <tr id={i} key={i}>
                                            {multiSelect && (
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        onChange={() =>
                                                            handleSelectionChange(
                                                                task.id
                                                            )
                                                        }
                                                        checked={selection.includes(
                                                            task.id
                                                        )}
                                                    />
                                                </td>
                                            )}

                                            {editMode === true ? (
                                                <>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            placeholder={
                                                                task.title
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            placeholder={
                                                                task.description
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        {task.assigned_by.name}
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="date"
                                                            placeholder={
                                                                task.duedate
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        <select
                                                            defaultValue={
                                                                task.priority
                                                            }
                                                        >
                                                            <option value="">
                                                                Select Priority
                                                            </option>
                                                            <option value="critical">
                                                                Crititcal
                                                            </option>
                                                            <option value="high">
                                                                High
                                                            </option>
                                                            <option value="medium">
                                                                Medium
                                                            </option>
                                                            <option value="low">
                                                                Low
                                                            </option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select
                                                            defaultValue={
                                                                task.status
                                                            }
                                                        >
                                                            <option value="">
                                                                Select Status
                                                            </option>
                                                            <option value="ready">
                                                                Ready
                                                            </option>
                                                            <option value="not-started">
                                                                Not Started
                                                            </option>
                                                            <option value="in-progress">
                                                                In Progress
                                                            </option>
                                                            <option value="done">
                                                                Completed
                                                            </option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select
                                                            defaultValue={
                                                                task.type
                                                            }
                                                        >
                                                            <option value="">
                                                                Select Type
                                                            </option>
                                                            <option value="task">
                                                                Task
                                                            </option>
                                                            <option value="bug">
                                                                Bug
                                                            </option>
                                                            <option value="feature">
                                                                Feature
                                                            </option>
                                                        </select>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        {task.assigned_by.name}
                                                    </td>
                                                    <td>{task.duedate}</td>
                                                    <td>{task.priority}</td>
                                                    <td>{task.status}</td>
                                                    <td>{task.type}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-primary mr-1"
                                                            onClick={() =>
                                                                handleSelectionEdit(
                                                                    task.id
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-danger ml-1"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    task.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td colSpan="9">No tasks found.</td>
                                </tr>
                            </tbody>
                        )}
                        <tfoot></tfoot>
                    </table>
                </div>
            </div>
            {/* {error && <p className="text-danger">{error}</p>} */}
            {/* {message && <p className="text-success">{message}</p>} */}
            {/* <div className="create-form"></div> */}
        </>
    );
};
