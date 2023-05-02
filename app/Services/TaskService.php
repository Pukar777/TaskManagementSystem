<?php

namespace App\Services;

use App\Repositories\TaskRepo;
use App\Services\ServiceIface;
use App\Repositories\RepoIface;


class TaskService implements ServiceIface
{
    protected $taskRepository;

    public function __construct(TaskRepo $taskRepository)
    {

        $this->taskRepository = $taskRepository;
    }


    public function getall()
    {

        return $this->taskRepository->all();
    }

    public function showAssocUser($id)
    {
        return $this->taskRepository->showAssociateUsers($id);
        
    }


    public function store(array $data)
    {
        
       
      
        $this->taskRepository->store($data);
        

        return $data;
    }



    public function edit($id)
    {
        return $this->taskRepository->edit($id);
    }

    public function update(array $data, $id)
    {
        $this->taskRepository->update($data, $id);

        return $data;
    }

    public function delete($id)
    {
        return $this->taskRepository->delete($id);
    }
}
