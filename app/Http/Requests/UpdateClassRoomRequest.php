<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClassRoomRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->role === 'admin'; }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('class_rooms', 'name')->ignore($this->route('class_room'))],
            'level' => ['required', 'string', 'in:X,XI,XII'],
        ];
    }
}
