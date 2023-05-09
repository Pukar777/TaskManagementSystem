<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {

        Gate::define('create_user', function ($user) {
            // dd($user->role->permissions->contains('name', 'create_user'));
            // returns true;
            // if(condtion){
            //     abort(403);
            // }
            // return true;
            return $user->role->permissions->contains('name', 'create_user');
        });

        Gate::define('read_user', function ($user) {
            // dd('gate');
            return $user->role->permissions->contains('name', 'read_user');
        });
        Gate::define('update_user', function ($user) {
            return $user->role->permissions->contains('name', 'update_user');
        });
        Gate::define('delete_user', function ($user) {
            return $user->role->permissions->contains('name', 'delete_user');
        });
        Gate::define('create_task', function ($user) {
            return $user->role->permissions->contains('name', 'create_task');
        });
        Gate::define('read_task', function ($user) {
            return $user->role->permissions->contains('name', 'read_task');
        });
        Gate::define('update_task', function ($user) {
            return $user->role->permissions->contains('name', 'udpate_task');
        });
        Gate::define('delete_task', function ($user) {
            return $user->role->permissions->contains('name', 'delete_task');
        });
        Gate::define('create_role', function ($user) {
            return $user->role->permissions->contains('name', 'create_role');
        });
        Gate::define('read_role', function ($user) {
            return $user->role->permissions->contains('name', 'read_role');
        });
        Gate::define('update_role', function ($user) {
            return $user->role->permissions->contains('name', 'update_role');
        });
        Gate::define('delete_role', function ($user) {
            return $user->role->permissions->contains('name', 'delete_role');
        });
    }
}
