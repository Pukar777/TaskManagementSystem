import React from "react";
import { useState, useEffect, useContext } from "react";
import { RoleContext } from "./RoleContext";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";

export const RoleCreate = () => {
    const navigate = useNavigate();
    const { permissions, handleReadRole, handleCreateRole } =
        useContext(RoleContext);

    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState({
        roleName: "",
        modules: [],
    });

    useEffect(() => {
        const $newPermissions = permissions;
        $newPermissions.map(function ($permission) {
            $permission["fullAccess"] = false;
        });
        role["modules"] = $newPermissions;
    }, [permissions]);

    const handleNameChange = (event) => {
        setRole({ ...role, roleName: event.target.value });
        // setRole(event.target.value);
    };

    const handleFullAccessChange = (mI) => {
        const newRole = { ...role };
        newRole["modules"][mI].fullAccess = !newRole["modules"][mI].fullAccess;
        newRole["modules"][mI]["crud"] = newRole["modules"][mI]["crud"].map(
            (crud) => newRole["modules"][mI].fullAccess
        );
        setRole(newRole);
    };

    const handleCRUDChange = (mI, crudI) => {
        const newRole = { ...role };
        // console.log(newRole);
        newRole["modules"][mI]["crud"][crudI] =
            !newRole["modules"][mI]["crud"][crudI];
        const crudActive = newRole["modules"][mI].crud.every(
            (crud) => crud === true
        );
        newRole["modules"][mI].fullAccess = crudActive;
        setRole(newRole);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateRole(role);
        navigate("/dashboard/role");
        // const prevRoles = { ...roles };

        // setRoles([...roles, structuredClone(role)]);

        // setRoles((prevRoles) => [
        //     ...prevRoles,
        //     { ...role, modules: [...role.modules] },
        // ]);

        // console.log(role);

        // const a = structuredClone(roles);
        // a.push(structuredClone(role));
        // setRoles(a);

        // setRole({ roleName: "", modules: [] });

        // const $newPermissions = permissions;
        // $newPermissions.map(function ($permission) {
        //     $permission["fullAccess"] = false;
        // });
        // role["modules"] = $newPermissions;
    };

    // useEffect(() => {
    //     // console.log(roles);
    // }, [roles]);
    return (
        <div className="bg-dark text-light">
            <Container className="py-4">
                <Row>
                    <Col>
                        <h1>Create Role</h1>
                        <Form>
                            <Form.Group>
                                <Form.Label>Role Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={role["roleName"]}
                                    // className="is-invalid"
                                    onChange={handleNameChange}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Module</th>
                                    <th>Full Access</th>
                                    <th>Create</th>
                                    <th>Read</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {role["modules"].map((module, mI) => (
                                    <tr key={mI}>
                                        <td>{module.name}</td>
                                        <td>
                                            <Form.Check
                                                type="switch"
                                                id={`module-${mI}-full-access`}
                                                label=""
                                                checked={module.fullAccess}
                                                onChange={() =>
                                                    handleFullAccessChange(mI)
                                                }
                                            />
                                        </td>
                                        {module.crud.map((crud, crudI) => (
                                            <td key={crudI}>
                                                <Form.Check
                                                    type="switch"
                                                    id={`module-${mI}-crud-${crudI}`}
                                                    label=""
                                                    checked={crud}
                                                    onChange={() =>
                                                        handleCRUDChange(
                                                            mI,
                                                            crudI
                                                        )
                                                    }
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-end">
                            <Button
                                className=" bt-primary"
                                onClick={handleSubmit}
                            >
                                Create
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
