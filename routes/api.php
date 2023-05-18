<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::get('task', function (Request $request) {
//     // dd('test');
//     // Log::Debug("message", $request);
//     return response()->json([
//         'message' => 'success',
//     ], 200);
// })->middleware('auth:sanctum');


// Route::post('user', [UserController::class, 'store'])->name('store');


Route::middleware('auth:sanctum')->group(function () {



    Route::name('user.')->group(function () {

        Route::get('user', [UserController::class, 'index'])->middleware('can:read_user');
        Route::post('user', [UserController::class, 'store'])->name('store')->middleware('can:create_user');
        Route::put('user/update', [UserController::class, 'update'])->name('update')->middleware('can:update_user');
        Route::delete('user/delete', [UserController::class, 'destroy'])->name('delete')->middleware('can:delete_user');
    });


    Route::name('task.')->group(function () {
        Route::get('task', [TaskController::class, 'index'])->name('index')->middleware('can:read_task');
        Route::post('task', [TaskController::class, 'store'])->name('store')->middleware('can:create_task');
        Route::put('task/update', [TaskController::class, 'update'])->name('update')->middleware('can:update_task');
        Route::delete('task/delete', [TaskController::class, 'destroy'])->name('delete')->middleware('can:delete_task');
    });

    Route::name('role.')->group(function () {
        Route::get('role', [RoleController::class, 'index'])->name('index')->middleware('can:read_role');
        Route::post('role', [RoleController::class, 'store'])->name('store')->middleware('can:create_role');
        Route::put('role', [RoleController::class, 'update'])->name('update')->middleware('can:_update_role');
        Route::delete('role/{id}', [RoleController::class, 'destroy'])->name('destroy')->middleware('can:delete_role');
    });

    // Route::resource('role', RoleController::class)->only(['index', 'store', 'update', 'destroy'])
    //     ->names('role')
    //     ->middleware([
    //         'can:read_role',
    //         'can:create_role',
    //         'can:update_role',
    //         'can:delete_role'
    //     ]);
});

// Route::middleware(['auth:sanctum', 'can:create-user'])->get('/user', [UserController::class, 'index']);



require __DIR__ . '/auth.php';
