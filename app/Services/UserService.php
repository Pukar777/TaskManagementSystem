<?php

namespace App\Services;

use App\Repositories\RepoIface;
use App\Repositories\UserRepo;
use App\Services\ServiceIface;


class UserService implements ServiceIface
{
    protected $userRepository;

    public function __construct(UserRepo $userRepository)
    {

        $this->userRepository = $userRepository;
    }


    public function getall()
    {

        return $this->userRepository->all();
    }

    public function getUserById($id)
    {
        return $this->userRepository->getById($id);
    }


    public function store(array $data)
    {
        
       
      
        $this->userRepository->store($data);

        return $data;
    }


    


    public function edit($id)
    {
        return $this->userRepository->edit($id);
    }

    public function update(array $data, $id)
    {
        $this->userRepository->update($data, $id);

        return $data;
    }

    public function delete($id)
    {
        return $this->userRepository->delete($id);
    }
}
