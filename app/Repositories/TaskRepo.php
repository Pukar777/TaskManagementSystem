<?php

namespace App\Repositories;

use App\Models\Task;
use App\Models\User;
use App\Models\TaskUser;
use App\Repositories\IRepo;
use Exception;
use Illuminate\Support\Facades\DB;

use App\Mail\NewTask;
use Illuminate\Support\Facades\Mail;

class TaskRepo implements IRepo
{

    private $task, $user, $taskUser;

    public function __construct(Task $task, User $user, TaskUser $taskUser)
    {
        $this->task = $task;
        $this->user = $user;
        $this->taskUser = $taskUser;
    }

    public function all()
    {
        //this code is to view authenticated user task only
        // $id = auth()->user()->id;
        // $obj = Task::with('assignedBy')->where('assigner_id', $id)->get();

        $id = auth()->user()->id;
        // $user = $this->user->find($id)->pluck('name', 'email')->toArray();
        $tasks = $this->task->with('assignedBy')->get()->toArray();
        $users = User::with('role:id,name')->get()->toArray();
        $filteredUsers = array_map(function ($user) {
            return [
                'id' => $user['id'],
                'name' => $user['name'],
                'role' => $user['role']['name'],
            ];
        }, $users);
        // dd($filteredUsers, $tasks);
        // $tasks = Task::with('assignedBy')->where('assigner_id', 999)->get()->toArray();


        // return $tasks;
        //multiple return var
        return ['users' => $filteredUsers, 'tasks' => $tasks];
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
        $assigner_id = auth()->user()->id;
        $task += [
            'assigner_id' => $assigner_id,
            'id' => 1000,
        ];
        $task_user = [
            'user_id' => $task['assignee'],
        ];
        $task = $this->task->create($task);
        $task_user += [
            'task_id' => $task['id'],
        ];
        $task_user = $this->taskUser->create($task_user);



        // $user = '';
        // $task = '';
        // $priority = '';

        // $mail = new NewTask($task, $user, $priority);

        // Mail::to('recipient@example.com')->send($mail);
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
