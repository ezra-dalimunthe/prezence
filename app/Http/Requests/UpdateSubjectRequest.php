<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSubjectRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->role === 'admin'; }

    public function rules(): array
    {
        return ['name' => ['required', 'string', 'max:255', Rule::unique('subjects', 'name')->ignore($this->route('subject'))]];
    }
}
