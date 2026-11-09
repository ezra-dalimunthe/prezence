<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateAccountRequest;
use App\Mail\AccountCredentialMail;
use App\Models\Staff;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function edit(User $user)
    {
        $user->load('profile');
        abort_unless($user->profile instanceof Teacher || $user->profile instanceof Student || $user->profile instanceof Staff, 404);

        return Inertia::render('Admin/Accounts/Edit', [
            'account' => [
                'id' => $user->id,
                'email' => $user->email,
                'role' => $user->role,
                'is_active' => $user->is_active,
            ],
            'profile' => [
                'name' => $user->profile->name,
                'type' => match (true) {
                    $user->profile instanceof Teacher => 'teacher',
                    $user->profile instanceof Student => 'student',
                    default => 'staff',
                },
            ],
            'roles' => $this->rolesFor($user->profile),
        ]);
    }

    public function update(UpdateAccountRequest $request, User $user): RedirectResponse
    {
        $user->update($request->validated());

        return to_route('admin.accounts.edit', $user)
            ->with('success', 'Account berhasil diperbarui.');
    }

    public function resetPassword(User $user): RedirectResponse
    {
        $user->load('profile');
        abort_unless($user->profile instanceof Teacher || $user->profile instanceof Student || $user->profile instanceof Staff, 404);

        $temporaryPassword = Str::random(12);

        DB::transaction(function () use ($user, $temporaryPassword): void {
            $user->update([
                'password' => $temporaryPassword,
                'must_change_password' => true,
            ]);
        });

        Mail::to($user->email)->send(new AccountCredentialMail($user, $temporaryPassword));

        return to_route('admin.accounts.edit', $user)
            ->with('success', 'Temporary password baru telah dikirim melalui email.');
    }

    private function rolesFor(Teacher|Student|Staff $profile): array
    {
        return match (true) {
            $profile instanceof Teacher => ['teacher'],
            $profile instanceof Student => ['student'],
            default => ['admin', 'report_viewer'],
        };
    }
}
