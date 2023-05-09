<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->seedTasks();

        $admin = [1, 2];
        $this->seedTaskUsers(2, $admin);

        $user = [3, 4];
        $this->seedTaskUsers(3, $user);
    }

    private function seedTasks()
    {
        DB::table('tasks')->insert([
            [
                'id' => '1',
                'title' => 'Task001',
                'description' => 'Manage Intern accounts',
                'duedate' => '2023-05-29',
                'priority' => 'high',
                'status' => 'ready',
                'type' => 'feature',
                'assigner_id' => '1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => '2',
                'title' => 'Task002',
                'description' => 'Review tasks status',
                'duedate' => '2023-05-29',
                'priority' => 'critical',
                'status' => 'ready',
                'type' => 'feature',
                'assigner_id' => '1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => '3',
                'title' => 'Task003',
                'description' => 'Create ER for TMS',
                'duedate' => '2023-05-29',
                'priority' => 'high',
                'status' => 'ready',
                'type' => 'feature',
                'assigner_id' => '1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => '4',
                'title' => 'Task004',
                'description' => 'Fix bug form QC TMS',
                'duedate' => '2023-05-29',
                'priority' => 'critical',
                'status' => 'done',
                'type' => 'bug',
                'assigner_id' => '1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }

    private function seedTaskUsers($userId, $tasksId)
    {
        foreach ($tasksId as $taskId) {
            DB::table('task_users')->insert([
                'user_id' => $userId,
                'task_id' => $taskId
            ]);
        }
    }
}
