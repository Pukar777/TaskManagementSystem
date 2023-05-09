import React from "react";
import { useState, useEffect, useContext } from "react";
import user from "../Api";
import { Accordion } from "react-bootstrap";
import { UserContext } from "./UserContext";

// const fetchUsers = async () => {
//     const [users, setUsers] = useState([]);

//     // localStorage.setItem("name", value);
//     // localStorage.getItem("name");
//     const userData = await user();
// };

export const UserView = () => {
    const { users, roles, handleGetUsers } = useContext(UserContext);
    const { selection, setSelection, handleSelectionChange } =
        useContext(UserContext);

    const [isSelection, setIsSelection] = useState();

    // useeffect hook to fetch users
    





    useEffect(() => {
        handleGetUsers();
    }, []);
    // q: how to use github copilot inside react return component jsx
    // a: use ctrl + space to trigger github copilot suggestion inside return component jsx
    //q: for comment prompt // it doesnt work inside return component jsx
    //a: use /* */ to comment inside return component jsx
    //q: shortcut for comment /* */ inside return component jsx



    return (
        // <div className="cwrap">
        //     <table
        //         id="my-table"
        //         className="table table-striped table-dark text-light text-center"
        //     >
        //         <thead>
        //             <tr>
        //                 {isSelection && (
        //                     <th className="align-middle">Select</th>
        //                 )}
        //                 <th scope="col">Name</th>
        //                 <th scope="col">Email</th>
        //                 <th scope="col">Role</th>
        //                 <th scope="col">Actions</th>
        //             </tr>
        //         </thead>

        //         <tbody>
        //             {/* <Accordion defaultActiveKey="1">
        //                 {users.map((user) => (
        //                     <Accordion.Item eventKey="0">
        //                         <Accordion.Header>
        //                             <tr key={user.id}>
        //                                 {isSelection && (
        //                                     <td className="align-middle">
        //                                         <input
        //                                             type="checkbox"
        //                                             checked={selection.includes(
        //                                                 user.id
        //                                             )}
        //                                             onChange={() =>
        //                                                 handleSelectionChange(
        //                                                     user.id
        //                                                 )
        //                                             }
        //                                         />
        //                                     </td>
        //                                 )}
        //                                 <td>{user.name}</td>
        //                                 <td>{user.email}</td>
        //                                 <td>{user.role.name}</td>
        //                                 <td>
        //                                     <button
        //                                         className="btn btn-primary"
        //                                         onClick={() =>
        //                                             handleEditUser(user)
        //                                         }
        //                                     >
        //                                         Edit
        //                                     </button>
        //                                     <button
        //                                         className="btn btn-danger"
        //                                         onClick={() =>
        //                                             handleDeleteUser(user)
        //                                         }
        //                                     >
        //                                         Delete
        //                                     </button>
        //                                 </td>
        //                             </tr>
        //                         </Accordion.Header>
        //                         <Accordion.Body>
        //                             This is more details.
        //                         </Accordion.Body>
        //                     </Accordion.Item>
        //                 ))}
        //             </Accordion> */}
        //         </tbody>
        //     </table>

        //     <Accordion defaultActiveKey="1">
        //         <Accordion.Item eventKey="0">
        //             <Accordion.Header>Accordion Item #1</Accordion.Header>
        //             <Accordion.Body>Test</Accordion.Body>
        //         </Accordion.Item>
        //     </Accordion>
        // </div>
        // table with bootstrap that has mapped users as well as accordion for each mapped row
        <div className="cwrap">
            <table className="table table-striped table-dark text-light text-center">
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

    );
};



