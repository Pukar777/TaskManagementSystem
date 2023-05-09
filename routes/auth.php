<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

// Route::get('register', [UserRegisterController::class, 'create']);
// Route::post('register', [UserRegisterController::class, 'show']);

// Route::resource('register', UserRegisterController::class);
// Route::resource('register', UserRegisterController::class)->except(['index', 'create', 'store', 'show', 'edit', 'update', 'destroy']);
// Route::resource('register', RegisterController::class)->only(['create', 'store']);
// Route::resource('login', LoginController::class)->only(['index']);
// Route::post('login', [LoginController::class, 'authenticate'])->name('login/auth');


Route::group([
    'prefix' => 'auth',
    'as' => 'auth.',
    'namespace' => 'App\Http\Controllers\Auth',
    'middleware' => ['guest']
], function () {
    // Route::get('login', [LoginController::class, 'index'])->name('login');
    // Route::post('test', function () {
    //     return response()->json(['message' => 'Credentials logged successfully'], 200);
    // });
    Route::post('login', [LoginController::class, 'authenticateUser'])->name('login');

    Route::get('register', [RegisterController::class, 'index'])->name('register');
    Route::post('register', [RegisterController::class, 'register'])->name('register');
});

// Route::group([
//     'prefix' => 'auth',
//     'as' => 'auth.',
//     'namespace' => 'App\Https\Controllers\Auth',
//     'middleware' => ['auth']
// ], function () {
//     Route::post('logout', [LoginController::class, 'logout'])->name('logout');
//     // Route::get('logout', [LoginController::class, 'logout'])->name('logout');
// });
