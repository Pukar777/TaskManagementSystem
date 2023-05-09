import { useNavigate } from "react-router-dom";
import { createTask, getStoredUser, updateTask, getUser } from "../Auth/Api";
import { useState } from "react";
import useAuth from "../Auth/Auth";

const taskHandle = () => {
    const [error, setError] = useState(null);
    const [errorAuthorization, setAuthorizationError] = useState(null);
    const [users, setUsers] = useState([]); //all users
    const { user, setUser } = useAuth(); //get logged in user detail credentials
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleCreate = async (
        title,
        description,
        dueDate,
        priority,
        status,
        type,
        created_by,
        user_id
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            // console.log(accessToken);
            await createTask(
                accessToken,
                title,
                description,
                dueDate,
                priority,
                status,
                type,
                created_by,
                user_id
            ).then((response)=>{
                setMessage(response.message);
            });
            setError(null);
            // navigate("/view-task");
        } catch (error) {
            if (error.response.status == "403") {
                setAuthorizationError(error.response.data);
            }
            // console.log(error.response.data.errors);
            setError(error.response.data.errors);
        }
    };

    const handleUpdate = async (
        id,
        title,
        description,
        dueDate,
        priority,
        status,
        type,
        created_by,
        user_id
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            // console.log(accessToken);
            await updateTask(
                id,
                accessToken,
                title,
                description,
                dueDate,
                priority,
                status,
                type,
                created_by,
                user_id
            ).then((response)=>{
                setMessage(response.message);
            });
            setError(null);
            navigate("/view-task");
        } catch (error) {
            if (error.response.status == "403") {
                setAuthorizationError(error.response.data);
            }

            setError(error.response.data.errors);
        }
    };

    const loadUser = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            // console.log(accessToken);
            const userDetails = await getUser(accessToken);
            // console.log(userDetails);
            setUser(userDetails);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const userData = await getStoredUser(accessToken);
            setUsers(userData);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        handleCreate,
        user,
        loadUser,
        isLoading,
        handleUpdate,
        error,
        setError,
        errorAuthorization,
        users,
        fetchUsers,
        message
    };
};

export default taskHandle;
