<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Services\ServiceIface;
use App\Services\TaskService;

class TaskController extends Controller

{

    protected $taskService;
    //public $test;

    public function __construct(TaskService $taskService, )
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
        if (request()->expectsJson()) {
            return response()->json($tasks);
        }

        return response()->json($tasks);
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
        $data= $this->taskService->store($request->validated());
        if ($request->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Task created successfully',
                'data' => $data,
            ]);
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
        if ($request->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Task updated successfully',
                'data' => $data,

            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->taskService->delete($id);
        if (request()->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Task deleted successfully',
            ]);
        }
    }
}
