import React from "react";
import { useState, useEffect, useContext } from "react";
import { RoleContext } from "./RoleContext";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

export const RoleView = () => {
    const { roles, permissions, setRoles } = useContext(RoleContext);
    console.log(roles);

    const handleEdit = ($id) => {
        console.log("edit", $id);
    };

    const handleDelete = ($id) => {
        setRoles(roles.filter((role) => role.id !== $id));
    };

    return (
        <div className="bg-dark text-light">
            <Container className="py-4">
                <Row>
                    <Col>
                        <h1>Roles</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Roles & Modules</th>
                                    {permissions.map((permission, $i) => (
                                        <th key={$i}>
                                            {permission["name"].toUpperCase()}
                                        </th>
                                    ))}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role) => (
                                    <tr key={role.id}>
                                        <td>{role.name}</td>
                                        {role.modules.map((module, mI) => (
                                            <td key={mI}>
                                                {module.crud.reduce(
                                                    (str, bool, i) =>
                                                        str +
                                                        (bool ? "CRUD"[i] : ""),
                                                    ""
                                                )}
                                            </td>
                                        ))}
                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary mx-1"
                                                onClick={() => {
                                                    console.log(role.id);
                                                    handleEdit(role.id);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger mx-1"
                                                onClick={() =>
                                                    handleDelete(role.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

// const [isSelection, setIsSelection] = useState();
//
// const { roles } = useContext(RoleContext);
// const { selection, setSelection, handleSelectionChange, handleEdit } =
//     useContext(RoleContext);
//
// const handleIsSelection = () => {
//     setIsSelection(!isSelection);
//     setSelection([]);
// };
//
// const handleMultiSelectionEdit = () => {
//     if (!selection.length) {
//         console.log("selection is null");
//         setMultiSelect(false);
//         setSelection([]);
//         console.log(roles);
//         setRenderData(roles);
//         handleSelectionChange;
//     }
//     const selectedRoles = roles.filter((role) =>
//         selection.includes(role.id)
//     );
//     setRenderData(selectedRoles);
//     setMultiSelect(false);
//     setSelection([]);
//     console.log(selectedRoles);
// };
