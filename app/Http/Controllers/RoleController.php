<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Services\RoleService;
use App\Services\ServiceIface;
use App\Helpers\ResponseHelper;
use App\Http\Requests\RoleRequest;
use Illuminate\Support\Facades\Gate;


class RoleController extends Controller
{
    protected $roleService;

    //public $test;

    public function __construct(RoleService $roleService)
    {

        $this->roleService = $roleService;
        // $this->test = $test;

        // $this->middleware(function ($request, $next) {
        //     Gate::authorize('create-role');
        //     Gate::authorize('read-role');
        //     Gate::authorize('update-role');
        //     Gate::authorize('delete-role');
        //     return $next($request);
        // });
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Gate::check('read-role')) {
            $roles = $this->roleService->getall();
            // if (request()->expectsJson()) {
            //     return response()->json($roles);
            // }

            $response  = ResponseHelper::generateGetResponse($roles);

            return $response;
        } else {
            abort(403, 'Unauthorized action.');
        }


        //return response()->json($roles);
    }

    public function getRoleDropdownAction(){
        $roles = $this->roleService->getall();
        // if (request()->expectsJson()) {
        //     return response()->json($roles);
        // }

        $response  = ResponseHelper::generateGetResponse($roles);
        return $response;

    }

    public function getRoleById($id)
    {
        $role = $this->roleService->getRoleById($id);

        return response()->json($role);
    }


    public function showAssociatePermissionId($id)
    {

        $role = $this->roleService->showAssocPer($id);

        if (request()->expectsJson()) {
            return response()->json($role);
        }
        return response()->json($role);
    }


    // public function show_permission($id)
    // {
    //     // $role = Permission::find($id)->permission_role;
    //     $role = Role::with('permission_role')->find($id);
    //     // dd($role);
    //     if (request()->expectsJson()) {
    //         return response()->json($role);
    //     }

    //     return response()->json($role);
    // }





    public function getAllPermissionBasedOnRole()
    {
        $roles = $this->roleService->showall_per();
        // if (request()->expectsJson()) {
        //     return response()->json($roles);
        // }

        $response  = ResponseHelper::generateGetResponse($roles);

        return $response;

        //return response()->json($roles);
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
    public function store(RoleRequest $request)
    {
        // $role = $this->roleService->store($request->all());
        // dd($request->all());

        if (Gate::check('create-role')) {
            $data = $this->roleService->store($request->validated());
            if (!empty($data)) {
                return ResponseHelper::generateResponse($request, 'success', 'role created successfully', $request->input(), 200);
            } else {
                return ResponseHelper::generateResponse($request, 'error', 'role creation failed', null, 400);
            }
        } else {
            abort(403, 'Unauthorized action.');
        }



        // if($request->expectsJson()) {
        //     return response()->json([
        //         'status' => 'success',
        //         'message' => 'role created successfully',
        //         'data' => $data,
        //     ]);
        // }
        // dd($data);
        // if (!empty($data))
        // if ($data) {
        //     if ($request->expectsJson()) {
        //         return response()->json([
        //             'status' => 'success',
        //             'message' => 'role created successfully',
        //             'data' => $request->input(),
        //         ], 200);
        //     }
        // } else {
        //     if ($request->expectsJson()) {
        //         return response()->json([
        //             'status' => 'error',
        //             'message' => 'role creation failed',
        //             'data' => null,
        //         ], 400);
        //     }
        // }


    }



    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $role = $this->roleService->edit($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleRequest $request, $id)
    {

        if (Gate::check('update-role')) {
            // Allow user to delete role
            $data = $this->roleService->update($request->validated(), $id);
            // if ($request->expectsJson()) {
            //     return response()->json([
            //         'status' => 'success',
            //         'message' => 'role updated successfully',
            //         'data' => $request->input(),

            //     ]);
            // }
            if (!empty($data)) {
                return ResponseHelper::generateResponse($request, 'success', 'role updated successfully', $request->input(), 200);
            } else {
                return ResponseHelper::generateResponse($request, 'error', 'role  failed to update', null, 400);
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
        if (Gate::check('delete-role')) {
            $this->roleService->delete($id);

            if (!empty($id)) {
                return ResponseHelper::generateResponse(request(), 'success', 'role deleted successfully', $id, 200);
            } else {
                return ResponseHelper::generateResponse(request(), 'error', 'role deletion failed', null, 400);
            }
        } else {
            abort(403, 'Unauthorized action.');
        }



        // if (request()->expectsJson()) {
        //     return response()->json([
        //         'status' => 'success',
        //         'message' => 'role deleted successfully',
        //         'data' => $id,
        //     ]);
        // }
    }
}
