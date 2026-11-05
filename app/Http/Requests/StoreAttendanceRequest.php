<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAttendanceRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->role === 'teacher'; }

    public function rules(): array
    {
        return [
            'teaching_assignment_id' => ['required', 'exists:teaching_assignments,id'],
            'attendance_date' => ['required', 'date_format:Y-m-d'],
            'attendances' => ['required', 'array'],
            'attendances.*' => ['required', 'in:present,excused,sick,absent'],
        ];
    }
}
