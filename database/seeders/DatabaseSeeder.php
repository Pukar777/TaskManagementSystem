<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


        // $permission = new Permission();
        // $permission->name ="create-user";
        // $permission->save();
        // $permission->name ="read-user";
        // $permission->save();
        // $permission->name ="update-user";
        // $permission->save();
        // $permission->name ="delete-user";
        // $permission->save();
        // $permissions = [
        //     "name"=>""
        // ]


        $data = [
            ['name' => 'create-user'],
            ['name' => 'read-user'],
            ['name' => 'update-user'],
            ['name' => 'delete-user'],
            ['name' => 'create-role'],
            ['name' => 'read-role'],
            ['name' => 'update-role'],
            ['name' => 'delete-role'],
            ['name' => 'create-task'],
            ['name' => 'read-task'],
            ['name' => 'update-task'],
            ['name' => 'delete-task'],
        ];

        Permission::insert($data);
    }
}
