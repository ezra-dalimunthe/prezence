<?php

namespace App\Http\Requests;

use App\Models\Staff;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAccountRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        /** @var User $account */
        $account = $this->route('user');

        $roles = match ($account->profile_type) {
            Teacher::class => ['teacher'],
            Student::class => ['student'],
            Staff::class => ['admin', 'report_viewer'],
            default => [],
        };

        return [
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($account)],
            'role' => ['required', Rule::in($roles)],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
