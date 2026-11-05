<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateStaffAccountRequest;
use App\Http\Requests\StoreStaffRequest;
use App\Http\Requests\UpdateStaffRequest;
use App\Mail\AccountCredentialMail;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Staff/Index', [
            'staff' => Staff::with('user')
                ->orderBy('name')
                ->paginate(10)
                ->withQueryString(),
            'createAccountFor' => request()->integer('create_account_for') ?: null,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Staff/Create');
    }

    public function store(StoreStaffRequest $request): RedirectResponse
    {
        $staff = Staff::create($request->validated());

        return to_route('admin.staff.index', ['create_account_for' => $staff->id]);
    }

    public function edit(Staff $staff)
    {
        return Inertia::render('Admin/Staff/Edit', ['staff' => $staff]);
    }

    public function update(UpdateStaffRequest $request, Staff $staff): RedirectResponse
    {
        $staff->update($request->validated());

        return to_route('admin.staff.index');
    }

    public function createAccount(CreateStaffAccountRequest $request, Staff $staff): RedirectResponse
    {
        abort_if($staff->user()->exists(), 422, 'Profile sudah memiliki account.');

        $temporaryPassword = Str::random(12);
        $user = DB::transaction(function () use ($request, $staff, $temporaryPassword): User {
            return User::create([
                'email' => $request->string('email')->toString(),
                'password' => $temporaryPassword,
                'role' => $request->string('role')->toString(),
                'is_active' => true,
                'must_change_password' => true,
                'profile_type' => Staff::class,
                'profile_id' => $staff->id,
            ]);
        });

        Mail::to($user->email)->send(new AccountCredentialMail($user, $temporaryPassword));

        return to_route('admin.staff.index')->with('success', 'Account Staff berhasil dibuat.');
    }
}
