<?php

namespace App\Repositories;   //folder 

use App\Models\Task;
use App\Models\TaskUser;
use App\Repositories\RepoIface;
use Illuminate\Support\Facades\DB;



class TaskRepo implements RepoIface
{

    protected $task, $taskUser;

    public function __construct(Task $task, TaskUser $taskUser)
    {
        $this->task = $task;
        $this->taskUser = $taskUser;
    }


    public function all()
    {
        return $this->task->all();
    }



    // public function create(array $data){

    //     return $this->task->create($data);
    // }

    public function store(array $data)
    {


        DB::beginTransaction();

        try {
            $dataentry = $this->task->create([
                'title' => $data['title'],
                'description' => $data['description'],
                'dueDate' => $data['dueDate'],
                'priority' => $data['priority'],
                'status' => $data['status'],
                'type' => $data['type'],
                'created_by' => $data['created_by'],
            ]);


            // $userIds = [1, 2];
            $userIds =  $data['user_id'];

            // $this->taskUser->create([
            //     'user_id' => "1",
            //     'task_id' => $dataentry->id,

            // ]);

            foreach ($userIds as $userId) {
                $this->taskUser->create([
                    'user_id' => $userId,
                    'task_id' => $dataentry->id,

                ]);
            }


            DB::commit();

            return $dataentry;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }


    public function edit($id)
    {

        return $this->task->find($id);
    }


    // public function update(array $data, $id)
    // {
    //     return $this->task::where('id', $id)->update([
    //         'title' => $data['title'],
    //         'description' => $data['description'],
    //         'dueDate' => $data['dueDate'],
    //         'priority' => $data['priority'],
    //         'status' => $data['status'],
    //         'type' => $data['type'],
    //         'created_by' => $data['created_by'],
    //     ]);
    // }



    public function update(array $data, $id)
    {
        DB::beginTransaction();

        try {
            // Update the Role entry
            $this->task::where('id', $id)->update([
                'title' => $data['title'],
                'description' => $data['description'],
                'dueDate' => $data['dueDate'],
                'priority' => $data['priority'],
                'status' => $data['status'],
                'type' => $data['type'],
                'created_by' => $data['created_by'],
            ]);

            // Create an array of permission ids from the input data
            // $userIds = [4, 5];

            $userIds =  $data['user_id'];

            // Delete any existing permission_role entries for the Role
            $this->taskUser::where('task_id', $id)->delete();


            // Loop through the permission ids and create a new permission_role entry for each
            foreach ($userIds as $userId) {
                $this->taskUser->create([
                    'user_id' => $userId,
                    'task_id' => $id,
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

    // public function update(array $data, $id)
    // {
    //     DB::beginTransaction();
    //     try  {
    //         $this->task::where('id', $id)->update([
    //             'title' => $data['title'],
    //             'description' => $data['description'],
    //             'dueDate' => $data['dueDate'],
    //             'priority' => $data['priority'],
    //             'status' => $data['status'],
    //             'type' => $data['type'],
    //             'created_by' => $data['created_by'],
    //         ]);
    //     }catch (\Exception $e) {
    //         DB::rollBack();
    //         throw $e;
    //     }

    //     // $users = $data['users']; // assuming that 'users' is an array of user IDs
    //     $users = [1,2]; // assuming that 'users' is an array of user IDs
    //     $userTasks = [];
    //     foreach ($users as $user) {
    //         $userTasks[$user] = ['task_id' => $id];
    //     }
    //         $this->taskUser->user()->sync($userTasks);


    //     DB::commit();


    // }


    public function delete($id)
    {

        // return $this->task->destroy($id);

        DB::beginTransaction();
        try {
            $this->task->destroy($id);
            $this->taskUser::where('task_id', $id)->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}
