<?php

namespace App\Services;

use Exception;
use App\Repositories\UserRepo;
use Illuminate\Support\Facades\DB;

class UserService
{
    private $userRepo;

    public function __construct(UserRepo $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function all()
    {
        return $this->userRepo->all();
    }

    public function store($users)
    {
        $newUsers = [];
        try {
            DB::beginTransaction();
            foreach ($users as $user) {

                $newUsers[] =
                    $this->userRepo->store($user);
            }
            DB::commit();
            return $newUsers;
        } catch (Exception $e) {
            DB::rollback();

            if (config('app.debug')) {
                throw $e;
            }
            return false;
        }
    }

    public function edit($id)
    {
        return $this->userRepo->edit($id);
    }

    public function update($users, $ids)
    {
        try {
            DB::beginTransaction();
            ////////// Both for each has own advantage and disadvantages ////////////
            // foreach ($users as $user) {
            //     dd($user, $user['id']);
            //     $this->userRepo->update($user, $user['id']);
            // }
            foreach ($users as $k => $user) {
                unset($user['id']);
                $this->userRepo->update($user, $ids[$k]);
            }
            DB::commit();
            return true;
        } catch (Exception $e) {
            DB::rollback();

            if (config('app.debug')) {
                throw $e;
            }
            return false;
        }
    }

    public function delete($ids)
    {
        try {
            DB::beginTransaction();
            foreach ($ids as $id) {
                $this->userRepo->delete($id);
            }
            DB::commit();
            return true;
        } catch (Exception $e) {
            DB::rollback();

            if (config('app.debug')) {
                throw $e;
            }
            return false;
        }
    }
}
