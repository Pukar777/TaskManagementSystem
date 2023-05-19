<?php

namespace App\Models;

use App\Models\Permission;
use App\Models\PermissionRole;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    
    public function user(){
        return $this->hasMany('App\Models\User', 'role_id');
    }


    // public function permission(){
    //     return $this->belongsToMany(Permission::class,'permission_roles','permission_id','role_id');
    // }

    public function permission_role(){
        return $this->hasMany(PermissionRole::class);
    }


}
