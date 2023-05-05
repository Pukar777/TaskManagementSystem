<?php

namespace App\Services;

use App\Repositories\RepoIface;
use App\Repositories\RoleRepo;
use App\Services\ServiceIface;


class RoleService implements ServiceIface
{
    protected $roleRepo;

    public function __construct(RoleRepo $roleRepo)
    {

        $this->roleRepo = $roleRepo;
    }


    public function getall()
    {

        return $this->roleRepo->all();
    }

    public function getRoleById($id)
    {
        return $this->roleRepo->getRById($id);
    }

    public function getRData(){
        return $this->roleRepo->getRoleData();
    }


    public function showAssocPer($id)
    {
        return $this->roleRepo->showAssociatePermissions($id);
        
    }

    public function showall_per()
    {
        return $this->roleRepo->showall_permission();
    }


    public function store(array $data)
    {


        $this->roleRepo->store($data);

        return $data;
    }


    public function edit($id)
    {
        return $this->roleRepo->edit($id);
    }

    public function update(array $data, $id)
    {

        $this->roleRepo->update($data, $id);

        return $data;
    }

    public function delete($id)
    {
        return $this->roleRepo->delete($id);
    }
}
