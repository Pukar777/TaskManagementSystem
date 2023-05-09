<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */

    private $name = ['unique:roles', 'required'];
    public function rules(): array
    {
        // switch($this->method()){
        //     case 'POST':
        //         return [$name];
        //         break;
        // }
        // return [
        //     'name' => ['unique:roles', 'required'],
        // ];
        return [
            // 'name' => ['required', 'unique:roles'] . $this->role,
            'name' => ['required', Rule::unique('roles')->ignore($this->role)],
            'permission_ids' => ['required', 'exists:permissions,id'],
            // '*.permission_ids' => ['required'],
            // '*.permission_ids' => ['required', 'exists:permissions,id'],
        ];
    }

    public function message()
    {
        return [
            'name.required' => 'Please enter a role name.',
            'name.unique' => 'Role name must be unique.',
            'permission_ids.required' => 'No Permission selected.',
            // 'permission_ids.exists' => 'Permission does not exist.',
        ];
    }
}
