<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClassRoomRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->role === 'admin'; }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:class_rooms,name'],
            'level' => ['required', 'string', 'in:X,XI,XII'],
        ];
    }
}
