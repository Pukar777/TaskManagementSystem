<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Helpers\ResponseHelper;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Crypt;



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


        $this->middleware(function ($request, $next) {
            if (Gate::check('create-user')) {
                return $next($request);
            } else {
                abort(403, 'Unauthorized action.');
            }
        })->only('store');

        $this->middleware(function ($request, $next) {
            if (Gate::check('read-user')) {
                return $next($request);
            } else {
                abort(403, 'Unauthorized action.');
            }
        })->only('index');

        $this->middleware(function ($request, $next) {
            if (Gate::check('update-user')) {
                return $next($request);
            } else {
                abort(403, 'Unauthorized action.');
            }
        })->only('update');

        $this->middleware(function ($request, $next) {
            if (Gate::check('delete-user')) {
                return $next($request);
            } else {
                abort(403, 'Unauthorized action.');
            }
        })->only('destroy');
    }



    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // if (Gate::check('read-user')) {
        // Allow user to delete role
        $users = $this->userService->getall();
        // if (request()->expectsJson()) {
        //     return response()->json($users);
        // }

        // Gate::authorize('read-user',$users);
        $response  = ResponseHelper::generateGetResponse($users);



        return $response;

        // } else {
        //     abort(403, 'Unauthorized action.');
        // }



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
        // if (Gate::check('create-user')) {
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
        // } else {
        //     abort(403, 'Unauthorized action.');
        // }


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

    // public function updatePassword(Request $request, $id)
    // {
    //     $user = User::find($id);
    //     $user->email = $request->input('email');
    //     $user->password = $request->input('');
    //     if ($user->save()) {

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'status upadte successfully',


    //         ]);
    //     }
    // }


    public function showResetForm($token,$email)
    {
        // $email = DB::table('password_reset_tokens')->where('token', $token)->value('email');
        // dd($email);
        return view('emails.password_reset_form', ['token' => $token, 'email' => $email]);
    }

    public function updatePassword(Request $request, $token)
    {


        $user = User::where('email', $request->input('email'))->first();
        if (!$user) {
            // user not found
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid email',
            ], 404);
        }

        // if (!Hash::check($token, $user->getRememberToken())) {
        //     // invalid token
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'Invalid token',
        //     ], 404);
        // }
        // if (!Hash::check($token, $user->token)) {
        //     // invalid token
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'Invalid token',
        //     ], 404);
        // }

        // $passwordReset = DB::table('password_reset_tokens')
        //     ->where('email', $request->email)
        //     ->where('token', $token)
        //     ->first();
        // if (!$passwordReset) {
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'Invalid token',
        //     ], 404);
        // }


        $tableToken = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first()
            ->token;

        // Check if the token matches the one provided in the request
        if (!Hash::check($token, $tableToken)) {
            // Handle invalid token error
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid token',
            ], 404);
        }


        $validator = Validator::make($request->all(), [
            'password' => 'required|confirmed|min:6',
        ]);

        if ($validator->fails()) {
            // validation error
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first(),
            ], 400);
        }

        $user->password = Hash::make($request->input('password'));
        $user->save();

        DB::table('password_reset_tokens')->where('email', $user->email)->delete();


        return response()->json([
            'status' => 'success',
            'message' => 'Password updated successfully',
        ]);
    }





    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, $id)
    {


        // if (Gate::check('update-user')) {

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
        // } else {
        //     abort(403, 'Unauthorized action.');
        // }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        // if (Gate::check('delete-user')) {
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
        // } else {
        //     abort(403, 'Unauthorized action.');
        // }

    }
}
