import { useNavigate } from "react-router-dom";
import { createTask, getStoredUser, updateTask, getUser } from "../Auth/Api";
import { useState } from "react";
import useAuth from "../Auth/Auth";

const taskHandle = () => {
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]); //all users 
    const { user, setUser } = useAuth();  //get logged in user detail credentials
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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
            );
            setError(null);
            navigate("/view-task");
        } catch (error) {
            setError(error.response.data.error);
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
            );
            setError(null);
            navigate("/view-task");
        } catch (error) {
            setError(error.response.data.error);
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

    return { handleCreate, user,  loadUser, isLoading ,  handleUpdate, error, setError, users, fetchUsers };
};

export default taskHandle;
