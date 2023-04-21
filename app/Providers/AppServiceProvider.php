<?php

namespace App\Providers;

use App\Services\RoleService;

use App\Services\TaskService;
use App\Services\UserService;
use App\Repositories\RoleRepo;
use App\Repositories\TaskRepo;
use App\Repositories\UserRepo;
use App\Services\ServiceIface;
use App\Repositories\RepoIface;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // $this->app->bind(RepoIface::class, UserRepo::class);
       
        // $this->app->bind(RepoIface::class, TaskRepo::class);
       
        // $this->app->bind(RepoIface::class, RoleRepo::class);

        // $this->app->bind(ServiceIface::class, UserService::class);
       
        // $this->app->bind(ServiceIface::class, TaskService::class);
        
        // $this->app->bind(ServiceIface::class, RoleService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
       

        Schema::defaultStringLength(191);
    }
}
