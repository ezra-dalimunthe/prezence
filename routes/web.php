<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\StaffController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\ClassRoomController;
use App\Http\Controllers\Admin\TeachingAssignmentController;
use App\Http\Controllers\Teacher\AttendanceController;
use App\Http\Controllers\Admin\ImportStudentController;
use App\Http\Controllers\Admin\ImportTeacherController;

use Inertia\Inertia;

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/guide', function () {
    return Inertia::render('Guide');
})->name('guide');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/login', [AuthController::class, 'showLogin'])
    ->middleware('guest')
    ->name('login');

Route::post('/login', [AuthController::class, 'login'])
    ->middleware('guest');

Route::middleware('auth')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::post('/logout', [AuthController::class, 'logout'])
        ->name('logout');

    Route::middleware('role:teacher')
        ->prefix('teacher')
        ->name('teacher.')
        ->group(function () {
            Route::get('/attendances', [AttendanceController::class, 'index'])
                ->name('attendances.index');
            Route::post('/attendances', [AttendanceController::class, 'store'])
                ->name('attendances.store');
        });

    Route::middleware('role:admin')
        ->prefix('admin')
        ->name('admin.')
        ->group(function () {
            Route::get('/teachers', [TeacherController::class, 'index'])
                ->name('teachers.index');
            Route::get('/teachers/create', [TeacherController::class, 'create'])
                ->name('teachers.create');
            Route::post('/teachers', [TeacherController::class, 'store'])
                ->name('teachers.store');
            Route::get('/teachers/{teacher}/edit', [TeacherController::class, 'edit'])
                ->name('teachers.edit');
            Route::put('/teachers/{teacher}', [TeacherController::class, 'update'])
                ->name('teachers.update');
            Route::post('/teachers/{teacher}/account', [TeacherController::class, 'createAccount'])
                ->name('teachers.account');

            Route::get('/students', [StudentController::class, 'index'])
                ->name('students.index');
            Route::get('/students/create', [StudentController::class, 'create'])
                ->name('students.create');
            Route::post('/students', [StudentController::class, 'store'])
                ->name('students.store');
            Route::get('/students/{student}/edit', [StudentController::class, 'edit'])
                ->name('students.edit');
            Route::put('/students/{student}', [StudentController::class, 'update'])
                ->name('students.update');
            Route::post('/students/{student}/account', [StudentController::class, 'createAccount'])
                ->name('students.account');

            Route::get('/staff', [StaffController::class, 'index'])
                ->name('staff.index');
            Route::get('/staff/create', [StaffController::class, 'create'])
                ->name('staff.create');
            Route::post('/staff', [StaffController::class, 'store'])
                ->name('staff.store');
            Route::get('/staff/{staff}/edit', [StaffController::class, 'edit'])
                ->name('staff.edit');
            Route::put('/staff/{staff}', [StaffController::class, 'update'])
                ->name('staff.update');
            Route::post('/staff/{staff}/account', [StaffController::class, 'createAccount'])
                ->name('staff.account');

            Route::resource('subjects', SubjectController::class)->except(['show']);
            Route::resource('class-rooms', ClassRoomController::class)->except(['show']);
            Route::resource('teaching-assignments', TeachingAssignmentController::class)->except(['show']);

            Route::get('/import/teachers', [ImportTeacherController::class, 'create'])
                ->name('import.teachers.create');
            Route::post('/import/teachers', [ImportTeacherController::class, 'store'])
                ->name('import.teachers.store');
            Route::get('/import/students', [ImportStudentController::class, 'create'])
                ->name('import.students.create');
            Route::post('/import/students', [ImportStudentController::class, 'store'])
                ->name('import.students.store');
        });
});
