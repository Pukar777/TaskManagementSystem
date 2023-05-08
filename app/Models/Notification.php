<?php

namespace App\Models;
use App\Models\Task;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'task_id',
        'type',
    ];

    public function user(){
        
        return $this->belongsTo(User::class,'user_id');
    
    }

    public function task(){
        
        return $this->belongsTo(Task::class,'task_id');
    
    }

}
