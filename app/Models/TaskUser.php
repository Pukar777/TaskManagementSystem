<?php

namespace App\Models;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskUser extends Model
{
    use HasFactory;

    // protected $table = 'task_users';

    protected $fillable = [
        'user_id',
        'task_id',
    ];

    public function user(){
        
        return $this->belongsTo(User::class,'user_id');
    
    }

    public function task(){
        
        return $this->belongsTo(Task::class,'task_id');
    
    }

    
}
