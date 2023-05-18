import React from "react";
import { useEffect, useState, useContext } from "react";
import { TaskContext } from "./TaskContext";
import {
    Form,
    FormLabel,
    FormGroup,
    FormControl,
    FormSelect,
    Button,
} from "react-bootstrap";

export const TaskCreate = () => {
    const { users, handleCreateTask, newTask, setNewTask } =
        useContext(TaskContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newTask);
        handleCreateTask([newTask]);
    };
    return (
        <div className="cwrap">
            <Form className="">
                <FormGroup className="row">
                    <Form.Label className="label">Title</Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Title"
                        value={newTask.title}
                        onChange={(e) =>
                            setNewTask({
                                ...newTask,
                                title: e.target.value,
                            })
                        }
                    ></FormControl>
                </FormGroup>
                <FormGroup className="">
                    <Form.Label className="label">Description</Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Description"
                        value={newTask.description}
                        onChange={(e) =>
                            setNewTask({
                                ...newTask,
                                description: e.target.value,
                            })
                        }
                    ></FormControl>
                </FormGroup>
                <FormGroup>
                    <Form.Label className="label">Due Date</Form.Label>
                    <FormControl
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) =>
                            setNewTask({
                                ...newTask,
                                dueDate: e.target.value,
                            })
                        }
                    ></FormControl>
                </FormGroup>
                <FormGroup>
                    <Form.Label className="label">Priority</Form.Label>
                    <FormSelect
                        type="select"
                        value={newTask.priority}
                        onChange={(e) =>
                            setNewTask({
                                ...newTask,
                                priority: e.target.value,
                            })
                        }
                    >
                        <option value="">Select Priority</option>
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup>
                    <Form.Label className="label">Status</Form.Label>
                    <FormSelect
                        type="select"
                        value={newTask.status}
                        onChange={(e) =>
                            setNewTask({
                                ...newTask,
                                status: e.target.value,
                            })
                        }
                    >
                        <option value="">Select Status</option>
                        <option value="ready">Ready</option>
                        <option value="ongoing">In Progress</option>
                        <option value="pending">Pending</option>
                        <option value="done">Complete</option>
                        <option value="stuck">Stuck</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup>
                    <Form.Label className="label">Type</Form.Label>
                    <FormSelect
                        type="select"
                        value={newTask.type}
                        onChange={(e) =>
                            setNewTask({
                                ...newTask,
                                type: e.target.value,
                            })
                        }
                    >
                        <option value="">Select Type</option>
                        <option value="bug">Bug</option>
                        <option value="feature">Feature</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup>
                    <FormLabel className="label">Assignee</FormLabel>
                    <FormSelect
                        type="select"
                        value={newTask.assignee}
                        onChange={(e) =>
                            setNewTask({
                                ...newTask,
                                assignee: e.target.value,
                            })
                        }
                        className="form-control selectpicker"
                        data-live-search="true"
                    >
                        <option value="">Select Assignee</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name} - {user.role}
                            </option>
                        ))}
                    </FormSelect>
                </FormGroup>

                {/* <select className="selectpicker" data-live-search="true">
                    <option data-tokens="ketchup mustard">
                        Hot Dog, Fries and a Soda
                    </option>
                    <option data-tokens="mustard">
                        Burger, Shake and a Smile
                    </option>
                    <option data-tokens="frosting">
                        Sugar, Spice and all things nice
                    </option>
                </select> */}

                {/* <MultiSelectComp options={[a, b, c]} /> */}

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
};
