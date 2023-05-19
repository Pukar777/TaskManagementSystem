import { useEffect, useState } from "react";
import useAuth from "./Auth";
import { getUser, API_URL } from "./Api";
import axios from "axios";
import SideNavBar from "./SideNavBar";

const Dashboard = () => {
    const { user, setUser, error, handleLogout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    let [status, setStatus] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [newTasks, setNewTasks] = useState(0); // Add state variable for new tasks
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    // const [newTasks, setNewTasks] = useState(0);

    const loadUser = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            // console.log(accessToken);
            const userDetails = await getUser(accessToken);
            // console.log(userDetails);
            setUser(userDetails);
            // console.log(userDetails.id);
            setStatus(userDetails.task_user.map((tk) => tk.task.status));
            // console.log(userDetails.task_user.map((tk) => tk.task.status));
            // console.log(userDetails);
            // console.log(userDetails.notification.filter(
            //     (nt) => nt.user_id === userDetails.id).length)
            // const newTasks = userDetails.notification.filter((nt) => {
            //     const taskExists = userDetails.task_user.some(
            //         (tu) => tu.task.id === nt.task_id
            //     );
            //     return nt.user_id === userDetails.id && !taskExists;
            // }).length;
            // console.log(newTasks);
            setNewTasks(
                userDetails.notification.filter(
                    (nt) => nt.user_id === userDetails.id
                ).length
                // newTasks
            );
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
            `${API_URL}/update-status/${id}`,
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

    const fontSize = {
        fontSize: 20,
    };

    const handleIconClick = () => {
        setShowDropdown(!showDropdown);
        setNewTasks(0); // reset new tasks count when dropdown is opened
    };

    // function handleAddTask() {
    //     setNewTasks(newTasks + 1);
    // }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredNotifications = user.notification.filter((nt) =>
        nt.task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleTaskClick = (taskId) => {
        setSelectedTaskId(taskId);
        setShowDropdown(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredNotifications.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const pageNumbers = [];
    for (
        let i = 1;
        i <= Math.ceil(filteredNotifications.length / itemsPerPage);
        i++
    ) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
        return (
            <li
                key={number}
                className={currentPage === number ? "active" : null}
            >
                {/* <a href="" onClick={() => setCurrentPage(number)}>
                    {number}
                </a> */}
                {/* <button
                    type="button"

                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </button> */}
                <button style={{marginLeft:10, marginTop:10}}
                    type="button"
                    className={`btn btn-sm ${
                        currentPage === number
                            ? "btn-primary"
                            : "btn-outline-primary"
                    }`}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </button>
            </li>
        );
    });

    // console.log(user.notification);
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
                        {/* <p>Role: {user.role.name}</p> */}
                        {/* <p>Super: {user.isSuper}</p>  */}
                        <p>
                            {user.isSuper ? "Super" : "Role"} :{" "}
                            {user.isSuper
                                ? "Yes"
                                : user.role
                                ? user.role.name
                                : "No Role"}
                        </p>
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
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h1>My Task Info</h1>
                            <div className="dropdown">
                                <i
                                    className={`bi bi-bell-fill${
                                        showDropdown ? " active" : ""
                                    }`}
                                    style={fontSize}
                                    onClick={handleIconClick}
                                >
                                    {newTasks > 0 && ( // Conditionally render badge
                                        <span className="badge bg-danger">
                                            {newTasks}
                                        </span>
                                    )}
                                </i>

                                <div
                                    className={`dropdown-menu position-absolute end-0 ${
                                        showDropdown ? "d-block" : ""
                                    } `}
                                >
                                    <div className="px-3">
                                        <input
                                            type="text"
                                            placeholder="Search Notification"
                                            className={`form-control ${
                                                error &&
                                                error.user_id &&
                                                "is-invalid"
                                            }`}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                    {user.notification &&
                                    user.notification.length > 0 ? (
                                        // user.notification.
                                        currentItems.map((nt) => (
                                            <div
                                                className="row"
                                                key={nt.task.id}
                                            >
                                                <div className="col-12">
                                                    <a
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                            width: "200px",
                                                            overflow: "hidden",
                                                            textOverflow:
                                                                "ellipsis",
                                                        }}
                                                        className="dropdown-item hover-none"
                                                        href={`#${nt.task.id}`}
                                                        onClick={() =>
                                                            handleTaskClick(
                                                                nt.task.id
                                                            )
                                                        }
                                                    >
                                                        <i
                                                            style={{
                                                                paddingLeft: 20,
                                                                fontSize: 20,
                                                            }}
                                                            className={`bi ${
                                                                nt.task
                                                                    ?.priority ===
                                                                "critical"
                                                                    ? "bi-exclamation-square-fill text-danger"
                                                                    : nt.task
                                                                          ?.priority ===
                                                                      "high"
                                                                    ? "bi-exclamation-square-fill text-warning"
                                                                    : nt.task
                                                                          ?.priority ===
                                                                      "medium"
                                                                    ? "bi-exclamation-square-fill text-primary"
                                                                    : "bi-exclamation-square-fill text-secondary"
                                                            }`}
                                                        />{" "}
                                                        <span
                                                            style={{
                                                                paddingLeft: 10,
                                                            }}
                                                        ></span>{" "}
                                                        {nt.task.title}
                                                    </a>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p
                                            style={{
                                                textAlign: "center",
                                                paddingTop: 10,
                                            }}
                                        >
                                            No Notfication
                                        </p>
                                    )}

                                    <ul className="pagination justify-content-center">
                                        {renderPageNumbers}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            {user.task_user && user.task_user.length > 0 ? (
                                user.task_user.map((tk, index) =>
                                    tk.task.id === selectedTaskId ? (
                                        <div key={tk.task.id}>
                                            <p>Title: {tk.task.title}</p>
                                            <p>
                                                Description:{" "}
                                                {tk.task.description}
                                            </p>
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
                                                        onChange={(event) =>
                                                            handleOptChange(
                                                                event.target
                                                                    .value,
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
                                            <p>
                                                Created By: {tk.task.user?.name}
                                            </p>

                                            <hr></hr>
                                        </div>
                                    ) : selectedTaskId === null &&
                                      index === 0 ? (
                                        <div key={tk.task.id}>
                                            <p>Title: {tk.task.title}</p>
                                            <p>
                                                Description:{" "}
                                                {tk.task.description}
                                            </p>
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
                                                        onChange={(event) =>
                                                            handleOptChange(
                                                                event.target
                                                                    .value,
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
                                            <p>
                                                Created By: {tk.task.user?.name}
                                            </p>
                                            <hr></hr>
                                        </div>
                                    ) : null
                                )
                            ) : (
                                <h4 style={{ textAlign: "center" }}>
                                    No Task Assigned
                                </h4>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
