import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import {
    Form,
    FormLabel,
    FormGroup,
    FormControl,
    FormSelect,
    Button,
} from "react-bootstrap";

export const UserEdit = () => {
    const { users, selection, setUser } = useContext(UserContext);

    user = users.filter((user) => selection.includes(user.id));
    if (user.length == 1) {
        user = user[0];
    }

    useEffect(() => {}, [user]);

    return (
        <div className="cwrap">
            <Form className="">
                <FormGroup>
                    <FormLabel className="label">Name</FormLabel>
                    <FormControl
                        type="text"
                        placeholder=""
                        value={user.name}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                name: e.target.value,
                            })
                        }
                    ></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel className="label">Email</FormLabel>
                    <FormControl
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                email: e.target.value,
                            })
                        }
                    ></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel className="label">Role</FormLabel>
                    <FormSelect
                        type="select"
                        placeholder=""
                        value={user.role}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                role: e.target.value,
                            })
                        }
                    >
                        <option value="">Select Role</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.role.name}
                            </option>
                        ))}
                    </FormSelect>
                </FormGroup>
            </Form>
        </div>
    );
};
