import { useEffect, useState } from "react";
import useAuth from "./Auth";
import { getUser } from "./Api";
import axios from "axios";
import SideNavBar from "./SideNavBar";

const Dashboard = () => {
    const { user, setUser, error, handleLogout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    let [status, setStatus] = useState("");

    // const [showOptions, setShowOptions] = useState(false);

    // const handleClick = () => {
    //     setShowOptions(!showOptions);
    // };

    const loadUser = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            // console.log(accessToken);
            const userDetails = await getUser(accessToken);
            // console.log(userDetails);
            setUser(userDetails);
            setStatus(userDetails.task_user.map((tk) => tk.task.status));
            // console.log(userDetails.task_user.map((tk) => tk.task.status));
            // console.log(userDetails);
        } catch (error) {
            handleLogout();
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    if (isLoading) {
        return <div className="row justify-content-center">Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    // console.log(user.task_user.map((tk) => tk.task.title));

    // const handleOptChange = (value,index) => {
    //     const copyUserTasks = {...user};
    //     copyUserTasks.task_user[index].task.status= value
    //     // console.log(copyUserTasks)
    //     setStatus(copyUserTasks)
    //     console.log(status);

    // }
    const handleOptChange = (value, id) => {
        const accessToken = localStorage.getItem("accessToken");
        axios.put(
            `http://127.0.0.1:8000/api/update-status/${id}`,
            {
                status: value,
            },

            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            }
        );

        // console.log(value, id, accessToken);

        // const copyUserTasks = {...user};
        // copyUserTasks.task_user[index].task.status= value
        // // console.log(copyUserTasks)
        // setStatus(copyUserTasks)
        // console.log(status);
        loadUser();
    };

    // console.log(user);
    return (
        // <div>
        //   <h1>Welcome, {user.name}</h1>
        //   <p>{user.email}</p>
        //   <button onClick={handleLogout}>Logout</button>
        // </div>
        <>
            <SideNavBar />
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Welcome, {user.name}</h1>
                    </div>
                    <div className="card-body">
                        <p>Email: {user.email}</p>
                        <p>Contact: {user.contact}</p>
                        <p>Address: {user.address}</p>
                        <p>Role: {user.role.name}</p>
                        <button
                            onClick={handleLogout}
                            className="btn btn-danger"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h1>My Task Info</h1>
                        </div>
                        <div className="card-body">
                            {user.task_user.map((tk, index) => (
                                <div key={tk.task.id}>
                                    {/* <p>Id :{tk.task.id}</p> */}
                                    <p>Title: {tk.task.title}</p>
                                    <p>Description: {tk.task.description}</p>
                                    <p>DueDate: {tk.task.dueDate}</p>
                                    <p>Priority: {tk.task.priority}</p>
                                    <p>Status: {tk.task.status}</p>
                                    <form>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="status"
                                                className="form-label"
                                            >
                                               Change Status: 
                                            </label>
                                            <select
                                                id="status"
                                                value={tk.task.status}
                                                // onChange={(event) => handleOptChange(event.target.value,index)}
                                                onChange={(event) =>
                                                    handleOptChange(
                                                        event.target.value,
                                                        tk.task.id
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Select Status
                                                </option>
                                                <option value="ready to start">
                                                    Ready to Start
                                                </option>
                                                <option value="waiting to review">
                                                    Waiting to Review
                                                </option>
                                                <option value="done">
                                                    Done
                                                </option>
                                                <option value="stuck">
                                                    Stuck
                                                </option>
                                            </select>
                                        </div>
                                    </form>
                                    <p>Type: {tk.task.type}</p>
                                    <p>Created By: {tk.task.user?.name}</p>

                                    <hr></hr>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
