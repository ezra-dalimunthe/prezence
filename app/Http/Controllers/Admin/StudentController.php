<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateStudentAccountRequest;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Mail\AccountCredentialMail;
use App\Models\ClassRoom;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Students/Index', [
            'students' => Student::with(['classRoom', 'user'])->orderBy('name')->get(),
            'createAccountFor' => request()->integer('create_account_for') ?: null,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Students/Create', ['classRooms' => $this->classRooms()]);
    }

    public function store(StoreStudentRequest $request): RedirectResponse
    {
        $student = Student::create($request->validated());

        return to_route('admin.students.index', ['create_account_for' => $student->id]);
    }

    public function edit(Student $student)
    {
        return Inertia::render('Admin/Students/Edit', [
            'student' => $student,
            'classRooms' => $this->classRooms(),
        ]);
    }

    public function update(UpdateStudentRequest $request, Student $student): RedirectResponse
    {
        $student->update($request->validated());

        return to_route('admin.students.index');
    }

    public function createAccount(CreateStudentAccountRequest $request, Student $student): RedirectResponse
    {
        abort_if($student->user()->exists(), 422, 'Profile sudah memiliki account.');

        $temporaryPassword = Str::random(12);
        $user = DB::transaction(function () use ($request, $student, $temporaryPassword): User {
            return User::create([
                'email' => $request->string('email')->toString(),
                'password' => $temporaryPassword,
                'role' => 'student',
                'is_active' => true,
                'must_change_password' => true,
                'profile_type' => Student::class,
                'profile_id' => $student->id,
            ]);
        });

        Mail::to($user->email)->send(new AccountCredentialMail($user, $temporaryPassword));

        return to_route('admin.students.index')->with('success', 'Account Student berhasil dibuat.');
    }

    private function classRooms()
    {
        return ClassRoom::orderBy('level')->orderBy('name')->get(['id', 'name', 'level']);
    }
}
