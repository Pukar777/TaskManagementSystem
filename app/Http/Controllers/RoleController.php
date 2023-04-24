<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Services\RoleService;
use App\Services\ServiceIface;
use App\Helpers\ResponseHelper;


class RoleController extends Controller
{
    protected $roleService;
    //public $test;

    public function __construct(RoleService $roleService)
    {

        $this->roleService = $roleService;
        // $this->test = $test;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = $this->roleService->getall();
        if (request()->expectsJson()) {
            return response()->json($roles);
        }

        return response()->json($roles);
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

        $data = $this->roleService->store($request->validated());

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

        if (!empty($data)) {
            return ResponseHelper::generateResponse($request, 'success', 'role created successfully', $request->input(), 200);
        } else {
            return ResponseHelper::generateResponse($request, 'error', 'role creation failed', null, 400);
        }
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->roleService->delete($id);
        if (request()->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'role deleted successfully',
                'data' => $id,
            ]);
        }
    }
}
