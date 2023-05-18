import React, { createContext, useEffect, useState } from "react";
import { TaskApiHandler } from "./TaskApiHandle";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [isTasks, setIsTasks] = useState(false);
    const [selection, setSelection] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState();
    const [error, setError] = useState();

    const [newTask, setNewTask] = useState({
        // title: "Test Task",
        // description: "This is a Test Task",
        // duedate: "2023-04-16",
        // priority: "medium",
        // status: "ready",
        // type: "bug",
        // assignee: "2",

        title: "",
        description: "",
        dueDate: "",
        priority: "",
        status: "",
        type: "",
        assignee: "",
    });

    useEffect(() => {
        handleReadTask();
    }, []);

    const { createTask, readTask, deleteTask, updateTask } = TaskApiHandler();

    const handleCreateTask = async (taskData) => {
        console.log(taskData);
        const response = await createTask(taskData);
        const { message } = response.data;
        setMessage(message);
        setError("");
    };

    const handleReadTask = () => {
        readTask()
            .then((response) => {
                const {
                    message,
                    data: { users, tasks },
                } = response.data;
                if (response.status == 200) {
                    setIsTasks(true);
                    setUsers(users);
                    setTasks(tasks);
                    return;
                }
                if (response.status == 204) {
                    setIsTasks(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDeleteTask = (taskId) => {
        deleteTask(taskId)
            .then((response) => {
                // handle success
            })
            .catch((error) => {
                // handle error
            });
    };

    const handleUpdateTask = (taskId, taskData) => {
        updateTask(taskId, taskData)
            .then((response) => {
                // handle success
            })
            .catch((error) => {
                // handle error
            });
    };

    const getCookieValue = (cookieName) => {
        var cookies = document.cookie.split("; ");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].split("=");
            if (cookie[0] === cookieName) {
                return cookie[1];
            }
        }
        return null;
    };

    const handleSelectionChange = (taskId) => {
        if (selection.includes(taskId)) {
            setSelection(selection.filter((id) => id !== taskId));
        } else {
            setSelection([...selection, taskId]);
        }
    };
    const handleTaskCreate = () => {};

    const handleGetSelection = () => {
        tasks[1];
    };

    var token = getCookieValue("token");

    const getTasks = () => {
        axios
            .get("http://localhost/api/task", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((response) => {
                const {
                    message,
                    data: { users, tasks },
                } = response.data;

                if (response.status == 200) {
                    setIsTasks(true);
                    setUsers(users);
                    setTasks(tasks);
                    console.log(users);
                    return;
                }
                if (response.status == 204) {
                    setIsTasks(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <TaskContext.Provider
            value={{
                users,
                tasks,
                isTasks,
                setTasks,
                selection,
                setSelection,
                getTasks,
                handleSelectionChange,
                handleCreateTask,
                newTask,
                setNewTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
