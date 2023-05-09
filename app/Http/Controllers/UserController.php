<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $data = $this->userService->all();

        if (request()->expectsJson()) {
            return response()->json([
                'message' => 'success',
                'data' => $data,
            ], 200);
        }
        return response()->json([
            'message' => '204 wont have any response body thus it wont show'
        ], 204);

        // return view('users.index', compact('data'));
    }

    public function create()
    {
        $roles = Role::all();
        return view('users.create', compact('roles'));
    }

    public function store(UserRequest $request)
    {
        $this->userService->store($request->validated());

        if (request()->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'User created successfully',
                'data' => $request->input(),
            ]);
        }

        return redirect()->route('users.index');
    }

    public function update(UserRequest $request, User $user)
    {
        $this->userService->update($request->validated(), $user->id);

        if (request()->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'User updated successfully',
                'data' => $request->validated(),
            ]);
        }

        return redirect()->route('users.index');
    }

    public function destroy(Request $request)
    {
        $this->userService->delete($request->input('ids'));

        if (request()->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Users deleted successfully',
                'data' => $request->input(),
            ]);
        }

        return redirect()->route('users.index');
    }
}
