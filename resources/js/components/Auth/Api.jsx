import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const config = {
    headers: {
        Accept: "application/json",
    },
};

// ===============================Auth======================================================
export const register = async (name, email, contact, address, password) => {
    const response = await axios.post(
        `${API_URL}/custom-registration`,
        {
            name,
            email,
            contact,
            address,
            password,
            password_confirmation: password,
        },
        config
    );
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(
        `${API_URL}/custom-login`,
        {
            email,
            password,
        },
        config
    );
    return response.data;
};

export const logout = async (accessToken) => {
    const response = await axios.post(`${API_URL}/signout`, null, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        },
    });
    return response.data;
};

export const getUser = async (accessToken) => {
    const response = await axios.get(`${API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        },
    });
    return response.data;
};

// ===============================User======================================================
export const createUser = async (
    accessToken,
    name,
    email,
    contact,
    address,
    password,
    role_id
) => {
    const response = await axios.post(
        `${API_URL}/user`,
        {
            name,
            email,
            contact,
            address,
            password,
            password_confirmation: password,
            role_id,
        },

        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        }
    );
    return response.data;
};

export const getStoredUser = async (accessToken) => {
    const responseUser = await axios.get(`${API_URL}/user`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,

            Accept: "application/json",
        },
    });
    return responseUser.data;
};

export const deleteUser = async (accessToken, id) => {
    //    console.log(id);
    await axios.delete(`${API_URL}/user/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        },
    });
    // console.log(responseDelete);
    return id;
};

export const updateUser = async (
    id,
    accessToken,
    name,
    email,
    contact,
    address,
    password,
    role_id
) => {
    //    console.log(id);
    const responseUpdate = await axios.put(
        `${API_URL}/user/${id}`,
        {
            name,
            email,
            contact,
            address,
            password,
            password_confirmation: password,
            role_id,
        },

        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        }
    );

    return responseUpdate.data;
};

//=========================Role==============================================================================

export const createRole = async (accessToken, name, permission_id) => {
    const response = await axios.post(
        `${API_URL}/role`,
        {
            name,
            permission_id,
        },

        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        }
    );
    return response.data;
};

export const getStoredRoles = async (accessToken) => {
    const responseRole = await axios.get(`${API_URL}/role`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,

            Accept: "application/json",
        },
    });
    return responseRole.data;
};

export const deleteRole = async (accessToken, id) => {
    //    console.log(id);
    await axios.delete(`${API_URL}/role/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        },
    });
    // console.log(responseDelete);
    return id;
};

export const updateRole = async (id, accessToken, name, permission_id) => {
    //    console.log(id);
    const responseUpdate = await axios.put(
        `${API_URL}/role/${id}`,
        {
            name,
            permission_id,
        },

        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        }
    );

    return responseUpdate.data;
};

//====================================Permission=========================================================================

export const getStoredPermissions = async (accessToken) => {
    const responsePermission = await axios.get(`${API_URL}/permission`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,

            Accept: "application/json",
        },
    });
    // console.log(responsePermission);
    return responsePermission.data;
};

// =====================================Task===================================================================================

export const createTask = async (
    accessToken,
    title,
    description,
    dueDate,
    priority,
    status,
    type,
    created_by,
    user_id
) => {
    const response = await axios.post(
        `${API_URL}/task`,
        {
            title,
            description,
            dueDate,
            priority,
            status,
            type,
            created_by,
            user_id,
        },

        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        }
    );
    return response.data;
};

// export const getStoredTasks = async (accessToken) => {
//     const responseTask = await axios.get(`${API_URL}/task`, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,

//             Accept: "application/json",
//         },
//     });
//     return responseTask.data;
// };

export const getStoredTasks = async (accessToken) => {
    const responseTask = await axios.get(`${API_URL}/showAssUsers`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,

            Accept: "application/json",
        },
    });
    return responseTask.data;
};

export const deleteTask = async (accessToken, id) => {
    //    console.log(id);
    await axios.delete(`${API_URL}/task/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        },
    });
    // console.log(responseDelete);
    return id;
};

export const updateTask = async (
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
) => {
    //    console.log(id);
    const responseUpdate = await axios.put(
        `${API_URL}/task/${id}`,
        {
            title,
            description,
            dueDate,
            priority,
            status,
            type,
            created_by,
            user_id,
        },

        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        }
    );

    return responseUpdate.data;
};
