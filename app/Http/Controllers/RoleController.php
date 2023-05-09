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

        return $this->roleService->all();
    }

    public function create()
    {
    }

    public function store(RoleRequest $request)
    {
        $this->roleService->store($request->validated());
        // dd($request->validated()["permission_ids"]);
        // dd(getType($request->input()["permission_ids"]));

        return;
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
        return $this->roleService->delete($id);
    }
}
