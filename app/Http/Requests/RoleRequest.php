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
    public function rules(): array
    {
        return [

            'name' => ['required', 'string', 'max:255', 
             Rule::unique('roles','name')->ignore($this->role)],
            // 'permission_id' => 'required', 
            'permission_id' => 'required|exists:permissions,id',

            
        ];
    }


    public function messages()
    {
        return [
            'name.required' => 'Please enter the role.',
            'name.string' => 'The role must be a string.',
            'name.max' => 'Length is 255 .',
            'permission_id.required' => 'Please enter permission.',
            'permission_id.exists' => 'Please select available permssion.',
        ];
    }
    }
