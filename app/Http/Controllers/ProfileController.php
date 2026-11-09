<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function show(Request $request): Response
    {
        $user = $request->user()->load('profile');
        $profile = $user->profile;

        abort_unless($profile instanceof Teacher || $profile instanceof Student || $profile instanceof Staff, 404);

        if ($profile instanceof Student) {
            $profile->load('classRoom');
        }

        return Inertia::render('Profile/Index', [
            'account' => [
                'email' => $user->email,
                'role' => $user->role,
                'must_change_password' => $user->must_change_password,
            ],
            'profile' => $this->profileData($profile),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $profile = $request->user()->profile;

        if ($profile instanceof Teacher) {
            $profile->update($request->validate([
                'name' => ['required', 'string', 'max:255'],
                'mobile_phone' => ['required', 'string', 'unique:teachers,mobile_phone,'.$profile->id],
            ]));
        } elseif ($profile instanceof Student) {
            $profile->update($request->validate([
                'name' => ['required', 'string', 'max:255'],
                'gender' => ['required', 'string'],
                'birth_date' => ['required', 'date', 'before:today'],
                'birth_place' => ['required', 'string', 'max:100'],
            ]));
        } elseif ($profile instanceof Staff) {
            $profile->update($request->validate([
                'name' => ['required', 'string', 'max:255'],
                'position' => ['required', 'string', 'max:50'],
            ]));
        } else {
            abort(404);
        }

        return to_route('profile.show')->with('success', 'Profile berhasil diperbarui.');
    }

    public function updatePassword(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]); 

        $request->user()->update([
            'password' => $data['password'],
            'must_change_password' => false,
        ]);

        return to_route('profile.show')->with('success', 'Password berhasil diubah.');
    }

    private function profileData(Teacher|Student|Staff $profile): array
    {
        $data = [
            'id' => $profile->id,
            'type' => match (true) {
                $profile instanceof Teacher => 'teacher',
                $profile instanceof Student => 'student',
                default => 'staff',
            },
            'name' => $profile->name,
        ];

        if ($profile instanceof Teacher) {
            $data['mobile_phone'] = $profile->mobile_phone;
        }

        if ($profile instanceof Student) {
            $data['nis'] = $profile->nis;
            $data['gender'] = $profile->gender;
            $data['birth_date'] = $profile->birth_date?->format('Y-m-d');
            $data['birth_place'] = $profile->birth_place;
            $data['class_room'] = $profile->classRoom ? [
                'name' => $profile->classRoom->name,
                'level' => $profile->classRoom->level,
            ] : null;
        }

        if ($profile instanceof Staff) {
            $data['position'] = $profile->position;
        }

        return $data;
    }
}
