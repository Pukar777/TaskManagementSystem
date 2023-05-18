import React, { useEffect, useContext } from "react";
import { TaskView } from "./TaskView";
import { TaskEdit } from "./TaskEdit";
import { TaskCreate } from "./TaskCreate";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { TaskProvider } from "./TaskContext";

const TaskPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("create/");
    }, []);
    return (
        <>
            <TaskProvider>
                <div className="cwrap">
                    <Link to="/task/view">View</Link>
                    <Link to="/task/edit">Edit</Link>
                    <Link to="/task/create">Create</Link>
                </div>
                <Routes>
                    <Route exact path="/view" element={<TaskView />} />
                    <Route path="/edit" element={<TaskEdit />} />
                    <Route path="/create" element={<TaskCreate />} />
                </Routes>
            </TaskProvider>
        </>
    );
};

export default TaskPage;
