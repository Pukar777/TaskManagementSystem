<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules;
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
     * Preapares json data for validation;
     */
    protected function prepareForValidation()
    {
        $this->replace(json_decode($this->getContent(), true));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            '*.id' => [],
            '*.name' => ['required', 'regex:/^[A-Za-z\s]+$/u', 'min:8', 'max:255'],
            '*.email' => ['required', 'email', 'max:255'],
            // '*.email' => ['required', 'email', 'max:255', 'unique:users'],
            // '*.contact' => 'required|max:255|regex:/^([0-9\-\+\s])$/',
            // '*.address' => 'required|max:255|alpha_num|regex:/^([s\-\])$/',
            '*.role_id' => ['required'],
            '*.password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }

    public function message()
    {
        return [
            '*.name.required' => 'Please enter a name.',
            '*.name.string' => 'Name should only contain letters and spaces.',
            '*.name.min' => 'Name should be at least 8 characters long.',
            '*.name.max' => 'Name should not be longer than 255 characters.',
            '*.email.required' => 'Please enter an email address.',
            '*.email.email' => 'Please enter a valid email address.',
            '*.email.max' => 'Email address should not be longer than 255 characters.',
            '*.email.unique' => 'This email address is already in use.',
            '*.contact.required' => 'Please enter a contact number.',
            '*.contact.max' => 'Contact number should not be longer than 255 characters.',
            '*.contact.regex' => 'Contact number should only contain numbers, spaces, hyphens, or plus signs.',
            '*.address.required' => 'Please enter an address.',
            '*.address.max' => 'Address should not be longer than 255 characters.',
            '*.address.alpha_num' => 'Address should only contain letters and numbers.',
            '*.address.regex' => 'Address should only contain letters, numbers, spaces, hyphens, or forward slashes.',
            '*.role_id.required' => 'Please select a role.',
            '*.password.required' => 'Please enter a password.',
            '*.password.confirmed' => 'Passwords do not match.',
            '*.password.min' => 'Password should be at least :min characters long.',
            '*.password.max' => 'Password should not be longer than :max characters.',
            '*.password.regex' => 'Password should contain at least one uppercase letter, one lowercase letter, and one number.',
        ];
    }
}
