<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\User;
use Laravel\Passport\Passport;
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
        //
        $this->registerPolicies();
        //  Passport::routes();

// ================================User=================================================================
        Gate::define('create-user', function (User $user) {
            if ($user->isSuper) {
                return true;
            }
            return $user->hasPermission('create-user');
        });


        Gate::define('read-user', function (User $user) {
            // dd('xyz');
            if ($user->isSuper) {
                return true;
            }
            return $user->hasPermission('read-user');
        });

        Gate::define('update-user', function (User $user) {
            // dd('xyz');
            if ($user->isSuper) {
                return true;
            }
            return $user->hasPermission('update-user');
        });


        Gate::define('delete-user', function (User $user) {
            // dd('xyz');
            if ($user->isSuper) {
                return true;
            }
            return $user->hasPermission('delete-user');
        });

// ================================Role=================================================================
        Gate::define('create-role', function (User $user) {
            if ($user->isSuper) {
                return true;
            }
            return $user->hasPermission('create-role');
        });


        Gate::define('read-role', function (User $user) {
            // dd('xyz');
            if ($user->isSuper) {
                return true;
            }
            return $user->hasPermission('read-role');
        });

        Gate::define('update-role', function (User $user) {
            // dd('xyz');
            if ($user->isSuper) {
                return true;
            }
            return $user->hasPermission('update-role');
        });


        Gate::define('delete-role', function (User $user) {
            // dd('xyz');
            if ($user->isSuper) {
                return true;
            }
            return $user->hasPermission('delete-role');
        });

        
// ================================Task=================================================================
        
        Gate::define('create-task', function (User $user) {
            if ($user->isSuper) {
                return true;
            }
            return $user->hasPermission('create-task');
        });


        Gate::define('read-task', function (User $user) {
            // dd('xyz');
            if ($user->isSuper) {
                return true;
            }
            return $user->hasPermission('read-task');
        });

        Gate::define('update-task', function (User $user) {
            // dd('xyz');
            if ($user->isSuper) {
                return true;
            }
            return $user->hasPermission('update-task');
        });


        Gate::define('delete-task', function (User $user) {
            // dd('xyz');
            if ($user->isSuper) {
                return true;
            }
            return $user->hasPermission('delete-task');
        });
    }
}
