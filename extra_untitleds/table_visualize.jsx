//Role
[
    { id: "1", name: "Admin" },
    { id: "2", name: "User" },
    { id: "3", name: "Guest" },
    { id: "4", name: "Super Admin" },
][
    //Permissions
    // permissions array with crud for user, task and role. eg: "create_user"
    ({ id: "1", name: "create_user" },
    { id: "2", name: "read_user" },
    { id: "3", name: "update_user" },
    { id: "4", name: "delete_user" },
    { id: "5", name: "create_task" },
    { id: "6", name: "read_task" },
    { id: "7", name: "update_task" },
    { id: "8", name: "delete_task" },
    { id: "9", name: "create_role" },
    { id: "10", name: "read_role" },
    { id: "11", name: "update_role" },
    { id: "12", name: "delete_role" })
][
    //Permission_Role
    // permission_role array with role_id and permission_id. eg: "role_id: 1, permission_id: 1"
    ({ id: "1", role_id: "1", permission_id: "1" },
    { id: "2", role_id: "1", permission_id: "2" },
    { id: "3", role_id: "1", permission_id: "3" },
    { id: "4", role_id: "1", permission_id: "4" },
    { id: "5", role_id: "1", permission_id: "5" },
    { id: "6", role_id: "1", permission_id: "6" },
    { id: "7", role_id: "1", permission_id: "7" },
    { id: "8", role_id: "1", permission_id: "8" },
    { id: "9", role_id: "1", permission_id: "9" },
    { id: "10", role_id: "1", permission_id: "10" },
    { id: "11", role_id: "1", permission_id: "11" },
    { id: "12", role_id: "1", permission_id: "12" },
    { id: "13", role_id: "2", permission_id: "2" },
    { id: "14", role_id: "2", permission_id: "6" },
    { id: "15", role_id: "2", permission_id: "7" },
    { id: "16", role_id: "2", permission_id: "8" })
][
    // when
    // Role::with('permissions')->get();
    // I want

    {
        name: "Admin",
        module: [
            { name: "user", crud: [true, true, true, true] },
            { name: "task", crud: [true, true, true, true] },
        ],
    }
];
