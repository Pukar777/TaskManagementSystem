<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;


class LoginController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }

    function authenticateUser(Request $request)
    {
        // $credentials = $request->only('email', 'password');
        // Log::debug('Credentials', $credentials);
        // return response()->json([
        //     'message' => 'Credentials logged unsuccessfully',
        //     'token' => 'tokentest',
        // ], 200);

        // try {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Log::debug('Credentials', $request->input());

        $user = User::with('role.permissions')->where('email', $credentials['email'])->first();

        if ($user && Hash::check($credentials['password'], $user['password'])) {
            $token = $user->createToken('auth-token')->plainTextToken;

            $user= [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'permissions' => $user->role->permissions->pluck('name')->toArray(),
            ];

            return response()->json([
                'user' => $user,
                'token' => $token,
                'message' => 'Logged In Successfully',
            ], 200);
        } else {
            return response()->json(['message' => 'Invalid Credentials'], 401);
        }

        //     return response()->json(['message' => 'Credentials logged successfully'], 200);
        // } catch (ValidationException $e) {
        //     return response()->json(['errors' => $e->errors()], 422);
        // } catch (\Exception $e) {
        //     Log::error('Login failed: ' . $e->getMessage());
        //     return response()->json(['message' => 'An error occurred during login'], 500);
        // }

        // $user = User::where('email', $credentials['email'])->first();

        //     if ($user && Hash::check($credentials['password'], $user->password)) {
        //         $token = $user->createToken('auth-token')->plainTextToken;

        //         return response()->json(['token' => $token], 200);
        //     } else {
        //         throw ValidationException::withMessages([
        //             'credentials' => ['Invalid credentials'],
        //         ]);
        //     }
        // } catch (ValidationException $e) {
        //     return response()->json(['errors' => $e->errors()], 422);
        // } catch (\Exception $e) {
        //     Log::error('Login failed: ' . $e->getMessage());
        //     return response()->json(['message' => 'An error occurred during login'], 500);
        // }
    }

    // public function authenticate(Request $request)
    // {
    //     // dd($request->getCredentials());

    //     if ($this->credentials($request)) {
    //         $key = Str::lower($request->input('email')) . '|' . $request->ip();

    //         if (RateLimiter::tooManyAttempts($key, 5)) {
    //             $seconds = RateLimiter::availableIn($key);

    //             throw ValidationException::withMessages([
    //                 'email' => trans('auth.throttle', [
    //                     'seconds' => $seconds,
    //                     'minutes' => ceil($seconds / 60),
    //                 ]),
    //             ]);
    //         }

    //         if (!Auth::attempt($request->only('email', 'password'), $request->filled('remember'))) {
    //             RateLimiter::hit($key);

    //             throw ValidationException::withMessages([
    //                 'email' => trans('auth.failed'),
    //             ]);
    //         }

    //         RateLimiter::clear($key);

    //         $request->session()->regenerate();

    //         $id = Auth::user()->id;
    //         $user = User::with('roles')->find($id);
    //         $roles = $user->roles;

    //         foreach ($roles as $role) {
    //             if ($role->name == 'admin' || $role->name == 'staff') {
    //                 return redirect()->route('admin.dashboard');
    //             }
    //         }

    //         return redirect()->route('user.dashboard');
    //     }
    // }
}
