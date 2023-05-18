import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoleApiHandler } from "./RoleApiHandle";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [selection, setSelection] = useState([]);
    const [message, setMessage] = useState();
    const [error, setError] = useState();

    const { createRole, readRole, deleteRole, updateRole } = RoleApiHandler();

    useEffect(() => {
        handleReadRole();
    }, []);

    useEffect(() => {}, [roles]);

    const handleReadRole = async () => {
        try {
            const response = await readRole();
            const {
                message,
                data: [roles, permissions],
            } = response.data;
            setRoles(roles);
            setPermissions(permissions);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateRole = async (roleData) => {
        try {
            const response = await createRole(roleData);
            const { message, id } = response.data;
            const newRoleData = {
                id: id,
                name: roleData.roleName,
                modules: roleData.modules,
            };
            const newArray = [...roles, newRoleData];
            setRoles(newArray);
            setMessage(message);
            setError("");
        } catch (error) {
            console.log(error);
            setMessage("");
            setError(error);
        }
    };

    const handleEdit = (roleId) => {
        setSelection([roleId]);
        console.log(selection);
        navigate(`/role/edit`);
    };

    const handleSelectionChange = (roleId) => {
        if (selection.includes(roleId)) {
            setSelection(selection.filter((id) => id !== roleId));
        } else {
            setSelection([...selection, roleId]);
        }
        console.log(selection, "test");
    };

    return (
        <RoleContext.Provider
            value={{
                roles,
                permissions,
                setRoles,
                selection,
                setSelection,
                handleSelectionChange,
                handleCreateRole,
                handleEdit,
            }}
        >
            {children}
        </RoleContext.Provider>
    );
};
