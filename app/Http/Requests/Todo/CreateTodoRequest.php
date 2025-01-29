<?php

declare(strict_types=1);

namespace App\Http\Requests\Todo;

use Illuminate\Foundation\Http\FormRequest;

final class CreateTodoRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'min:2', 'max:250'],
            'description' => ['required', 'min:2', 'max:1500'],
            'completed' => ['boolean'],
        ];
    }

    /**
     * Get error messages
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Title is required',
            'title.min' => 'Title must be at least 2 characters',
            'title.max' => 'Title must not be greater than 250 characters',
            'description.required' => 'Description is required',
            'description.min' => 'Description must be at least 2 characters',
            'description.max' => 'Description must not be greater than 1500 characters',
            'completed.boolean' => 'Completed must be a boolean',
        ];
    }
}
