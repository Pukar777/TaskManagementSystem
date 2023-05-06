<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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

            'name' => 'required|string|max:255|',
            'email' => ['required','email','string','max:255',
                        Rule::unique('users','email')->ignore($this->user)],
            'password' => 'required|string|max:255|confirmed',
            // 'password_confirmation' => 'required',
            'contact' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            // 'role_id' => 'required',
            'role_id' => 'required|exists:roles,id',
               
            
        ];
    }


    public function messages()
    {
        return [
            'name.required' => 'Please enter the name.',
            'name.string' => 'The name name must be a string.',
            'name.max' => 'Length is 255 .',
            'email.required' => 'Please Enter the email.',
            'email.string' => 'The email must be a string.',
            'email.max' => 'The grade may not be greater than :max characters.',
            'email.email' => 'Enter Valid email.',
            'password.required' => 'Please Enter the password.',
            'password.string' => 'The priority must be a string.',
            'contact.required' => 'Please Enter the contact.',
            'contact.string' => 'The contact must be a string.',
            'role_id.required' => 'Please Enter the role.',
            'role_id.exists' => 'Please Enter available role.',
          

        ];
    }
    }
