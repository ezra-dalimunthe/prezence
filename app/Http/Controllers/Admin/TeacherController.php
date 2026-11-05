<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTeacherAccountRequest;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Mail\AccountCredentialMail;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Teachers/Index', [
            'teachers' => Teacher::with('user')
                ->orderBy('name')
                ->paginate(10)
                ->withQueryString(),
            'createAccountFor' => request()->integer('create_account_for') ?: null,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Teachers/Create');
    }

    public function store(StoreTeacherRequest $request): RedirectResponse
    {
        $teacher = Teacher::create($request->validated());

        return to_route('admin.teachers.index', ['create_account_for' => $teacher->id]);
    }

    public function edit(Teacher $teacher)
    {
        return Inertia::render('Admin/Teachers/Edit', ['teacher' => $teacher]);
    }

    public function update(UpdateTeacherRequest $request, Teacher $teacher): RedirectResponse
    {
        $teacher->update($request->validated());

        return to_route('admin.teachers.index');
    }

    public function createAccount(CreateTeacherAccountRequest $request, Teacher $teacher): RedirectResponse
    {
        abort_if($teacher->user()->exists(), 422, 'Profile sudah memiliki account.');

        $temporaryPassword = Str::random(12);
        $user = DB::transaction(function () use ($request, $teacher, $temporaryPassword): User {
            return User::create([
                'email' => $request->string('email')->toString(),
                'password' => $temporaryPassword,
                'role' => 'teacher',
                'is_active' => true,
                'must_change_password' => true,
                'profile_type' => Teacher::class,
                'profile_id' => $teacher->id,
            ]);
        });

        Mail::to($user->email)->send(new AccountCredentialMail($user, $temporaryPassword));

        return to_route('admin.teachers.index')->with('success', 'Account Teacher berhasil dibuat.');
    }
}
