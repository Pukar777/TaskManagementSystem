<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Services\TaskService;
use App\Services\ServiceIface;
use App\Helpers\ResponseHelper;
use App\Http\Requests\TaskRequest;
use Illuminate\Support\Facades\DB;


class TaskController extends Controller

{

    protected $taskService;
    //public $test;

    public function __construct(TaskService $taskService,)
    {

        $this->taskService = $taskService;
        // $this->test = $test;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = $this->taskService->getall();
        // if (request()->expectsJson()) {
        //     return response()->json($tasks);
        // }

        // return response()->json($tasks);
        $response  = ResponseHelper::generateGetResponse($tasks);

        return $response;
    }


    public function showAssUser()
    {
        $task = $this->taskService->getAllAssoUser();
        if (request()->expectsJson()) {
            return response()->json($task);
        }
        return response()->json($task);
    }



    public function queryShowAssoUser(){

        // $tasks = DB::table('tasks')->join('task_users','tasks.id','=','task_users.task_id')->join('users','users.id','=','task_users.user_id')->get();
        // $tasks = $tasks = DB::table('tasks')
        // ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        // ->join('users', 'users.id', '=', 'task_users.user_id')
        // ->select('tasks.title', 'users.name')
        // // ->distinct()
        // ->get();

        // $tasks = $tasks = DB::table('tasks')
        // ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        // ->join('users', 'users.id', '=', 'task_users.user_id')
        // ->selectRaw('tasks.title, concat(users.name)')
        // ->groupBy('tasks.id')
        // // ->distinct()
        // ->get();

        // $tasks = $tasks = DB::table('tasks')
        // ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        // ->join('users', 'users.id', '=', 'task_users.user_id')
        // ->selectRaw('concat(users.name)')
        // ->groupBy('tasks.id')
        // // ->distinct()
        // ->get();



        $tasks = $tasks = DB::table('tasks')
        ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        ->join('users', 'users.id', '=', 'task_users.user_id')
        ->selectRaw('group_concat ( users.name, " " )')
        ->groupBy('tasks.id')
        // ->distinct()
        ->get();
      
      
        if (request()->expectsJson()) {
            return response()->json($tasks);
        }
        return response()->json($tasks);

    }

    public function showAssociateUserId($id)
    {

        $role = $this->taskService->showAssocUser($id);

        if (request()->expectsJson()) {
            return response()->json($role);
        }
        return response()->json($role);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskRequest $request)
    {
        // $task = $this->taskService->store($request->all());


        // dd($request->all());
        $data = $this->taskService->store($request->validated());
        // if ($request->expectsJson()) {
        //     return response()->json([
        //         'status' => 'success',
        //         'message' => 'Task created successfully',
        //         'data' => $data,
        //     ]);
        // }
        if (!empty($data)) {
            return ResponseHelper::generateResponse($request, 'success', 'task created successfully', $request->input(), 200);
        } else {
            return ResponseHelper::generateResponse($request, 'error', 'task creation failed', null, 400);
        }
    }




    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $task = $this->taskService->edit($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskRequest $request, $id)
    {
        $data = $this->taskService->update($request->validated(), $id);
        // if ($request->expectsJson()) {
        //     return response()->json([
        //         'status' => 'success',
        //         'message' => 'Task updated successfully',
        //         'data' => $data,

        //     ]);
        // }
        if (!empty($data)) {
            return ResponseHelper::generateResponse($request, 'success', 'task updated successfully', $request->input(), 200);
        } else {
            return ResponseHelper::generateResponse($request, 'error', 'task update failed', null, 400);
        }
    }


    public function updatStatus(Request $request, $id)
    {
        $task = Task::find($id);
        $task->status = $request->input('status');
        if ($task->save()) {

            return response()->json([
                'status' => 'success',
                'message' => 'status upadte successfully',


            ]);
        }
    }
    // return redirect()->back()->with('failed','Could not update'); 





    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->taskService->delete($id);
        // if (request()->expectsJson()) {
        //     return response()->json([
        //         'status' => 'success',
        //         'message' => 'Task deleted successfully',
        //     ]);
        // }
        if (!empty($id)) {
            return ResponseHelper::generateResponse(request(), 'success', 'task deleteded successfully', $id, 200);
        } else {
            return ResponseHelper::generateResponse(request(), 'error', 'task deletion failed', null, 400);
        }
    }
}
