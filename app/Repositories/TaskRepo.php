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

            $this->taskUser->create([
                'user_id' => "1",
                'task_id' => $dataentry->id,

            ]);

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


    public function update(array $data, $id)
    {
        return $this->task::where('id', $id)->update([
            'title' => $data['title'],
            'description' => $data['description'],
            'dueDate' => $data['dueDate'],
            'priority' => $data['priority'],
            'status' => $data['status'],
            'type' => $data['type'],
            'created_by' => $data['created_by'],
        ]);
    }


    public function delete($id)
    {


        return $this->task->destroy($id);
    }
}
