<?php

namespace App\Models;

use App\Models\Role;
use App\Models\PermissionRole;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Permission extends Model
{
    use HasFactory;

    // protected $fillable = ['name'];



    public function permission_role(){
        return $this->hasMany(PermissionRole::class);
    }


    // public function role(){
    //     return $this->belongsToMany(Role::class,'permission_roles','permission_id','role_id',);
    // }


}
