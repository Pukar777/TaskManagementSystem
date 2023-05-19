import React ,{useState, useEffect} from "react";
import SideNavBar from "../Auth/SideNavBar";
import {getTaskCount} from "../Auth/Api";


function TaskReport(){

    const [taskCounts, setCountTasks] = useState([]);
    const [error, setError] = useState(null);

    const fetchTasksCount = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const taskCountData = await getTaskCount(accessToken);
            setCountTasks(taskCountData);
        } catch (error) {
            console.error(error);
        }
    };

    // console.log(tasks);
    useEffect(() => {
        fetchTasksCount();
    }, []);


    console.log(taskCounts);
    return (
        <>
            <SideNavBar/>

            <div className="container row">
                <h1>All Task Report</h1>
                <table className="table col-md-4 border-1">
                    <thead className="thead-dark">
                    <tr>
                        <th>Role Name</th>
                        <th>Task Count</th>
                    </tr>
                    </thead>

                    {taskCounts && taskCounts.length > 0 ? (
                        taskCounts.map((taskCount) => {
                            return (
                                <tbody key={taskCount.id}>
                                <tr>
                                    <td>{taskCount.name}</td>
                                    <td>{taskCount.task_count}</td>

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

export default TaskReport;
