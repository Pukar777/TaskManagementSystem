import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [isTasks, setIsTasks] = useState(false);
    const [selection, setSelection] = useState([]);

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
                const { message, tasks } = response.data;
                if (response.status == 200) {
                    setIsTasks(true);
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

    return (
        <TaskContext.Provider
            value={{
                tasks,
                isTasks,
                setTasks,
                selection,
                setSelection,
                getTasks,
                handleSelectionChange,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
