<?php

namespace App\Http\Requests;

use App\Models\Student;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        /** @var Student $student */
        $student = $this->route('student');

        return [
            'name' => ['required', 'string', 'max:255'],
            'nis' => ['required', 'string', Rule::unique('students', 'nis')->ignore($student)],
            'gender' => ['required', 'string'],
            'birth_date' => ['required', 'date', 'before:today'],
            'birth_place' => ['required', 'string', 'max:100'],
            'class_id' => ['required', 'exists:class_rooms,id'],
        ];
    }
}
