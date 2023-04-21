<?php

namespace App\Models;

use App\Models\Permission;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PermissionRole extends Model
{
    use HasFactory;

    protected $fillable = ['permission_id', 'role_id'];


    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }


    public function permission()
    {
        return $this->belongsTo(Permission::class, 'permission_id');
    }
}
