import React from "react";
import { useState, useEffect, useContext } from "react";
import { TaskContext } from "./TaskContext";

export const TaskEdit = () => {
    const { tasks, isTasks, getTasks, selection, handleSelectionChange } =
        useContext(TaskContext);

    useEffect(() => {
        console.log(tasks[1].id);
    }, []);
    return (
        <>
            <div className="cwrap">
                <h2 className="text-center">List of Tasks</h2>
                <table className="table table-striped table-dark text-light text-center .caption-top">
                    {/* <caption>List of Tasks</caption> */}
                    <thead>
                        <tr>
                            <th className="col-1">Select</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Assigned By</th>
                            <th scope="col">DueDate</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    {/* {isTasks ? (
                        <tbody>
                            {tasks.map((task, i) => {
                                return (
                                    <tr id={i} key={i}>
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
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>{task.assigned_by.name}</td>
                                        <td>{task.duedate}</td>
                                        <td>{task.priority}</td>
                                        <td>{task.status}</td>
                                        <td>{task.type}</td>
                                        <td>
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    ) : ( */}
                    <tbody>
                        <tr>
                            <td colSpan="8">No tasks found.</td>
                        </tr>
                    </tbody>
                    {/* )} */}

                    <tfoot></tfoot>
                </table>
            </div>
        </>
    );
};
