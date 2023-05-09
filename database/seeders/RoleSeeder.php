<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            [
                'id' => 1,
                'name' => 'SuperAdmin'
            ],
            [
                'id' => 2,
                'name' => 'Admin'
            ],
            [
                'id' => 3,
                'name' => 'Leader'
            ],
            [
                'id' => 4,
                'name' => 'User'
            ],
            [
                'id' => 1000,
                'name' => 'noPermissions',
            ],
        ]);
    }
}
