<?php

namespace App\Http\Requests;

use App\Models\TeachingAssignment;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTeachingAssignmentRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->role === 'admin'; }

    public function rules(): array
    {
        /** @var TeachingAssignment $assignment */
        $assignment = $this->route('teaching_assignment');

        return [
            'teacher_id' => [
                'required', 'exists:teachers,id',
                Rule::unique('teaching_assignments')->where(fn ($query) => $query
                    ->where('subject_id', $this->input('subject_id'))
                    ->where('class_id', $this->input('class_id'))
                )->ignore($assignment),
            ],
            'subject_id' => ['required', 'exists:subjects,id'],
            'class_id' => ['required', 'exists:class_rooms,id'],
        ];
    }
}
