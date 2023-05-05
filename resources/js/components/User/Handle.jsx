import { useNavigate } from "react-router-dom";
import { createUser, updateUser, getStoredRoles, getRoleDropDown } from "../Auth/Api";
import { useState } from "react";


const userHandle = () => {
    const [error, setError] = useState(null);
    const [roles, setRoles] = useState([]);

    const navigate = useNavigate();

    const handleCreate = async (
        name,
        email,
        contact,
        address,
        password,
        role_id
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            // console.log(accessToken);
            await createUser(
                accessToken,
                name,
                email,
                contact,
                address,
                password,
                role_id
            );
            setError(null);
            navigate("/view-user");
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const handleUpdate = async (
        id,
        name,
        email,
        contact,
        address,
        password,
        role_id
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            // console.log(accessToken);
            await updateUser(
                id,
                accessToken,
                name,
                email,
                contact,
                address,
                password,
                role_id
            );
            setError(null);
            navigate("/view-user");
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const fetchRoles = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const roleData = await getStoredRoles(accessToken);
            setRoles(roleData);
            // console.log(roleData);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchRolesDropDown = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const roleData = await getRoleDropDown(accessToken);
            setRoles(roleData);
            // console.log(roleData);
        } catch (error) {
            console.error(error);
        }
    };



    return { handleCreate, error, setError, handleUpdate, roles, fetchRoles, fetchRolesDropDown };
};

export default userHandle;




  