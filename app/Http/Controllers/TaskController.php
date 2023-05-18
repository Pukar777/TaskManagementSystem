<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use App\Services\TaskService;

class TaskController extends Controller
{
    private $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }
    public function index()
    {
        //this code is to view authenticated user task only
        // $id = auth()->user()->id;
        // $obj = Task::with('assignBy')->where('assigner_id', $id)->get();

        // where user_id

        // $obj = Task::where('assigner_id', $id)->with('assignBy')->get();
        // dd($obj);
        // $user = User::find($id)->pluck('name', 'email');
        // $data = $user([
        //     'email',
        //     'name'
        // ]);

        // $id = auth()->user()->id;
        // $user = User::find($id)->pluck('name', 'email');
        // $tasks = Task::with('assignBy')->get();
        // dd('test');

        //multiple return var
        $data = $this->taskService->all();
        // $tasks = $this->taskService->all();


        // $data['tasks'] = [];
        // unset($data['tasks']);
        // var_dump($data);
        // dd(getType($tasks));
        // dd($data * ($data != null));
        // dd(!$data['tasks']);

        if ($data) {
            return response()->json([
                'message' => 'success',
                //  multiple return var
                'data' => $data,
                // 'tasks' => $tasks,
            ], 200);
        }
        return response()->json([
            'message' => '204 wont have any response body thus it wont show'
        ], 204);


        // if (request()->expectsJson()) {
        //     return response()->json([
        //         'status' => 'success',
        //         'response' => $response
        //     ]);
        // }
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
        $this->taskService->store($request->input());
        if (request()->expectsJson()) {
            return response()->json([
                'message' => 'success',
            ], 200);
        }
    }

    public function show(Task $task)
    {
    }

    public function edit(Task $task)
    {
    }

    public function update(Request $request)
    {
        $response = $this->taskService->update($request->input(), array_column($request->input(), 'id'));

        if (request()->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'response' => $response
            ]);
        }
    }

    public function destroy(Request $request)
    {
        $response = $this->taskService->delete($request->input('ids'));

        if (request()->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'response' => $response
            ]);
        }
    }
}
