$output1 = $roles->map(function ($role) {
$modulePermissions = $role->permissions->groupBy(function ($permission) {return explode('_', $permission->name)[1]});

return [
'name' => $role->name,
'module' => $modulePermissions->map(function ($permissions, $moduleName)
{
$crud = [false, false, false, false];
foreach ($permissions as $permission)
{
switch (explode('_', $permission->name)[0])
{
case 'create':
$crud[0] = true;
break;
case 'read':
$crud[1] = true;
break;
case 'update':
$crud[2] = true;
break;
case 'delete':
$crud[3] = true;
break;
}
}

return ['name' => $moduleName, 'crud' => $crud,];
})->values()->toArray(),
];
});

$output2 = $output1->filter(function ($role) { return !empty($role['module']) });

$output2 = $output2->values()->toArray();