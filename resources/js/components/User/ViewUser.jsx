import React, { useEffect, useState } from "react";
import SideNavBar from "../Auth/SideNavBar";
import { getStoredUser, deleteUser } from "../Auth/Api";
import { Link, useNavigate } from "react-router-dom";

function ViewUser() {
    //   const [userStored, getUserStored] = useState();
    //   const [error, setError] = useState();

    //   useEffect(() => {
    //       const loadStoredUser = async () => {
    //           try {
    //               const accessToken = localStorage.getItem("accessToken");
    //             const userData =   await getStoredUser(
    //                 accessToken,);
    //                 getUserStored(userData);

    //           } catch (error) {
    //             setError(error.response.data.error);
    //           }
    //       };
    //       loadStoredUser();
    //   }, []);

    //   return (
    //     <>
    // <SideNavBar />
    //     <div>
    //         {error && <p>{error}</p>}
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>Name</th>
    //                     <th>Email</th>
    //                     <th>Role</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {userStored.map((user) => (
    //                     <tr key={user.id}>
    //                         <td>{user.name}</td>
    //                         <td>{user.email}</td>
    //                         <td>{user.role}</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    // </>
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const userData = await getStoredUser(accessToken);
            setUsers(userData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        // console.log(id);
        try {
            const accessToken = localStorage.getItem("accessToken");
            // console.log(accessToken);
            await deleteUser(accessToken, id);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };


    const UpdateUser = (id) => {
        navigate(`/update/${id}`);
      };
    

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <SideNavBar />
            <div className="container row">
                <h1>All Users</h1>
                {/* <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} ({user.email})
                        </li>
                    ))}
                </ul> */}
                <table className="table col-md-4 border-1">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {users && users.length > 0 ? (
                        users.map((user) => {
                            const role = user.role; // Assuming that the `user` property is loaded with the `role` relationship
                            // console.log(role);
                            const roleName = role ? role.name : "Unknown"; // handle case where role not found
                            return (
                                <tbody key={user.id}>
                                    <tr>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{roleName}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    UpdateUser(user.id)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <span
                                                style={{ paddingLeft: "20px" }}
                                            ></span>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center" }}>
                                    No data
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
}

export default ViewUser;
