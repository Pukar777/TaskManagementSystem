import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [state, setState] = useState(false);

    const toggleState = () => {
        setState(!state);
    };

    return (
        <TaskContext.Provider value={{ state, toggleState }}>
            {children}
        </TaskContext.Provider>
    );
};

import React, { useEffect, useContext } from "react";
import { TaskProvider } from "./TaskContext";

const TaskPage = () => {
    const { state, toggleState } = useContext(TaskContext);

    return (
        <>
            <TaskProvider>
                <div className="cwrap">
                    <button onClick={toggleState}></button>
                </div>
            </TaskProvider>
        </>
    );
};

export default TaskPage;
