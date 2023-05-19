<?php

namespace App\Models;

use App\Models\User;
use App\Models\TaskUser;
use App\Models\Notification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    protected $fillable= ['title', 'description', 'dueDate', 'priority', 'status', 'type', 'created_by'];


//    public function setPriorityAttribure($value){
//        return strtolower($value);
//    }


    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }


    // public function assigne()
    // {
    //     return $this->belongsToMany(User::class,'task_users','user_id','task_id');
    // }
//=============================================================
    public function task_user()
    {
        return $this->hasMany(TaskUser::class);
    }


    public function notification()
    {
        return $this->hasMany(Notification::class);
    }
}


