<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Requests\UserRequest;


class UserController extends Controller
{
    protected $userService;
    //public $test;

    public function __construct(UserService $userService){

        $this->userService = $userService;
        // $this->test = $test;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = $this->userService->getall();
        if (request()->expectsJson()) {
            return response()->json($users);
        }
        
        return response()->json($users);
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
        $data = $this->userService->store($request->validated());
        if($request->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'user created successfully',
                'data' => $data,
            ]);
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
        
        
        
        $data = $this->userService->update($request->validated(),$id);
        if ($request->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'user updated  successfully',    
                'data' => $data,
                
            ]);
        } 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->userService->delete($id);  
           if(request()->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'user deleted successfully',
            ]);
        }
       
    }
}
