import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import {
    Form,
    FormLabel,
    FormGroup,
    FormControl,
    FormSelect,
    Button,
} from "react-bootstrap";

export const UserCreate = () => {
    const navigate = useNavigate();
    const { users, selection, handleCreateUser } = useContext(UserContext);
    const [user, setUser] = useState({
        // name: "",
        // email: "",
        // role_id: "",
        name: "test",
        email: "test@test.test",
        role_id: "3",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        handleCreateUser([user]);
        navigate("/user/view/");
    };

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
                        value={user.role_id}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                role_id: e.target.value,
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
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
};
