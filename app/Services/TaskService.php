<?php

namespace App\Services;

use Exception;
use App\Services\IService;
use App\Repositories\TaskRepo;
use Illuminate\Support\Facades\DB;

class TaskService implements IService
{
    private $taskRepo;
    public function __construct(TaskRepo $taskRepo)
    {
        $this->taskRepo = $taskRepo;
    }
    public function all()
    {
        return $this->taskRepo->all();
    }
    public function store($tasks)
    {
        try {
            DB::beginTransaction();
            foreach ($tasks as $task) {
                $this->taskRepo->store($task);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            if (config('app.debug')) {
                throw $e;
            }
            response()->json(['error' => $e->getMessage()]);
        }
    }
    public function edit($id)
    {
        return $this->taskRepo->edit($id);
    }
    public function update($tasks, $ids)
    {
        try {
            DB::beginTransaction();
            foreach ($tasks as $k => $task) {
                unset($task['id']);
                $this->taskRepo->update($task, $ids[$k]);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            if (config('app.debug')) {
                throw $e;
            }
            response()->json(['error' => $e->getMessage()]);
        }
    }
    public function delete($ids)
    {
        try {
            DB::beginTransaction();
            foreach ($ids as $id) {
                dd($id);
                $this->taskRepo->delete($id);
            }
            DB::commit();
            return;
        } catch (Exception $e) {
            DB::rollback();

            if (config('app.debug')) {
                throw $e;
            }
            response()->json(['error' => $e->getMessage()]);
        }
        // return $this->taskRepo->delete($id);
    }
}
