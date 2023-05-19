import React, { useState, useEffect } from "react";
import SideNavBar from "../Auth/SideNavBar";
import { useParams } from "react-router-dom";
import {API_URL} from "../Auth/Api";

function ViewTaskDetail() {
    const { id } = useParams();
    const [taskDetails, setTaskDetails] = useState([]);

    const Detail = () => {
        const accessToken = localStorage.getItem("accessToken");
        axios
            .get(`${API_URL}/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            })
            .then((response) => {
                setTaskDetails(response.data);
                // setCreatedBy(response.data.created_by);   //check the created_by delay
                // setUser( response.data.task_user.map((ur) => ur.user_id));

                // console.log(response.data);
                //  console.log(response.data.task_user.map((ur) => ur.user.name));
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        Detail();
    }, []);
    // console.log(taskDetails);

    return (
        <>
            <SideNavBar />
            <div className="container">
                <h1>View Task Detail</h1>
                <h3>Title</h3>
                <p>{taskDetails.title}</p>
                <h3>Description</h3>
                <p>{taskDetails.description}</p>
                <h3>Due Date</h3>
                <p>{taskDetails.dueDate}</p>
                <h3>Priority</h3>
                <p>{taskDetails.priority}</p>
                <h3>Status</h3>
                <p>{taskDetails.status}</p>
                <h3>Type</h3>
                <p>{taskDetails.type}</p>
                <h3>Created By</h3>
                {/* <p>{taskDetails.user.name}</p>     */}
                <p>
                    {taskDetails.user
                        ? taskDetails.user.name
                        : "No user assigned"}
                </p>

                {/* //why name is not loading */}
                <h3>All Associated User </h3>
                {/* {taskDetails.task_user.map((ur) => (
                    <p key={ur.user.id}> {ur.user.name} </p>

                ))} */}
                {/* {taskDetails.task_user.map((ur) => (
                    <p key={ur.user.id}>
                        {ur.user.name ? ur.user.name : "No user name available"}
                    </p>
                ))} */}
                {taskDetails.task_user &&
                    taskDetails.task_user.map((ur) => (
                        <p key={ur.user.id}>
                            {ur.user.name
                                ? ur.user.name
                                : "No Associate user"}
                        </p>
                    ))}
            </div>
        </>
    );
}

export default ViewTaskDetail;
