import React from "react";
import {
    Form,
    FormLabel,
    FormGroup,
    FormControl,
    FormSelect,
    Button,
    Col,
} from "react-bootstrap";

const handleTaskCreate = () => {
    console.log("handleTaskCreate");
};

export const TaskCreate = () => {
    return (
        <div className="cwrap">
            <Form>
                <div className="row">
                    <FormGroup className="row">
                        <Form.Label className="label">Title</Form.Label>
                        <FormControl
                            type="text"
                            placeholder="Title"
                        ></FormControl>
                    </FormGroup>
                    <FormGroup className="">
                        <Form.Label className="label">Description</Form.Label>
                        <FormControl
                            type="text"
                            placeholder="Description"
                        ></FormControl>
                    </FormGroup>
                </div>
                <FormGroup>
                    <Form.Label className="label">Due Date</Form.Label>
                    <FormControl type="date"></FormControl>
                </FormGroup>
                <FormGroup>
                    <Form.Label className="label">Priority</Form.Label>
                    <FormSelect type="select">
                        <option value="">Select Priority</option>
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup>
                    <Form.Label className="label">Status</Form.Label>
                    <FormSelect type="select">
                        <option value="">Select Priority</option>
                        <option value="ready">Ready</option>
                        <option value="ongoing">In Progress</option>
                        <option value="pending">Pending</option>
                        <option value="done">Complete</option>
                        <option value="stuck">Stuck</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup>
                    <Form.Label className="label">Type</Form.Label>
                    <FormSelect type="select">
                        <option value="">Select Priority</option>
                        <option value="bug">Bug</option>
                        <option value="feature">Feature</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup>
                    <FormLabel type="select"></FormLabel>
                    <FormSelect
                        value="[]"
                        multiple
                        className="form-control selectpicker"
                        data-live-search="true"
                    >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                        <option value="option5">Option 5</option>
                        {/* {Object.keys(permissions).map((permission) => (
                        <option key={permission} value={permission}>
                        {permissions[permission]}
                        </option>
                    ))} */}
                    </FormSelect>
                </FormGroup>

                <select className="selectpicker" data-live-search="true">
                    <option data-tokens="ketchup mustard">
                        Hot Dog, Fries and a Soda
                    </option>
                    <option data-tokens="mustard">
                        Burger, Shake and a Smile
                    </option>
                    <option data-tokens="frosting">
                        Sugar, Spice and all things nice
                    </option>
                </select>

                {/* <MultiSelectComp options={[a, b, c]} /> */}

                <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                        console.log("test");
                    }}
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
};
