<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Helpers\ResponseHelper;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Gate;


class UserController extends Controller
{
    protected $userService;
    //public $test;

    public function __construct(UserService $userService)
    {

        $this->userService = $userService;
        // $this->test = $test;
        // Gate::authorize('create-user');
        // Gate::authorize('read-user');
        // dd('test');
        // Gate::authorize('update-user');
        // Gate::authorize('delete-user');

        // $this->middleware(function ($request, $next) {
        //     Gate::authorize('create-user');
        //     Gate::authorize('read-user');
        //     Gate::authorize('update-user');
        //     Gate::authorize('delete-user');
        //     return $next($request);
        // });
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        if (Gate::check('read-user')) {
            // Allow user to delete role
            $users = $this->userService->getall();
            // if (request()->expectsJson()) {
            //     return response()->json($users);
            // }
    
            // Gate::authorize('read-user',$users);
            $response  = ResponseHelper::generateGetResponse($users);
    
    
    
            return $response;
    
        } else {
            abort(403, 'Unauthorized action.');
        }
      


        // return response()->json($users);
    }

    public function getUserById($id)
    {
        $user = $this->userService->getUserById($id);

        return response()->json($user);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        // $user = $this->userService->store($request->all());



        // dd($request->all());
        if (Gate::check('create-user')) {
            $data = $this->userService->store($request->validated());
            // if($request->expectsJson()) {
            //     return response()->json([
            //         'status' => 'success',
            //         'message' => 'user created successfully',
            //         'data' => $data,
            //     ]);
            // }
            if (!empty($data)) {
                return ResponseHelper::generateResponse($request, 'success', 'user created successfully', $request->input(), 200);
            } else {
                return ResponseHelper::generateResponse($request, 'error', 'user creation failed', null, 400);
            }
        } else {
            abort(403, 'Unauthorized action.');
        }
    
        
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $user = $this->userService->edit($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, $id)
    {


        if (Gate::check('update-user')) {
            // Allow user to delete role
            $data = $this->userService->update($request->validated(), $id);
            // if ($request->expectsJson()) {
            //     return response()->json([
            //         'status' => 'success',
            //         'message' => 'user updated  successfully',    
            //         'data' => $data,
    
            //     ]);
            // } 
            if (!empty($data)) {
                return ResponseHelper::generateResponse($request, 'success', 'user updated successfully', $request->input(), 200);
            } else {
                return ResponseHelper::generateResponse($request, 'error', 'user update failed', null, 400);
            }
        } else {
            abort(403, 'Unauthorized action.');
        }
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        if (Gate::check('delete-user')) {
            // Allow user to delete role
            $this->userService->delete($id);
            //    if(request()->expectsJson()) {
            //     return response()->json([
            //         'status' => 'success',
            //         'message' => 'user deleted successfully',
            //     ]);
            // }
            if (!empty($id)) {
                return ResponseHelper::generateResponse(request(), 'success', 'user deleted successfully', $id, 200);
            } else {
                return ResponseHelper::generateResponse(request(), 'error', 'user deletion failed', null, 400);
            }
        } else {
            abort(403, 'Unauthorized action.');
        }
    
    }
}
