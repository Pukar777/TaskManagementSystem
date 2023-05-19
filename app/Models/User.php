<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Task;
use App\Models\TaskUser;
// use Laravel\Sanctum\HasApiTokens;
use App\Models\Notification;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Auth;
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


    public function hasPermission($permissionName)
    {

        // dd(Auth::User());
        $userPermissionIds = $this->role->permission_role->pluck('permission_id');
        $Permissions=Permission::whereIn('id',$userPermissionIds)->pluck('name');
        // dd($Permissions);
        // dd($permissionName);
        return $Permissions->contains($permissionName);


//==============================================another way===============================================================
            // $Permissions=Permission::whereIn('id',$userPermissionIds)->pluck('name')->toArray();

            // if (in_array($permissionName, $Permissions)) {

            //     // dd($Permissions);
            //     // Permission exists in the array
            //     return true;
            // } else {
            //     // Permission does not exist in the array
            //     return false;
            // }
        //     $PermissionsCollection = collect($Permissions);
        //  //   dd($PermissionsCollection);
        //     return $PermissionsCollection->contains($permissionName);



        ///===============================wrong=================================================================

        // foreach ($Permissions as $permission){
        //    $permission->contains('name', $permissionName);
        // }

        // return $this->role->permission_role->permission->name->contains('name', $permissionName);
        // return auth()->user()->role->permission_role->permission->contains('name', $permissionName);
        // return auth()->user()->role->permission_role->permission->contains('name', $permissionName);
        // return $this->role::with('permission_role.permission')->contains('name', $permissionName);
        // $permissions = $this->role->permission_role->permission->pluck('name');
        // return $permissions->contains('name', $permissionName);

    }



    // public function atask()
    // {
    //     return $this->belongsToMany(Task::class,'task_users','user_id','task_id');
    // }

    public function task_user()
    {
        return $this->hasMany(TaskUser::class);
    }


    public function notification()
    {
        return $this->hasMany(Notification::class);
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
