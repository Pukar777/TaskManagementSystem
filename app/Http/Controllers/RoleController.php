<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Services\RoleService;
use App\Http\Requests\RoleRequest;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    private $roleService;
    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    public function index()
    {
        // $obj = Role::with('permissions')->get()->first();
        // $obj = Role::with('permissixons')->first();
        // $obj = Role::with('permissions')->where('id', 4)->get();
        // $obj = Role::with('permissions')->whereIn('id', $arrayofId)->get();

        // dd($obj);

        $data = $this->roleService->all();

        if (request()->expectsJson()) {
            return response()->json([
                'message' => 'success',
                'data' => $data,
            ], 200);
        }
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
        $id = $this->roleService->store($request->input());
        // dd($request->validated()["permission_ids"]);
        // dd(getType($request->input()["permission_ids"]));

        if (request()->expectsJson()) {
            return response()->json([
                'message' => 'success',
                'id' => $id,
            ], 200);
        }
    }

    public function show(Role $role)
    {
    }

    public function edit(Role $role)
    {
    }

    public function update(RoleRequest $request, $id)
    {
        return $this->roleService->update($request->validated(), $id);
    }

    public function destroy($id)
    {
         $this->roleService->delete($id);

        if (request()->expectsJson()) {
            return response()->json([
                'message' => 'success',
            ], 200);
        }

        return;

    }
}
