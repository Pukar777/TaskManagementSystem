import React from "react";
import { useState, useEffect, useContext } from "react";
import user from "../Api";
import { Accordion } from "react-bootstrap";
import { UserContext } from "./UserContext";

export const UserView = () => {
    const [isSelection, setIsSelection] = useState();

    const { users, roles } = useContext(UserContext);
    const { selection, setSelection, handleSelectionChange, handleEdit } =
        useContext(UserContext);

    const handleIsSelection = () => {
        setIsSelection(!isSelection);
        setSelection([]);
    };

    const handleMultiSelectionEdit = () => {
        if (!selection.length) {
            console.log("selection is null");
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
        setMultiSelect(false);
        setSelection([]);
        console.log(selectedTasks);
    };

    return (
        <div className="cwrap">
            <div className="btn-toolbar mb-3">
                <div className="btn-group mr-2">
                    <button
                        type="button"
                        className={"btn btn-secondary ml-1 mr-1"}
                        onClick={handleIsSelection}
                    >
                        {isSelection ? "Cancel" : "MultiSelect"}
                    </button>
                    <button type="button" className="btn btn-primary ml-1 mr-1">
                        Edit
                    </button>
                    <button
                        type="button"
                        className={"btn btn-danger ml-1 mr-1"}
                        // onClick=""
                    >
                        Delete
                    </button>
                </div>
            </div>
            <table
                id="my-table"
                className="table table-striped table-dark text-light text-center"
            >
                <thead>
                    <tr>
                        {isSelection && (
                            <th className="align-middle">Select</th>
                        )}
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => {
                        return (
                            <tr id={i} key={i}>
                                {isSelection && (
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={() =>
                                                handleSelectionChange(user.id)
                                            }
                                            checked={selection.includes(
                                                user.id
                                            )}
                                        />
                                    </td>
                                )}
                                <td>{user.name}</td>
                                <td>
                                    {user.email}
                                    {/* {console.log(user.email)}
                                    {console.log(user)} */}
                                </td>
                                <td>{user.role.name}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary mr-1"
                                        onClick={() => handleEdit(user.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger ml-1"
                                        // onClick={() => handleDelete(task.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>

                {/* <tbody>
                    <Accordion defaultActiveKey="1">
                        {users.map((user) => (
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <tr key={user.id}>
                                        {isSelection && (
                                            <td className="align-middle">
                                                <input
                                                    type="checkbox"
                                                    checked={selection.includes(
                                                        user.id
                                                    )}
                                                    onChange={() =>
                                                        handleSelectionChange(
                                                            user.id
                                                        )
                                                    }
                                                />
                                            </td>
                                        )}
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    handleEditUser(user)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    handleDeleteUser(user)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </Accordion.Header>
                                <Accordion.Body>
                                    This is more details.
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </tbody> */}
            </table>
        </div>

        // <Accordion defaultActiveKey="1">
        //     <Accordion.Item eventKey="0">
        //         <Accordion.Header>Accordion Item #1</Accordion.Header>
        //         <Accordion.Body>Test</Accordion.Body>
        //     </Accordion.Item>
        // </Accordion>
        // table with bootstrap that has mapped users as well as accordion for each mapped row
    );
};
