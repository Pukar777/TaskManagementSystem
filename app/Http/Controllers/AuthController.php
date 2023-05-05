<?php

namespace App\Http\Controllers;

use HasApiTokens;

use App\Models\User;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    // public function index()
    // {

    //     return view('auth.login');
    // }


    public function customlogin(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);


        $credentials = $request->only(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = $request->user();
        $tokenResult = $user->createToken('Login Token');
        $token = $tokenResult->accessToken;

        return response()->json([
            // 'access_token' => $token
            'access_token' => $token,
            'user' => $user,
            'success' => 'true',
        ], 200);
    }

    //    public function customLogin(Request $request)
    //    {
    //        $request->validate([
    //            'email' => 'required',
    //            'password' => 'required',
    //        ]);

    //        $credentials = $request->only('email', 'password');
    //        if (Auth::attempt($credentials)) {
    //            return redirect()->intended('dashboard')
    //                        ->withSuccess('Signed in');
    //        }

    //        return redirect("login")->withSuccess('Login details are not valid');
    //    }

    public function registration()
    {
        return view('auth.registration');
    }

    //    public function customRegistration(Request $request)
    //    {  
    //        $request->validate([
    //            'name' => 'required',
    //            'email' => 'required|email|unique:users',
    //            'contact' => 'required|max:15',
    //            'address' => 'required|max:100',
    //            'password' => 'required|min:6',
    //        ]);

    //        $data = $request->all();
    //        $check = $this->create($data);

    //        return redirect("dashboard")->withSuccess('You have signed-in');
    //    }

    //    public function create(array $data)
    //    {
    //      return User::create([
    //        'name' => $data['name'],
    //        'email' => $data['email'],
    //        'contact' => $data['contact'],
    //        'address' => $data['address'],
    //        'password' => Hash::make($data['password'])
    //      ]);
    //    }    


    public function customRegistration(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'contact' => 'required|max:15',
            'address' => 'required|max:100',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'contact' => $request->contact,
            'address' => $request->address,
            'password' => Hash::make($request->password),
        ]);

        $tokenResult = $user->createToken('Registration Token');
        $token = $tokenResult->accessToken;

        return response()->json([
            'access_token' => $token,
            'user' => $user,
            'success' => 'true',
        ], 201);
    }

    // public function dashboard()
    // {
    //     if (Auth::check()) {
    //         return view('dashboard');
    //     }

    //     return redirect("login")->withSuccess('You are not allowed to access');
    // }

    //    public function signOut() {

    //        Auth::logout();

    //        return Redirect('login');
    //    }

    public function signOut(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }


    // public function getUser(Request $request)
    // {
    //     $user = $request->user();
    //     dd($user);
    //     return response()->json(['user' => $user], 200);
    // }

    public function me()
    {   
        
        return response()->json(auth()->user()->load('role.permission_role.permission','task_user.task.user', 'task_user.user'));
    }

    
}

