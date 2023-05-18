<?php

namespace App\Repositories;

use App\Models\Role;
use App\Models\Permission;
use App\Repositories\IRepo;
use App\Models\PermissionRole;
use Illuminate\Support\Facades\DB;

class RoleRepo implements IRepo
{
    private $role, $permissionRole, $permission;

    public function __construct(Role $role, PermissionRole $permissionRole, Permission $permission)
    {
        $this->role = $role;
        $this->permissionRole = $permissionRole;
        $this->permission = $permission;
    }

    public function all()
    {

        $permissions = $this->permission->get();

        $permissionsGroupedByModuleKye = $permissions->groupBy(function ($permission) {
            return explode('_', $permission->name)[1];
        });

        $newPermissionArray = $permissionsGroupedByModuleKye->map(function ($permissions, $module) {
            $crud = [false, false, false, false];
            return ['name' => $module, 'crud' => $crud,];
        })->values()->toArray();

        $roles = Role::with('permissions')->get();

        $rolesGroupedByPermissionNameKey = $roles->map(function ($role) use ($newPermissionArray) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'modules' => collect($newPermissionArray)->map(function ($newPermission) use ($role) {
                    $module = $newPermission['name'];
                    $permissions = $role->permissions->filter(function ($permission) use ($module) {
                        return explode('_', $permission->name)[1] === $module;
                    });

                    $crud = [false, false, false, false];

                    foreach ($permissions as $permission) {
                        switch (explode('_', $permission->name)[0]) {
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

                    return ['name' => $module, 'crud' => $crud];
                })->values()->toArray(),
            ];
        });

        // dd($rolesGroupedByPermissionNameKey);

        return [$rolesGroupedByPermissionNameKey, $newPermissionArray];
    }

    public function store($roleData)
    {
        // Transforming data from role[name, modules[moduleName, CRUD[]]] to simple role[name, permissions[]]
        $permissions = Permission::all()->pluck('id', 'name');
        $roleWithPermission = [
            'name' => $roleData['roleName'],
            'permissions' => []
        ];
        foreach ($roleData['modules'] as $moduleData) {
            $permissions = [];
            if ($moduleData['crud'][0]) {
                $permissions[] = 'create_' . $moduleData['name'];
            }
            if ($moduleData['crud'][1]) {
                $permissions[] = 'read_' . $moduleData['name'];
            }
            if ($moduleData['crud'][2]) {
                $permissions[] = 'update_' . $moduleData['name'];
            }
            if ($moduleData['crud'][3]) {
                $permissions[] = 'delete_' . $moduleData['name'];
            }
           $roleWithPermission['permissions'] = array_merge($roleWithPermission['permissions'], $permissions);
        }

        // changing permissions name to id in role[name, permissions[{currently stores names}]]
        foreach ($roleWithPermission['permissions'] as $key => $permission) {
            $permissionModel = Permission::where('name', $permission)->first();
            if ($permissionModel) {
                $roleWithPermission['permissions'][$key] = $permissionModel->id;
            }
        }

        //Inserting into database 
        try{
            DB::beginTransaction();
            $role = $this->role->create([
                'name' => $roleWithPermission['name']
            ]);
            foreach($roleWithPermission['permissions'] as $key => $id) {
                $this->permissionRole->create([
                    'permission_id' => $id,
                    'role_id' => $role->id,
                ]);
            }
            DB::commit();
        } catch(\Exception $e){
            DB::rollback();
        }

        

        return $role->id;
    }

    public function edit($id)
    {
        return $this->role->find($id);
    }

    public function update($data, $id)
    {
        // return $this->role->where('id', $id)->update($atrributes);
        // dd($this->permissionRole->all()->where('role_id', $id));
        $role = $data;
        unset($role['permission_ids']);
        try {
            DB::beginTransaction();
            $x = $this->role->find($id);
            $x->update($role);
            dd($x);

            // dd($data["permission_ids"]);
            // $test = $this->role->permissions()->sync($data["permission_ids"]);
            $test = $role->permissions()->syncWithPivotValues($data["permission_ids"], ['active' => true]);
            dd($test);
            // DB::rollBack();
            // foreach ($data["permission_ids"] as $pid) {
            //     // dd($id);
            //     $old_data = $this->permissionRole->all()->where('role_id', $id)->delete();
            //     $this->permissionRole->firstOrCreate([
            //         'role_id'   => $role->id,
            //         'permission_id' => $pid
            //     ]);
            // }

            DB::commit();
            return;
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
        return;
    }

    public function delete($id)
    {
        $this->role->where('id', $id)->delete();
    }
}
