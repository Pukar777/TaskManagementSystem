<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Task;
use App\Models\TaskUser;
// use Laravel\Sanctum\HasApiTokens;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'contact',
        'address',
        'isSuper',
        'role_id',
        
    ];

    public function role()
    {
        return $this->belongsTo('App\Models\Role', 'role_id');
    }


    public function task()
    {
        return $this->hasMany(Task::class);
    }
    

    // public function atask()
    // {
    //     return $this->belongsToMany(Task::class,'task_users','user_id','task_id');
    // }

    public function task_user()
    {
        return $this->hasMany(TaskUser::class);
    }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
