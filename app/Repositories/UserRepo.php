<?php

namespace App\Repositories;

use Exception;
use App\Models\Role;
use App\Models\User;
use App\Repositories\IRepo;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserRepo implements IRepo
{

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }
    public function all()
    {
        $users = User::with("role:id,name")->get();
        $roles = Role::all();
        return [$users, $roles];
    }
    public function store($user)
    {
        
        $user += ['password' => Hash::make('password')];
        $user = $this->user->create($user);
        return  $this->user->with('role:id,name')->find($user->id)->toArray();
    }
    public function edit($id)
    {
        // return User::find($id);
    }
    public function update($user, $id)
    {
        User::where('id', $id)->update($user);
    }

    public function delete($id)
    {
        User::where('id', $id)->delete();
    }
}







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// <?php

// namespace App\Repositories;

// use Exception;
// use App\Models\User;
// use App\Repositories\IRepo;
// use Illuminate\Database\Eloquent\ModelNotFoundException;

// class UserRepo implements IRepo
// {

//     protected $user;

//     public function __construct(User $user)
//     {
//         $this->user = $user;
//     }
//     public function all()
//     {
//         return User::all();
//     }
//     public function store($data)
//     {
//         try {
//             User::create([
//                 'name' => $data['name'],
//                 'email' => $data['email'],
//                 // 'contact' => $data['contact'],
//                 // 'address' => $data['address'],
//                 'role_id' => $data['role_id'],
//                 'password' => $data['password'],
//             ]);
//         } catch (Exception $e) {
//             if (config('app.debug')) {
//                 throw $e;
//             }
//             response()->json(['error' => $e->getMessage()], 500);
//         }
//     }
//     public function edit($id)
//     {
//         // return User::find($id);

//         try {
//             $data = User::findOrFail($id);
//         } catch (ModelNotFoundException $e) {
//             if (config('app.debug')) {
//                 throw $e;
//             }
//             // return response('User not found', Response::HTTP_NOT_FOUND);
//             response()->json(['error' => $e->getMessage()], 500);
//         }
//     }
//     public function update($data, $id)
//     {
//         try {

//             User::where('id', $id)->firstOrFail()->update([
//                 'name' => $data->name,
//                 'established_at'  => $data->est_at,
//                 'country' => $data->origin
//             ]);
//         } catch (ModelNotFoundException $e) {
//             if (config('app.debug')) {
//                 throw $e;
//             }
//             response()->json(['error' => $e->getMessage(), 500]);
//         }
//     }

//     public function delete($id)
//     {
//         try {
//             User::where('id', $id)->firstOrFail()->delete;
//         } catch (ModelNotFoundException $e) {
//             if (config('app.debug')) {
//                 throw $e;
//             }
//             response()->json(['error' => $e->getMessage()], 500);
//         }
//     }
// }
