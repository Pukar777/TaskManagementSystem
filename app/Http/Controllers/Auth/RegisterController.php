<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class RegisterController extends Controller
{
    public function index()
    {
        return view('auth.register');
    }

    public function register(UserRequest $request)
    {
        // $credentials = $request->validated();

        // $credentials = array_merge($credentials, ['password' => bcrypt($request->input('password'))]);

        // dd($credentials);

        $credentials = User::create(array_merge(
            $request->validated(),
            ['password' => bcrypt($request->input('password'))]
        ));




        if (request()->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'User Created Successfully',
                'Data' => $request->input(),
            ]);
        }

        return redirect()->route('user.dashboard');
    }
}
