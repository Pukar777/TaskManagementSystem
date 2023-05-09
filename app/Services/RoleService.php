<?php

namespace App\Services;

use App\Models\PermissionRole;
use App\Services\IService;
use App\Repositories\RoleRepo;
use Illuminate\Support\Facades\DB;

class RoleService implements IService
{
    private $roleRepo;

    public function __construct(RoleRepo $roleRepo)
    {
        $this->roleRepo = $roleRepo;
    }
    public function all()
    {
        $this->roleRepo->all();
    }
    public function store($data)
    {
        // dd($data["name"]);
        return $this->roleRepo->store($data);
    }
    public function edit($id)
    {
    }
    public function update($data, $id)
    {
        return $this->roleRepo->update($data, $id);
    }
    public function delete($id)
    {
        return $this->roleRepo->delete($id);
    }
}
