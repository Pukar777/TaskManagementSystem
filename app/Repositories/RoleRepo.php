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

    //    dd($data);
        try {
            // Create a new Role entry
            $dataEntry = $this->role->create([

                'name' => $data['name'],
            ]);

            // Create an array of permission ids from the input data
            // $permissionIds = $data['permissions'];


            $permissionIds = [1,2];

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


    public function update(array $data, $id)
    {
        return $this->role::where('id', $id)->update([
            'name' => $data['name'],
        ]);
    }


    public function delete($id)
    {


        return $this->role->destroy($id);
    }
}
