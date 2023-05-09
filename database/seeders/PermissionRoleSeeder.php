<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdminPermissions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        $this->seedRolePermissions(1, $superAdminPermissions);

        $adminPermissions = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        $this->seedRolePermissions(2, $adminPermissions);

        $leaderPermissions = [5, 6, 7, 8];
        $this->seedRolePermissions(3, $leaderPermissions);

        $userPermissions = [6, 8];
        $this->seedRolePermissions(4, $userPermissions);

        $noPermissions = [4];
        $this->seedRolePermissions(1000, $noPermissions);

    }

    private function seedRolePermissions($roleId, $permissions)
    {
        foreach ($permissions as $permission) {
            DB::table('permission_roles')->insert([
                'role_id' => $roleId,
                'permission_id' => $permission
            ]);
        }
    }
}
