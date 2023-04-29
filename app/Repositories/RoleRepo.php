<?php

namespace App\Repositories;   //folder 

use App\Models\Role;

use App\Models\PermissionRole;
use App\Repositories\RepoIface;
use Illuminate\Support\Facades\DB;



class RoleRepo implements RepoIface
{

    protected $role, $perRole;

    public function __construct(Role $role, PermissionRole $perRole)
    {
        $this->role = $role;
        $this->perRole = $perRole;
    }


    public function all()
    {
        return $this->role->all();
    }



    // public function create(array $data){

    //     return $this->role->create($data);
    // }


    public function getRById($id)
    {
        return $this->role->findOrFail($id);
    }



    public function showAssociatePermissions($id)
    {

        return  $this->role::with('permission_role')->find($id);
    }

    public function showall_permission()    //show all permissions based on role
    {
        // $role = Permission::find($id)->permission_role;
        $permission = $this->role::with('permission_role')->get();


        // dd($role);
        if (request()->expectsJson()) {
            return response()->json($permission);
        }
    }

    // public function store(array $data)
    // {

    //     // $dataEntry = $this->role->create([
    //     //     'name' => $data['name'],    
    //     // ]);

    //     // $this->perRole->create([
    //     //     'permission_id' => "1",
    //     //     'role_id' => $dataEntry->id,

    //     // ]);

    //     // return $dataEntry;
    //     DB::beginTransaction();

    //     try {
    //         // Your database query code here

    //         $dataEntry = $this->role->create([
    //             'name' => $data['name'],
    //         ]);

    //         $this->perRole->create([
    //             'permission_id' => "1",
    //             'role_id' => $dataEntry->id,
    //         ]);

    //         DB::commit();

    //         return $dataEntry;
    //     } catch (\Exception $e) {
    //         DB::rollback();
    //         throw $e;
    //     }
    // }



    public function store(array $data)
    {

        DB::beginTransaction();

        try {
            // Create a new Role entry
            $dataEntry = $this->role->create([

                'name' => $data['name'],
            ]);

            // Create an array of permission ids from the input data
            // $permissionIds = $data['permissions'];


            // $permissionIds = [1, 2];

            $permissionIds = $data['permission_id'];
            // dd($data);
            //dd($permissionIds);

            // $permissionIds = $data['permission_id'];


            // Loop through the permission ids and create a new permission_role entry for each
            foreach ($permissionIds as $permissionId) {
                $this->perRole->create([
                    'permission_id' => $permissionId,
                    'role_id' => $dataEntry->id,
                ]);
            }

            DB::commit();

            return $dataEntry;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }


    public function edit($id)
    {

        return $this->role->find($id);
    }

    // public function update(array $data, $id)
    // {
    //     return $this->role::where('id', $id)->update([
    //         'name' => $data['name'],
    //     ]);
    // }

    public function update(array $data, $id)
    {
        DB::beginTransaction();

        try {
            // Update the Role entry
            $this->role::where('id', $id)->update([
                'name' => $data['name'],
            ]);

            // Create an array of permission ids from the input data
            // $permissionIds = [4,5];
            $permissionIds = $data['permission_id'];

            // Delete any existing permission_role entries for the Role
            $this->perRole::where('role_id', $id)->delete();


            // Loop through the permission ids and create a new permission_role entry for each
            foreach ($permissionIds as $permissionId) {
                $this->perRole->create([
                    'permission_id' => $permissionId,
                    'role_id' => $id,
                ]);
            }
            // $permissionIds = [4, 5];
            // $this->role->permission_role()->sync($permissionIds);
            DB::commit();

            return true;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function delete($id)
    {
        // $this->role->destroy($id);
        // $this->perRole::where('role_id', $id)->delete();

        DB::beginTransaction();
        try {
            $this->role->destroy($id);
            $this->perRole::where('role_id', $id)->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}

// public function deleteRoleWithPermissions($roleId)
// {
//     DB::beginTransaction();

//     try {
//         // Delete the role entry
//         $this->role()->where('id', $roleId)->delete();

//         // Delete all associated permission-role entries
//         $this->where('role_id', $roleId)->delete();

//         DB::commit();
//     } catch (\Exception $e) {
//         DB::rollback();
//         throw $e;
//     }
// }
// }
