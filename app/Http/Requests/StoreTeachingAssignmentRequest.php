<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTeachingAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {

        return [
            'teacher_id' => [
                'required',
                'exists:teachers,id',
                Rule::unique('teaching_assignments')->where(function ($query) {
                    return $query
                        ->where('subject_id', $this->input('subject_id'))
                        ->where('class_id', $this->input('class_id'));
                }),
            ],
            'subject_id' => ['required', 'exists:subjects,id'],
            'class_id' => ['required', 'exists:class_rooms,id'],

        ];
    }
    public function messages(){
        return [
            'teacher_id.unique'=>"Guru telah ditugaskan untuk kelas dan mata pelajaran yang sama"
        ];
    }
}
