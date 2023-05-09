<?php

namespace App\Repositories;

use App\Models\Role;
use App\Repositories\IRepo;
use App\Models\PermissionRole;
use Illuminate\Support\Facades\DB;

class RoleRepo implements IRepo
{

    private $role, $permissionRole;

    public function __construct(Role $role, PermissionRole $permissionRole)
    {
        $this->role = $role;
        $this->permissionRole = $permissionRole;
    }

    public function all()
    {
        return $this->role->all();
    }

    public function store($data)
    {

        $role = $data;
        unset($role['permission_ids']);
        try {
            DB::beginTransaction();

            $role = $this->role->create($role);

            foreach ($data["permission_ids"] as $id) {
                $this->permissionRole->create([
                    'role_id'   => $role->id,
                    'permission_id' => $id
                ]);
            }

            DB::commit();
            return;
        } catch (\Exception $e) {
            DB::rollBack();
        }
        return;
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
        return $this->role->where('id', $id)->delete();
    }
}
