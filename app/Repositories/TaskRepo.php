<?php

namespace App\Repositories;

use App\Models\Task;
use App\Models\User;
use App\Repositories\IRepo;

class TaskRepo implements IRepo
{

    private $task, $user;

    public function __construct(Task $task, User $user)
    {
        $this->task = $task;
        $this->user = $user;
    }

    public function all()
    {
        //this code is to view authenticated user task only
        // $id = auth()->user()->id;
        // $obj = Task::with('assignedBy')->where('assigner_id', $id)->get();

        $id = auth()->user()->id;
        // $user = $this->user->find($id)->pluck('name', 'email')->toArray();
        $tasks = $this->task->with('assignedBy')->get()->toArray();
        // $tasks = Task::with('assignedBy')->where('assigner_id', 999)->get()->toArray();


        return $tasks;
        //multiple return var
        // return ['user' => $user, 'tasks' => $tasks];
        // $data = [
        //     'user' => $user,
        //     'tasks' => $tasks
        // ];

        // return $data;

        // return response()->json([
        //     'message' => 'test2',
        //     'user' => $user,
        //     'tasks' => $tasks,
        // ], 200);

        // return $this->task->all();
    }

    public function store($task)
    {
        return $this->task->create($task);
    }

    public function edit($id)
    {
        return $this->task->find($id);
    }

    public function update($task, $id)
    {
        return $this->task->where('id', $id)->update($task);
    }

    public function delete($id)
    {
        return $this->task->where('id', $id)->delete();
    }
}
