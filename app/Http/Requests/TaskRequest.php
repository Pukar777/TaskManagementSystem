<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255',Rule::unique('tasks','title')->ignore($this->task)],
            // 'title' => 'required|string|max:255|unique:tasks',
            'description' => 'required|string|max:255',
            'dueDate' => 'required|string|max:255',
            'priority' => 'required|string|in:critical,high,medium,low',
            'status' => 'required|string|in:ready to start,watiting to review,done,stuck',
            'type' => 'required|string|in:feature,bug',
            'created_by' => 'required',
            // 'user_id' => 'required',
            'user_id' =>'required|exists:users,id',

            
              
            
        ];
    }


    public function messages()
    {
        return [
            'title.required' => 'Please enter the title name.',
            'title.string' => 'The title name must be a string.',
            'title.max' => 'Length is 255 .',
            'description.required' => 'Please Enter the description.',
            'description.string' => 'The description must be a string.',
            'description.max' => 'The grade may not be greater than :max characters.',
            'priority.required' => 'Please Enter the priority.',
            'priority.string' => 'The priority must be a string.',
            'status.in' => 'Should be among the value.',
            'status.required' => 'Please Enter the status.',
            'status.string' => 'The status must be a string.',
            'status.in' => 'Should be among the value.',
            'type.required' => 'Please Enter the type.',
            'type.string' => 'The type must be a string.',
            'type.in' => 'Should be among the value.',
            'created_by.required' => 'Please Enter the created_by.',
            'user_id.required' => 'Please Enter the users.',
            'user_id.exists' => 'Please select available users.',

        ];
    }
    }
