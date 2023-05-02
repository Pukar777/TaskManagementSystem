<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PermissionController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });



// Route::get('dashboard', [AuthController::class, 'dashboard']); 
// Route::get('login', [AuthController::class, 'index'])->name('login');
Route::post('custom-login', [AuthController::class, 'customLogin'])->name('login.custom'); 
Route::get('registration', [AuthController::class, 'registration'])->name('register-user');
Route::post('custom-registration', [AuthController::class, 'customRegistration'])->name('register.custom'); 
// Route::get('signout', [AuthController::class, 'signOut'])->name('signout');
Route::post('/signout', [AuthController::class, 'signOut'])->middleware('auth:api');
// Route::middleware('auth:api')->get('/getUser', [AuthController::class, 'getUser']);
Route::middleware('auth:api')->get('/me', [AuthController::class, 'me']);


// Route::post('custom-registration', [AuthController::class, 'customRegistration'])->name('register.custom'); 


// ======================================================================================================================

Route::get('/tasks/{id}', [TaskController::class, 'showAssociateUserId']);  //get associated permissions based on role
Route::resource('task', TaskController::class);
Route::get('/role/{id}', [RoleController::class, 'getRoleById']); //get only role based id
Route::get('/roles/{id}', [RoleController::class, 'showAssociatePermissionId']);  //get associated permissions based on role
// Route::get('/showPermission/{id}', [RoleController::class, 'show_permission']);
Route::get('roleOnPer',[RoleController::class, 'getAllPermissionBasedOnRole']);
Route::resource('role', RoleController::class);
Route::get('/users/{id}', [UserController::class, 'getUserById']);
Route::resource('user', UserController::class);
Route::resource('permission', PermissionController::class);
Route::get('getrole/{id}', [PermissionController::class,'show_role']);//get associated role based on permissions id
Route::get('getAllRole', [PermissionController::class,'showall_role']);//get associated role based on permissions 

// Route::get('getrole', [PermissionController::class,'show_role']);