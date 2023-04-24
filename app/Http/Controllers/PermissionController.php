<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    //get role based on permissions id
    public function show_role($id)
    {
        // $role = Permission::find($id)->permission_role;
        $role = Permission::with('permission_role')->find($id);
        // dd($role);
        if (request()->expectsJson()) {
            return response()->json($role);
        }

        return response()->json($role);
    }

    // public function show_role()
    // {
    //     // $role = Permission::find($id)->permission_role;
    //     $role = Permission::with('permission_role')->get();


    //     dd($role);
    //     if (request()->expectsJson()) {
    //         return response()->json($role);
    //     }

    //     return response()->json($role);
    // }






    public function index()
    {
        //
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Permission $permission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Permission $permission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        //
    }
}
