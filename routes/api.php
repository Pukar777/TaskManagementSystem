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

//==============================Auth===============================================================================

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
Route::get('/reset', function () {
    return view('auth.reset');
});


Route::middleware(['auth:api'])->group(function () {

//-------------------------------------------Task------------------------------------------------------------------------------------


// used in dashboard
Route::put('update-status/{id}', [TaskController::class, 'updatStatus']);//only update status

// used in task detail and edit to populate data
Route::get('/tasks/{id}', [TaskController::class, 'showAssociateUserId']);  //get associated users based on task


//used in view task for test purpose
Route::get('showAssUsers', [TaskController::class,'showAssUser']);


//query for postman test

Route::get('queryUsers', [TaskController::class,'queryShowAssoUser']);

// used in create view and edit task to store view in view page and update
Route::resource('task', TaskController::class);






//--------------------------------------------Role-------------------------------------------------------------------------

Route::get('/roleDropDown', [RoleController::class, 'getRoleDropDownAction']); //get only role based id
// not used
Route::get('/role/{id}', [RoleController::class, 'getRoleById']); //get only role based id

//used in edit page to populate data for role and permissions
Route::get('/roles/{id}', [RoleController::class, 'showAssociatePermissionId']);  //get associated permissions based on role
// Route::get('/showPermission/{id}', [RoleController::class, 'show_permission']);


//not used 
Route::get('roleOnPer',[RoleController::class, 'getAllPermissionBasedOnRole']);

//used in create updating and viewing role page and also in user dropdown
Route::resource('role', RoleController::class);




//----------------------------------------------User------------------------------------------------------------------------------

//to populate data in edit page
Route::get('/users/{id}', [UserController::class, 'getUserById']);

//used in viewing creating and updating users
Route::resource('user', UserController::class);





// -------------------------------------------Permission--------------------------------------------------------------

// used to get permission on create role and edit role  page
Route::resource('permission', PermissionController::class);

//not used
Route::get('getrole/{id}', [PermissionController::class,'show_role']);//get associated role based on permissions id
//not used
Route::get('getAllRole', [PermissionController::class,'showall_role']);
//get associated role based on permissions 
// Route::get('getrole', [PermissionController::class,'show_role']);

});