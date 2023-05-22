// import React, {useState, useEffect} from "react";
// import SideNavBar from "../Auth/SideNavBar";
// import {getTaskCount, getTaskCountFilter} from "../Auth/Api";
// import userHandle from "../User/Handle";
//
//
// function TaskReport() {
//
//     const [taskCounts, setCountTasks] = useState([]);
//
//     const [filteredTaskCounts, setFilteredTaskCounts] = useState([]);
//     const [isFiltered, setIsFiltered] = useState(false);
//
//     const [error, setError] = useState(null);
//     const [role_id, setRoleId] = useState("");
//     const [dueDate, setDueDate] = useState("");
//
//     const {roles, fetchRolesDropDown} = userHandle();
//
//     const fetchTasksCount = async () => {
//         try {
//             const accessToken = localStorage.getItem("accessToken");
//             const taskCountData = await getTaskCount(accessToken);
//             setCountTasks(taskCountData);
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     const fetchTasksCountFilter = async (role, dueDate) => {
//         try {
//             const accessToken = localStorage.getItem("accessToken");
//             const taskCountDataFilter = await getTaskCountFilter(accessToken, role, dueDate);
//             setFilteredTaskCounts(taskCountDataFilter);
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//
//     // console.log(taskCountsFilter);
//     // useEffect(() => {
//     //     fetchTasksCount();
//     //     fetchTasksCountFilter();
//     //     fetchRolesDropDown();
//     //
//     // }, []);
//
//     useEffect(() => {
//         fetchTasksCount();
//         if (role_id && dueDate) {
//             fetchTasksCountFilter(role_id, dueDate);
//             setIsFiltered(true);
//         } else {
//             setIsFiltered(false);
//         }
//         fetchRolesDropDown();
//     }, [role_id, dueDate]);
//
//     // console.log(taskCounts);
//     return (
//         <>
//             <SideNavBar/>
//
//             <div className="container row">
//
//                 <h1>All Task Report</h1>
//                 {/*<form>*/}
//                     <div className="row">
//                         <div className="col-md-4">
//                             <select
//                                 value={role_id}
//                                 onChange={(event) =>
//                                     setRoleId(event.target.value)
//                                 }
//                                 // className={`form-control ${
//                                 //     error && error.role_id && "is-invalid"
//                                 // }`}
//                                 className="form-control"
//                             >
//                                 <option>Select</option>
//                                 {roles.map((role) => (
//                                     <option key={role.id} value={role.id}>
//                                         {role.name}
//                                     </option>
//                                 ))}
//                             </select>
//
//                         </div>
//                         <div className="col-md-4">
//                             <input
//                                 type="date"
//                                 id="name"
//                                 className={`form-control ${
//                                     error && error.dueDate && "is-invalid"
//                                 }`}
//                                 value={dueDate}
//                                 onChange={(event) =>
//                                     setDueDate(event.target.value)
//                                 }
//                             />
//
//                         </div>
//
//
//                     </div>
//
//
//                 {/*</form>*/}
//
//                 <table className="table col-md-4 border-1">
//                     <thead className="thead-dark">
//                     <tr>
//                         <th>Role Name</th>
//                         <th>Task Count</th>
//                     </tr>
//                     </thead>
//
//                     {/*{taskCounts && taskCounts.length > 0 ? (*/}
//                     {/*    taskCounts.map((taskCount) => {*/}
//                     {/*        return (*/}
//                     {/*            <tbody key={taskCount.id}>*/}
//                     {/*            <tr>*/}
//                     {/*                <td>{taskCount.name}</td>*/}
//                     {/*                <td>{taskCount.task_count}</td>*/}
//
//                     {/*            </tr>*/}
//                     {/*            </tbody>*/}
//                     {/*        );*/}
//                     {/*    })*/}
//                     {/*) : (*/}
//                     {/*    <tbody>*/}
//                     {/*    <tr>*/}
//                     {/*        <td colSpan="3" style={{ textAlign: "center" }}>*/}
//                     {/*            No data*/}
//                     {/*        </td>*/}
//                     {/*    </tr>*/}
//                     {/*    </tbody>*/}
//                     {/*)}*/}
//
//                     {isFiltered && filteredTaskCounts && filteredTaskCounts.length > 0 ? (
//                         filteredTaskCounts.map((taskCount) => {
//                             return (
//                                 <tbody key={taskCount.id}>
//                                 <tr>
//                                     <td>{taskCount.name}</td>
//                                     <td>{taskCount.task_count}</td>
//                                 </tr>
//                                 </tbody>
//                             );
//                         })
//                     ) : (
//                         // Render all task reports
//                         taskCounts && taskCounts.length > 0 ? (
//                             taskCounts.map((taskCount) => {
//                                 return (
//                                     <tbody key={taskCount.id}>
//                                     <tr>
//                                         <td>{taskCount.name}</td>
//                                         <td>{taskCount.task_count}</td>
//                                     </tr>
//                                     </tbody>
//                                 );
//                             })
//                         ) : (
//                             <tbody>
//                             <tr>
//                                 <td colSpan="3" style={{textAlign: "center"}}>
//                                     No data
//                                 </td>
//                             </tr>
//                             </tbody>
//                         )
//                     )}
//
//                 </table>
//             </div>
//         </>
//     );
//
//
// }
//
// export default TaskReport;


import React, {useState, useEffect} from "react";
import SideNavBar from "../Auth/SideNavBar";
import {getTaskCount, getTaskCountFilter} from "../Auth/Api";
import userHandle from "../User/Handle";

function TaskReport() {
    const [taskCounts, setTaskCounts] = useState([]);
    const [filteredTaskCounts, setFilteredTaskCounts] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [error, setError] = useState(null);
    const [role_id, setRoleId] = useState("");
    const [dueDate, setDueDate] = useState("");
    const {roles, fetchRolesDropDown} = userHandle();

    const fetchTasksCount = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const taskCountData = await getTaskCount(accessToken);
            setTaskCounts(taskCountData);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTasksCountFilter = async (role, dueDate) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const taskCountDataFilter = await getTaskCountFilter(
                accessToken,
                role,
                dueDate
            );
            setFilteredTaskCounts(taskCountDataFilter);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFilter = (event) => {
        event.preventDefault();
        if (role_id && dueDate) {
            fetchTasksCountFilter(role_id, dueDate);
            setIsFiltered(true);
        } else {
            setIsFiltered(false);
        }
    };

    useEffect(() => {
        fetchTasksCount();
        fetchRolesDropDown();
    }, []);

    // console.log(filteredTaskCounts);
    return (
        <>
            <SideNavBar/>
            <div className="container row">
                <h1>All Task Report</h1>
                <form onSubmit={handleFilter}>
                    <div className="row">
                        <div className="col-md-4">
                            <select
                                value={role_id}
                                onChange={(event) => setRoleId(event.target.value)}
                                className="form-control"
                            >
                                <option>Select</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.name}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <input
                                type="date"
                                id="dueDate"
                                className="form-control"
                                value={dueDate}
                                onChange={(event) => setDueDate(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-primary">
                                Filter
                            </button>
                        </div>
                    </div>
                </form>
                <table className="table col-md-4 border-1">
                    <thead className="thead-dark">
                    <tr>
                        <th>Role Name</th>
                        <th>Task Count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isFiltered && filteredTaskCounts.length > 0 ? (
                        filteredTaskCounts.map((taskCount) => (
                            <tr key={taskCount.id}>
                                <td>{taskCount.name}</td>
                                <td>{taskCount.task_count}</td>
                            </tr>
                        ))
                    ) : taskCounts.length > 0 ? (
                        taskCounts.map((taskCount) => (
                            <tr key={taskCount.id}>
                                <td>{taskCount.name}</td>
                                <td>{taskCount.task_count}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" style={{textAlign: "center"}}>
                                No data
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TaskReport;
