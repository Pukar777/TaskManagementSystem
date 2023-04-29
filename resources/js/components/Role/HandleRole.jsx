import { useNavigate } from "react-router-dom";
import { createRole, getStoredPermissions, updateRole } from "../Auth/Api";
import { useState } from "react";

const roleHandle = () => {

    const [error, setError] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const navigate = useNavigate();

    const handleCreate = async (name, permission_id) => {
        try {
            console.log(permission_id);
            const accessToken = localStorage.getItem("accessToken");
            // console.log(accessToken);
            await createRole(accessToken, name, permission_id);
            setError(null);
            navigate("/view-role");
        } catch (error) {
            setError(error.response.data.error);
        }
    };


    const handleUpdate = async (
        id,
        name,
        permission_id
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            // console.log(accessToken);
            await updateRole(
                id,
                accessToken,
                name,
                permission_id
            );
            setError(null);
            navigate("/view-role");
        } catch (error) {
            setError(error.response.data.error);
        }
    };


    const fetchPermissons = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const permissionData = await getStoredPermissions(accessToken);
            setPermissions(permissionData);
            // console.log(permissionData);
        } catch (error) {
            console.error(error);
        }
    };


    return {handleCreate, error, setError, permissions, fetchPermissons, handleUpdate}
};




export default roleHandle;